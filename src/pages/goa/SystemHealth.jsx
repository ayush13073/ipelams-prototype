// src/pages/goa/SystemHealth.jsx
import { systemHealth, edgeNodes, syncQueue, recentSyncEvents } from '../../data/mockData';

/* ───────────── helpers ───────────── */

const SERVER_STATUS = {
  online:  { dot: 'bg-green-500', pill: 'bg-green-100 text-green-700', label: '● Online' },
  healthy: { dot: 'bg-green-500', pill: 'bg-green-100 text-green-700', label: '● Healthy' },
  offline: { dot: 'bg-red-500',   pill: 'bg-red-100 text-red-700',     label: '● Offline' },
  warning: { dot: 'bg-yellow-500',pill: 'bg-yellow-100 text-yellow-700',label: '● Warning' },
};

const NODE_STATUS = {
  online:  { pill: 'bg-green-100 text-green-700', label: '🟢 Online' },
  offline: { pill: 'bg-red-100 text-red-700',     label: '🔴 Offline' },
};

const QUEUE_COLORS = {
  red:   { bar: 'bg-red-500',   pill: 'bg-red-100 text-red-700' },
  pink:  { bar: 'bg-pink-500',  pill: 'bg-pink-100 text-pink-700' },
  amber: { bar: 'bg-amber-500', pill: 'bg-amber-100 text-amber-700' },
  blue:  { bar: 'bg-blue-500',  pill: 'bg-blue-100 text-blue-700' },
  slate: { bar: 'bg-slate-400', pill: 'bg-slate-100 text-slate-600' },
};

/* ───────────── main ───────────── */

