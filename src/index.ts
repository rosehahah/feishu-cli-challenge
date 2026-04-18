#!/usr/bin/env node
import { runSkillAction } from "./skill-runner.js";

function printHelp() {
  console.log(`Feishu Org Intelligence CLI\n
Usage:\n  npm run dev -- risk scan\n  npm run dev -- dri suggest\n  npm run dev -- brief weekly\n  npm run dev -- org health\n`);
}

async function main() {
  const [, , domain, action] = process.argv;

  if (!domain) {
    printHelp();
    return;
  }

  if (domain === "risk" && action === "scan") {
    console.log(await runSkillAction("risk-scan"));
    return;
  }

  if (domain === "dri" && action === "suggest") {
    console.log(await runSkillAction("dri-suggest"));
    return;
  }

  if (domain === "brief" && action === "weekly") {
    console.log(await runSkillAction("brief-weekly"));
    return;
  }

  if (domain === "org" && action === "health") {
    console.log(await runSkillAction("org-health"));
    return;
  }

  printHelp();
}

main().catch((error) => {
  console.error("CLI 执行失败:", error);
  process.exitCode = 1;
});
