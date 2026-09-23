import { dialogue } from './dialogue';
import { characters } from './characters';
import { CharacterSchema, NpcIdSchema } from './character-schema';
import { identities, IdentitySchema } from './identities';
import { documents, pairs } from './evidence';
import { scenes, inspections } from './scenes';
import { nodeIds, InspectionSchema } from './schema';
import { dayChoices } from './day';
import { missionChoices } from './mission';
import { clinicChoices } from './clinic';
import { chapter3Choices } from './chapter3';
export function validateContent() {
  inspections.forEach((record) => InspectionSchema.parse(record));
  for (const collection of [
    scenes,
    dialogue,
    characters,
    identities,
    documents,
    inspections,
    dayChoices,
  ])
    if (new Set(collection.map((x) => x.id)).size !== collection.length)
      throw new Error('Duplicate content identifier');
  if (scenes.length !== nodeIds.length) throw new Error('Missing scene');
  for (const id of nodeIds)
    if (!scenes.some((s) => s.id === id)) throw new Error('Missing scene ' + id);
  if (new Set(clinicChoices.map((c) => c.node + ':' + c.id)).size !== clinicChoices.length)
    throw new Error('Duplicate clinic choice within a phase');
  for (const c of [...dialogue, ...dayChoices, ...clinicChoices, ...missionChoices, ...chapter3Choices])
    if (!scenes.some((s) => s.id === c.node) || !scenes.some((s) => s.id === c.next))
      throw new Error('Invalid dialogue route ' + c.id);
  for (const s of scenes)
    if (s.next && !scenes.some((t) => t.id === s.next))
      throw new Error('Invalid transition ' + s.id);
  for (let i = 0; i < documents.length; i++)
    for (let j = i + 1; j < documents.length; j++)
      if (!pairs[[documents[i].id, documents[j].id].sort().join('|')])
        throw new Error('Unspecified evidence pair');
  characters.forEach((character) => CharacterSchema.parse(character));
  identities.forEach((identity) => IdentitySchema.parse(identity));
  for (const id of ['player-character', ...NpcIdSchema.options])
    if (!characters.some((character) => character.id === id))
      throw Error('Missing character ' + id);
}