export default function SystemHealth() {
  const totalPending = edgeNodes.reduce((sum, n) => sum + n.pending, 0);
  const offlineNodes = edgeNodes.filter((n) => n.status === 'offline').length;

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">⚙️ System Health</h1>
          <p className="text-[12px] text-slate-500 mt-0.5">
            Central server, edge nodes and sync queue at a glance
          </p>
        </div>
        <div className="flex gap-2">
          <button className="text-[12px] font-semibold px-3.5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
            🔄 Force Sync All
          </button>
          <button className="text-[12px] font-semibold px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition">
            📄 View Logs
          </button>
        </div>
      </div>

      {/* Top strip — 4 server components */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {Object.values(systemHealth).map((item) => {
          const s = SERVER_STATUS[item.status];
          return (
            <div key={item.label} className="bg-white border border-slate-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 tracking-wider uppercase">
                  {item.label}
                </span>
                <span className={`w-2 h-2 rounded-full ${s.dot}`} />
              </div>
              <div className={`inline-block mt-3 text-[10px] font-bold px-2 py-0.5 rounded-full ${s.pill}`}>
                {s.label}
              </div>
              <div className="text-[11px] text-slate-500 mt-2">{item.detail}</div>
            </div>
          );
        })}
      </section>

      {/* Overall stats bar */}
      <section className="bg-white border border-slate-200 rounded-xl p-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Stat label="Edge Nodes"        value={edgeNodes.length} accent="text-slate-800" />
          <Stat label="Offline Nodes"     value={offlineNodes}     accent={offlineNodes > 0 ? 'text-red-600' : 'text-green-600'} />
          <Stat label="Pending Records"   value={totalPending}     accent={totalPending > 100 ? 'text-amber-600' : 'text-slate-800'} />
          <Stat label="System Uptime"     value="99.4%"            accent="text-green-600" />
        </div>
      </section>

      {/* Edge nodes table */}
      <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-[12px] font-bold text-slate-500 tracking-wider uppercase">
              Edge Node Status
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Local servers at each location
            </p>
          </div>
          <span className="text-[11px] text-slate-400">
            Auto-refresh · 30s
          </span>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wide">
            <tr>
              <th className="text-left px-5 py-3 font-semibold">Location</th>
              <th className="text-left px-5 py-3 font-semibold">Last Sync</th>
              <th className="text-left px-5 py-3 font-semibold">Pending</th>
              <th className="text-left px-5 py-3 font-semibold">Uptime</th>
              <th className="text-left px-5 py-3 font-semibold">Version</th>
              <th className="text-left px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {edgeNodes.map((n) => {
              const s = NODE_STATUS[n.status];
              return (
                <tr
                  key={n.id}
                  className={`border-t border-slate-100 transition ${
                    n.status === 'offline' ? 'bg-red-50/40 hover:bg-red-50' : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="px-5 py-3">
                    <div className="font-semibold text-slate-800">{n.name}</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">{n.type}</div>
                  </td>
                  <td className="px-5 py-3 text-slate-600">{n.lastSync}</td>
                  <td className="px-5 py-3">
                    <span className={`text-[13px] font-bold ${
                      n.pending > 100 ? 'text-red-600' :
                      n.pending > 0 ? 'text-amber-600' :
                      'text-green-600'
                    }`}>
                      {n.pending}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-slate-600 font-mono text-[12px]">{n.uptime}</td>
                  <td className="px-5 py-3 text-slate-500 font-mono text-[11px]">{n.version}</td>
                  <td className="px-5 py-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.pill}`}>
                      {s.label}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button className={`text-[12px] font-semibold hover:underline ${
                      n.status === 'offline' ? 'text-blue-600' : 'text-slate-500'
                    }`}>
                      {n.status === 'offline' ? 'Retry →' : 'Logs →'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      {/* Two-column: Sync queue + recent events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Sync queue */}
        <section className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-[12px] font-bold text-slate-500 tracking-wider uppercase">
                Sync Queue Priority
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Order in which pending data uploads
              </p>
            </div>
            <span className="text-[11px] font-bold text-slate-500">
              {syncQueue.reduce((s, q) => s + q.count, 0)} total
            </span>
          </div>

          <div className="space-y-3">
            {syncQueue.map((q) => {
              const c = QUEUE_COLORS[q.cls];
              return (
                <div key={q.priority}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-6 h-6 rounded-full text-[11px] font-bold flex items-center justify-center ${
                        q.count > 0 ? c.pill : 'bg-slate-100 text-slate-400'
                      }`}>
                        {q.priority}
                      </span>
                      <span className="text-[13px] font-semibold text-slate-700">{q.type}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-slate-400">{q.sla}</span>
                      <span className={`text-[13px] font-bold ${
                        q.count > 0 ? 'text-slate-800' : 'text-slate-300'
                      }`}>
                        {q.count}
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${c.bar}`}
                      style={{ width: `${Math.min(100, (q.count / 180) * 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 text-[11px] text-slate-500 leading-relaxed">
            When a link becomes available, the queue syncs in order — emergency
            first, routine last. Stations hold data locally until then, so
            nothing is ever lost.
          </div>
        </section>

        {/* Recent events */}
        <section className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-[12px] font-bold text-slate-500 tracking-wider uppercase">
                Recent Sync Events
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Last 5 events across all nodes
              </p>
            </div>
          </div>

          <ul className="space-y-2.5">
            {recentSyncEvents.map((e) => (
              <li
                key={e.id}
                className="flex items-start gap-3 py-2 border-b border-slate-100 last:border-0"
              >
                <span className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                  e.ok ? 'bg-green-500' : 'bg-red-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[13px] font-semibold text-slate-800 truncate">
                      {e.node}
                    </span>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap">{e.at}</span>
                  </div>
                  <div className={`text-[11px] mt-0.5 ${
                    e.ok ? 'text-slate-500' : 'text-red-600 font-medium'
                  }`}>
                    {e.event}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <button className="w-full mt-4 text-[11px] font-semibold text-blue-600 hover:text-blue-800 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
            View full audit log →
          </button>
        </section>
      </div>

      {/* Quick actions */}
      <section className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="text-[12px] font-bold text-slate-500 tracking-wider uppercase mb-3">
          Administration
        </div>
        <div className="flex flex-wrap gap-2">
          <ActionBtn icon="🔄" label="Force Sync All"   primary />
          <ActionBtn icon="📄" label="View Logs"         />
          <ActionBtn icon="♻️" label="Restart Service"  />
          <ActionBtn icon="💾" label="Run Backup"        />
          <ActionBtn icon="📊" label="Generate Report"  />
          <ActionBtn icon="🔔" label="Alert Settings"   />
        </div>
      </section>

    </div>
  );
}

/* ───────────── local components ───────────── */

function Stat({ label, value, accent }) {
  return (
    <div>
      <div className={`text-2xl font-bold ${accent}`}>{value}</div>
      <div className="text-[11px] text-slate-500 mt-0.5">{label}</div>
    </div>
  );
}

function ActionBtn({ icon, label, primary }) {
  return (
    <button
      className={`text-[12px] font-semibold px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 ${
        primary
          ? 'bg-blue-600 text-white hover:bg-blue-700'
          : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
      }`}
    >
      <span>{icon}</span>
      {label}
    </button>
  );
}