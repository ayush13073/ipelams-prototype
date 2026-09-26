// src/pages/goa/CommandCenter.jsx
import { useNavigate } from 'react-router-dom';
import {
  expedition,
  locations,
  alerts,
  quickStats,
} from '../../data/mockData';

const statusDot = {
  fresh:         'bg-green-500',
  stale:         'bg-yellow-500',
  'very-stale':  'bg-red-500',
};

const statusLabel = {
  fresh:         { text: '🟢 Fresh',      cls: 'text-green-700 bg-green-50' },
  stale:         { text: '🟡 Stale',      cls: 'text-yellow-700 bg-yellow-50' },
  'very-stale':  { text: '🔴 Very Stale', cls: 'text-red-700 bg-red-50' },
};

const alertColor = {
  red:    'border-red-300 bg-red-50 text-red-800',
  yellow: 'border-yellow-300 bg-yellow-50 text-yellow-800',
  green:  'border-green-300 bg-green-50 text-green-800',
};

export default function CommandCenter() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">

      {/* ── Expedition status ── */}
      <section className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-slate-400 tracking-wider">
              EXPEDITION STATUS
            </div>
            <div className="mt-1 flex items-center gap-3">
              <span className="text-xl font-bold text-slate-800">
                {expedition.name}
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                ● {expedition.status}
              </span>
            </div>
          </div>
          <div className="flex gap-6 text-right">
            <Stat label="Personnel" value={expedition.personnel} />
            <Stat label="Incidents" value={expedition.incidents} />
          </div>
        </div>
      </section>

      {/* ── Live map strip ── */}
      <section className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="text-[11px] font-bold text-slate-400 tracking-wider mb-4">
          LIVE MAP
        </div>

        <div className="flex items-center justify-between gap-2 px-2">
          {locations.map((loc, i) => (
            <div key={loc.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div className={`w-4 h-4 rounded-full ${statusDot[loc.status]} ring-4 ring-white shadow`} />
                <div className="text-[11px] font-semibold text-slate-700 mt-2">
                  {loc.name}
                </div>
                <div className="text-[10px] text-slate-400">{loc.type}</div>
              </div>
              {i < locations.length - 1 && (
                <div className="flex-1 h-0.5 bg-slate-200 mt-[-22px]" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Freshness + Alerts side by side ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Freshness table (2 cols) */}
        <section className="lg:col-span-2 bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <div className="text-[11px] font-bold text-slate-400 tracking-wider">
              LOCATION FRESHNESS
            </div>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wide">
              <tr>
                <th className="text-left px-5 py-2 font-semibold">Location</th>
                <th className="text-left px-5 py-2 font-semibold">Last Sync</th>
                <th className="text-left px-5 py-2 font-semibold">Data Age</th>
                <th className="text-left px-5 py-2 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((loc) => {
                const s = statusLabel[loc.status];
                return (
                  <tr key={loc.id} className="border-t border-slate-100 hover:bg-slate-50">
                    <td className="px-5 py-3 font-semibold text-slate-800">{loc.name}</td>
                    <td className="px-5 py-3 text-slate-600">{loc.lastSync}</td>
                    <td className="px-5 py-3 text-slate-600">
                      {loc.age === 0 ? 'Live' : `${loc.age} day(s)`}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${s.cls}`}>
                        {s.text}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        {/* Alerts (1 col) */}
        <section className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="text-[11px] font-bold text-slate-400 tracking-wider mb-3">
            ALL ALERTS
          </div>
          <div className="space-y-2.5">
            {alerts.map((a) => (
              <div
                key={a.id}
                className={`border rounded-lg p-2.5 text-[12px] leading-snug ${alertColor[a.level]}`}
              >
                <div className="font-bold text-[10px] uppercase tracking-wider opacity-70">
                  {a.location}
                </div>
                <div className="mt-0.5">{a.message}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── Quick stats + Quick actions ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <section className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
          <div className="text-[11px] font-bold text-slate-400 tracking-wider mb-4">
            QUICK STATS
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <BigStat label="Cargo in Transit"     value={quickStats.cargoInTransit}     color="blue" />
            <BigStat label="Personnel on-site"    value={quickStats.personnelOnSite}    color="green" />
            <BigStat label="Open Incidents"       value={quickStats.openIncidents}      color="red" />
            <BigStat label="Pending Approvals"    value={quickStats.pendingApprovals}   color="amber" />
          </div>
        </section>

        <section className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="text-[11px] font-bold text-slate-400 tracking-wider mb-4">
            QUICK ACTIONS
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <QuickBtn icon="📦" label="Cargo"     onClick={() => navigate('/goa/cargo')} />
            <QuickBtn icon="📊" label="Inventory" onClick={() => navigate('/goa/inventory')} />
            <QuickBtn icon="🧠" label="Predictive" onClick={() => navigate('/goa/predictive')} />
            <QuickBtn icon="⚙️" label="System"    onClick={() => navigate('/goa/system')} />
          </div>
        </section>
      </div>

    </div>
  );
}

/* ───── small local components ───── */

function Stat({ label, value }) {
  return (
    <div>
      <div className="text-[11px] text-slate-400">{label}</div>
      <div className="text-lg font-bold text-slate-800">{value}</div>
    </div>
  );
}

function BigStat({ label, value, color }) {
  const map = {
    blue:  'bg-blue-50 text-blue-700',
    green: 'bg-green-50 text-green-700',
    red:   'bg-red-50 text-red-700',
    amber: 'bg-amber-50 text-amber-700',
  };
  return (
    <div className={`rounded-lg p-3 ${map[color]}`}>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-[11px] font-semibold mt-0.5">{label}</div>
    </div>
  );
}

function QuickBtn({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="border border-slate-200 rounded-lg p-3 text-left hover:border-blue-400 hover:bg-blue-50/50 transition"
    >
      <div className="text-xl">{icon}</div>
      <div className="text-[11px] font-semibold text-slate-700 mt-1.5">{label}</div>
    </button>
  );
}