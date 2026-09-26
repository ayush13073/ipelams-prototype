// src/mobile/medical/MedicalSync.jsx
import { syncQueue } from '../../data/mobileData';

const QUEUE_COLORS = {
  red:   { bg: 'bg-red-100',   txt: 'text-red-700'   },
  pink:  { bg: 'bg-pink-100',  txt: 'text-pink-700'  },
  amber: { bg: 'bg-amber-100', txt: 'text-amber-700' },
  blue:  { bg: 'bg-blue-100',  txt: 'text-blue-700'  },
  slate: { bg: 'bg-slate-100', txt: 'text-slate-700' },
};

export default function MedicalSync() {
  const total = syncQueue.reduce((s, q) => s + q.count, 0);

  return (
    <div className="p-4">
      <h2 className="text-base font-bold text-slate-800">Sync Status</h2>

      <div className="bg-red-50 border border-red-300 rounded-lg p-3 my-3">
        <div className="text-[12px] font-bold text-red-700">🔴 OFFLINE</div>
        <div className="text-[11px] text-red-600 mt-0.5">
          Last sync: 3 days ago
        </div>
      </div>

      <div className="bg-pink-50 border border-pink-200 rounded-lg p-3 mb-3">
        <div className="text-[11px] text-pink-800 leading-snug">
          🔒 <b>Medical data is Priority 2.</b> Uploads ahead of inventory and routine logs.
        </div>
      </div>

      <p className="text-[10px] font-bold text-slate-400 tracking-wider mb-2">
        QUEUE · PRIORITY ORDER
      </p>

      <div className="space-y-2">
        {syncQueue.map((q) => {
          const c = QUEUE_COLORS[q.cls];
          const isMedical = q.priority === 2;
          return (
            <div
              key={q.priority}
              className={`flex items-center justify-between border rounded-lg p-3 ${
                isMedical ? 'bg-pink-50 border-pink-300' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full ${c.bg} ${c.txt} text-[11px] font-bold flex items-center justify-center`}>
                  {q.priority}
                </div>
                <div>
                  <div className={`text-[12px] font-semibold ${isMedical ? 'text-pink-900' : 'text-slate-700'}`}>
                    {q.type}
                  </div>
                  <div className="text-[10px] text-slate-400">{q.sla}</div>
                </div>
              </div>
              <div className={`text-[13px] font-bold ${isMedical ? 'text-pink-700' : 'text-slate-500'}`}>
                {q.count}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 p-3 bg-slate-100 rounded-lg">
        <div className="text-[11px] text-slate-600">
          <b>Total pending: {total} records</b>
        </div>
      </div>

      <button
        disabled
        className="w-full mt-3 py-2.5 rounded-lg bg-slate-200 text-slate-400 text-[11px] font-semibold"
      >
        🔄 Manual Sync (offline)
      </button>
    </div>
  );
}