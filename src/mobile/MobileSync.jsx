// src/mobile/MobileSync.jsx
export default function MobileSync({ onBack }) {
  // Tailwind needs explicit class names — no dynamic strings like bg-${color}-100
  const queue = [
    { p: 1, type: 'Emergency', count: 0,   bg: 'bg-red-100',    txt: 'text-red-700' },
    { p: 2, type: 'Medical',   count: 3,   bg: 'bg-pink-100',   txt: 'text-pink-700' },
    { p: 3, type: 'Waste',     count: 12,  bg: 'bg-amber-100',  txt: 'text-amber-700' },
    { p: 4, type: 'Inventory', count: 180, bg: 'bg-blue-100',   txt: 'text-blue-700' },
    { p: 5, type: 'Routine',   count: 52,  bg: 'bg-slate-100',  txt: 'text-slate-700' },
  ];

  const total = queue.reduce((sum, q) => sum + q.count, 0);

  return (
    <div className="p-4">
      <button
        onClick={onBack}
        className="text-[11px] text-blue-600 mb-2 font-semibold"
      >
        ← Back
      </button>

      <h2 className="text-base font-bold text-slate-800">Sync Status</h2>

      {/* Offline banner */}
      <div className="bg-red-50 border border-red-300 rounded-lg p-3 my-3">
        <div className="text-[12px] font-bold text-red-700">🔴 OFFLINE</div>
        <div className="text-[11px] text-red-600 mt-0.5">Last sync: 3 days ago</div>
      </div>

      {/* Queue */}
      <p className="text-[10px] font-bold text-slate-400 tracking-wider mb-2">
        SYNC QUEUE (Priority order)
      </p>

      <div className="space-y-2">
        {queue.map((q) => (
          <div
            key={q.p}
            className="flex items-center justify-between bg-white border border-slate-200 rounded-lg p-3"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-6 h-6 rounded-full ${q.bg} ${q.txt} text-[11px] font-bold flex items-center justify-center`}
              >
                {q.p}
              </div>
              <div className="text-[12px] font-semibold text-slate-700">
                {q.type}
              </div>
            </div>
            <div className="text-[12px] font-bold text-slate-500">{q.count}</div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-3 p-3 bg-slate-100 rounded-lg">
        <div className="text-[11px] text-slate-600 leading-snug">
          <b>Total pending: {total} records</b>
          <br />
          Data will sync automatically when internet is available.
        </div>
      </div>

      {/* Manual sync button */}
      <button
        disabled
        className="w-full mt-3 py-2.5 rounded-lg bg-slate-200 text-slate-400 text-[11px] font-semibold cursor-not-allowed"
      >
        🔄 Sync Now (disabled — offline)
      </button>
    </div>
  );
}