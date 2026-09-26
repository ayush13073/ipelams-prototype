// src/mobile/station/StationPeople.jsx
import { useState } from 'react';
import { stationPersonnel } from '../../data/mobileData';

const STATUS_BADGE = {
  inside:  { cls: 'bg-green-100 text-green-700',    label: '🏠 Inside' },
  outside: { cls: 'bg-blue-100 text-blue-700',      label: '🚶 Outside' },
  overdue: { cls: 'bg-red-100 text-red-700',        label: '⚠ Overdue' },
};

export default function StationPeople() {
  const [filter, setFilter] = useState('all');
  const [selectedId, setSelectedId] = useState(null);

  const filtered = stationPersonnel.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'inside') return p.status === 'inside';
    if (filter === 'outside') return p.status === 'outside' || p.status === 'overdue';
    return true;
  });

  const counts = {
    all:     stationPersonnel.length,
    inside:  stationPersonnel.filter((p) => p.status === 'inside').length,
    outside: stationPersonnel.filter((p) => p.status === 'outside' || p.status === 'overdue').length,
    overdue: stationPersonnel.filter((p) => p.status === 'overdue').length,
  };

  const selected = stationPersonnel.find((p) => p.id === selectedId);

  return (
    <div className="p-4">
      <h2 className="text-base font-bold text-slate-800 mb-3">Personnel</h2>

      {/* Filter tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-lg p-1 mb-4">
        {[
          { id: 'all',     label: 'All',     count: counts.all },
          { id: 'inside',  label: 'Inside',  count: counts.inside },
          { id: 'outside', label: 'Outside', count: counts.outside },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setFilter(t.id)}
            className={`flex-1 text-[11px] font-semibold py-1.5 rounded-md transition flex items-center justify-center gap-1.5 ${
              filter === t.id ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'
            }`}
          >
            {t.label}
            <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${
              filter === t.id ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
            }`}>{t.count}</span>
          </button>
        ))}
      </div>

      {/* Overdue warning */}
      {counts.overdue > 0 && (
        <div className="mb-3 bg-red-50 border border-red-200 rounded-lg px-3 py-2 flex items-center gap-2">
          <span className="text-sm">⚠</span>
          <div className="text-[11px] text-red-700 font-semibold">
            {counts.overdue} person overdue check-in
          </div>
        </div>
      )}

      {/* List */}
      <div className="space-y-2">
        {filtered.map((p) => {
          const st = STATUS_BADGE[p.status];
          return (
            <button
              key={p.id}
              onClick={() => setSelectedId(p.id)}
              className={`w-full text-left border rounded-xl p-3 transition ${
                p.status === 'overdue'
                  ? 'bg-red-50/40 border-red-200'
                  : 'bg-white border-slate-200 hover:border-emerald-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[11px] font-bold shrink-0">
                    {p.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[12px] font-bold text-slate-800 truncate">{p.name}</div>
                    <div className="text-[10px] text-slate-500 truncate">{p.role} · {p.location}</div>
                  </div>
                </div>
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold shrink-0 ml-2 ${st.cls}`}>
                  {st.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {selected && <PersonSheet person={selected} onClose={() => setSelectedId(null)} />}
    </div>
  );
}

/* ───────────── Person detail sheet ───────────── */

function PersonSheet({ person: p, onClose }) {
  const st = STATUS_BADGE[p.status];

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/40" onClick={onClose}>
      <div
        className="bg-white rounded-t-3xl w-full max-w-[340px] max-h-[85%] overflow-y-auto animate-[slideUp_0.25s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="pt-3 pb-1 flex justify-center">
          <div className="w-10 h-1 rounded-full bg-slate-300" />
        </div>

        {/* Header */}
        <div className="px-5 py-3 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-base font-bold">
              {p.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
            </div>
            <div>
              <div className="text-[14px] font-bold text-slate-800">{p.name}</div>
              <div className="text-[11px] text-slate-500">{p.role}</div>
              <div className="text-[10px] text-slate-400 font-mono">{p.id}</div>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 text-xl leading-none">×</button>
        </div>

        {/* Status banner */}
        <div className="mx-5 bg-slate-50 border border-slate-200 rounded-lg p-3">
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${st.cls}`}>
            {st.label}
          </span>
          <div className="mt-2 text-[11px] text-slate-600">
            <div className="flex justify-between py-0.5">
              <span>Current location</span>
              <span className="font-semibold text-slate-800">{p.location}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span>Entry</span>
              <span className="font-semibold text-slate-800">
                {p.entryTime} · {p.entryGate}
              </span>
            </div>
          </div>
        </div>

        {/* Movement */}
        <div className="px-5 mt-4">
          <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-2">
            Movement History
          </div>
          <ol className="relative border-l-2 border-slate-200 ml-2 space-y-3">
            {p.movement.slice().reverse().map((m, i, arr) => (
              <li key={i} className="ml-4 relative">
                <span className={`absolute -left-[23px] w-3 h-3 rounded-full border-2 border-white shadow ${
                  i === 0 ? 'bg-emerald-500 ring-2 ring-emerald-100' : 'bg-slate-400'
                }`} />
                <div className="flex items-baseline justify-between gap-3">
                  <div className="text-[11px] font-semibold text-slate-800">{m.event}</div>
                  <div className="text-[10px] text-slate-400 whitespace-nowrap">{m.at}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Activity */}
        {p.activity.length > 0 && (
          <div className="px-5 mt-4 mb-2">
            <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-2">
              Activity
            </div>
            <div className="space-y-1.5">
              {p.activity.map((a, i) => (
                <div key={i} className="flex items-center gap-2 bg-slate-50 rounded-lg p-2">
                  <span className="text-base">{a.icon}</span>
                  <div className="flex-1 text-[11px] text-slate-700">{a.text}</div>
                  <div className="text-[10px] text-slate-400">{a.time}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="px-5 py-4 flex gap-2 border-t border-slate-100 mt-3">
          <button className="flex-1 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold transition">
            Check Out
          </button>
          <button className="flex-1 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-[11px] font-semibold hover:bg-slate-50 transition">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}