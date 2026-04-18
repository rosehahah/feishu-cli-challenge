import { runSkillAction } from '../../dist/skill-runner.js';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';

const action = process.argv[2] || 'brief-weekly';
const outputPath = process.argv[3] || 'outputs/feishu-doc-payload.json';
const dataPath = process.argv[4];

const body = await runSkillAction(action, dataPath);
const payload = {
  title: 'Feishu Org Intelligence Output',
  action,
  generatedAt: new Date().toISOString(),
  content: body,
  nextStep: 'Use a Feishu Docs API client or OpenClaw Feishu Doc tool to write this content into a real document.',
};

await writeFile(path.resolve(outputPath), JSON.stringify(payload, null, 2), 'utf8');
console.log(`Feishu doc payload generated at: ${outputPath}`);
