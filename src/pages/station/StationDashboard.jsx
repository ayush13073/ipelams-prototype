// src/pages/station/StationDashboard.jsx
import { useNavigate } from 'react-router-dom';
import {
  currentStation,
  inventorySnapshot,
  stationAlerts,
  todayMovements,
  stationQuickStats,
} from '../../data/stationData';

/* ───────────── helpers ───────────── */

const ALERT_STYLES = {
  red:   { bg: 'bg-red-50 border-red-200',     text: 'text-red-800',    icon: '🔴' },
  amber: { bg: 'bg-amber-50 border-amber-200', text: 'text-amber-800',  icon: '🟡' },
  green: { bg: 'bg-green-50 border-green-200', text: 'text-green-800',  icon: '🟢' },
};

const SNAPSHOT_COLORS = {
  green: { bar: 'bg-green-500', text: 'text-green-700' },
  amber: { bar: 'bg-amber-500', text: 'text-amber-700' },
  red:   { bar: 'bg-red-500',   text: 'text-red-700' },
};

/* ───────────── main ───────────── */

export default function StationDashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">

      {/* ── Status strip ── */}
      <section className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
              Station Status
            </div>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="text-lg font-bold text-slate-800">{currentStation.name}</span>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                OFFLINE MODE
              </span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Manager: {currentStation.manager} · Uptime {currentStation.uptime}
            </div>
          </div>

          <div className="flex gap-6">
            <StatBox label="Last Sync"      value={currentStation.lastSync} accent="text-amber-600" />
            <StatBox label="Pending"        value={currentStation.pendingRecords} accent="text-red-600" />
            <StatBox label="Uptime"         value={currentStation.uptime} />
          </div>
        </div>
      </section>

      {/* ── Overview cards ── */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <BigStat label="Personnel"       value={stationQuickStats.personnel}      cls="bg-blue-50 text-blue-700"   onClick={() => navigate('/station/personnel')} />
        <BigStat label="Inventory Items" value={stationQuickStats.inventoryItems} cls="bg-emerald-50 text-emerald-700" onClick={() => navigate('/station/inventory')} />
        <BigStat label="Expiring"        value={stationQuickStats.expiringSoon}   cls="bg-amber-50 text-amber-700" />
        <BigStat label="Incidents"       value={stationQuickStats.incidents}      cls="bg-red-50 text-red-700"     onClick={() => navigate('/station/emergency')} />
      </section>

      {/* ── Alerts + Quick Actions side-by-side ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Alerts (2 cols) */}
        <section className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[12px] font-bold text-slate-500 tracking-wider uppercase">
              Alerts
            </div>
            <span className="text-[11px] text-slate-400">
              {stationAlerts.length} active
            </span>
          </div>

          <div className="space-y-2">
            {stationAlerts.map((a) => {
              const s = ALERT_STYLES[a.level];
              return (
                <div
                  key={a.id}
                  className={`flex items-start gap-3 border rounded-lg px-3.5 py-2.5 ${s.bg}`}
                >
                  <span className="text-base shrink-0 mt-0.5">{s.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className={`text-[13px] font-semibold ${s.text}`}>{a.title}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{a.detail}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Quick actions */}
        <section className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="text-[12px] font-bold text-slate-500 tracking-wider uppercase mb-3">
            Quick Actions
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <QuickBtn icon="📷" label="Scan Item"   onClick={() => navigate('/station/inventory')} />
            <QuickBtn icon="📦" label="Receive"     onClick={() => navigate('/station/cargo')} />
            <QuickBtn icon="🗑️" label="Log Waste"   onClick={() => navigate('/station/waste')} />
            <QuickBtn icon="👥" label="Mustering"   onClick={() => navigate('/station/personnel')} />
          </div>
          <button
            onClick={() => navigate('/station/emergency')}
            className="w-full mt-3 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-[12px] font-bold transition flex items-center justify-center gap-2"
          >
            🚨 SOS — Emergency
          </button>
        </section>
      </div>

      {/* ── Inventory snapshot ── */}
      <section className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[12px] font-bold text-slate-500 tracking-wider uppercase">
              Inventory Snapshot
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Days remaining based on current consumption
            </div>
          </div>
          <button
            onClick={() => navigate('/station/inventory')}
            className="text-[11px] font-semibold text-blue-600 hover:text-blue-800"
          >
            View inventory →
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {inventorySnapshot.map((s) => {
            const c = SNAPSHOT_COLORS[s.cls];
            const pct = Math.round((s.daysLeft / s.totalDays) * 100);
            return (
              <div key={s.label}>
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-[12px] font-semibold text-slate-700">{s.label}</span>
                  <span className={`text-[13px] font-bold ${c.text}`}>
                    {s.daysLeft}d
                  </span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${c.bar}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Today's movements ── */}
      <section className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[12px] font-bold text-slate-500 tracking-wider uppercase">
            Today's Movements
          </div>
          <span className="text-[11px] text-slate-400">Local · not yet synced</span>
        </div>

        <ul className="space-y-2.5">
          {todayMovements.map((m) => (
            <li
              key={m.id}
              className="flex items-center gap-3 py-1.5 border-b border-slate-100 last:border-0"
            >
              <span className="text-lg shrink-0">{m.icon}</span>
              <div className="flex-1 text-[13px] text-slate-700">{m.text}</div>
              <span className="text-[11px] text-slate-400 whitespace-nowrap">{m.time}</span>
            </li>
          ))}
        </ul>
      </section>

    </div>
  );
}

/* ───────────── local components ───────────── */

function StatBox({ label, value, accent = 'text-slate-800' }) {
  return (
    <div className="text-right">
      <div className="text-[10px] text-slate-400 uppercase tracking-wider">{label}</div>
      <div className={`text-[15px] font-bold ${accent}`}>{value}</div>
    </div>
  );
}

function BigStat({ label, value, cls, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl p-4 text-left transition hover:shadow-md ${cls}`}
    >
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-[11px] font-semibold mt-0.5 opacity-90">{label}</div>
    </button>
  );
}

function QuickBtn({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="border border-slate-200 rounded-lg p-3 text-left hover:border-emerald-400 hover:bg-emerald-50/40 transition"
    >
      <div className="text-xl">{icon}</div>
      <div className="text-[11px] font-semibold text-slate-700 mt-1.5">{label}</div>
    </button>
  );
}