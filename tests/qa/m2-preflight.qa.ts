import { expect, it } from 'vitest';
import { inspectNarrativeProviderPreflight } from '../../src/qa/m2-provider';

it('reports provider/model/key/pilot status without exposing secrets', () => {
  const status = inspectNarrativeProviderPreflight(process.env);
  expect(status.provider).toMatch(/SUPPORTED|MISSING|UNSUPPORTED/);
  expect(status.model).toMatch(/SUPPORTED|MISSING|UNSUPPORTED/);
  expect(status.apiKey).toMatch(/AVAILABLE|MISSING/);
  expect(status.pilot).toMatch(/AUTHORIZED|BLOCKED/);
  console.log(JSON.stringify(status));
});
