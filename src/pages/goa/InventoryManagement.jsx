// src/pages/goa/InventoryManagement.jsx
import { useState, useMemo } from 'react';
import { stockByLocation, stockItems } from '../../data/mockData';

/* ───────────── helpers ───────────── */

const FRESHNESS_BADGE = {
  fresh:        { text: '🟢 Fresh',      cls: 'text-green-700 bg-green-50' },
  stale:        { text: '🟡 Stale',      cls: 'text-yellow-700 bg-yellow-50' },
  'very-stale': { text: '🔴 Very Stale', cls: 'text-red-700 bg-red-50' },
};

const ITEM_STATUS = {
  ok:          { label: 'OK',        cls: 'bg-green-100 text-green-700' },
  expiring:    { label: 'Expiring',  cls: 'bg-amber-100 text-amber-700' },
  'low-stock': { label: 'Low Stock', cls: 'bg-red-100 text-red-700' },
};

const FEFO_BADGE = {
  high:   { label: 'High',   cls: 'bg-red-100 text-red-700' },
  medium: { label: 'Medium', cls: 'bg-amber-100 text-amber-700' },
  low:    { label: 'Low',    cls: 'bg-slate-100 text-slate-600' },
};

/* ───────────── main ───────────── */

export default function InventoryManagement() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  return (
    <div className="p-6">
      {selectedLocation ? (
        <StockList
          location={selectedLocation}
          onBack={() => {
            setSelectedLocation(null);
            setSearch('');
            setStatusFilter('all');
          }}
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
      ) : (
        <LocationOverview onSelect={setSelectedLocation} />
      )}
    </div>
  );
}

/* ───────────── level 1: locations ───────────── */

