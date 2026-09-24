import { expect, it } from 'vitest';
import { clinic, clinicStart, traverse } from '../clinic-helpers';
import { resolveSceneArt } from '../../src/ui/scene-art';

/** Exact shot art only: an empty-room environment fill never counts as the refused asset. */
const exactArt = (result: ReturnType<typeof resolveSceneArt>) => (result.art?.kind === 'environment' ? undefined : result.art);

it('binds reception and privacy variants to the reached clinic participants', () => {
  const reception = traverse(clinicStart(), {}, 'reception');
  expect(resolveSceneArt(reception).shot?.shotId).toBe('clinic.reception.shot01');
  expect(resolveSceneArt(reception).art?.asset.id).toBe('clinic-reception-v1-production');
  expect(resolveSceneArt(reception).issues).toEqual([]);

  const reply = clinic(reception, 'reception.correct');
  expect(resolveSceneArt(reply).shot?.shotId).toBe('clinic.reception.shot01');
  expect(resolveSceneArt(reply).art?.asset.id).toBe('clinic-reception-v1-production');

  const privacy = traverse(reply, {}, 'privacy');
  expect(resolveSceneArt(privacy).shot?.shotId).toBe('clinic.privacy.shot01');
  expect(resolveSceneArt(privacy).art?.asset.id).toBe('clinic-privacy-v1-production');

  const stayReply = clinic(privacy, 'privacy.stay');
  expect(stayReply.clinic.sloanePresent).toBe(true);
  expect(resolveSceneArt(stayReply).shot?.shotId).toBe('clinic.privacyReply.shot01-stay');
  expect(resolveSceneArt(stayReply).art?.asset.id).toBe('clinic-privacy-stay-v1-production');

  const privateReply = clinic(privacy, 'privacy.ask');
  expect(privateReply.clinic.sloanePresent).toBe(false);
  expect(resolveSceneArt(privateReply).shot?.shotId).toBe('clinic.privacyReply.shot01-private');
  expect(resolveSceneArt(privateReply).art?.asset.id).toBe('clinic-privacy-private-v1-production');
});

it('keeps examination result branch-safe and returns to the protocol hold', () => {
  const reply = traverse(clinicStart(), { privacy: 'privacy.ask' }, 'privacyReply');
  const exam = clinic(reply, 'c.privacyReply');
  expect(resolveSceneArt(exam).shot?.shotId).toBe('clinic.exam.shot01-private');
  expect(resolveSceneArt(exam).art?.asset.id).toBe('clinic-exam-private-v1-production');

  const result = clinic(exam, 'exam.skip');
  expect(result.clinic.sloanePresent).toBe(false);
  expect(resolveSceneArt(result).shot?.shotId).toBe('clinic.examResult.shot01-private');
  expect(resolveSceneArt(result).art?.asset.id).toBe('clinic-exam-result-v1-production');

  const protocol = clinic(result, 'c.examResult');
  expect(protocol.clinic.sloanePresent).toBe(true);
  expect(resolveSceneArt(protocol).shot?.shotId).toBe('clinic.protocol.shot01');
  expect(resolveSceneArt(protocol).art?.asset.id).toBe('clinic-protocol-v1-production');

  const stay = traverse(clinicStart(), { privacy: 'privacy.stay' }, 'examResult');
  expect(stay.clinic.sloanePresent).toBe(true);
  expect(resolveSceneArt(stay).shot?.shotId).toBe('clinic.examResult.shot01-private');
  expect(exactArt(resolveSceneArt(stay))).toBeUndefined();
  expect(resolveSceneArt(stay).issues).toContain('LOCATION_MISMATCH');
});

it('holds the simulation through display and cuts to authorization and preparation', () => {
  const profile = traverse(clinicStart(), { privacy: 'privacy.stay' }, 'profile');
  const reviewed = clinic(profile, 'profile.existing');
  const simulation = clinic(reviewed, 'profile.confirm');
  expect(resolveSceneArt(simulation).shot?.shotId).toBe('clinic.simulation.shot01');
  expect(resolveSceneArt(simulation).art?.asset.id).toBe('clinic-simulation-v1-production');

  const display = clinic(simulation, 'attention.face');
  expect(resolveSceneArt(display).shot?.shotId).toBe('clinic.simulation.shot01');
  expect(resolveSceneArt(display).art?.asset.id).toBe('clinic-simulation-v1-production');

  const authorization = clinic(display, 'display.silent');
  expect(resolveSceneArt(authorization).shot?.shotId).toBe('clinic.authorization.shot01');
  expect(resolveSceneArt(authorization).art?.asset.id).toBe('clinic-authorization-v1-production');

  const preparation = clinic(authorization, 'auth.yes');
  expect(preparation.clinic.authorized).toBe(true);
  expect(resolveSceneArt(preparation).shot?.shotId).toBe('clinic.preparation.shot01');
  expect(resolveSceneArt(preparation).art?.asset.id).toBe('clinic-preparation-v1-production');
});

it('binds the profile display candidate only while profile controls are active', () => {
  const profile = traverse(clinicStart(), {}, 'profile');
  const preview = resolveSceneArt(profile);
  expect(preview.shot?.shotId).toBe('clinic.profile.shot01');
  expect(preview.art?.asset.id).toBe('clinic-profile-v1-production');
  expect(preview.issues).toEqual([]);
  const reviewed = clinic(profile, 'profile.existing');
  expect(resolveSceneArt(reviewed).shot?.shotId).not.toBe('clinic.profile.shot01');
});

