import pc from 'picocolors';

export type FindingLevel = 'ok' | 'warn' | 'error' | 'info';
export interface Finding { level: FindingLevel; message: string; detail?: string; }

export function icon(level: FindingLevel): string {
  switch (level) {
    case 'ok': return pc.green('✓');
    case 'warn': return pc.yellow('!');
    case 'error': return pc.red('✗');
    case 'info': return pc.cyan('i');
  }
}

export function printFindings(title: string, findings: Finding[]): void {
  console.log(pc.bold(title));
  for (const finding of findings) {
    console.log(`${icon(finding.level)} ${finding.message}`);
    if (finding.detail) console.log(pc.dim(`  ${finding.detail}`));
  }
}

export function exitCodeFromFindings(findings: Finding[]): number {
  return findings.some((f) => f.level === 'error') ? 1 : 0;
}


export function findingsToJson(title: string, findings: Finding[], extra: Record<string, unknown> = {}): string {
  return JSON.stringify({ title, findings, ...extra }, null, 2);
}

export function printJson(title: string, findings: Finding[], extra: Record<string, unknown> = {}): void {
  console.log(findingsToJson(title, findings, extra));
}
