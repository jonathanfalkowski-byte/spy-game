import { dialogue } from './dialogue';
import { characters } from './characters';
import { documents, pairs } from './evidence';
import { scenes, inspections } from './scenes';
import { nodeIds, InspectionSchema } from './schema';
import { dayChoices } from './day';
export function validateContent() {
  inspections.forEach((record) => InspectionSchema.parse(record));
  for (const collection of [scenes, dialogue, characters, documents, inspections, dayChoices])
    if (new Set(collection.map((x) => x.id)).size !== collection.length)
      throw new Error('Duplicate content identifier');
  if (scenes.length !== nodeIds.length) throw new Error('Missing scene');
  for (const id of nodeIds)
    if (!scenes.some((s) => s.id === id)) throw new Error('Missing scene ' + id);
  for (const c of [...dialogue, ...dayChoices])
    if (!scenes.some((s) => s.id === c.node) || !scenes.some((s) => s.id === c.next))
      throw new Error('Invalid dialogue route ' + c.id);
  for (const s of scenes)
    if (s.next && !scenes.some((t) => t.id === s.next))
      throw new Error('Invalid transition ' + s.id);
  for (let i = 0; i < documents.length; i++)
    for (let j = i + 1; j < documents.length; j++)
      if (!pairs[[documents[i].id, documents[j].id].sort().join('|')])
        throw new Error('Unspecified evidence pair');
  for (const c of characters)
    for (const value of Object.values(c))
      if (!value.trim()) throw new Error('Incomplete character introduction');
}
