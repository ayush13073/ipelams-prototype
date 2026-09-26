// src/pages/goa/CargoManagement.jsx
import { useState, useMemo } from 'react';
import { cargoShipments } from '../../data/mockData';

/* ───────────── helpers ───────────── */

const STATUS_STYLES = {
  'In Transit (Sea)': { cls: 'bg-blue-100 text-blue-700',    dot: 'bg-blue-500' },
  'In Transit (Hub)': { cls: 'bg-indigo-100 text-indigo-700',dot: 'bg-indigo-500' },
  'Arrived':          { cls: 'bg-green-100 text-green-700',  dot: 'bg-green-500' },
  'In Warehouse':     { cls: 'bg-amber-100 text-amber-700',  dot: 'bg-amber-500' },
  'Packed':           { cls: 'bg-purple-100 text-purple-700',dot: 'bg-purple-500' },
};

const PRIORITY_STYLES = {
  urgent: 'bg-red-100 text-red-700',
  high:   'bg-orange-100 text-orange-700',
  normal: 'bg-slate-100 text-slate-600',
};

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || { cls: 'bg-slate-100 text-slate-600', dot: 'bg-slate-400' };
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${s.cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}

/* ───────────── main component ───────────── */

export default function CargoManagement() {
  const [selectedId, setSelectedId] = useState(null);
  const [filter, setFilter] = useState('all'); // all | transit | arrived | warehouse
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return cargoShipments.filter((s) => {
      const matchSearch =
        s.id.toLowerCase().includes(search.toLowerCase()) ||
        s.item.toLowerCase().includes(search.toLowerCase()) ||
        s.destination.toLowerCase().includes(search.toLowerCase());

      const matchFilter =
        filter === 'all' ? true :
        filter === 'transit' ? s.status.includes('Transit') :
        filter === 'arrived' ? s.status === 'Arrived' :
        filter === 'warehouse' ? (s.status === 'In Warehouse' || s.status === 'Packed') :
        true;

      return matchSearch && matchFilter;
    });
  }, [filter, search]);

  const selected = cargoShipments.find((s) => s.id === selectedId);

  return (
    <div className="p-6">
      {selected ? (
        <DetailView shipment={selected} onBack={() => setSelectedId(null)} />
      ) : (
        <ListView
          shipments={filtered}
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
          onSelect={setSelectedId}
        />
      )}
    </div>
  );
}

/* ───────────── list view ───────────── */

