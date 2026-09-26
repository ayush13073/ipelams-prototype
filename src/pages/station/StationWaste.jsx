// src/pages/station/StationWaste.jsx
import { useState, useMemo } from 'react';
import {
  stationWasteSummary,
  wasteCategories,
  wasteStatusBadge,
  incinerationLog,
  backhaulQueue,
  backhaulStatusBadge,
} from '../../data/stationData';

/* ───────────── helpers ───────────── */

const HAZARD_BADGE = {
  low:    { label: 'Low',    cls: 'bg-slate-100 text-slate-600' },
  medium: { label: 'Medium', cls: 'bg-amber-100 text-amber-700' },
  high:   { label: 'High',   cls: 'bg-red-100 text-red-700' },
};

/* ───────────── main ───────────── */

export default function StationWaste() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview',   label: 'Overview',       count: null },
    { id: 'incineration', label: 'Incineration', count: incinerationLog.length },
    { id: 'backhaul',   label: 'Backhaul Queue', count: backhaulQueue.length },
  ];

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">🗑️ Waste Management</h1>
          <p className="text-[12px] text-slate-500 mt-0.5">
            Maitri Station · Antarctic Treaty compliance · Local operations
          </p>
        </div>
        <div className="flex gap-2">
          <button className="text-[12px] font-semibold px-3.5 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition">
            + Add Waste
          </button>
          <button className="text-[12px] font-semibold px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition">
            🖨 Print Manifest
          </button>
        </div>
      </div>

      {/* Summary strip */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <SummaryTile label="Total Waste"     value={`${stationWasteSummary.totalKg} kg`}   accent="text-slate-800" />
        <SummaryTile label="Hazardous"       value={`${stationWasteSummary.hazardousKg} kg`} accent="text-red-600" />
        <SummaryTile label="Backhaul Queued" value={`${stationWasteSummary.backhaulKg} kg`} accent="text-blue-600" />
        <SummaryTile label="Incinerated"     value={`${stationWasteSummary.incineratedKg} kg`} accent="text-amber-600" />
      </section>

      {/* Storage capacity alert */}
      <StorageCapacityCard />

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-lg p-1 w-fit">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`text-[12px] font-semibold px-4 py-2 rounded-md transition flex items-center gap-2 ${
              activeTab === t.id
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {t.label}
            {t.count !== null && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                activeTab === t.id ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
              }`}>
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'overview' && <OverviewTab />}
      {activeTab === 'incineration' && <IncinerationTab />}
      {activeTab === 'backhaul' && <BackhaulTab />}

      {/* Compliance footer */}
      <section className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <span className="text-xl">🌍</span>
          <div>
            <div className="text-[13px] font-bold text-emerald-800">
              Antarctic Treaty · Annex III · Waste Management
            </div>
            <div className="text-[11px] text-emerald-700 mt-1 leading-relaxed">
              All waste is categorized, tracked and reported. Incinerable waste is burned
              on-site per protocol. Non-incinerable waste (plastic, glass, metal, hazardous)
              is backhauled to India for final disposal. Every step is logged and auditable.
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

/* ───────────── sub-tabs ───────────── */

function OverviewTab() {
  const totals = useMemo(() => {
    const incinerable = wasteCategories.filter((c) => c.incinerable).reduce((s, c) => s + c.weight, 0);
    const backhaul = wasteCategories.filter((c) => c.backhaul).reduce((s, c) => s + c.weight, 0);
    return { incinerable, backhaul };
  }, []);

  return (
    <>
      {/* Category cards */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-[12px] font-bold text-slate-500 tracking-wider uppercase">
              Waste by Category
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Segregated at source · {wasteCategories.length} categories
            </p>
          </div>
          <div className="flex gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Incinerable · {totals.incinerable} kg
            </span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Backhaul · {totals.backhaul} kg
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {wasteCategories.map((c) => {
            const st = wasteStatusBadge[c.status];
            const hz = HAZARD_BADGE[c.hazardLevel];
            return (
              <div
                key={c.id}
                className={`bg-white border rounded-xl p-4 transition hover:shadow-md ${
                  c.hazardLevel === 'high' ? 'border-red-200' : 'border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-2xl">{c.icon}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${hz.cls}`}>
                    {hz.label}
                  </span>
                </div>

                <div className="mt-3">
                  <div className="text-[13px] font-bold text-slate-800">{c.label}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Storage · {c.storage}
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-end justify-between">
                  <div>
                    <div className="text-2xl font-bold text-slate-800">{c.weight}</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">kg</div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${st.cls}`}>
                    {st.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

function IncinerationTab() {
  const totalIncinerated = incinerationLog.reduce((s, e) => s + e.weightKg, 0);

  return (
    <>
      {/* Sub-summary */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <MiniStat label="Burns logged"     value={incinerationLog.length} />
        <MiniStat label="Total incinerated" value={`${totalIncinerated} kg`} />
        <MiniStat label="Last burn"        value="2 days ago" />
        <MiniStat label="Next scheduled"   value="Tomorrow 14:00" accent="text-emerald-600" />
      </section>

      {/* Log table */}
      <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-[12px] font-bold text-slate-500 tracking-wider uppercase">
              Incineration Log
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Every burn recorded with operator, weight and category
            </p>
          </div>
          <button className="text-[12px] font-semibold px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition">
            + Log New Burn
          </button>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wide">
            <tr>
              <th className="text-left px-5 py-3 font-semibold">Date</th>
              <th className="text-left px-5 py-3 font-semibold">Category</th>
              <th className="text-left px-5 py-3 font-semibold">Weight</th>
              <th className="text-left px-5 py-3 font-semibold">Operator</th>
              <th className="text-left px-5 py-3 font-semibold">Notes</th>
            </tr>
          </thead>
          <tbody>
            {incinerationLog.map((e) => (
              <tr key={e.id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="px-5 py-3 text-slate-600 text-[12px]">{e.at}</td>
                <td className="px-5 py-3 font-semibold text-slate-800">{e.category}</td>
                <td className="px-5 py-3 font-bold text-slate-800">{e.weightKg} kg</td>
                <td className="px-5 py-3 text-slate-700">{e.by}</td>
                <td className="px-5 py-3 text-slate-500 text-[12px]">{e.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="text-[11px] text-slate-500 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500" />
        All incineration records are saved locally and queued for sync to Goa.
      </div>
    </>
  );
}

function BackhaulTab() {
  const totalBackhaul = backhaulQueue.reduce((s, b) => s + b.weight, 0);
  const staged = backhaulQueue.filter((b) => b.status === 'staged').length;
  const pending = backhaulQueue.filter((b) => b.status === 'awaiting-permit').length;
  const cleared = backhaulQueue.filter((b) => b.status === 'permit-cleared').length;

  return (
    <>
      {/* Sub-summary */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <MiniStat label="Total to ship" value={`${totalBackhaul} kg`} />
        <MiniStat label="Staged"        value={staged}  accent="text-blue-600" />
        <MiniStat label="Awaiting permit" value={pending} accent="text-amber-600" />
        <MiniStat label="Permit cleared" value={cleared} accent="text-green-600" />
      </section>

      {/* Queue table */}
      <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-[12px] font-bold text-slate-500 tracking-wider uppercase">
              Backhaul Queue
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Waste awaiting the return vessel to India
            </p>
          </div>
          <button className="text-[12px] font-semibold px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition">
            🖨 Print Manifest
          </button>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wide">
            <tr>
              <th className="text-left px-5 py-3 font-semibold">Batch</th>
              <th className="text-left px-5 py-3 font-semibold">Category</th>
              <th className="text-left px-5 py-3 font-semibold">Weight</th>
              <th className="text-left px-5 py-3 font-semibold">Route</th>
              <th className="text-left px-5 py-3 font-semibold">Vessel</th>
              <th className="text-left px-5 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {backhaulQueue.map((b) => {
              const st = backhaulStatusBadge[b.status];
              return (
                <tr
                  key={b.id}
                  className={`border-t border-slate-100 transition ${
                    b.status === 'awaiting-permit' ? 'bg-amber-50/40 hover:bg-amber-50' : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="px-5 py-3 font-mono font-semibold text-slate-800">{b.id}</td>
                  <td className="px-5 py-3 text-slate-700 font-medium">{b.category}</td>
                  <td className="px-5 py-3 font-bold text-slate-800">{b.weight} kg</td>
                  <td className="px-5 py-3 text-slate-600 text-[12px]">
                    <div>{b.origin} → {b.destination}</div>
                  </td>
                  <td className="px-5 py-3 text-slate-600 text-[12px]">
                    <div>{b.vessel}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">ETA · {b.vesselETA}</div>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${st.cls}`}>
                      {st.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      {/* Return journey strip */}
      <section className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="text-[12px] font-bold text-slate-500 tracking-wider uppercase mb-4">
          Return Journey
        </div>
        <div className="flex items-center justify-between gap-2">
          {[
            { label: 'Maitri',    sub: 'Staging',       done: true },
            { label: 'Return Vessel', sub: 'MV Vasily Golovnin', done: false },
            { label: 'Cape Town',  sub: 'Hub · transit', done: false },
            { label: 'India',      sub: 'Customs',       done: false },
            { label: 'Final Disposal', sub: 'Certified', done: false },
          ].map((s, i, arr) => (
            <div key={s.label} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold ${
                  s.done ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'
                }`}>
                  {s.done ? '✓' : i + 1}
                </div>
                <div className="text-[11px] font-semibold text-slate-700 mt-2 text-center">
                  {s.label}
                </div>
                <div className="text-[10px] text-slate-400 text-center">{s.sub}</div>
              </div>
              {i < arr.length - 1 && (
                <div className={`flex-1 h-0.5 rounded-full ${
                  s.done ? 'bg-emerald-400' : 'bg-slate-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

/* ───────────── small components ───────────── */

function StorageCapacityCard() {
  const { storagePercent, storageCapacityKg, totalKg } = stationWasteSummary;
  const isWarning = storagePercent >= 80;

  return (
    <section
      className={`rounded-xl border p-5 ${
        isWarning ? 'bg-red-50 border-red-300' : 'bg-white border-slate-200'
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div>
          <div className={`text-[11px] font-bold uppercase tracking-wider ${
            isWarning ? 'text-red-700' : 'text-slate-500'
          }`}>
            {isWarning ? '⚠ Storage Capacity Warning' : 'Storage Capacity'}
          </div>
          <div className="text-[13px] font-semibold text-slate-800 mt-0.5">
            {totalKg} kg of {storageCapacityKg} kg used
          </div>
        </div>
        <div className={`text-3xl font-bold ${isWarning ? 'text-red-600' : 'text-slate-800'}`}>
          {storagePercent}%
        </div>
      </div>

      <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${
            storagePercent >= 90 ? 'bg-red-500' :
            storagePercent >= 80 ? 'bg-orange-500' :
            storagePercent >= 60 ? 'bg-amber-500' :
            'bg-emerald-500'
          }`}
          style={{ width: `${storagePercent}%` }}
        />
      </div>

      {isWarning && (
        <div className="mt-3 text-[11px] text-red-700 font-semibold flex items-center gap-2">
          <span>📌</span>
          Plan incineration or backhaul soon — station storage is limited.
        </div>
      )}
    </section>
  );
}

function SummaryTile({ label, value, accent }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg px-4 py-3">
      <div className={`text-lg font-bold ${accent}`}>{value}</div>
      <div className="text-[11px] text-slate-500 mt-0.5">{label}</div>
    </div>
  );
}

function MiniStat({ label, value, accent = 'text-slate-800' }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg px-4 py-3">
      <div className={`text-base font-bold ${accent}`}>{value}</div>
      <div className="text-[11px] text-slate-500 mt-0.5">{label}</div>
    </div>
  );
}