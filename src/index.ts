#!/usr/bin/env node
import { loadDemoData } from "./core/load-data.js";
import { generateWeeklyBrief } from "./intelligence/brief-weekly.js";
import { suggestDris } from "./intelligence/dri-suggest.js";
import { getOrgHealth } from "./intelligence/org-health.js";
import { runRiskScan } from "./intelligence/risk-scan.js";

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

  const data = await loadDemoData();
  const findings = runRiskScan(data);

  if (domain === "risk" && action === "scan") {
    console.log(`# 风险扫描结果\n`);
    findings.forEach((finding, index) => {
      console.log(
        `${index + 1}. [${finding.severity}] ${finding.title}\n   - project: ${finding.projectId}\n   - reason: ${finding.reason}\n   - suggestion: ${finding.suggestion}\n`,
      );
    });
    return;
  }

  if (domain === "dri" && action === "suggest") {
    const suggestions = suggestDris(data, findings);
    console.log(`# DRI 推荐\n`);
    suggestions.forEach((item, index) => {
      console.log(
        `${index + 1}. ${item.topic}\n   - suggested dri: ${item.suggestedDri}\n   - reason: ${item.reason}\n   - collaborators: ${item.collaborators.join(", ") || "none"}\n`,
      );
    });
    return;
  }

  if (domain === "brief" && action === "weekly") {
    const suggestions = suggestDris(data, findings);
    console.log(generateWeeklyBrief(data, findings, suggestions));
    return;
  }

  if (domain === "org" && action === "health") {
    const health = getOrgHealth(data, findings);
    console.log(`# 组织健康度\n`);
    console.log(`- Goal: ${health.goalName}`);
    console.log(`- Status: ${health.goalStatus}`);
    console.log(`- Progress: ${health.goalProgress}%`);
    console.log(`- Total tasks: ${health.totalTasks}`);
    console.log(`- Blocked tasks: ${health.blockedTasks}`);
    console.log(`- DRI coverage: ${health.driCoverageRate}%`);
    console.log(`- Active risks: ${health.activeRisks}`);
    console.log(`- Critical findings: ${health.criticalFindings}`);
    console.log(`- Decision pending count: ${health.decisionPendingCount}`);
    return;
  }

  printHelp();
}

main().catch((error) => {
  console.error("CLI 执行失败:", error);
  process.exitCode = 1;
});
