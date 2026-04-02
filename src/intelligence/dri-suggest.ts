import type { DriSuggestion, OrgProjectData, RiskFinding, Project, Task } from "../core/types.js";

function getProject(data: OrgProjectData, projectId: string): Project | undefined {
  return data.projects.find((project) => project.project_id === projectId);
}

function getTask(data: OrgProjectData, taskId?: string): Task | undefined {
  if (!taskId) return undefined;
  return data.tasks.find((task) => task.task_id === taskId);
}

export function suggestDris(data: OrgProjectData, findings: RiskFinding[]): DriSuggestion[] {
  return findings.slice(0, 5).map((finding) => {
    const project = getProject(data, finding.projectId);
    const task = getTask(data, finding.taskId);

    const suggestedDri =
      project?.dri?.trim() ||
      task?.dri?.trim() ||
      task?.assignee?.trim() ||
      data.goal.owner;

    const collaborators = new Set<string>();
    if (task?.assignee) collaborators.add(task.assignee);
    if (project?.dri) collaborators.add(project.dri);
    if (data.goal.owner) collaborators.add(data.goal.owner);

    const reasonParts = [
      project?.dri ? `项目当前 DRI 是 ${project.dri}` : "项目尚无稳定 DRI",
      task?.assignee ? `任务执行人是 ${task.assignee}` : "当前没有明确任务执行人",
      `该问题影响 ${project?.project_name ?? finding.projectId}`,
    ];

    return {
      topic: finding.title,
      suggestedDri,
      reason: reasonParts.join("；"),
      collaborators: [...collaborators].filter(Boolean),
    };
  });
}
