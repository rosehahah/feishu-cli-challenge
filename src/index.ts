#!/usr/bin/env node
import { loadDemoData } from "./core/load-data.js";
import type { RiskFinding } from "./core/types.js";
import { generateWeeklyBrief } from "./intelligence/brief-weekly.js";
import { suggestDris } from "./intelligence/dri-suggest.js";
import { getOrgHealth } from "./intelligence/org-health.js";
import { runRiskScan } from "./intelligence/risk-scan.js";

function printHelp() {
  console.log(`Feishu Org Intelligence CLI\n
Usage:\n  npm run dev -- risk scan\n  npm run dev -- dri suggest\n  npm run dev -- brief weekly\n  npm run dev -- org health\n`);
}

function renderSeveritySummary(findings: RiskFinding[]): string[] {
  const critical = findings.filter((item) => item.severity === "Critical").length;
  const high = findings.filter((item) => item.severity === "High").length;
  const medium = findings.filter((item) => item.severity === "Medium").length;
  return [
    `- Critical: ${critical}`,
    `- High: ${high}`,
    `- Medium: ${medium}`,
  ];
}

function renderRiskScan(findings: RiskFinding[]): string {
  const groups: RiskFinding["severity"][] = ["Critical", "High", "Medium"];
  const lines = ["# 风险驾驶舱", "", "## 风险概览", ...renderSeveritySummary(findings), ""];

  for (const severity of groups) {
    const bucket = findings.filter((item) => item.severity === severity);
    if (bucket.length === 0) continue;

    lines.push(`## ${severity} 风险`);
    bucket.forEach((finding, index) => {
      lines.push(
        `${index + 1}. ${finding.title}`,
        `   - 项目：${finding.projectId}`,
        `   - 原因：${finding.reason}`,
        `   - 建议动作：${finding.suggestion}`,
        "",
      );
    });
  }

  return lines.join("\n");
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
    console.log(renderRiskScan(findings));
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
