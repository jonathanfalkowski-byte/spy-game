import { chapter3Reading } from './chapter3-reading';
import type { Block } from '../content/schema';
import type { GameState } from '../state/schema';
import { leadNames } from '../content/mission';
import { renderRevision18Text } from '../content/revision18-editorial';
import { hasRevision18Presentation, hasRevision20 } from '../content/revision';
import { renderRevision20Text, revision20Blocks } from '../content/revision20-editorial';

// UI copy only. Never feed these blocks back into history, the reducer or saves.
// Match the originating scene and its authored text, so reviewing old exchanges
// cannot acquire information from the player's later state.
const p = (text: string): Block => ({ kind: 'narrative', text });
const q = (speaker: string, text: string): Block => ({ kind: 'speech', speaker, text });
const t = (text: string): Block => ({ kind: 'thought', text });

/**
 * Normalize the legacy operational identity spelling at the presentation
 * boundary only. The input is authored/state text and must remain untouched;
 * callers use the returned value only for player-facing UI.
 *
 * Keep the replacements ordered from the most specific forms to the
 * standalone name so that archival phrases such as `Evelyn Vale` and both
 * apostrophe styles retain their punctuation and case. Stable IDs such as
 * `evelyn` are intentionally not matched.
 */
export function renderCanonicalIdentityText(rawText: string): string {
  return rawText
    .replace(/\bEVELYN\s+VALE\b/g, 'EVELYNN VALE')
    .replace(/\bEvelyn\s+Vale\b/g, 'Evelynn Vale')
    .replace(/\bEVELYN([’'])S\b/g, 'EVELYNN$1S')
    .replace(/\bEvelyn([’'])s\b/g, 'Evelynn$1s')
    .replace(/\bEVELYN\b/g, 'EVELYNN')
    .replace(/\bEvelyn\b/g, 'Evelynn');
}

/** Backwards-compatible name for existing player-facing presentation callers. */
export const displayName = renderCanonicalIdentityText;

const historicalHelixSubmittedCopy =
  'The report leaves your terminal addressed to Benton only. Your selected conclusion remains in it, with the records and connections you chose to attach.';
const currentHelixSubmittedCopy =
  'The report leaves your terminal addressed to Benton only. Your selected conclusion remains in it, with the records you reviewed and the connections you recorded.';

/**
 * Apply narrowly scoped current-authoring compatibility at the player-facing
 * boundary. Authenticated history and save data remain unchanged.
 */
export function renderCurrentPresentationText(rawText: string, node?: string, contentRevision?: number): string {
  const r18 = hasRevision18Presentation(contentRevision) ? renderRevision18Text(rawText, node) : rawText;
  const authored = hasRevision20(contentRevision) ? renderRevision20Text(r18, node) : r18;
  const rendered = renderCanonicalIdentityText(authored);
  return node === 'helix.submitted' && rendered === historicalHelixSubmittedCopy
    ? currentHelixSubmittedCopy
    : rendered;
}

function readingBlocksRaw(blocks: Block[], node?: string): Block[] {
  return blocks.flatMap((b): Block[] => {
    const polished = chapter3Reading(b, node);
    if (polished) return [polished];
    if (node === 'clinic.display' && b.text === 'How close will the result be to this model?')
      return [
        b,
        q(
          'Voss',
          'It is a prediction, not a photograph of the result. There will be variation during recovery. We assess what actually changes; the model cannot promise how you will feel in it.',
        ),
      ];
    if (node === 'clinic.display' && b.text.startsWith('You study the predicted change in balance'))
      return [
        p(
          'You lean forward. The figure shifts with you, but its weight seems to settle differently over the hips. You put both feet flat on the floor.',
        ),
        q('Adrian', 'Will moving feel like this looks?'),
        q(
          'Voss',
          'The model shows a prediction. We will assess your balance and practise movement during recovery. Looking at it cannot replace that.',
        ),
      ];
    if (
      node === 'clinic.examResult' &&
      b.text === 'She releases the chair and helps you return to the consultation area.'
    )
      return [
        p(
          'She releases the chair. The consultation area is waiting beyond it; you can ask about the scan before moving on.',
        ),
      ];
    if (
      node === 'mission.marcus' &&
      b.text.startsWith('You restore the earpiece before leaving the elevator.')
    )
      return [
        p(
          'At the edge of the gathering, you restore the earpiece. Sloane confirms the channel is live. You do not tell her what you thought during the silence.',
        ),
      ];
    if (
      node === 'dayend.accepted' &&
      b.text.startsWith('Adrian’s day ends here, before the clinic.')
    )
      return [p('You can pause here and review the day, or continue to the morning appointment.')];
    if (node === 'clinic.complete' && b.text.startsWith('This milestone ends in transit.'))
      return [
        p('You can review your preparation here or continue the journey to the Glass House.'),
      ];

    if (
      node === 'mission.exchange' &&
      b.text.startsWith('You take the gallery side of the gathering,')
    )
      return [
        p(
          'You take the gallery side of the gathering. From here you can watch the entrance without crossing the room when Benton arrives. You have committed your position to the name you gave Sloane.',
        ),
      ];
    if (
      node === 'mission.exchange' &&
      b.text.startsWith('You remain at the edge of the gathering,')
    )
      return [
        p(
          'You remain at the edge of the gathering. You have not sent a name you cannot defend. Marcus moves beyond your best line of sight while you wait; seeing more clearly will now mean moving after him.',
        ),
      ];
    if (node === 'mission.exchange' && b.text.startsWith('You keep your attention on '))
      return [
        b,
        t('I have put my attention behind a name. Marcus is moving while I look elsewhere.'),
      ];
    if (
      node === 'mission.confrontation' &&
      b.text.startsWith('The microphone catches “replacement team,”')
    )
      return [
        p(
          'The microphone catches “replacement team,” then the scrape of a chair. You hold it steady, waiting for the missing answer. Benton pockets the wafer.',
        ),
        q('Sloane · earpiece', 'Only fragments. The agreement has already passed.'),
        t('I can keep listening. I cannot record words they have finished saying.'),
      ];
    if (
      node === 'mission.confrontation' &&
      b.text.startsWith('You bring the phone around too late for the wafer.')
    )
      return [
        p(
          'You bring the phone around too late for the wafer. In the frame, Benton and Marcus stand beside the table with nothing passing between their hands. You have their faces together. The moment that would explain why you took the picture is outside it.',
        ),
      ];
    if (
      node === 'mission.confrontation' &&
      b.text.startsWith('You reach the gallery after Benton has put the wafer away.')
    )
      return [
        p(
          'You reach the gallery after Benton has put the wafer away. His token remains clipped inside his jacket. He turns toward your reaching hand before you can touch it. You stop short. Going closer now would mean reaching into his jacket while he watches. You lower your empty hand.',
        ),
      ];
    if (
      node === 'mission.escape' &&
      b.text.startsWith('The guard reaches the bank in time to ask your name.')
    )
      return [
        p(
          'The guard reaches the bank before the doors close. “Your name?” The guests are holding the doorway; you cannot simply disappear among them. You show the valid invitation. “Ms Vale. I am leaving.” The attendant confirms it. The guard repeats the name into his sleeve. He has no instruction to detain you, but your departure is no longer quiet.',
        ),
      ];
    if (node === 'mission.debrief' && b.kind === 'speech') {
      if (b.text.startsWith('Benton was my probable source.'))
        return [
          q(
            'Sloane · earpiece',
            'Benton was my probable source. I needed proof, and your assessment before I gave you mine.',
          ),
        ];
      if (b.text.includes('I have fragments, not the agreement.'))
        return [
          b,
          t(
            'She has the recording. Even if I could take a copy with me, it would still be missing the agreement. My account has to carry what the microphone did not.',
          ),
        ];
      if (b.text.includes('Your photograph places them together.'))
        return [
          b,
          t(
            'The picture is mine to keep. Anyone looking at it will still have to take my word for what happened before it.',
          ),
        ];
      if (b.text.includes('You did not get the token.'))
        return [
          b,
          t(
            'He kept the token and the wafer. I am leaving with an account of the meeting, while Sloane decides what she can do with it.',
          ),
        ];
      if (b.text.includes('I have their agreement on the recording.'))
        return [
          b,
          t(
            'The clearest evidence is in her recorder. I heard it happen; I cannot put my own clean copy on a table.',
          ),
        ];
      if (b.text.includes('You have his access token. Keep it intact.'))
        return [
          b,
          t(
            'The token presses into my palm. Sloane knows I have it, but it is still in my hand. Something useful, perhaps. Not the agreement she asked me to prove.',
          ),
        ];
    }
    if (
      node === 'mission.debrief' &&
      b.text ===
        'Yes. The exchange was recoverable. Your first unscripted decision as Evelyn was not reproducible.'
    )
      return [
        q(
          'Sloane · earpiece',
          'Yes. I considered the exchange recoverable. I could only observe your first decision once.',
        ),
      ];
    // Keep all three warning messages verbatim. Reframe the meaning in the
    // protagonist's uncertainty, without making the sender's claim a fact.
    if (node === 'mission.warning2' && b.text.startsWith('The second line offers no explanation'))
      return [
        p(
          'Sloane called your judgment another objective. The sender calls you the real test. Those are not quite the same account of what happened upstairs. You wait for an explanation.',
        ),
      ];
    if (node === 'mission.warning3' && b.kind === 'thought')
      return [
        t(
          'If that is true, why let it happen? Sloane told me what I brought back. She has not told me what she was trying to learn about me. The sender has given me a question, not an answer.',
        ),
      ];
    return [b];
  });
}

/** Bookkeeping notices kept in history for the journal and records, never shown in the reading view:
 * source citations, delivered-message receipts, route tallies and state dumps (review 2026-09-24). */
const hiddenNotice = (text: string) =>
  /^Source: /.test(text) ||
  /^[^:\n]{1,40} received: /.test(text) ||
  /^Route signal:/.test(text) ||
  /Stated desire: /.test(text) ||
  /^Derived from stored /.test(text) ||
  /^(Adult Evelynn and adult|Both adults are willing)/.test(text);

/** Chapter 3's choice handler records the chosen label as a first line spoken by "You"; show it as a choice. */
function choiceLabelAsNotice(blocks: Block[], node?: string): Block[] {
  const [first, ...rest] = blocks;
  if (!first || !node?.startsWith('chapter3.') || first.kind !== 'speech' || first.speaker !== 'You') return blocks;
  const label = first.text.startsWith('Continue · ') ? 'Continue' : first.text;
  return [{ kind: 'notice', text: 'Your choice: ' + label }, ...rest];
}

/** A sourced record (note7/note8/note9: a summary notice and its "Source:" line) belongs to the journal.
 * In Chapters 7–9 it would otherwise sit above the scene it summarises and spoil it. Money moving stays. */
const journalRecord = (blocks: Block[], node?: string) =>
  /^chapter([789]|1[0-6])\./.test(node ?? '') &&
  blocks.length === 2 &&
  blocks.every((b) => b.kind === 'notice') &&
  blocks[1].text.startsWith('Source: ') &&
  !/^(Spent|Received) \$|fee is unpaid/.test(blocks[0].text);

export function readingBlocks(blocks: Block[], node?: string, contentRevision?: number): Block[] {
  if (journalRecord(blocks, node)) return [];
  const authoredBlocks =
    hasRevision18Presentation(contentRevision)
      ? blocks.map((block) => ({ ...block, text: renderRevision18Text(block.text, node) }))
      : blocks;
  const polished = choiceLabelAsNotice(readingBlocksRaw(authoredBlocks, node), node);
  return (hasRevision20(contentRevision) ? revision20Blocks(polished, node) : polished)
    .filter((block) => !(block.kind === 'notice' && hiddenNotice(block.text)))
    .map((block) => ({
      ...block,
      speaker: block.speaker ? templateFix(renderCurrentPresentationText(block.speaker, node, contentRevision)) : block.speaker,
      text: templateFix(renderCurrentPresentationText(block.text, node, contentRevision)),
    }));
}

/** Names slotted into templates ("Close the {name}") where the name already carries its article. */
const templateFix = (text: string) =>
  text === 'the unknown sender' ? 'Unknown sender' : text.replace(/\bthe the\b/g, 'the').replace(/^the unknown sender’s/, 'The unknown sender’s');

export function renderChoiceText(rawText: string, node: string, contentRevision?: number): string {
  return templateFix(renderCurrentPresentationText(rawText, node, contentRevision));
}

export function missionActionLabel(id: string, fallback: string, s: GameState): string {
  if (id === 'exchange.follow')
    return s.mission.timing === 'late'
      ? 'Turn toward the gallery — catch what remains'
      : 'Watch the gallery entrance';
  if (id === 'confrontation.leave' && s.mission.wrist === 'held')
    return 'Get your wrist free and leave the gallery';
  return displayName(fallback);
}

/** At most four short recollections; only concrete, completed player behaviour. */
export function personalRecap(s: GameState): string[] {
  if (s.mission.outcome !== 'complete') return [];
  const c = s.clinic;
  const lines = [
    s.mission.leads.length
      ? 'You followed ' +
        s.mission.leads.map((id) => leadNames[id].toLowerCase()).join(' and ') +
        '.'
      : 'You gave your assessment without following a party lead.',
  ];
  lines.push(
    c.contact === 'identity'
      ? 'You told Maya about the changed body and the name Evelynn Vale on the monitored phone.'
      : c.contact === 'brief'
        ? 'You told Maya you were recovering, and left the identity details out of that message.'
        : 'You sent Maya no recovery message. You let the earlier conversation stand.',
  );
  const privacy = ['ask', 'demand'].includes(c.privacy || '')
    ? 'You asked Sloane to leave the examination.'
    : 'Sloane stayed during your examination.';
  lines.push(
    privacy +
      (c.profile && c.profile !== 'existing'
        ? ' You chose the ' + c.profile + ' profile rather than the supplied default.'
        : ' You kept the supplied profile.'),
  );
  if (c.outfit && c.makeup)
    lines.push(
      'You chose the ' + c.outfit + ' outfit and ' + c.makeup + ' makeup for the reception.',
    );
  return lines;
}

/** Clinic nodes from the first look at the new face onward (the stop path is reachable only before it). */
const livingAsEvelynClinic = new Set([
  'mirror', 'name', 'rest', 'recoveryContact', 'recoveryReply', 'wardrobe', 'makeup',
  'presentationReview', 'rehearsal', 'briefing', 'farewell', 'departure', 'complete',
]);

/** Owner decision: thoughts are attributed to Adrian until the mirror beat, then carry no name, so the
 * game never asserts whether the inner voice is "still Adrian" or "now Evelynn". Display only. */
export function thoughtLabel(node?: string): string {
  const [scene, phase] = (node ?? '').split('.');
  const living =
    ['mission', 'chapter3', 'chapter4', 'chapter5', 'chapter6', 'chapter7', 'chapter8', 'chapter9', 'chapter10', 'chapter11', 'chapter12', 'chapter13', 'chapter14', 'chapter15', 'chapter16'].includes(scene) ||
    (scene === 'clinic' && livingAsEvelynClinic.has(phase));
  return living ? 'Private thought' : 'Adrian · private thought';
}
