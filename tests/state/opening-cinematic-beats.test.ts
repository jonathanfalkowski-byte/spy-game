import { describe, expect, it } from 'vitest';
import { act, initialState } from '../../src/state/reducer';
import { encodeSave } from '../../src/persistence/saves';
import { currentReadingBeats, resolveSceneArt } from '../../src/ui/scene-art';
import { advance, choice } from '../helpers';

describe('opening cinematic reading beats', () => {
  it('cuts the commute at authored location and holds Daniel after arrival', () => {
    const reply = choice(initialState(), 'bond.friend');
    const departure = choice(reply, 'morning.yes');
    const commute = advance(departure);
    const reading = currentReadingBeats(commute);

    expect(reading?.entry.node).toBe('commute.arrival');
    expect(reading?.beats.map((beat) => beat.shotId)).toEqual([
      'opening.axiom.shot01-approach',
      'opening.axiom.shot02-security',
      'opening.axiom.shot03-office-arrival',
      'opening.office.shot01-daniel',
    ]);
    expect(reading?.beats[1].blocks.map((block) => block.text).join(' ')).toContain(
      'You set your phone and coat in a tray',
    );
    expect(reading?.beats[1].blocks.map((block) => block.text).join(' ')).toContain(
      'Eleven years. I still wait for the green light',
    );
    expect(reading?.beats[2].blocks.at(-1)?.text).toContain('When its doors open');
    expect(reading?.beats[2].blocks.at(-1)?.text).not.toContain('Daniel is waiting');
    expect(reading?.beats[3].blocks[0].text).toBe('Daniel is waiting beside your desk.');

    const saved = encodeSave(commute);
    const cuts = [0, 1, 2, 3].map((position) => resolveSceneArt(commute, position));
    expect(cuts.map((visual) => visual.shot?.shotId)).toEqual(reading?.beats.map((beat) => beat.shotId));
    expect(cuts.every((visual) => visual.art === undefined)).toBe(true);
    expect(cuts.every((visual) => visual.issues.includes('SHOT_WITHOUT_APPROVED_ASSET'))).toBe(true);
    expect(resolveSceneArt(commute, 4).shot).toBeUndefined();
    expect(encodeSave(commute)).toBe(saved);

    const office = advance(commute);
    expect(currentReadingBeats(office)).toBeUndefined();
    expect(resolveSceneArt(office).shot?.shotId).toBe('opening.office.shot01-daniel');
    expect(encodeSave(office)).not.toBe(saved);
  });

  it('does not expose a Daniel shot before the participant arrives', () => {
    const commute = advance(choice(choice(initialState(), 'bond.friend'), 'morning.yes'));
    const reading = currentReadingBeats(commute)!;
    expect(reading.beats.slice(0, 3).some((beat) => beat.shotId.includes('daniel'))).toBe(false);
  });

  it('leaves the authored commute history block intact', () => {
    const commute = advance(choice(choice(initialState(), 'bond.friend'), 'morning.yes'));
    const entry = commute.history.at(-1)!;
    expect(entry.node).toBe('commute.arrival');
    expect(entry.blocks.at(-1)?.text).toContain('Daniel is waiting beside your desk.');
    expect(entry.blocks).toHaveLength(5);
  });
});
