import type { Task } from '../types';

const statusStyles: Record<Task['status'], string> = {
  pending: 'border-slate-200',
  done: 'border-emerald-200 bg-emerald-50/50',
  missed: 'border-rose-200 bg-rose-50/50',
};

export default function TaskItem({
  task,
  onDone,
  onMiss,
  onReset,
  onDelete,
}: {
  task: Task;
  onDone: () => void;
  onMiss: () => void;
  onReset: () => void;
  onDelete: () => void;
}) {
  return (
    <div className={`rounded-xl border p-4 transition-colors ${statusStyles[task.status]}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p
            className={`truncate font-medium text-slate-900 ${
              task.status === 'done' ? 'line-through decoration-slate-400' : ''
            }`}
          >
            {task.title}
          </p>
          {task.description && (
            <p className="mt-0.5 text-sm text-slate-500">{task.description}</p>
          )}
          {task.status === 'missed' && task.reason && (
            <p className="mt-2 rounded-lg bg-rose-100 px-3 py-1.5 text-sm text-rose-700">
              <span className="font-medium">Reason: </span>
              {task.reason}
            </p>
          )}
        </div>

        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
            task.status === 'done'
              ? 'bg-emerald-100 text-emerald-700'
              : task.status === 'missed'
                ? 'bg-rose-100 text-rose-700'
                : 'bg-amber-100 text-amber-700'
          }`}
        >
          {task.status}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {task.status !== 'done' && (
          <button
            onClick={onDone}
            className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700"
          >
            Mark Done
          </button>
        )}
        {task.status !== 'missed' && (
          <button
            onClick={onMiss}
            className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-rose-700"
          >
            Not Done
          </button>
        )}
        {task.status !== 'pending' && (
          <button
            onClick={onReset}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100"
          >
            Reset
          </button>
        )}
        <button
          onClick={onDelete}
          className="ml-auto rounded-lg px-3 py-1.5 text-xs font-medium text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
