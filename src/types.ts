export type TaskStatus = 'pending' | 'done' | 'missed';

export interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  status: TaskStatus;
  reason: string | null;
  createdAt: string;
}

export interface Summary {
  date: string;
  total: number;
  done: number;
  missed: number;
  pending: number;
  percent: number;
}
