import data from './evelynn-specs.json';
import { VisualAssetSpecSchema } from './schema';

export const evelynnSpecs = VisualAssetSpecSchema.array().parse(data);
