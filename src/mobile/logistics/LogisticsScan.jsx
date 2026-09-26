// src/mobile/logistics/LogisticsScan.jsx
import { useState } from 'react';
import Scanner from '../shared/Scanner';

export default function LogisticsScan() {
  const [result, setResult] = useState(null);

  const handleScan = () => {
    setResult({
      id: 'SHP-2024-001',
      name: 'Ice Core Drill Spare Parts',
      weight: '28 kg',
      dims: '80×60×40 cm',
      dest: 'Maitri',
      action: 'Load into container',
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-base font-bold text-slate-800 mb-3">Scan Cargo</h2>

      <Scanner label="Point at QR code" onScan={handleScan} accent="blue" />

      <button
        onClick={handleScan}
        className="w-full mt-3 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[12px] font-bold transition"
      >
        📷 Simulate Scan
      </button>

      <button className="w-full mt-2 py-2.5 border-2 border-slate-300 rounded-lg text-[11px] font-semibold text-slate-600 hover:bg-slate-50">
        Enter Manually
      </button>

      {result ? (
        <div className="mt-4 bg-green-50 border border-green-300 rounded-lg p-3">
          <div className="text-[11px] font-bold text-green-800 mb-1.5">
            ✅ Item identified
          </div>
          <div className="text-[11px] text-slate-700 space-y-0.5">
            <div><b>ID:</b> {result.id}</div>
            <div><b>Item:</b> {result.name}</div>
            <div><b>Weight:</b> {result.weight}</div>
            <div><b>Dest:</b> {result.dest}</div>
          </div>
          <div className="mt-3 pt-3 border-t border-green-200">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Permitted action
            </div>
            <button className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-bold transition">
              {result.action}
            </button>
          </div>
          <div className="mt-2 text-[10px] text-yellow-700 font-semibold text-center">
            ⏳ Will save locally · pending sync
          </div>
        </div>
      ) : (
        <div className="mt-4 text-[11px] text-slate-400 text-center py-4">
          Scan a QR code to see actions
        </div>
      )}
    </div>
  );
}