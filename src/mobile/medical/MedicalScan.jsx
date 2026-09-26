// src/mobile/medical/MedicalScan.jsx
import { useState } from 'react';
import Scanner from '../shared/Scanner';

const MOCK = {
  medicine: {
    type: 'medicine',
    name: 'Paracetamol 500mg',
    batch: 'PCM-2048',
    quantity: 100,
    unit: 'tablets',
    location: 'Medical Store · Shelf 2',
    opened: '18 Sep 2026',
    openLife: '30 days',
    daysLeft: 10,
    openedBy: 'Dr. Sharma',
    status: 'opened',
    actions: ['Issue', 'View History', 'Report'],
  },
  equipment: {
    type: 'equipment',
    name: 'Portable Oxygen Concentrator',
    id: 'EQ-0042',
    status: 'available',
    location: 'Medical Bay',
    lastInspection: '20 Sep 2026',
    nextInspection: '20 Dec 2026',
    usage: '42 hours',
    actions: ['Assign', 'Log Maintenance', 'View History'],
  },
};

export default function MedicalScan() {
  const [result, setResult] = useState(null);

  return (
    <div className="p-4">
      <h2 className="text-base font-bold text-slate-800 mb-3">Scan Medical Item</h2>

      <Scanner label="Scan medicine or equipment QR" onScan={() => setResult(MOCK.medicine)} accent="pink" />

      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          onClick={() => setResult(MOCK.medicine)}
          className="border border-slate-200 rounded-lg py-3 text-[11px] font-semibold text-slate-700 hover:border-pink-400 hover:bg-pink-50/40 transition"
        >
          <div className="text-lg">💊</div>
          <div className="mt-1">Medicine</div>
        </button>
        <button
          onClick={() => setResult(MOCK.equipment)}
          className="border border-slate-200 rounded-lg py-3 text-[11px] font-semibold text-slate-700 hover:border-pink-400 hover:bg-pink-50/40 transition"
        >
          <div className="text-lg">🧰</div>
          <div className="mt-1">Equipment</div>
        </button>
      </div>

      {result && <ResultCard result={result} onClear={() => setResult(null)} />}
    </div>
  );
}

function ResultCard({ result, onClear }) {
  const isMed = result.type === 'medicine';
  return (
    <div className="mt-4 bg-white border border-pink-300 rounded-xl overflow-hidden">
      <div className="bg-pink-50 px-3 py-2.5 flex items-center justify-between border-b border-pink-200">
        <div className="flex items-center gap-2">
          <span className="text-base">{isMed ? '💊' : '🧰'}</span>
          <span className="text-[11px] font-bold text-pink-800 uppercase tracking-wider">
            {result.type}
          </span>
        </div>
        <button onClick={onClear} className="text-slate-400 hover:text-red-600 text-lg leading-none">×</button>
      </div>

      <div className="p-3">
        <div className="text-[14px] font-bold text-slate-800">{result.name}</div>
        <div className="text-[10px] text-slate-500 font-mono mt-0.5">
          {isMed ? result.batch : result.id}
        </div>

        <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-3 text-[11px]">
          {isMed ? (
            <>
              <Info label="Quantity"  value={`${result.quantity} ${result.unit}`} />
              <Info label="Location"  value={result.location} />
              <Info label="Opened"    value={result.opened} />
              <Info label="Open-life" value={result.openLife} />
              <Info
                label="Remaining"
                value={`${result.daysLeft} days`}
                accent={result.daysLeft <= 10 ? 'text-red-600' : 'text-slate-800'}
                span
              />
            </>
          ) : (
            <>
              <Info label="Status"      value={result.status} />
              <Info label="Location"    value={result.location} />
              <Info label="Last check"  value={result.lastInspection} />
              <Info label="Next check"  value={result.nextInspection} />
              <Info label="Total usage" value={result.usage} span />
            </>
          )}
        </div>
      </div>

      {isMed && result.daysLeft <= 10 && (
        <div className="mx-3 mb-2 bg-red-50 border border-red-200 rounded-lg p-2 flex items-center gap-2">
          <span>⚠️</span>
          <div className="text-[11px] text-red-800 font-semibold">
            {result.daysLeft} days remaining on open-life
          </div>
        </div>
      )}

      <div className="px-3 pb-3 space-y-1.5">
        {result.actions.map((a, i) => (
          <button
            key={a}
            className={`w-full py-2.5 rounded-lg text-[11px] font-bold transition ${
              i === 0
                ? 'bg-pink-600 hover:bg-pink-700 text-white'
                : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {a}
          </button>
        ))}
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