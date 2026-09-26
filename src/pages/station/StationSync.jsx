// src/pages/station/StationSync.jsx
import { useState } from 'react';
import {
  currentStation,
  stationSyncQueue,
  syncLog,
  syncPriorities,
  syncBandwidth,
} from '../../data/stationData';

/* ───────────── helpers ───────────── */

const QUEUE_COLORS = {
  red:   { bar: 'bg-red-500',    pill: 'bg-red-100 text-red-700' },
  pink:  { bar: 'bg-pink-500',   pill: 'bg-pink-100 text-pink-700' },
  amber: { bar: 'bg-amber-500',  pill: 'bg-amber-100 text-amber-700' },
  blue:  { bar: 'bg-blue-500',   pill: 'bg-blue-100 text-blue-700' },
  slate: { bar: 'bg-slate-400',  pill: 'bg-slate-100 text-slate-600' },
};

function timeAgoLabel(age) {
  if (!age) return 'never';
  if (age < 1) return 'under 1 day';
  if (age === 1) return '1 day';
  return `${age} days`;
}

/* ───────────── main ───────────── */

export default function StationSync() {
  const [priorities, setPriorities] = useState(syncPriorities);
  const [simulatedSync, setSimulatedSync] = useState(false);
  const [search, setSearch] = useState('');

  const totalPending = stationSyncQueue.reduce((s, q) => s + q.count, 0);
  const maxCount = Math.max(...stationSyncQueue.map((q) => q.count), 1);

  const canManualSync = false; // offline right now

  const triggerSimulatedSync = () => {
    setSimulatedSync(true);
    setTimeout(() => setSimulatedSync(false), 2500);
  };

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">🔄 Sync Status</h1>
          <p className="text-[12px] text-slate-500 mt-0.5">
            {currentStation.name} Station · offline-first queue
          </p>
        </div>
        <div className="flex gap-2">
          <button
            disabled={!canManualSync}
            onClick={triggerSimulatedSync}
            className={`text-[12px] font-semibold px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 ${
              canManualSync
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {simulatedSync ? '⏳ Syncing…' : '🔄 Manual Sync'}
          </button>
          <button className="text-[12px] font-semibold px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition">
            ⚙️ Priority Settings
          </button>
        </div>
      </div>

      {/* Big offline banner */}
      <section className="bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
              📡
            </div>
            <div>
              <div className="text-lg font-bold">OFFLINE</div>
              <div className="text-[12px] opacity-90">
                Last sync · <b>{currentStation.lastSync}</b> ({timeAgoLabel(3)} ago)
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="text-right">
              <div className="text-[10px] opacity-80 uppercase tracking-wide">Pending</div>
              <div className="text-2xl font-bold">{totalPending}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] opacity-80 uppercase tracking-wide">Link</div>
              <div className="text-2xl font-bold">—</div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/20 text-[11px] opacity-90">
          📡 Data is saved locally and will upload automatically when the satellite link is restored.
        </div>
      </section>

      {/* Simulated sync toast */}
      {simulatedSync && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-lg px-4 py-3 flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <div className="text-[12px] text-emerald-800">
            <b>Attempting connection…</b> No satellite in range. Will retry in 60 seconds.
          </div>
        </div>
      )}

      {/* Summary tiles */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <SummaryTile label="Total Pending"  value={totalPending}                                accent="text-amber-600" />
        <SummaryTile label="Highest Priority" value="0 Emergency"                               accent="text-green-600" />
        <SummaryTile label="Data Age"       value={`${currentStation.lastSync}`}                accent="text-red-600" />
        <SummaryTile label="Link Type"      value={syncBandwidth.linkType}                       accent="text-slate-700" />
      </section>

      {/* Queue breakdown */}
      <section className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-[12px] font-bold text-slate-500 tracking-wider uppercase">
              Sync Queue · by Priority
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Higher priority uploads first when link is available
            </p>
          </div>
          <span className="text-[11px] text-slate-400">
            Auto-retry · 60s
          </span>
        </div>

        <div className="space-y-4">
          {stationSyncQueue.map((q) => {
            const c = QUEUE_COLORS[q.cls];
            const pct = Math.round((q.count / maxCount) * 100);
            return (
              <div key={q.priority}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-full text-[11px] font-bold flex items-center justify-center ${
                      q.count > 0 ? c.pill : 'bg-slate-100 text-slate-400'
                    }`}>
                      {q.priority}
                    </span>
                    <div>
                      <div className="text-[13px] font-semibold text-slate-800">
                        {q.type}
                      </div>
                      <div className="text-[10px] text-slate-400">SLA · {q.sla}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-[15px] font-bold ${
                      q.count > 0 ? 'text-slate-800' : 'text-slate-300'
                    }`}>
                      {q.count}
                    </div>
                    <div className="text-[10px] text-slate-400">records</div>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${c.bar}`}
                    style={{ width: `${q.count > 0 ? Math.max(pct, 4) : 0}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100 text-[11px] text-slate-500 leading-relaxed">
          Every change you made at the station — scans, issued items, waste records,
          personnel check-ins — is stored locally and placed in this queue.
          Nothing is lost while offline.
        </div>
      </section>

      {/* Two-column: Priority settings + sync log */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Priority settings */}
        <section className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="mb-4">
            <h2 className="text-[12px] font-bold text-slate-500 tracking-wider uppercase">
              Priority Order
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Drag to reorder. Emergency is locked at #1.
            </p>
          </div>

          <ul className="space-y-2">
            {priorities.map((p, idx) => (
              <li
                key={p.key}
                className={`flex items-start gap-3 border rounded-lg p-3 transition ${
                  p.locked
                    ? 'bg-red-50 border-red-200'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex flex-col items-center pt-0.5">
                  <span className={`text-[11px] font-bold ${
                    p.locked ? 'text-red-600' : 'text-slate-500'
                  }`}>
                    {idx + 1}
                  </span>
                  {!p.locked && <span className="text-slate-300 text-[10px] mt-0.5">≡</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-semibold text-slate-800">
                      {p.label}
                    </span>
                    {p.locked && (
                      <span className="text-[10px] font-bold text-red-600">🔒 LOCKED</span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {p.description}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    SLA · {p.sla}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 text-[11px] text-slate-500 leading-relaxed">
            Emergency alerts are always sent first, regardless of volume.
            This ensures SOS signals reach Goa even if a backlog exists.
          </div>
        </section>

        {/* Sync log */}
        <section className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-[12px] font-bold text-slate-500 tracking-wider uppercase">
                Sync Log
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Last 6 events on this node
              </p>
            </div>
          </div>

          <ul className="space-y-3">
            {syncLog.map((e) => (
              <li
                key={e.id}
                className="flex gap-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0"
              >
                <span className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                  e.ok ? 'bg-green-500' : 'bg-red-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className={`text-[12px] font-semibold truncate ${
                      e.ok ? 'text-slate-800' : 'text-red-700'
                    }`}>
                      {e.event}
                    </span>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap">
                      {e.at}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {e.detail}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <button className="w-full mt-4 text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 py-2 border border-slate-200 rounded-lg hover:bg-emerald-50 transition">
            View full log →
          </button>
        </section>
      </div>

      {/* What happens on reconnect */}
      <section className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-[12px] font-bold text-slate-500 tracking-wider uppercase mb-4">
          What Happens When Link Returns
        </h2>

        <ol className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {[
            { n: 1, icon: '🔌', title: 'Connection detected', text: 'Edge node detects satellite link and initiates handshake.' },
            { n: 2, icon: '📦', title: 'Priority upload',     text: 'Queue drains top-down — emergency first, routine last.' },
            { n: 3, icon: '✅', title: 'Central confirmation', text: 'Goa confirms each record. Local queue marks them synced.' },
            { n: 4, icon: '🔄', title: 'Push back',           text: 'Station receives updated master data from Goa HQ.' },
          ].map((s, i) => (
            <li key={s.n} className="relative">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-lg shrink-0">
                  {s.icon}
                </div>
                <div>
                  <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                    Step {s.n}
                  </div>
                  <div className="text-[12px] font-semibold text-slate-800 mt-0.5">
                    {s.title}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 leading-snug">
                    {s.text}
                  </div>
                </div>
              </div>
              {i < 3 && (
                <div className="hidden lg:block absolute top-4 -right-2 text-slate-300 text-lg">
                  →
                </div>
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* Footer actions */}
      <section className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="text-[12px] font-bold text-slate-500 tracking-wider uppercase mb-3">
          Administration
        </div>
        <div className="flex flex-wrap gap-2">
          <ActionBtn icon="🔄" label="Force Sync Now"     disabled />
          <ActionBtn icon="📄" label="Export Queue"       />
          <ActionBtn icon="♻️" label="Rebuild Local DB"  />
          <ActionBtn icon="💾" label="Local Backup"       />
          <ActionBtn icon="📊" label="Sync Report"        />
        </div>
      </section>

    </div>
  );
}

/* ───────────── local components ───────────── */

function SummaryTile({ label, value, accent }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg px-4 py-3">
      <div className={`text-lg font-bold ${accent}`}>{value}</div>
      <div className="text-[11px] text-slate-500 mt-0.5">{label}</div>
    </div>
  );
}

function ActionBtn({ icon, label, disabled }) {
  return (
    <button
      disabled={disabled}
      className={`text-[12px] font-semibold px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 ${
        disabled
          ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
          : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
      }`}
    >
      <span>{icon}</span>
      {label}
    </button>
  );
}