it('keeps voice and face assets branch-safe across pause and response holds', () => {
  const privateVoice = traverse(clinicStart(), { privacy: 'privacy.ask' }, 'voice');
  // The current reducer restores Sloane before protocol/voice; the private voice
  // asset therefore remains fail-closed until a legal private voice route exists.
  expect(exactArt(resolveSceneArt(privateVoice))).toBeUndefined();
  expect(resolveSceneArt(privateVoice).issues).toContain('LOCATION_MISMATCH');
  const voiceReply = clinic(privateVoice, 'voice.lower');
  expect(exactArt(resolveSceneArt(voiceReply))).toBeUndefined();

  const stayVoice = traverse(clinicStart(), { privacy: 'privacy.stay' }, 'voice');
  expect(exactArt(resolveSceneArt(stayVoice))).toBeUndefined();
  const voicePause = clinic(stayVoice, 'voice.pause');
  expect(resolveSceneArt(voicePause).art?.asset.id).toBe('clinic-voice-pause-v1-production');

  const face = clinic(voiceReply, 'c.voiceReply');
  expect(resolveSceneArt(face).art?.asset.id).toBe('clinic-face-v1-production');
  const stayFace = clinic(voicePause, 'voice.resume');
  const chosenFace = clinic(stayFace, 'voice.lower');
  const faceCheckpoint = clinic(chosenFace, 'c.voiceReply');
  expect(resolveSceneArt(faceCheckpoint).art?.asset.id).toBe('clinic-face-v1-production');
  const faceReply = clinic(faceCheckpoint, 'face.temporary');
  expect(resolveSceneArt(faceReply).art?.asset.id).toBe('clinic-face-v1-production');
  const facePause = clinic(faceCheckpoint, 'face.pause');
  expect(resolveSceneArt(facePause).art?.asset.id).toBe('clinic-face-pause-v1-production');
});

it('covers recovery movement, contact custody and wardrobe branches without future leakage', () => {
  const stayVoice = traverse(clinicStart(), { privacy: 'privacy.stay' }, 'voice');
  const voiceReply = clinic(stayVoice, 'voice.lower');
  const face = clinic(voiceReply, 'c.voiceReply');
  const faceReply = clinic(face, 'face.temporary');
  const steps = clinic(faceReply, 'c.faceReply');
  expect(resolveSceneArt(steps).art?.asset.id).toBe('clinic-steps-v1-production');
  const mirror = clinic(steps, 'step.help');
  expect(resolveSceneArt(mirror).art?.asset.id).toBe('clinic-recovery-mirror-unlooked-v1-production');
  const looked = clinic(mirror, 'mirror.me');
  expect(looked.phase).toBe('name');
  expect(resolveSceneArt(looked).shot?.shotId).toBe('clinic.mirror.shot01-look');
  expect(resolveSceneArt(looked).art?.asset.id).toBe('clinic-recovery-mirror-look-v1-production');
  expect(resolveSceneArt(looked).issues).toEqual([]);
  const name = clinic(mirror, 'mirror.me');
  expect(resolveSceneArt(name).art?.asset.id).toBe('clinic-recovery-mirror-look-v1-production');
  const rest = clinic(name, 'name.correct');
  expect(resolveSceneArt(rest).art?.asset.id).toBe('clinic-rest-v1-production');
  const contact = clinic(rest, 'c.rest');
  expect(resolveSceneArt(contact).art?.asset.id).toBe('clinic-recovery-contact-v1-production');

  const quietReply = clinic(contact, 'contact.quiet');
  expect(resolveSceneArt(quietReply).art?.asset.id).toBe('clinic-recovery-reply-quiet-v1-production');
  const wardrobe = clinic(quietReply, 'c.recoveryReply');
  expect(resolveSceneArt(wardrobe).art?.asset.id).toBe('clinic-wardrobe-choice-v1-production');
  const makeup = clinic(wardrobe, 'outfit.executive');
  expect(resolveSceneArt(makeup).art?.asset.id).toBe('clinic-makeup-executive-v1-production');
  const review = clinic(makeup, 'makeup.corporate');
  expect(resolveSceneArt(review).art?.asset.id).toBe('clinic-presentation-review-executive-v1-production');

  const sentContact = clinic(rest, 'c.rest');
  const sentReply = clinic(sentContact, 'contact.brief');
  expect(resolveSceneArt(sentReply).art?.asset.id).toBe('clinic-recovery-reply-sent-v1-production');
});

it('binds committed presentation rehearsal variants and the final briefing table', () => {
  const rehearsal = traverse(clinicStart(), {}, 'rehearsal');
  expect(rehearsal.clinic.outfit).toBe('executive');
  expect(resolveSceneArt(rehearsal).shot?.shotId).toBe('clinic.rehearsal.shot01-executive');
  expect(resolveSceneArt(rehearsal).art?.asset.id).toBe('clinic-rehearsal-executive-v1-production');
  expect(resolveSceneArt(rehearsal).issues).toEqual([]);

  const briefing = clinic(rehearsal, 'rehearse.practice');
  expect(briefing.phase).toBe('briefing');
  expect(resolveSceneArt(briefing).shot?.shotId).toBe('clinic.briefing.shot01');
  expect(resolveSceneArt(briefing).art?.asset.id).toBe('clinic-briefing-v1-production');
  expect(resolveSceneArt(briefing).issues).toEqual([]);
});

it('binds the farewell handover only before the authored farewell response', () => {
  const farewell = traverse(clinicStart(), {}, 'farewell');
  expect(resolveSceneArt(farewell).shot?.shotId).toBe('clinic.farewell.shot01');
  expect(resolveSceneArt(farewell).art?.asset.id).toBe('clinic-farewell-v1-production');
  expect(resolveSceneArt(farewell).issues).toEqual([]);
  const departure = clinic(farewell, 'farewell.brief');
  expect(resolveSceneArt(departure).shot?.shotId).not.toBe('clinic.farewell.shot01');
});
