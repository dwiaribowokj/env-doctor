import { describe, expect, it } from 'vitest';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { analyzeEnv } from '../src/analyze.js';

describe('env doctor', () => {
  it('detects missing example keys without printing values', () => {
    const dir = mkdtempSync(join(tmpdir(), 'vdt-env-'));
    const envPath = join(dir, '.env');
    const examplePath = join(dir, '.env.example');
    writeFileSync(envPath, 'DATABASE_URL=postgres://user:secret@localhost/db\nJWT_SECRET=short\nAPI_URL=not-a-url\n');
    writeFileSync(examplePath, 'DATABASE_URL=\nJWT_SECRET=\nREDIS_URL=\n');

    const findings = analyzeEnv(envPath, examplePath);
    const text = JSON.stringify(findings);

    expect(text).toContain('Missing key from example: REDIS_URL');
    expect(text).toContain('Possible weak secret length: JWT_SECRET');
    expect(text).toContain('Invalid URL-like value: API_URL');
    expect(text).not.toContain('postgres://user:secret@localhost/db');
    expect(text).not.toContain('short');
  });
});
