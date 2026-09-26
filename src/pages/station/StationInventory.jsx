// src/pages/station/StationInventory.jsx
import { useState, useMemo } from 'react';
import { stationStock, stationCategories } from '../../data/stationData';

/* ───────────── helpers ───────────── */

const STATUS_BADGE = {
  ok:          { label: 'OK',        cls: 'bg-green-100 text-green-700' },
  expiring:    { label: 'Expiring',  cls: 'bg-amber-100 text-amber-700' },
  'low-stock': { label: 'Low Stock', cls: 'bg-red-100 text-red-700' },
};

const FEFO_BADGE = {
  high:   { label: 'High',   cls: 'bg-red-100 text-red-700' },
  medium: { label: 'Medium', cls: 'bg-amber-100 text-amber-700' },
  low:    { label: 'Low',    cls: 'bg-slate-100 text-slate-600' },
};

const CATEGORY_ICON = {
  Food:    '🍱',
  Medical: '🏥',
  Fuel:    '⛽',
  Spares:  '🔧',
};

function expiryLabel(days) {
  if (days === null) return { text: 'N/A', cls: 'text-slate-400' };
  if (days <= 7)  return { text: `${days} days ⚠`, cls: 'text-red-600 font-bold' };
  if (days <= 45) return { text: `${days} days`,   cls: 'text-amber-600 font-semibold' };
  if (days <= 90) return { text: `${days} days`,   cls: 'text-slate-600' };
  return { text: `${days} days`, cls: 'text-slate-500' };
}

/* ───────────── main ───────────── */

