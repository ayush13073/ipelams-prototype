// src/mobile/station/StationScan.jsx
import { useState } from 'react';
import Scanner from '../shared/Scanner';

const MOCK_SCANS = {
  item: {
    type: 'item',
    id: 'ITM-3001',
    name: 'Frozen Food (Mixed)',
    location: 'Store A · 3',
    expiry: '2 days',
    status: 'opened',
    actions: ['Issue', 'Report Expiry', 'Cycle Count'],
  },
  container: {
    type: 'container',
    id: 'CNT-2048',
    name: 'Spare Parts Container',
    itemCount: 12,
    weight: '245 kg',
    shelf: 'Store B · 2',
    actions: ['Open Container', 'Load', 'Transfer'],
  },
  person: {
    type: 'person',
    id: 'STF-1024',
    name: 'Rahul Sharma',
    role: 'Station Staff',
    location: 'Warehouse B',
    status: 'inside · since 09:42',
    actions: ['Check Out', 'View Movement'],
  },
};

export default function StationScan() {
  const [result, setResult] = useState(null);

  const scan = (type) => {
    setResult(MOCK_SCANS[type]);
  };

  return (
    <div className="p-4">
      <h2 className="text-base font-bold text-slate-800 mb-3">Scan</h2>

      <Scanner label="Scan any QR · Person, Item, Container" onScan={() => scan('item')} accent="emerald" />

      <div className="mt-3 grid grid-cols-3 gap-2">
        <SimBtn label="Person"    icon="👤" onClick={() => scan('person')} />
        <SimBtn label="Item"      icon="📦" onClick={() => scan('item')} />
        <SimBtn label="Container" icon="🗃️" onClick={() => scan('container')} />
      </div>

      {result && <ResultCard result={result} onClear={() => setResult(null)} />}
    </div>
  );
}

function SimBtn({ label, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="border border-slate-200 rounded-lg py-2.5 text-[11px] font-semibold text-slate-700 hover:border-emerald-400 hover:bg-emerald-50/40 transition"
    >
      <div className="text-lg">{icon}</div>
      <div className="mt-0.5">{label}</div>
    </button>
  );
}

function ResultCard({ result, onClear }) {
  return (
    <div className="mt-4 bg-white border border-emerald-300 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-emerald-50 px-3 py-2.5 flex items-center justify-between border-b border-emerald-200">
        <div className="flex items-center gap-2">
          <span className="text-base">
            {result.type === 'person' ? '👤' : result.type === 'container' ? '🗃️' : '📦'}
          </span>
          <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
            {result.type}
          </div>
        </div>
        <button onClick={onClear} className="text-slate-400 hover:text-red-600 text-lg leading-none">×</button>
      </div>

      {/* Body */}
      <div className="p-3 space-y-1.5">
        <div className="text-[14px] font-bold text-slate-800">{result.name}</div>
        <div className="text-[11px] text-slate-500 font-mono">{result.id}</div>

        <div className="pt-2 mt-2 border-t border-slate-100 grid grid-cols-2 gap-3 text-[11px]">
          {result.type === 'person' && (
            <>
              <Info label="Role"     value={result.role} />
              <Info label="Location" value={result.location} />
              <Info label="Status"   value={result.status} span />
            </>
          )}
          {result.type === 'item' && (
            <>
              <Info label="Location" value={result.location} />
              <Info label="Expiry"   value={result.expiry} accent="text-amber-700" />
              <Info label="Status"   value={result.status} span />
            </>
          )}
          {result.type === 'container' && (
            <>
              <Info label="Items"  value={result.itemCount} />
              <Info label="Weight" value={result.weight} />
              <Info label="Shelf"  value={result.shelf} span />
            </>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="px-3 pb-3 space-y-1.5">
        {result.actions.map((a, i) => (
          <button
            key={a}
            className={`w-full py-2.5 rounded-lg text-[11px] font-bold transition ${
              i === 0
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {a}
          </button>
        ))}
      </div>

      <div className="px-3 pb-3 text-[10px] text-amber-700 font-semibold text-center">
        ⏳ Actions save locally · sync when online
      </div>
    </div>
  );
}

function Info({ label, value, accent = 'text-slate-800', span }) {
  return (
    <div className={span ? 'col-span-2' : ''}>
      <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{label}</div>
      <div className={`text-[12px] font-semibold mt-0.5 ${accent}`}>{value}</div>
    </div>
  );
}