import { Command } from 'commander';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parse } from 'dotenv';
import { exitCodeFromFindings, Finding, printFindings, printJson } from './output.js';

interface EnvOptions {
  env: string;
  example?: string;
  strict: boolean;
  json: boolean;
}

const SECRET_HINTS = [/secret/i, /token/i, /password/i, /passwd/i, /api[_-]?key/i, /private/i];

function loadEnv(path: string): Record<string, string> {
  if (!existsSync(path)) throw new Error(`File not found: ${path}`);
  return parse(readFileSync(path));
}

function duplicateKeys(path: string): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  const lines = readFileSync(path, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) continue;
    const key = trimmed.split('=')[0]?.trim();
    if (!key) continue;
    if (seen.has(key)) duplicates.add(key);
    seen.add(key);
  }
  return [...duplicates].sort();
}

function looksWeakSecret(key: string, value: string): boolean {
  return SECRET_HINTS.some((hint) => hint.test(key)) && value.length > 0 && value.length < 12;
}

function looksUrlKey(key: string): boolean {
  return /(^|_)(url|uri|endpoint)$/i.test(key);
}

export function analyzeEnv(envPath: string, examplePath?: string): Finding[] {
  const findings: Finding[] = [];
  const env = loadEnv(envPath);
  const keys = Object.keys(env).sort();

  findings.push({ level: 'info', message: `Loaded ${keys.length} variables from ${envPath}` });

  for (const key of duplicateKeys(envPath)) {
    findings.push({ level: 'warn', message: `Duplicate key: ${key}` });
  }

  for (const [key, value] of Object.entries(env)) {
    if (value.trim() === '') findings.push({ level: 'warn', message: `Empty value: ${key}` });
    if (looksWeakSecret(key, value)) findings.push({ level: 'warn', message: `Possible weak secret length: ${key}`, detail: 'Value is never printed for safety.' });
    if (looksUrlKey(key)) {
      try { new URL(value); } catch { findings.push({ level: 'warn', message: `Invalid URL-like value: ${key}` }); }
    }
  }

  if (examplePath) {
    const example = loadEnv(examplePath);
    const missing = Object.keys(example).filter((key) => !(key in env)).sort();
    const extra = Object.keys(env).filter((key) => !(key in example)).sort();
    for (const key of missing) findings.push({ level: 'error', message: `Missing key from example: ${key}` });
    for (const key of extra) findings.push({ level: 'info', message: `Extra key not in example: ${key}` });
  }

  if (!findings.some((f) => f.level === 'warn' || f.level === 'error')) {
    findings.push({ level: 'ok', message: 'No env issues found' });
  }

  return findings;
}

export function envDoctorCommand(): Command {
  return new Command('env-doctor')
    .description('Check .env files for missing keys, duplicate keys, invalid URLs, and weak-looking secrets without printing secret values.')
    .option('-e, --env <path>', 'env file path', '.env')
    .option('-x, --example <path>', 'example env file path, e.g. .env.example')
    .option('--strict', 'exit non-zero on warnings too', false)
    .option('--json', 'print machine-readable JSON output', false)
    .action((options: EnvOptions) => {
      const envPath = resolve(options.env);
      const examplePath = options.example ? resolve(options.example) : undefined;
      const findings = analyzeEnv(envPath, examplePath);
      if (options.json) {
        printJson('Env Doctor', findings, { envPath, examplePath });
      } else {
        printFindings('Env Doctor', findings);
      }
      const hasWarn = findings.some((f) => f.level === 'warn');
      process.exitCode = options.strict && hasWarn ? 1 : exitCodeFromFindings(findings);
    });
}