export default function StationInventory() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const [issueItemId, setIssueItemId] = useState(null);
  const [stock, setStock] = useState(stationStock);

  const filtered = useMemo(() => {
    return stock.filter((it) => {
      const matchSearch =
        it.name.toLowerCase().includes(search.toLowerCase()) ||
        it.id.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === 'all' || it.category === category;
      const matchStatus = statusFilter === 'all' || it.status === statusFilter;
      return matchSearch && matchCat && matchStatus;
    });
  }, [stock, search, category, statusFilter]);

  const counts = {
    all:         stock.length,
    ok:          stock.filter((i) => i.status === 'ok').length,
    expiring:    stock.filter((i) => i.status === 'expiring').length,
    'low-stock': stock.filter((i) => i.status === 'low-stock').length,
  };

  const issueItem = stock.find((s) => s.id === issueItemId);

  const handleIssue = (itemId, quantity) => {
    setStock((prev) =>
      prev.map((it) => {
        if (it.id !== itemId) return it;
        const newQty = Math.max(0, it.qty - quantity);
        // auto-update status if it drops below reorder
        let newStatus = it.status;
        if (it.reorderAt && newQty <= it.reorderAt) newStatus = 'low-stock';
        return { ...it, qty: newQty, status: newStatus };
      })
    );
    setIssueItemId(null);
  };

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
        <div>
          <h1 className="text-xl font-bold text-slate-800">📊 Local Inventory</h1>
          <p className="text-[12px] text-slate-500 mt-0.5">
            Maitri Station · {stock.length} items · FEFO priority active
          </p>
        </div>
        <div className="flex gap-2">
          <button className="text-[12px] font-semibold px-3.5 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition">
            📷 Scan
          </button>
          <button className="text-[12px] font-semibold px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition">
            🔄 Cycle Count
          </button>
        </div>
      </div>

      {/* Summary tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <SummaryTile label="Total Items"   value={counts.all}         accent="text-slate-800" />
        <SummaryTile label="Expiring"      value={counts.expiring}    accent="text-amber-600" />
        <SummaryTile label="Low Stock"     value={counts['low-stock']} accent="text-red-600" />
        <SummaryTile label="Categories"    value={stationCategories.length} accent="text-blue-600" />
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap items-center gap-3 mb-4">

        {/* Status tabs */}
        <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
          {[
            { id: 'all',         label: 'All',       count: counts.all },
            { id: 'ok',          label: 'OK',        count: counts.ok },
            { id: 'expiring',    label: 'Expiring',  count: counts.expiring },
            { id: 'low-stock',   label: 'Low',       count: counts['low-stock'] },
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
                statusFilter === t.id ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
              }`}>
                {t.count}
              </span>
            </button>
          ))}
        </div>

        {/* Category chips */}
        <div className="flex gap-1.5">
          <button
            onClick={() => setCategory('all')}
            className={`text-[11px] font-semibold px-2.5 py-1.5 rounded-md border transition ${
              category === 'all'
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                : 'border-slate-200 text-slate-500 hover:border-slate-300'
            }`}
          >
            All
          </button>
          {stationCategories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`text-[11px] font-semibold px-2.5 py-1.5 rounded-md border transition flex items-center gap-1 ${
                category === c
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-slate-200 text-slate-500 hover:border-slate-300'
              }`}
            >
              <span>{CATEGORY_ICON[c]}</span>
              {c}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search item…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ml-auto text-[12px] w-56 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
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
                const st = STATUS_BADGE[it.status];
                const fefo = FEFO_BADGE[it.fefo];
                const exp = expiryLabel(it.expiryDays);
                const isLow = it.status === 'low-stock';
                return (
                  <tr
                    key={it.id}
                    className={`border-t border-slate-100 transition ${
                      isLow ? 'bg-red-50/30 hover:bg-red-50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <span>{CATEGORY_ICON[it.category]}</span>
                        <div>
                          <div className="font-semibold text-slate-800">{it.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{it.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="font-bold text-slate-800">
                        {it.qty.toLocaleString()} <span className="text-[11px] font-normal text-slate-500">{it.unit}</span>
                      </div>
                      {it.reorderAt && (
                        <div className="text-[10px] text-slate-400">
                          reorder at {it.reorderAt}
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <div className="text-[12px] text-slate-600">{it.expiry}</div>
                      <div className={`text-[11px] ${exp.cls}`}>{exp.text}</div>
                    </td>
                    <td className="px-5 py-3 text-[12px] text-slate-600">{it.shelf}</td>
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
                      <button
                        onClick={() => setIssueItemId(it.id)}
                        className="text-[12px] font-bold text-emerald-700 hover:text-emerald-900 hover:underline"
                      >
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
          <span className="w-2 h-2 rounded-full bg-red-500"></span> Low stock — below reorder
        </span>
        <span className="ml-auto font-semibold">
          FEFO = First Expiry First Out
        </span>
      </div>

      {/* Issue modal */}
      {issueItem && (
        <IssueModal
          item={issueItem}
          onClose={() => setIssueItemId(null)}
          onIssue={handleIssue}
        />
      )}
    </div>
  );
}

function SummaryTile({ label, value, accent }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg px-4 py-3">
      <div className={`text-xl font-bold ${accent}`}>{value}</div>
      <div className="text-[11px] text-slate-500 mt-0.5">{label}</div>
    </div>
  );
}

/* ───────────── Issue Modal ───────────── */

function IssueModal({ item, onClose, onIssue }) {
  const [qty, setQty] = useState(1);
  const [issuedTo, setIssuedTo] = useState('');
  const [notes, setNotes] = useState('');

  const maxQty = item.qty;
  const newQty = item.qty - qty;
  const willBeLow = item.reorderAt && newQty <= item.reorderAt;

  const canSubmit = qty > 0 && qty <= maxQty && issuedTo.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">

        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
              Issue Item
            </div>
            <h2 className="text-base font-bold text-slate-800 mt-0.5">
              {item.name}
            </h2>
            <div className="text-[10px] text-slate-400 font-mono">{item.id}</div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 text-lg"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">

          {/* Current stock */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-center justify-between">
            <span className="text-[12px] text-slate-500">Current stock</span>
            <span className="text-[14px] font-bold text-slate-800">
              {item.qty.toLocaleString()} {item.unit}
            </span>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              Quantity to issue
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-9 h-9 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 font-bold"
              >
                −
              </button>
              <input
                type="number"
                min="1"
                max={maxQty}
                value={qty}
                onChange={(e) => setQty(Math.min(maxQty, Math.max(1, parseInt(e.target.value) || 1)))}
                className="flex-1 text-center text-[15px] font-bold px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
              <button
                onClick={() => setQty(Math.min(maxQty, qty + 1))}
                className="w-9 h-9 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 font-bold"
              >
                +
              </button>
              <button
                onClick={() => setQty(maxQty)}
                className="text-[10px] font-semibold px-2 py-1 rounded border border-slate-300 text-slate-500 hover:bg-slate-50"
              >
                Max
              </button>
            </div>
          </div>

          {/* Issued to */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              Issued to
            </label>
            <input
              type="text"
              value={issuedTo}
              onChange={(e) => setIssuedTo(e.target.value)}
              placeholder="e.g. Dr. Sharma · Scientist team"
              className="w-full text-[12px] px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Purpose, project code, etc."
              className="w-full text-[12px] px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 resize-none"
            />
          </div>

          {/* Preview */}
          <div className="pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-slate-500">New stock after issue</span>
              <span className={`text-[14px] font-bold ${willBeLow ? 'text-red-600' : 'text-slate-800'}`}>
                {newQty.toLocaleString()} {item.unit}
              </span>
            </div>
            {willBeLow && (
              <div className="mt-2 text-[11px] text-red-600 font-semibold flex items-center gap-1.5">
                ⚠ Will drop below reorder threshold ({item.reorderAt})
              </div>
            )}
          </div>

          {/* Offline notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2.5">
            <span className="text-base shrink-0">📡</span>
            <div className="text-[11px] text-amber-800 leading-snug">
              <b>Will be saved locally.</b> The issue record will sync to Goa
              when satellite link is restored.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex gap-2 justify-end bg-slate-50">
          <button
            onClick={onClose}
            className="text-[12px] font-semibold px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
          >
            Cancel
          </button>
          <button
            disabled={!canSubmit}
            onClick={() => onIssue(item.id, qty)}
            className={`text-[12px] font-bold px-5 py-2 rounded-lg transition ${
              canSubmit
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            ✅ Confirm Issue
          </button>
        </div>
      </div>
    </div>
  );
}