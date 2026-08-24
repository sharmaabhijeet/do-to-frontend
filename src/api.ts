import axios from 'axios';
import type { Task, Summary } from './types';

const client = axios.create({ baseURL: '/api' });

export const api = {
  listTasks: (date: string) => client.get<Task[]>('/tasks', { params: { date } }).then((r) => r.data),
  getSummary: (date: string) => client.get<Summary>('/tasks/summary', { params: { date } }).then((r) => r.data),
  createTask: (title: string, description: string, date: string) =>
    client.post<Task>('/tasks', { title, description, date }).then((r) => r.data),
  markDone: (id: string) => client.patch<Task>(`/tasks/${id}/done`).then((r) => r.data),
  markMissed: (id: string, reason: string) =>
    client.patch<Task>(`/tasks/${id}/miss`, { reason }).then((r) => r.data),
  resetTask: (id: string) => client.patch<Task>(`/tasks/${id}/reset`).then((r) => r.data),
  deleteTask: (id: string) => client.delete(`/tasks/${id}`),
};
