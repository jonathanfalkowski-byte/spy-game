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
    expect(reading?.beats[1].blocks.at(-1)?.text).toBe(
      'You collect your coat and phone, then badge through the inner gate.',
    );
    expect(reading?.beats[2].blocks[0].text.startsWith('The elevator carries you')).toBe(true);
    expect(reading?.beats[2].blocks[0].text).not.toContain('badge through');
    expect(reading?.beats.flatMap((beat) => beat.blocks).map((block) => block.text).join(' '))
      .toBe(reading?.entry.blocks.map((block) => block.text).join(' '));
    expect(reading?.beats[2].blocks.at(-1)?.text).not.toContain('Daniel is waiting');
    expect(reading?.beats[3].blocks[0].text).toBe('Daniel is waiting beside your desk.');

    const saved = encodeSave(commute);
    const cuts = [0, 1, 2, 3].map((position) => resolveSceneArt(commute, position));
    expect(cuts.map((visual) => visual.shot?.shotId)).toEqual(reading?.beats.map((beat) => beat.shotId));
    expect(cuts[0].art?.asset.id).toBe('axiom-exterior-approach-adrian-v2-production');
    expect(cuts[0].issues).toEqual([]);
    expect(cuts[1].art?.asset.id).toBe('axiom-security-gate-adrian-v2-production');
    expect(cuts[1].issues).toEqual([]);
    expect(cuts[2].art?.asset.id).toBe('axiom-office-approach-adrian-v3-transparent-production');
    expect(cuts[2].issues).toEqual([]);
    expect(cuts[3].art?.asset.id).toBe('axiom-opening-office-shot01-daniel-v3-transparent-production');
    expect(cuts[3].issues).toEqual([]);
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
