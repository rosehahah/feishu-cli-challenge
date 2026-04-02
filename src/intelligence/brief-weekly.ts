import type { DriSuggestion, OrgProjectData, RiskFinding } from "../core/types.js";

export function generateWeeklyBrief(
  data: OrgProjectData,
  findings: RiskFinding[],
  suggestions: DriSuggestion[],
): string {
  const topRisks = findings.slice(0, 3);
  const topSuggestions = suggestions.slice(0, 3);
  const activeProjects = data.projects.filter((project) => project.stage !== "Done");

  return [
    `# ${data.goal.goal_name}｜周度简报`,
    "",
    `- 目标状态：${data.goal.status}`,
    `- 目标进度：${data.goal.progress}%`,
    `- 活跃项目数：${activeProjects.length}`,
    `- 开放风险数：${data.risks.filter((risk) => risk.status !== "Resolved").length}`,
    "",
    "## 本周进展",
    ...activeProjects.map(
      (project) =>
        `- ${project.project_name}：进度 ${project.progress}%，健康度 ${project.health}，当前阶段 ${project.stage}`,
    ),
    "",
    "## 关键风险",
    ...topRisks.map(
      (risk) =>
        `- [${risk.severity}] ${risk.title}：${risk.reason}｜建议：${risk.suggestion}`,
    ),
    "",
    "## DRI 建议",
    ...topSuggestions.map(
      (item) =>
        `- ${item.topic} → 建议由 ${item.suggestedDri} 负责；协作方：${item.collaborators.join("、") || "无"}`,
    ),
    "",
    "## 下周重点",
    "- 锁定关键阻塞任务的 DRI 和解除时限",
    "- 补齐增长验证项目 owner，统一活动、埋点和指标节奏",
    "- 完成灰度方案，形成可执行的上线检查清单",
  ].join("\n");
}
