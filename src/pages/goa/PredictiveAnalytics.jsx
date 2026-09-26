// src/pages/goa/PredictiveAnalytics.jsx
import { useState, useMemo } from 'react';
import { predictions, confidenceBands, modelFactors } from '../../data/mockData';

/* ───────────── helpers ───────────── */

const LEVEL_STYLES = {
  urgent:  { label: '🔴 Urgent',  row: 'bg-red-50/60 hover:bg-red-50',     pill: 'bg-red-100 text-red-700' },
  watch:   { label: '🟡 Watch',   row: 'bg-amber-50/40 hover:bg-amber-50', pill: 'bg-amber-100 text-amber-700' },
  ok:      { label: '🟢 OK',      row: 'hover:bg-slate-50',                pill: 'bg-green-100 text-green-700' },
  unknown: { label: '⚪ Unknown', row: 'hover:bg-slate-50',                pill: 'bg-slate-100 text-slate-600' },
};

function ConfidenceBar({ value }) {
  const color =
    value >= 85 ? 'bg-green-500' :
    value >= 70 ? 'bg-amber-500' :
    value >= 50 ? 'bg-orange-500' :
    'bg-red-500';

  const textColor =
    value >= 85 ? 'text-green-700' :
    value >= 70 ? 'text-amber-700' :
    value >= 50 ? 'text-orange-700' :
    'text-red-700';

  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 rounded-full bg-slate-200 overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className={`text-[12px] font-bold ${textColor}`}>{value}%</span>
    </div>
  );
}

/* ───────────── main ───────────── */

