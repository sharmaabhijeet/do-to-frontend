import { useState } from 'react';

export default function ReasonModal({
  taskTitle,
  onCancel,
  onSubmit,
}: {
  taskTitle: string;
  onCancel: () => void;
  onSubmit: (reason: string) => void;
}) {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!reason.trim()) {
      setError('Please add a reason for missing this task.');
      return;
    }
    onSubmit(reason.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-slate-900">Task not done</h3>
        <p className="mt-1 text-sm text-slate-500">
          "{taskTitle}" wasn't completed. Add a reason so it can be tracked as missed.
        </p>

        <textarea
          autoFocus
          value={reason}
          onChange={(e) => {
            setReason(e.target.value);
            if (error) setError('');
          }}
          rows={3}
          placeholder="e.g. Ran out of time, blocked by X..."
          className="mt-4 w-full resize-none rounded-lg border border-slate-200 p-3 text-sm text-slate-800 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
        />
        {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}

        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700"
          >
            Mark as Missed
          </button>
        </div>
      </div>
    </div>
  );
}
