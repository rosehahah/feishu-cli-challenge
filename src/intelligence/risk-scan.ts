import type { OrgProjectData, RiskFinding, Task } from "../core/types.js";

function daysSince(dateString: string): number {
  const now = new Date("2026-04-02T12:00:00+08:00").getTime();
  const then = new Date(`${dateString}T00:00:00+08:00`).getTime();
  return Math.max(0, Math.floor((now - then) / (1000 * 60 * 60 * 24)));
}

function overdueFinding(task: Task): RiskFinding | null {
  const overdueDays = daysSince(task.due_date);
  const doneStates = new Set(["Done"]);
  if (overdueDays > 0 && !doneStates.has(task.status)) {
    return {
      severity: task.priority === "P0" ? "High" : "Medium",
      title: `任务超期：${task.task_name}`,
      projectId: task.project,
      taskId: task.task_id,
      reason: `任务已超期 ${overdueDays} 天，当前状态为 ${task.status}`,
      suggestion: "重新确认 owner、deadline 和依赖，必要时升级为风险项。",
    };
  }
  return null;
}

export function runRiskScan(data: OrgProjectData): RiskFinding[] {
  const findings: RiskFinding[] = [];

  for (const task of data.tasks) {
    const overdue = overdueFinding(task);
    if (overdue) findings.push(overdue);

    if (task.blocked_flag) {
      findings.push({
        severity: task.priority === "P0" ? "Critical" : "High",
        title: `任务阻塞：${task.task_name}`,
        projectId: task.project,
        taskId: task.task_id,
        reason: task.blocked_reason || "任务被标记为阻塞",
        suggestion: "明确阻塞解除条件，指定 DRI，并同步依赖方处理时限。",
      });
    }

    if (!task.dri || !task.dri.trim()) {
      findings.push({
        severity: task.priority === "P0" ? "High" : "Medium",
        title: `任务缺少 DRI：${task.task_name}`,
        projectId: task.project,
        taskId: task.task_id,
        reason: "关键任务没有明确直接负责人",
        suggestion: "为该任务指定一个可对结果负责的 DRI。",
      });
    }

    const staleDays = daysSince(task.last_update);
    if (staleDays >= 5 && task.status !== "Done") {
      findings.push({
        severity: "Medium",
        title: `任务长时间未更新：${task.task_name}`,
        projectId: task.project,
        taskId: task.task_id,
        reason: `最近 ${staleDays} 天没有更新`,
        suggestion: "要求负责人补充最新进展，必要时检查是否已实际阻塞。",
      });
    }
  }

  for (const project of data.projects) {
    if (["Critical", "Warning"].includes(project.health)) {
      findings.push({
        severity: project.health === "Critical" ? "Critical" : "High",
        title: `项目健康度异常：${project.project_name}`,
        projectId: project.project_id,
        reason: `项目健康度为 ${project.health}，当前进度 ${project.progress}%`,
        suggestion: "对该项目发起一次风险盘点，聚焦关键路径和资源缺口。",
      });
    }
  }

  for (const risk of data.risks.filter((item) => item.status !== "Resolved")) {
    findings.push({
      severity: risk.severity === "Critical" ? "Critical" : risk.severity === "High" ? "High" : "Medium",
      title: risk.risk_title,
      projectId: risk.related_project,
      taskId: risk.related_task,
      reason: `已有风险项，已存在 ${risk.age_days} 天`,
      suggestion: risk.suggested_action,
    });
  }

  const deduped = new Map<string, RiskFinding>();
  for (const finding of findings) {
    const key = `${finding.title}:${finding.projectId}:${finding.taskId ?? ""}`;
    if (!deduped.has(key)) deduped.set(key, finding);
  }

  const severityRank = { Critical: 3, High: 2, Medium: 1 };
  return [...deduped.values()].sort((a, b) => severityRank[b.severity] - severityRank[a.severity]);
}
