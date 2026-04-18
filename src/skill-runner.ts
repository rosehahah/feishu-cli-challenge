import { loadDemoData } from "./core/load-data.js";
import { generateWeeklyBrief } from "./intelligence/brief-weekly.js";
import { suggestDris } from "./intelligence/dri-suggest.js";
import { getOrgHealth } from "./intelligence/org-health.js";
import { runRiskScan } from "./intelligence/risk-scan.js";
import type { RiskFinding } from "./core/types.js";

export type SkillAction = "risk-scan" | "dri-suggest" | "brief-weekly" | "org-health";

function renderSeveritySummary(findings: RiskFinding[]): string[] {
  const critical = findings.filter((item) => item.severity === "Critical").length;
  const high = findings.filter((item) => item.severity === "High").length;
  const medium = findings.filter((item) => item.severity === "Medium").length;
  return [`- Critical: ${critical}`, `- High: ${high}`, `- Medium: ${medium}`];
}

export function renderRiskScan(findings: RiskFinding[]): string {
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

export async function runSkillAction(action: SkillAction, customPath?: string): Promise<string> {
  const data = await loadDemoData(customPath);
  const findings = runRiskScan(data);

  switch (action) {
    case "risk-scan":
      return renderRiskScan(findings);
    case "dri-suggest": {
      const suggestions = suggestDris(data, findings);
      return [
        "# DRI 推荐",
        "",
        ...suggestions.map(
          (item, index) =>
            `${index + 1}. ${item.topic}\n   - suggested dri: ${item.suggestedDri}\n   - reason: ${item.reason}\n   - collaborators: ${item.collaborators.join(", ") || "none"}\n`,
        ),
      ].join("\n");
    }
    case "brief-weekly": {
      const suggestions = suggestDris(data, findings);
      return generateWeeklyBrief(data, findings, suggestions);
    }
    case "org-health": {
      const health = getOrgHealth(data, findings);
      return [
        "# 组织健康度",
        "",
        `- Goal: ${health.goalName}`,
        `- Status: ${health.goalStatus}`,
        `- Progress: ${health.goalProgress}%`,
        `- Total tasks: ${health.totalTasks}`,
        `- Blocked tasks: ${health.blockedTasks}`,
        `- DRI coverage: ${health.driCoverageRate}%`,
        `- Active risks: ${health.activeRisks}`,
        `- Critical findings: ${health.criticalFindings}`,
        `- Decision pending count: ${health.decisionPendingCount}`,
      ].join("\n");
    }
    default:
      throw new Error(`Unsupported skill action: ${action}`);
  }
}
