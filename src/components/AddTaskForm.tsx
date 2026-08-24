import { useState } from 'react';

export default function AddTaskForm({ onAdd }: { onAdd: (title: string, description: string) => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim(), description.trim());
    setTitle('');
    setDescription('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:flex-row sm:items-center"
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a task for today..."
        className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Notes (optional)"
        className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
      />
      <button
        type="submit"
        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
      >
        Add Task
      </button>
    </form>
  );
}
