// Shared card loading and take screening for the local writer pipeline.
// Offline tooling only; never imported by the game.
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const CARDS = join(ROOT, 'docs', 'story', 'intimate', 'cards');
export const OUT = join(ROOT, 'local', 'writer-out');

const CARD_ID = /^[a-z0-9-]+$/;

export function checkId(id) {
  if (!id || !CARD_ID.test(id)) throw new Error(`card id must match ${CARD_ID}: ${id}`);
  return id;
}

const list = (value) => (value ?? '').split(',').map((s) => s.trim()).filter(Boolean);

export function loadCard(id, dir = CARDS) {
  const path = join(dir, `${checkId(id)}.md`);
  if (!existsSync(path)) throw new Error(`no card at ${path}`);
  const text = readFileSync(path, 'utf8').replace(/\r\n/g, '\n');
  const split = text.indexOf('\n---\n');
  if (split < 0) throw new Error(`${path}: missing '---' line between header and prompt`);
  const header = {};
  for (const line of text.slice(0, split).split('\n')) {
    const m = line.match(/^([a-z]+):\s*(.*)$/);
    if (m) header[m[1]] = m[2].trim();
  }
  const [min, max] = (header.words ?? '600-1600').split('-').map(Number);
  return {
    id,
    prompt: text.slice(split + 5).trim(),
    speakers: list(header.speakers),
    required: list(header.required),
    forbidden: list(header.forbidden),
    words: { min, max },
  };
}

// Narration only: drop quoted speech so dialogue may say "I" freely.
export const narration = (text) => text.replace(/["“][^"”]*["”]/g, ' ');

const FADE = /\b(fade to black|later that night|afterwards, you|the rest is a blur|hours later)\b/i;

export function screen(text, card) {
  const issues = [];
  const narr = narration(text);
  const words = text.split(/\s+/).filter(Boolean).length;
  const firstPerson = narr.match(/\b(I|me|my|mine|myself)\b/g) ?? [];
  if (firstPerson.length) issues.push(`first-person narration x${firstPerson.length}`);
  const plural = narr.match(/\b(we|us|our|ours)\b/gi) ?? [];
  if (plural.length) issues.push(`first-person plural narration x${plural.length}`);
  // The 8B model degenerates into a single endless word-association paragraph.
  const runOn = text.split(/\n+/).filter((line) => line.length > 600).length;
  if (runOn) issues.push(`run-on paragraph over 600 chars x${runOn} (likely degeneration)`);
  if (/\bEvelynn\b/.test(narr)) issues.push('Evelynn named in narration (should be "you")');
  if (!/\byou\b/i.test(narr)) issues.push('no second person at all');
  if (words < card.words.min) issues.push(`too short: ${words} < ${card.words.min}`);
  if (words > card.words.max) issues.push(`too long: ${words} > ${card.words.max}`);
  if (/[[\]]/.test(text)) issues.push('square brackets');
  if (FADE.test(text)) issues.push('fade/skip phrase');
  const lower = text.toLowerCase();
  for (const f of card.forbidden) if (lower.includes(f.toLowerCase())) issues.push(`forbidden: "${f}"`);
  for (const r of card.required) {
    const re = new RegExp(`\\b${r.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    if (!re.test(text)) issues.push(`missing required: "${r}"`);
  }
  const sentences = text.split(/(?<=[.!?])\s+/).map((s) => s.trim().toLowerCase()).filter((s) => s.length > 20);
  const counts = new Map();
  for (const s of sentences) counts.set(s, (counts.get(s) ?? 0) + 1);
  const loops = [...counts.values()].filter((n) => n > 2).length;
  if (loops) issues.push(`repeated sentences (${loops} looped)`);
  return { words, issues };
}

// Convert a take into EVE content blocks: p('...') for narration, q('Speaker', '...') for speech.
const esc = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, '’');

export function toBlocks(text, speakers) {
  const names = speakers.map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const say = names ? new RegExp(`^(${names})[:\\s]+["“](.*)["”]$`) : null;
  return text
    .split(/[\r\n]+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const m = say && line.match(say);
      return m ? `q('${esc(m[1])}', '${esc(m[2])}'),` : `p('${esc(line)}'),`;
    })
    .join('\n');
}
