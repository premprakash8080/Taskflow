export type TaskPriority = 'none' | 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'in_progress' | 'completed';
export type ProjectStatus = 'on_track' | 'at_risk' | 'off_track';
export type NotificationType = 'assigned' | 'mentioned' | 'completed' | 'comment' | 'due_soon';
export type TaskFilter = 'all' | 'incomplete' | 'completed' | 'today';

export interface TaskAssignee {
  id: string;
  name: string;
  imgUrl: string;
}

export interface TaskComment {
  id: string;
  author: TaskAssignee;
  content: string;
  createdAt: Date;
}

export interface TaskSubtask {
  id: string;
  name: string;
  completed: boolean;
}

export interface Task {
  id: string;
  name: string;
  description?: string;
  completed: boolean;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date;
  assignee?: TaskAssignee;
  projectId?: string;
  projectName?: string;
  sectionId: string;
  tags?: string[];
  subtasks?: TaskSubtask[];
  comments?: TaskComment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskSection {
  id: string;
  label: string;
  tasks: Task[];
  expanded: boolean;
}

export interface Project {
  id: string;
  name: string;
  color: string;
  status: ProjectStatus;
  description?: string;
  members: TaskAssignee[];
  dueDate?: Date;
  taskCount: number;
  completedTaskCount: number;
  createdAt: Date;
}

export interface BoardColumn {
  id: string;
  name: string;
  color: string;
  tasks: Task[];
}

export interface Notification {
  id: string;
  type: NotificationType;
  read: boolean;
  title: string;
  message: string;
  taskName?: string;
  taskId?: string;
  projectName?: string;
  projectId?: string;
  sender: TaskAssignee;
  createdAt: Date;
}

export interface Portfolio {
  id: string;
  name: string;
  color: string;
  description?: string;
  owner: TaskAssignee;
  members: TaskAssignee[];
  projectIds: string[];
  createdAt: Date;
}
