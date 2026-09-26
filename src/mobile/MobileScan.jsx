// src/mobile/MobileScan.jsx
export default function MobileScan({ onBack }) {
  return (
    <div className="p-4">
      <button
        onClick={onBack}
        className="text-[11px] text-blue-600 mb-2 font-semibold"
      >
        ← Back
      </button>

      <h2 className="text-base font-bold text-slate-800 mb-3">Scan Cargo</h2>

      {/* Camera viewfinder */}
      <div className="relative bg-slate-900 rounded-xl aspect-square flex items-center justify-center overflow-hidden">

        {/* Corner brackets */}
        <div className="absolute inset-8 border-2 border-white/20 rounded-lg" />
        <div className="absolute top-8 left-8 w-5 h-5 border-t-4 border-l-4 border-green-400 rounded-tl" />
        <div className="absolute top-8 right-8 w-5 h-5 border-t-4 border-r-4 border-green-400 rounded-tr" />
        <div className="absolute bottom-8 left-8 w-5 h-5 border-b-4 border-l-4 border-green-400 rounded-bl" />
        <div className="absolute bottom-8 right-8 w-5 h-5 border-b-4 border-r-4 border-green-400 rounded-br" />

        <div className="text-white/50 text-[11px] text-center">
          📷 Point at QR code
        </div>
      </div>

      <button className="w-full mt-3 py-2.5 border-2 border-slate-300 rounded-lg text-[11px] font-semibold text-slate-600 hover:bg-slate-50">
        Enter Manually
      </button>

      {/* Last scan result */}
      <div className="mt-4 bg-green-50 border border-green-300 rounded-lg p-3">
        <div className="text-[11px] font-bold text-green-800 mb-1.5">
          ✅ Last Scan Saved
        </div>
        <div className="text-[11px] text-slate-700 space-y-0.5">
          <div><b>ID:</b> SHP-2024-001</div>
          <div><b>Item:</b> Ice Core Drill Spare Parts</div>
          <div><b>Weight:</b> 28 kg</div>
          <div><b>Dimensions:</b> 80×60×40 cm</div>
          <div><b>Dest:</b> Maitri</div>
        </div>
        <div className="mt-2 text-[10px] text-yellow-700 font-semibold">
          ⏳ Pending sync to server
        </div>
      </div>
    </div>
  );
}