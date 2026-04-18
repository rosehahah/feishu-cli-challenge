import { runSkillAction } from '../../dist/skill-runner.js';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';

const action = process.argv[2] || 'brief-weekly';
const outputPath = process.argv[3] || 'outputs/feishu-doc-demo.md';
const dataPath = process.argv[4];

const titleMap = {
  'risk-scan': '# 飞书文档输出示例｜风险扫描',
  'dri-suggest': '# 飞书文档输出示例｜DRI 推荐',
  'brief-weekly': '# 飞书文档输出示例｜组织周报',
  'org-health': '# 飞书文档输出示例｜组织健康度',
};

const body = await runSkillAction(action, dataPath);
const content = [titleMap[action] || '# 飞书文档输出示例', '', '> 该文件用于模拟后续写入 Feishu Docs 的最终内容。', '', body, ''].join('\n');

await writeFile(path.resolve(outputPath), content, 'utf8');
console.log(`Doc export generated at: ${outputPath}`);
