import type { Summary } from '../types';

export default function ProgressBar({ summary }: { summary: Summary }) {
  const { total, done, missed, pending, percent } = summary;

  return (
    <div className="w-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-3 flex items-end justify-between">
        <h2 className="text-sm font-medium text-slate-500">Today's Progress</h2>
        <span className="text-2xl font-semibold text-slate-900">{percent}%</span>
      </div>

      <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-emerald-500 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="mt-4 grid grid-cols-4 gap-3 text-center">
        <Stat label="Total" value={total} color="text-slate-700" />
        <Stat label="Done" value={done} color="text-emerald-600" />
        <Stat label="Pending" value={pending} color="text-amber-600" />
        <Stat label="Missed" value={missed} color="text-rose-600" />
      </div>
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="rounded-xl bg-slate-50 py-2">
      <div className={`text-lg font-semibold ${color}`}>{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
}