function LocationOverview({ onSelect }) {
  const totals = stockByLocation.reduce(
    (acc, l) => ({
      items: acc.items + l.items,
      expiring: acc.expiring + l.expiring,
      lowStock: acc.lowStock + l.lowStock,
    }),
    { items: 0, expiring: 0, lowStock: 0 }
  );

  return (
    <>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
        <div>
          <h1 className="text-xl font-bold text-slate-800">📊 Inventory Management</h1>
          <p className="text-[12px] text-slate-500 mt-0.5">
            Stock across all locations · Click a location to drill down
          </p>
        </div>
        <div className="flex gap-2">
          <button className="text-[12px] font-semibold px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition">
            🔄 Cycle Count
          </button>
          <button className="text-[12px] font-semibold px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition">
            ⬇ Export
          </button>
        </div>
      </div>

      {/* Global summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <SummaryCard label="Total Items"   value={totals.items.toLocaleString()} accent="text-slate-800" />
        <SummaryCard label="Expiring soon" value={totals.expiring}               accent="text-amber-600" />
        <SummaryCard label="Low stock"     value={totals.lowStock}               accent="text-red-600" />
        <SummaryCard label="Locations"     value={stockByLocation.length}        accent="text-blue-600" />
      </div>

      {/* Location cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stockByLocation.map((loc) => {
          const badge = FRESHNESS_BADGE[loc.status];
          return (
            <button
              key={loc.location}
              onClick={() => onSelect(loc.location)}
              className="text-left bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md rounded-xl p-5 transition group"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-[15px] font-bold text-slate-800 group-hover:text-blue-700 transition">
                    {loc.location}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Last update · {loc.freshness}
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badge.cls}`}>
                  {badge.text}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100">
                <Mini label="Items"     value={loc.items}      />
                <Mini label="Expiring"  value={loc.expiring}   accent={loc.expiring > 0 ? 'text-amber-600' : ''} />
                <Mini label="Low"       value={loc.lowStock}   accent={loc.lowStock > 0 ? 'text-red-600' : ''} />
              </div>

              <div className="mt-3 text-[11px] text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition">
                View stock →
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}

function SummaryCard({ label, value, accent }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg px-4 py-3">
      <div className={`text-xl font-bold ${accent}`}>{value}</div>
      <div className="text-[11px] text-slate-500 mt-0.5">{label}</div>
    </div>
  );
}

function Mini({ label, value, accent = 'text-slate-700' }) {
  return (
    <div>
      <div className={`text-[14px] font-bold ${accent}`}>{value}</div>
      <div className="text-[10px] text-slate-400 uppercase tracking-wide">{label}</div>
    </div>
  );
}

/* ───────────── level 2: stock list ───────────── */

function StockList({ location, onBack, search, setSearch, statusFilter, setStatusFilter }) {
  const items = stockItems[location] || [];

  const filtered = useMemo(() => {
    return items.filter((it) => {
      const matchSearch =
        it.name.toLowerCase().includes(search.toLowerCase()) ||
        it.id.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        statusFilter === 'all' ? true : it.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [items, search, statusFilter]);

  const counts = {
    all:      items.length,
    ok:       items.filter((i) => i.status === 'ok').length,
    expiring: items.filter((i) => i.status === 'expiring').length,
    low:      items.filter((i) => i.status === 'low-stock').length,
  };

  return (
    <>
      {/* Back + header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <button
            onClick={onBack}
            className="text-[12px] font-semibold text-blue-600 hover:text-blue-800 mb-1"
          >
            ← All locations
          </button>
          <h1 className="text-xl font-bold text-slate-800">
            📊 {location} · Stock
          </h1>
          <p className="text-[12px] text-slate-500 mt-0.5">
            {counts.all} items tracked at this location
          </p>
        </div>
        <div className="flex gap-2">
          <button className="text-[12px] font-semibold px-3.5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
            + Add Stock
          </button>
          <button className="text-[12px] font-semibold px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition">
            🔄 Sync
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
          {[
            { id: 'all',      label: 'All',       count: counts.all },
            { id: 'ok',       label: 'OK',        count: counts.ok },
            { id: 'expiring', label: 'Expiring',  count: counts.expiring },
            { id: 'low-stock',label: 'Low Stock', count: counts.low },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setStatusFilter(t.id)}
              className={`text-[12px] font-semibold px-3 py-1.5 rounded-md transition flex items-center gap-1.5 ${
                statusFilter === t.id
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {t.label}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                statusFilter === t.id ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-600'
              }`}>
                {t.count}
              </span>
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search item…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-[12px] w-64 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wide">
            <tr>
              <th className="text-left px-5 py-3 font-semibold">Item</th>
              <th className="text-left px-5 py-3 font-semibold">Quantity</th>
              <th className="text-left px-5 py-3 font-semibold">Expiry</th>
              <th className="text-left px-5 py-3 font-semibold">Shelf</th>
              <th className="text-left px-5 py-3 font-semibold">FEFO</th>
              <th className="text-left px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-slate-400 text-[12px]">
                  No items match your filter.
                </td>
              </tr>
            ) : (
              filtered.map((it) => {
                const st = ITEM_STATUS[it.status];
                const fefo = FEFO_BADGE[it.fefo];
                return (
                  <tr key={it.id} className="border-t border-slate-100 hover:bg-slate-50 transition">
                    <td className="px-5 py-3">
                      <div className="font-semibold text-slate-800">{it.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{it.id}</div>
                    </td>
                    <td className="px-5 py-3 text-slate-700 font-medium">{it.qty}</td>
                    <td className="px-5 py-3 text-slate-600 text-[12px]">{it.expiry}</td>
                    <td className="px-5 py-3 text-slate-600 text-[12px]">{it.shelf}</td>
                    <td className="px-5 py-3">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${fefo.cls}`}>
                        {fefo.label}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${st.cls}`}>
                        {st.label}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button className="text-[12px] font-semibold text-blue-600 hover:underline">
                        Issue →
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-[11px] text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500"></span> OK — sufficient stock
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span> Expiring — within 60 days
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500"></span> Low Stock — below reorder
        </span>
        <span className="ml-auto font-semibold">
          FEFO = First Expiry First Out priority
        </span>
      </div>
    </>
  );
}