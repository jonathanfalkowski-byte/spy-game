import { createServer } from 'vite';
import { mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { checkpoint, atOffer, day } = await server.ssrLoadModule('/tests/day-helpers.ts');
  const { clinicStart, traverse } = await server.ssrLoadModule('/tests/clinic-helpers.ts');
  const { missionStart, runMission } = await server.ssrLoadModule('/tests/mission-helpers.ts');
  const { encodeSave, decodeSave } = await server.ssrLoadModule('/src/persistence/saves.ts');
  const examples = [
    [
      '01-cautious-withdrawal',
      day(day(day(checkpoint(), 'day.begin'), 'file.open'), 'file.withdraw'),
    ],
    ['02-refusal-and-departure', day(day(atOffer(), 'offer.refuse'), 'refusal.walk')],
    ['03-clinic-stop-before-treatment', traverse(clinicStart(), { authorization: 'stop.request' })],
    [
      '04-clinic-stop-after-voice',
      traverse(clinicStart(), { voice: 'voice.pause', voicePause: 'stop.request' }),
    ],
    [
      '05-clinic-stop-after-face',
      traverse(clinicStart(), { face: 'face.pause', facePause: 'stop.request' }),
    ],
  ];
  for (const method of ['audio', 'photo', 'token']) {
    examples.push([
      '06-timely-' + method,
      runMission(missionStart('executive'), {
        hub: ['lead.service', 'assess.begin'],
        method: 'method.' + method,
      }),
    ]);
    examples.push([
      '07-late-' + method,
      runMission(missionStart('socialite'), {
        assessment: 'source.insufficient',
        method: 'method.' + method,
      }),
    ]);
  }
  examples.push(['08-correct-unsupported-guess', runMission(missionStart('shadow'))]);
  examples.push([
    '09-wrong-accusation',
    runMission(missionStart(), { assessment: 'source.priya' }),
  ]);
  await mkdir('review-saves', { recursive: true });
  const index = [];
  for (const [name, state] of examples) {
    const raw = encodeSave(state),
      verified = decodeSave(raw);
    if (JSON.stringify(verified) !== JSON.stringify(state))
      throw Error('Round trip failed: ' + name);
    const file = name + '.json';
    await writeFile('review-saves/' + file, raw);
    index.push({
      file,
      node: state.scene + '.' + state.phase,
      actions: state.revision,
      sha256: createHash('sha256').update(raw).digest('hex'),
    });
  }
  await writeFile(
    'review-saves/index.json',
    JSON.stringify({ schemaVersion: 5, contentVersion: 9, saves: index }, null, 2),
  );
  console.log('Prepared and replay-validated ' + index.length + ' alternate-ending backups.');
} finally {
  await server.close();
}