export default function PredictiveAnalytics() {
  const [locationFilter, setLocationFilter] = useState('all');
  const [timeframe, setTimeframe] = useState('30'); // days

  const filtered = useMemo(() => {
    return predictions.filter((p) => {
      const matchLoc = locationFilter === 'all' || p.location === locationFilter;
      const matchTime = p.daysLeft <= parseInt(timeframe);
      return matchLoc && matchTime;
    });
  }, [locationFilter, timeframe]);

  const locations = ['all', ...new Set(predictions.map((p) => p.location))];

  const counts = {
    urgent:  predictions.filter((p) => p.level === 'urgent').length,
    watch:   predictions.filter((p) => p.level === 'watch').length,
    ok:      predictions.filter((p) => p.level === 'ok').length,
    unknown: predictions.filter((p) => p.level === 'unknown').length,
  };

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">🧠 Predictive Analytics</h1>
          <p className="text-[12px] text-slate-500 mt-0.5">
            Stockout predictions based on consumption trends and data freshness
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="text-[12px] font-semibold px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-blue-500"
          >
            {locations.map((l) => (
              <option key={l} value={l}>
                {l === 'all' ? 'All Locations' : l}
              </option>
            ))}
          </select>
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="text-[12px] font-semibold px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-blue-500"
          >
            <option value="7">Next 7 days</option>
            <option value="14">Next 14 days</option>
            <option value="30">Next 30 days</option>
            <option value="60">Next 60 days</option>
          </select>
        </div>
      </div>

      {/* Summary tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <SummaryTile label="Urgent"       value={counts.urgent}  cls="bg-red-50 text-red-700 border-red-200" />
        <SummaryTile label="Watch"        value={counts.watch}   cls="bg-amber-50 text-amber-700 border-amber-200" />
        <SummaryTile label="OK"           value={counts.ok}      cls="bg-green-50 text-green-700 border-green-200" />
        <SummaryTile label="Low confidence" value={counts.unknown} cls="bg-slate-50 text-slate-600 border-slate-200" />
      </div>

      {/* Predictions table */}
      <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-[12px] font-bold text-slate-500 tracking-wider uppercase">
              Predicted Stockouts
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              {filtered.length} items in selected range
            </div>
          </div>
          <button className="text-[12px] font-semibold px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition">
            ⬇ Export CSV
          </button>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wide">
            <tr>
              <th className="text-left px-5 py-3 font-semibold">Location</th>
              <th className="text-left px-5 py-3 font-semibold">Item</th>
              <th className="text-left px-5 py-3 font-semibold">Stock Left</th>
              <th className="text-left px-5 py-3 font-semibold">Stockout</th>
              <th className="text-left px-5 py-3 font-semibold">Confidence</th>
              <th className="text-left px-5 py-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-slate-400 text-[12px]">
                  No predictions match your filters.
                </td>
              </tr>
            ) : (
              filtered.map((p) => {
                const lvl = LEVEL_STYLES[p.level];
                return (
                  <tr key={p.id} className={`border-t border-slate-100 transition ${lvl.row}`}>
                    <td className="px-5 py-3 font-semibold text-slate-800">{p.location}</td>
                    <td className="px-5 py-3">
                      <div className="text-slate-800 font-medium">{p.item}</div>
                      <div className="text-[10px] text-slate-400">
                        {p.dailyUsage} · {p.currentStock} remaining
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-[13px] font-bold text-slate-800">
                        {p.daysLeft} days
                      </span>
                      <div className="text-[10px] text-slate-400">{p.stockoutDate}</div>
                    </td>
                    <td className="px-5 py-3">
                      <ConfidenceBar value={p.confidence} />
                      <div className="text-[10px] text-slate-400 mt-1">
                        data: {p.dataAge} old
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${lvl.pill}`}>
                        {lvl.label}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="text-[11px] text-slate-600 leading-snug max-w-xs">
                        {p.recommendation}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </section>

      {/* How it works + Confidence legend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Model factors */}
        <section className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-[12px] font-bold text-slate-500 tracking-wider uppercase mb-4">
            🔍 How the Prediction Works
          </h2>
          <ul className="space-y-3">
            {modelFactors.map((f) => (
              <li key={f.label} className="flex gap-3">
                <span className="text-lg shrink-0">{f.icon}</span>
                <div>
                  <div className="text-[13px] font-semibold text-slate-800">{f.label}</div>
                  <div className="text-[11px] text-slate-500">{f.detail}</div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-5 pt-4 border-t border-slate-100">
            <div className="text-[11px] text-slate-500 leading-relaxed">
              The model recalculates automatically each time a station syncs.
              When data is old, confidence drops and the recommendation
              shifts to <span className="font-semibold">"request sync"</span> — the
              system tells you when it doesn't know.
            </div>
          </div>
        </section>

        {/* Confidence bands */}
        <section className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-[12px] font-bold text-slate-500 tracking-wider uppercase mb-4">
            📊 Confidence Levels
          </h2>
          <div className="space-y-2.5">
            {confidenceBands.map((b) => (
              <div
                key={b.age}
                className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
              >
                <span className="text-[13px] text-slate-700">
                  Data age <span className="font-semibold">{b.age}</span>
                </span>
                <span className={`text-[12px] font-bold px-3 py-0.5 rounded-full ${b.cls}`}>
                  {b.confidence} confident
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100">
            <div className="text-[11px] text-slate-500 leading-relaxed">
              When a station has not synced for over a week, the system
              flags predictions as <span className="font-semibold">low confidence</span> rather
              than showing a number it can't trust.
            </div>
          </div>
        </section>
      </div>

      {/* Quick actions */}
      <section className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="text-[12px] font-bold text-slate-500 tracking-wider uppercase mb-3">
          Quick Actions
        </div>
        <div className="flex flex-wrap gap-2">
          <QuickBtn icon="📞" label="Contact Station"  />
          <QuickBtn icon="📦" label="Plan Resupply"    />
          <QuickBtn icon="📈" label="View Trends"      />
          <QuickBtn icon="🔄" label="Force Sync All"   />
        </div>
      </section>

    </div>
  );
}

/* ───────────── local components ───────────── */

function SummaryTile({ label, value, cls }) {
  return (
    <div className={`border rounded-lg px-4 py-3 ${cls}`}>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-[11px] font-semibold mt-0.5 opacity-90">{label}</div>
    </div>
  );
}

function QuickBtn({ icon, label }) {
  return (
    <button className="text-[12px] font-semibold px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition flex items-center gap-1.5">
      <span>{icon}</span>
      {label}
    </button>
  );
}