import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';

const root = process.cwd();
const reportPath = resolve(root, 'qa', 'reports', 'm2-1-pilot-latest.json');

function runPilot(extra: Record<string, string | undefined>) {
  const env = { ...process.env, EVE_NARRATIVE_PROVIDER: 'openai', EVE_NARRATIVE_MODEL: 'gpt-5.6-sol', EVE_NARRATIVE_PILOT_APPROVED: '1', M2_PILOT_OFFLINE_TEST: '1', ...extra };
  return spawnSync(process.execPath, ['scripts/qa-narrative.mjs', 'pilot', 'm2.1'], { cwd: root, env, encoding: 'utf8' });
}

describe('M2.1 operator pilot CLI wiring', () => {
  it('keeps the live npm script on the real CLI and the test script on Vitest', () => {
    const packageJson = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8')) as { scripts: Record<string, string> };
    const liveScript = packageJson.scripts['qa:narrative:pilot'];
    const testScript = packageJson.scripts['qa:narrative:pilot:test'];
    expect(liveScript).toBe('node scripts/qa-narrative.mjs pilot m2.1');
    expect(liveScript).not.toMatch(/vitest|test|tests\/qa/);
    expect(testScript).toContain('vitest');
    expect(testScript).toContain('m2-pilot-run.test.ts');
  });

  it('runs exactly one offline smoke call and writes fresh accounting', () => {
    const result = runPilot({ M2_SMOKE_ONLY: '1', M2_PILOT_MOCK: 'success', OPENAI_API_KEY: 'test-secret-should-not-print' });
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('Mode: SMOKE');
    expect(result.stdout).toContain('Planned: 1');
    expect(result.stdout).not.toContain('test-secret-should-not-print');
    const report = JSON.parse(readFileSync(reportPath, 'utf8')) as Record<string, any>;
    expect(report.generatedAt).toEqual(expect.any(String));
    expect(report.mode).toBe('SMOKE');
    expect(report.plannedCalls).toBe(1);
    expect(report.attemptedExternalCalls).toBe(1);
    expect(report.completedExternalCalls).toBe(1);
    expect(report.failedExternalCalls).toBe(0);
  });

  it('keeps full mode at the fixed ten-call plan without network access', () => {
    const result = runPilot({ M2_PILOT_MOCK: 'success' });
    expect(result.status).toBe(0);
    const report = JSON.parse(readFileSync(reportPath, 'utf8')) as Record<string, any>;
    expect(report.mode).toBe('FULL');
    expect(report.plannedCalls).toBe(10);
    expect(report.attemptedExternalCalls).toBe(10);
    expect(report.completedExternalCalls).toBe(10);
    expect(report.failedExternalCalls).toBe(0);
  });

  it('returns nonzero and records failure for a failed smoke provider', () => {
    const result = runPilot({ M2_SMOKE_ONLY: '1', M2_PILOT_MOCK: 'fail' });
    expect(result.status).not.toBe(0);
    expect(`${result.stdout}\n${result.stderr}`).toContain('Failed: 1');
    const report = JSON.parse(readFileSync(reportPath, 'utf8')) as Record<string, any>;
    expect(report.mode).toBe('SMOKE');
    expect(report.plannedCalls).toBe(1);
    expect(report.failedExternalCalls).toBe(1);
    expect(JSON.stringify(report)).not.toContain('OPENAI_API_KEY');
  });
});
