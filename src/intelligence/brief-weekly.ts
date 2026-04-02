import type { DriSuggestion, OrgProjectData, RiskFinding } from "../core/types.js";

function severityLabel(level: RiskFinding["severity"]): string {
  return level === "Critical" ? "P0" : level === "High" ? "P1" : "P2";
}

export function generateWeeklyBrief(
  data: OrgProjectData,
  findings: RiskFinding[],
  suggestions: DriSuggestion[],
): string {
  const topRisks = findings.slice(0, 3);
  const topSuggestions = suggestions.slice(0, 3);
  const activeProjects = data.projects.filter((project) => project.stage !== "Done");
  const criticalProjects = activeProjects.filter((project) => ["Warning", "Critical"].includes(project.health));
  const resolvedMomentum = activeProjects.filter((project) => project.health === "Healthy");

  return [
    `# ${data.goal.goal_name}｜组织周度简报`,
    "",
    "## 一、管理摘要",
    `- 目标周期：${data.goal.period}`,
    `- 目标状态：${data.goal.status}`,
    `- 当前进度：${data.goal.progress}%`,
    `- 活跃项目数：${activeProjects.length}`,
    `- 开放风险数：${data.risks.filter((risk) => risk.status !== "Resolved").length}`,
    `- 需要立即决策事项：${findings.filter((item) => item.severity === "Critical").length}`,
    "",
    "## 二、本周推进情况",
    ...activeProjects.map(
      (project) =>
        `- ${project.project_name}｜进度 ${project.progress}%｜健康度 ${project.health}｜阶段 ${project.stage}｜负责人 ${project.dri || "待定"}`,
    ),
    "",
    "## 三、关键风险与建议动作",
    ...topRisks.map(
      (risk, index) =>
        `${index + 1}. [${severityLabel(risk.severity)} / ${risk.severity}] ${risk.title}\n   - 原因：${risk.reason}\n   - 建议动作：${risk.suggestion}`,
    ),
    "",
    "## 四、建议 DRI 与协同对象",
    ...topSuggestions.map(
      (item, index) =>
        `${index + 1}. ${item.topic}\n   - 建议 DRI：${item.suggestedDri}\n   - 推荐依据：${item.reason}\n   - 协同对象：${item.collaborators.join("、") || "无"}`,
    ),
    "",
    "## 五、需要管理层关注",
    criticalProjects.length > 0
      ? `- ${criticalProjects.map((project) => project.project_name).join("、")} 当前健康度偏低，需要管理层关注关键路径和资源调配。`
      : "- 当前无健康度异常项目。",
    topSuggestions[0]
      ? `- 优先确认“${topSuggestions[0].topic}”的直接负责人，避免继续依赖人肉对齐。`
      : "- 当前无新增 DRI 决策事项。",
    "",
    "## 六、下周重点",
    "- 锁定关键阻塞任务的 DRI 和解除时限。",
    "- 补齐增长验证项目 owner，统一活动、埋点和指标节奏。",
    "- 完成灰度方案，形成可执行的上线检查清单。",
    resolvedMomentum.length > 0
      ? `- 保持 ${resolvedMomentum.map((project) => project.project_name).join("、")} 的推进节奏，避免被新的阻塞拖慢。`
      : "- 继续提升项目健康度，避免新增高优先级阻塞。",
  ].join("\n");
}
