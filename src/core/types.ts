export interface Goal {
  goal_id: string;
  goal_name: string;
  period: string;
  priority: string;
  owner: string;
  status: string;
  progress: number;
  summary: string;
}

export interface Project {
  project_id: string;
  project_name: string;
  related_goal: string;
  dri: string;
  team: string;
  stage: string;
  health: string;
  due_date: string;
  progress: number;
  last_update: string;
  project_brief: string;
}

export interface Task {
  task_id: string;
  task_name: string;
  project: string;
  assignee: string;
  dri: string;
  priority: string;
  status: string;
  dependency: string | null;
  due_date: string;
  last_update: string;
  blocked_flag: boolean;
  blocked_reason: string;
  update_summary: string;
}

export interface Risk {
  risk_id: string;
  risk_title: string;
  related_goal: string;
  related_project: string;
  related_task: string;
  severity: string;
  status: string;
  owner: string;
  suggested_dri: string;
  age_days: number;
  suggested_action: string;
  source: string;
  notes: string;
}

export interface DriTopic {
  dri_topic_id: string;
  topic_problem: string;
  dri: string;
  scope: string;
  related_goal: string;
  related_project: string;
  related_risk: string;
  start_date: string;
  deadline: string;
  current_status: string;
  next_action: string;
}

export interface Signal {
  signal_id: string;
  source_type: string;
  source_link: string;
  related_goal: string;
  related_project: string;
  related_task: string;
  signal_type: string;
  summary: string;
  confidence: number;
  timestamp: string;
}

export interface OrgProjectData {
  scenario: string;
  goal: Goal;
  projects: Project[];
  tasks: Task[];
  risks: Risk[];
  dris: DriTopic[];
  signals: Signal[];
}

export interface RiskFinding {
  severity: "Critical" | "High" | "Medium";
  title: string;
  projectId: string;
  taskId?: string;
  reason: string;
  suggestion: string;
}

export interface DriSuggestion {
  topic: string;
  suggestedDri: string;
  reason: string;
  collaborators: string[];
}
