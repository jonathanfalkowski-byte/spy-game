// Draft a scene body from a card with the local Ollama writer.
// Usage: node tools/writer/write-scene.mjs <card-id> [--takes 3] [--model writer] [--temperature 0.9]
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { OUT, loadCard, screen, toBlocks } from './card.mjs';

const OLLAMA = 'http://127.0.0.1:11434/api/generate';

const RULES = `

FORMAT RULES (these override anything above if they conflict):
- Second person, present tense, Evelynn's point of view. In narration she is only "you" and "your". Never "I", "me", "my", never "she" or "Evelynn" for her. "I" is allowed only inside quoted dialogue.
- Begin inside the scene at the first beat. Do not restate the setup or earlier events.
- No title, preamble, commentary, summary or moral.
- One paragraph per line. A line of speech is the speaker's name, a space, then the words in double quotes.
- Never use square brackets.
- Every numbered beat happens on the page, moment by moment. Do not fade out, cut away or summarize.
- Short paragraphs, each under about 300 characters.

Write the scene now in second person and present tense, with every beat on the page.`;

function args(argv) {
  const opts = { takes: 3, model: 'writer', temperature: 0.9, maxTokens: 2048 };
  const rest = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--takes') opts.takes = Number(argv[++i]);
    else if (a === '--model') opts.model = argv[++i];
    else if (a === '--temperature') opts.temperature = Number(argv[++i]);
    else if (a === '--max-tokens') opts.maxTokens = Number(argv[++i]);
    else rest.push(a);
  }
  return { id: rest[0], ...opts };
}

async function generate(model, prompt, temperature, maxTokens) {
  const res = await fetch(OLLAMA, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      prompt,
      stream: false,
      // repeat_penalty over a 256-token window stops the 8B model looping one sentence.
      options: { temperature, num_predict: maxTokens, num_ctx: 16384, repeat_penalty: 1.3, repeat_last_n: 256 },
    }),
    signal: AbortSignal.timeout(30 * 60 * 1000),
  });
  if (!res.ok) throw new Error(`Ollama ${res.status}: ${await res.text()}`);
  return (await res.json()).response.trim();
}

const { id, takes, model, temperature, maxTokens } = args(process.argv.slice(2));
const card = loadCard(id);
const dir = join(OUT, card.id);
mkdirSync(dir, { recursive: true });

for (let n = 1; n <= takes; n++) {
  console.log(`[${card.id}] take ${n}/${takes} with ${model} ...`);
  const text = await generate(model, card.prompt + RULES, temperature, maxTokens);
  writeFileSync(join(dir, `take${n}.txt`), text + '\n');
  writeFileSync(join(dir, `take${n}.blocks.txt`), toBlocks(text, card.speakers) + '\n');
  const { words, issues } = screen(text, card);
  console.log(`  ${words} words  ${issues.length ? 'ISSUES: ' + issues.join('; ') : 'screen clean'}`);
}
console.log(`Takes in ${dir}. Read them before choosing; the screen is not a verdict.`);
