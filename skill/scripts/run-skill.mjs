import { runSkillAction } from '../../dist/skill-runner.js';

const action = process.argv[2];
const dataPath = process.argv[3];

if (!action) {
  console.error('Usage: node skill/scripts/run-skill.mjs <risk-scan|dri-suggest|brief-weekly|org-health> [dataPath]');
  process.exit(1);
}

runSkillAction(action, dataPath)
  .then((output) => {
    console.log(output);
  })
  .catch((error) => {
    console.error('Skill run failed:', error);
    process.exit(1);
  });
