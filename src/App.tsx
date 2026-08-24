import { useEffect, useState, useCallback } from 'react';
import { api } from './api';
import type { Task, Summary } from './types';
import ProgressBar from './components/ProgressBar';
import AddTaskForm from './components/AddTaskForm';
import TaskItem from './components/TaskItem';
import ReasonModal from './components/ReasonModal';

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function App() {
  const [date] = useState(todayStr());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [taskPendingReason, setTaskPendingReason] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const [taskList, summaryData] = await Promise.all([api.listTasks(date), api.getSummary(date)]);
    setTasks(taskList);
    setSummary(summaryData);
  }, [date]);

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, [refresh]);

  const handleAdd = async (title: string, description: string) => {
    await api.createTask(title, description, date);
    await refresh();
  };

  const handleDone = async (id: string) => {
    await api.markDone(id);
    await refresh();
  };

  const handleMissConfirm = async (reason: string) => {
    if (!taskPendingReason) return;
    await api.markMissed(taskPendingReason.id, reason);
    setTaskPendingReason(null);
    await refresh();
  };

  const handleReset = async (id: string) => {
    await api.resetTask(id);
    await refresh();
  };

  const handleDelete = async (id: string) => {
    await api.deleteTask(id);
    await refresh();
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-2xl px-4 py-10">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-900">Daily Task Dashboard</h1>
          <p className="text-sm text-slate-500">
            {new Date(date).toLocaleDateString(undefined, {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </header>

        <div className="space-y-6">
          {summary && <ProgressBar summary={summary} />}

          <AddTaskForm onAdd={handleAdd} />

          {loading && <p className="text-center text-sm text-slate-400">Loading tasks...</p>}

          {!loading && tasks.length === 0 && (
            <p className="rounded-2xl bg-white p-8 text-center text-sm text-slate-400 shadow-sm ring-1 ring-slate-200">
              No tasks yet for today. Add one above to get started.
            </p>
          )}

          {!loading && tasks.length > 0 && (
            <div className="space-y-3">
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onDone={() => handleDone(task.id)}
                  onMiss={() => setTaskPendingReason(task)}
                  onReset={() => handleReset(task.id)}
                  onDelete={() => handleDelete(task.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {taskPendingReason && (
        <ReasonModal
          taskTitle={taskPendingReason.title}
          onCancel={() => setTaskPendingReason(null)}
          onSubmit={handleMissConfirm}
        />
      )}
    </div>
  );
}

export default App;
