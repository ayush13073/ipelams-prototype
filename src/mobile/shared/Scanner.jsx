// src/mobile/shared/Scanner.jsx
export default function Scanner({ label, onScan, accent = 'emerald' }) {
  const accentClass = {
    emerald: 'border-emerald-400',
    blue:    'border-blue-400',
    pink:    'border-pink-400',
  }[accent];

  return (
    <div className="relative w-full bg-slate-900 rounded-xl aspect-square flex items-center justify-center overflow-hidden">
      <div className="absolute inset-6 border-2 border-white/20 rounded-lg" />
      <div className={`absolute top-6 left-6 w-6 h-6 border-t-4 border-l-4 ${accentClass} rounded-tl`} />
      <div className={`absolute top-6 right-6 w-6 h-6 border-t-4 border-r-4 ${accentClass} rounded-tr`} />
      <div className={`absolute bottom-6 left-6 w-6 h-6 border-b-4 border-l-4 ${accentClass} rounded-bl`} />
      <div className={`absolute bottom-6 right-6 w-6 h-6 border-b-4 border-r-4 ${accentClass} rounded-br`} />

      <div className="text-white/50 text-[11px] text-center px-6">{label}</div>

      {/* Scanning line animation */}
      <div className={`absolute left-6 right-6 h-0.5 bg-${accent}-400/70 animate-[scan_2s_ease-in-out_infinite]`} />
    </div>
  );
}