function ListView({ shipments, filter, setFilter, search, setSearch, onSelect }) {
  const tabs = [
    { id: 'all',       label: 'All',         count: cargoShipments.length },
    { id: 'transit',   label: 'In Transit',  count: cargoShipments.filter((s) => s.status.includes('Transit')).length },
    { id: 'arrived',   label: 'Arrived',     count: cargoShipments.filter((s) => s.status === 'Arrived').length },
    { id: 'warehouse', label: 'At Goa',      count: cargoShipments.filter((s) => s.status === 'In Warehouse' || s.status === 'Packed').length },
  ];

  return (
    <>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
        <div>
          <h1 className="text-xl font-bold text-slate-800">📦 Cargo Management</h1>
          <p className="text-[12px] text-slate-500 mt-0.5">
            Track every shipment from Goa manifest to station shelf
          </p>
        </div>
        <div className="flex gap-2">
          <button className="text-[12px] font-semibold px-3.5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
            + Create Shipment
          </button>
          <button className="text-[12px] font-semibold px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition">
            📷 Scan
          </button>
          <button className="text-[12px] font-semibold px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition">
            ⬇ Export
          </button>
        </div>
      </div>

      {/* Filter tabs + search */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setFilter(t.id)}
              className={`text-[12px] font-semibold px-3 py-1.5 rounded-md transition flex items-center gap-1.5 ${
                filter === t.id
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {t.label}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                filter === t.id ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-600'
              }`}>
                {t.count}
              </span>
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search ID, item, or destination…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-[12px] w-72 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wide">
            <tr>
              <th className="text-left px-5 py-3 font-semibold">Shipment</th>
              <th className="text-left px-5 py-3 font-semibold">Item</th>
              <th className="text-left px-5 py-3 font-semibold">Dest</th>
              <th className="text-left px-5 py-3 font-semibold">Priority</th>
              <th className="text-left px-5 py-3 font-semibold">Status</th>
              <th className="text-left px-5 py-3 font-semibold">Last Update</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {shipments.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-slate-400 text-[12px]">
                  No shipments match your filter.
                </td>
              </tr>
            ) : (
              shipments.map((s) => (
                <tr
                  key={s.id}
                  onClick={() => onSelect(s.id)}
                  className="border-t border-slate-100 hover:bg-slate-50 cursor-pointer transition"
                >
                  <td className="px-5 py-3 font-mono font-semibold text-slate-800">{s.id}</td>
                  <td className="px-5 py-3 text-slate-700">{s.item}</td>
                  <td className="px-5 py-3 text-slate-600 font-medium">{s.destination}</td>
                  <td className="px-5 py-3">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${PRIORITY_STYLES[s.priority]}`}>
                      {s.priority}
                    </span>
                  </td>
                  <td className="px-5 py-3"><StatusBadge status={s.status} /></td>
                  <td className="px-5 py-3 text-slate-500 text-[12px]">{s.lastUpdate}</td>
                  <td className="px-5 py-3 text-right">
                    <span className="text-blue-600 text-[12px] font-semibold">View →</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Summary strip */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <MiniStat label="Total Shipments" value={cargoShipments.length} />
        <MiniStat label="In Transit"      value={cargoShipments.filter((s) => s.status.includes('Transit')).length} accent="text-blue-600" />
        <MiniStat label="Arrived"         value={cargoShipments.filter((s) => s.status === 'Arrived').length} accent="text-green-600" />
        <MiniStat label="At Goa"          value={cargoShipments.filter((s) => s.status === 'In Warehouse' || s.status === 'Packed').length} accent="text-amber-600" />
      </div>
    </>
  );
}

function MiniStat({ label, value, accent = 'text-slate-800' }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg px-4 py-3">
      <div className={`text-xl font-bold ${accent}`}>{value}</div>
      <div className="text-[11px] text-slate-500 mt-0.5">{label}</div>
    </div>
  );
}

/* ───────────── detail view ───────────── */

function DetailView({ shipment, onBack }) {
  const s = shipment;

  return (
    <>
      {/* Back + actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <button
          onClick={onBack}
          className="text-[12px] font-semibold text-blue-600 hover:text-blue-800"
        >
          ← Back to shipments
        </button>
        <div className="flex gap-2">
          <ActionBtn label="Edit"           icon="✏️" />
          <ActionBtn label="Add Document"   icon="📎" />
          <ActionBtn label="Print Manifest" icon="🖨" />
          <ActionBtn label="Sync"           icon="🔄" primary />
        </div>
      </div>

      {/* Header card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="font-mono text-[12px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                {s.id}
              </span>
              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${PRIORITY_STYLES[s.priority]}`}>
                {s.priority} priority
              </span>
            </div>
            <h1 className="text-xl font-bold text-slate-800">{s.item}</h1>
            <p className="text-[12px] text-slate-500 mt-1">
              Destination · <span className="font-semibold text-slate-700">{s.destination}</span>
            </p>
          </div>
          <StatusBadge status={s.status} />
        </div>

        {/* Meta grid */}
        <div className="mt-5 pt-5 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Meta label="Weight"      value={`${s.weight} kg`} />
          <Meta label="Dimensions"  value={s.dimensions} />
          <Meta label="Container"   value={s.container || '—'} mono />
          <Meta label="Vessel"      value={s.vessel || '—'} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Chain of custody — 2 cols */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[12px] font-bold text-slate-500 tracking-wider uppercase">
              🔗 Chain of Custody
            </h2>
            <span className="text-[11px] text-slate-400">
              {s.scans.length} events
            </span>
          </div>

          <ol className="relative border-l-2 border-slate-200 ml-2 space-y-5">
            {s.scans.map((scan, i) => {
              const isLast = i === s.scans.length - 1;
              return (
                <li key={i} className="ml-5">
                  <span className={`absolute -left-[7px] w-3.5 h-3.5 rounded-full border-2 border-white shadow ${
                    isLast ? 'bg-blue-500 ring-4 ring-blue-100' : 'bg-green-500'
                  }`} />
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="text-[13px] font-semibold text-slate-800">
                      {scan.stage}
                    </div>
                    <div className="text-[11px] text-slate-400 whitespace-nowrap">
                      {scan.when}
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    📍 {scan.at} · 👤 {scan.by}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Right column */}
        <div className="space-y-5">

          {/* Customs */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-[12px] font-bold text-slate-500 tracking-wider uppercase mb-2">
              🛃 Customs
            </h3>
            <div className={`text-[12px] font-semibold ${
              s.customs.toLowerCase().includes('cleared') ? 'text-green-700' :
              s.customs.toLowerCase().includes('pending') ? 'text-amber-700' :
              'text-slate-600'
            }`}>
              {s.customs}
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-[12px] font-bold text-slate-500 tracking-wider uppercase mb-3">
              📎 Documents
            </h3>
            <ul className="space-y-2">
              {s.documents.map((d) => (
                <li key={d} className="flex items-center justify-between text-[12px]">
                  <span className="text-slate-700 flex items-center gap-2">
                    <span>📄</span> {d}
                  </span>
                  <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
                    View
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Created */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-[12px] font-bold text-slate-500 tracking-wider uppercase mb-2">
              🕐 Created
            </h3>
            <div className="text-[12px] text-slate-700">
              by <span className="font-semibold">{s.created.by}</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">{s.created.at}</div>
          </div>
        </div>
      </div>
    </>
  );
}

function Meta({ label, value, mono }) {
  return (
    <div>
      <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
        {label}
      </div>
      <div className={`text-[13px] font-semibold text-slate-800 mt-1 ${mono ? 'font-mono' : ''}`}>
        {value}
      </div>
    </div>
  );
}

function ActionBtn({ label, icon, primary }) {
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
