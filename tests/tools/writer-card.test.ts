import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { checkId, loadCard, screen, toBlocks } from '../../tools/writer/card.mjs';

const card: { required: string[]; forbidden: string[]; words: { min: number; max: number } } = {
  required: [],
  forbidden: [],
  words: { min: 5, max: 200 },
};
const clean = 'You cross the room. You set the glass down beside the lamp.';
const issuesFor = (text: string, overrides: Partial<typeof card> = {}) => screen(text, { ...card, ...overrides }).issues;

describe('checkId', () => {
  it('accepts lowercase ids with digits and dashes', () => {
    expect(checkId('ch3-julian-2')).toBe('ch3-julian-2');
  });

  it.each(['../x', 'Julian', 'two words', '', 'a/b', 'a.md'])('rejects %j', (id) => {
    expect(() => checkId(id)).toThrow(/card id must match/);
  });
});

describe('loadCard', () => {
  let dir: string;

  beforeAll(() => {
    dir = mkdtempSync(join(tmpdir(), 'eve-writer-cards-'));
    writeFileSync(
      join(dir, 'fixture.md'),
      [
        'speakers: Julian, Celeste ',
        'required: glass, lamp',
        'forbidden: fade to black,  cold feet',
        'words: 300-900',
        'Notes: capitalised keys are ignored',
        '---',
        'Write the scene.',
        '',
        '---',
        'Second section stays in the prompt.',
      ].join('\r\n'),
    );
    writeFileSync(join(dir, 'defaults.md'), 'speakers: Julian\n---\nPrompt only.\n');
    writeFileSync(join(dir, 'broken.md'), 'speakers: Julian\nNo separator here.\n');
  });

  afterAll(() => rmSync(dir, { recursive: true, force: true }));

  it('parses the header lists and word range', () => {
    const loaded = loadCard('fixture', dir);
    expect(loaded.id).toBe('fixture');
    expect(loaded.speakers).toEqual(['Julian', 'Celeste']);
    expect(loaded.required).toEqual(['glass', 'lamp']);
    expect(loaded.forbidden).toEqual(['fade to black', 'cold feet']);
    expect(loaded.words).toEqual({ min: 300, max: 900 });
  });

  it('returns only the text below the first separator as the prompt', () => {
    const { prompt } = loadCard('fixture', dir);
    expect(prompt).toBe('Write the scene.\n\n---\nSecond section stays in the prompt.');
    expect(prompt).not.toContain('speakers:');
  });

  it('defaults missing header fields', () => {
    const loaded = loadCard('defaults', dir);
    expect(loaded.required).toEqual([]);
    expect(loaded.forbidden).toEqual([]);
    expect(loaded.words).toEqual({ min: 600, max: 1600 });
  });

  it('errors when the separator is missing', () => {
    expect(() => loadCard('broken', dir)).toThrow(/missing '---'/);
  });

  it('errors when the card does not exist', () => {
    expect(() => loadCard('absent', dir)).toThrow(/no card at/);
  });

  it('validates the id before touching the file system', () => {
    expect(() => loadCard('../fixture', dir)).toThrow(/card id must match/);
  });
});

describe('screen', () => {
  it('passes clean second-person narration', () => {
    expect(screen(clean, card)).toEqual({ words: 12, issues: [] });
  });

  it('flags first-person narration but not "I" inside quotes', () => {
    expect(issuesFor(`${clean} I watch him.`)).toContain('first-person narration x1');
    expect(issuesFor(`${clean} "I missed you," he says.`)).toEqual([]);
    expect(issuesFor(`${clean} “I missed you,” he says.`)).toEqual([]);
  });

  it('flags we/us/our narration', () => {
    expect(issuesFor(`${clean} We laugh. Our glasses touch.`)).toContain('first-person plural narration x2');
    expect(issuesFor(`${clean} "We should go," he says.`)).toEqual([]);
  });

  it('flags Evelynn named in narration but not in dialogue', () => {
    expect(issuesFor(`${clean} Evelynn smiles.`)).toContain('Evelynn named in narration (should be "you")');
    expect(issuesFor(`${clean} "Evelynn," he says.`)).toEqual([]);
  });

  it('flags takes that are too short or too long', () => {
    expect(issuesFor(clean, { words: { min: 50, max: 200 } })).toContain('too short: 12 < 50');
    expect(issuesFor(clean, { words: { min: 1, max: 10 } })).toContain('too long: 12 > 10');
  });

  it('flags square brackets', () => {
    expect(issuesFor(`${clean} [describe the room]`)).toContain('square brackets');
  });

  it('flags a forbidden multi-word phrase case-insensitively', () => {
    expect(issuesFor(`${clean} You get Cold Feet.`, { forbidden: ['cold feet'] })).toContain('forbidden: "cold feet"');
    expect(issuesFor(`${clean} Your feet are cold.`, { forbidden: ['cold feet'] })).toEqual([]);
  });

  it('flags a required token only when the whole word is missing', () => {
    expect(issuesFor('You wait during the lull, then go.', { required: ['ring'] })).toContain('missing required: "ring"');
    expect(issuesFor(`${clean} The Ring is cold.`, { required: ['ring'] })).toEqual([]);
  });

  it('flags a sentence repeated more than twice', () => {
    const loop = 'You feel the warmth of the room settle. ';
    expect(issuesFor(loop.repeat(2))).toEqual([]);
    expect(issuesFor(loop.repeat(3))).toContain('repeated sentences (1 looped)');
  });

  it('flags a run-on paragraph over 600 chars', () => {
    const long = `You ${'drift and '.repeat(70)}stop.`;
    expect(long.length).toBeGreaterThan(600);
    expect(issuesFor(long, { words: { min: 1, max: 1000 } })).toContain(
      'run-on paragraph over 600 chars x1 (likely degeneration)',
    );
  });
});

describe('toBlocks', () => {
  const speakers = ['Julian', 'Celeste'];

  it('emits q() for listed speakers and p() otherwise', () => {
    const out = toBlocks(
      ['You open the door.', 'Julian "You came."', 'Celeste: “Of course.”', 'Marcus "Not listed."'].join('\n\n'),
      speakers,
    );
    expect(out.split('\n')).toEqual([
      "p('You open the door.'),",
      "q('Julian', 'You came.'),",
      "q('Celeste', 'Of course.'),",
      `p('Marcus "Not listed."'),`,
    ]);
  });

  it('emits only p() when no speakers are listed', () => {
    expect(toBlocks('Julian "Hi."', [])).toBe(`p('Julian "Hi."'),`);
  });

  it('cannot break out of the string literal', () => {
    const lines = ["You say it's late.", "'); alert(1); ('", 'Line ends in a backslash \\', "\\'); x('", 'one\rtwo'];
    const out = toBlocks([...lines, `Julian "it's \\' fine"`].join('\n'), speakers);
    const calls: string[][] = [];
    const p = (text: string) => calls.push(['p', text]);
    const q = (who: string, text: string) => calls.push(['q', who, text]);
    // Each emitted line must evaluate to exactly one p()/q() call with a single string argument.
    for (const line of out.split('\n')) {
      const before = calls.length;
      new Function('p', 'q', `return [${line}];`)(p, q);
      expect(calls.length).toBe(before + 1);
    }
    expect(calls.map((c) => c[0])).toEqual(['p', 'p', 'p', 'p', 'p', 'p', 'q']);
    expect(calls[1]).toEqual(['p', '’); alert(1); (’']);
    expect(calls[2]).toEqual(['p', 'Line ends in a backslash \\']);
    expect(calls[6]).toEqual(['q', 'Julian', 'it’s \\’ fine']);
  });
});
