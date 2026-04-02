import type { OrgProjectData, RiskFinding } from "../core/types.js";

export function getOrgHealth(data: OrgProjectData, findings: RiskFinding[]) {
  const totalTasks = data.tasks.length;
  const blockedTasks = data.tasks.filter((task) => task.blocked_flag).length;
  const tasksWithDri = data.tasks.filter((task) => task.dri && task.dri.trim()).length;
  const activeRisks = data.risks.filter((risk) => risk.status !== "Resolved").length;
  const criticalFindings = findings.filter((finding) => finding.severity === "Critical").length;

  return {
    goalName: data.goal.goal_name,
    goalStatus: data.goal.status,
    goalProgress: data.goal.progress,
    totalTasks,
    blockedTasks,
    driCoverageRate: totalTasks === 0 ? 0 : Math.round((tasksWithDri / totalTasks) * 100),
    activeRisks,
    criticalFindings,
    decisionPendingCount: data.dris.filter((item) => !item.dri || item.current_status === "Pending").length,
  };
}
