import { runSkillAction } from '../../dist/skill-runner.js';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';

const action = process.argv[2] || 'brief-weekly';
const outputPath = process.argv[3] || 'outputs/feishu-doc-write-request.md';
const dataPath = process.argv[4];

const content = await runSkillAction(action, dataPath);

const requestDoc = [
  '# Feishu Docs Write Request',
  '',
  'Below is the content that should be written into a real Feishu document.',
  '',
  '## Suggested write method',
  '',
  'If using OpenClaw Feishu Doc tooling, call `feishu_doc.create` or `feishu_doc.write` with this markdown content.',
  '',
  '## Title',
  '',
  'Feishu Org Intelligence Output',
  '',
  '## Markdown Content',
  '',
  content,
  '',
  '## Notes',
  '',
  '- For competition demo, this file proves the project can move from analysis to Feishu Doc write intent.',
  '- In production, replace this file export with a direct Feishu Docs API call or tool invocation.',
  '',
].join('\n');

await writeFile(path.resolve(outputPath), requestDoc, 'utf8');
console.log(`Feishu doc write request generated at: ${outputPath}`);
