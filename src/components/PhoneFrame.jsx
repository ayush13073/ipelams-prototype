export default function PhoneFrame({ children, label }) {
  return (
    <div className="flex flex-col items-center">
      {label && (
        <div className="mb-3 text-xs font-semibold text-slate-400 tracking-wide uppercase">
          {label}
        </div>
      )}

      {/* Outer bezel */}
      <div className="relative w-[340px] h-[700px] bg-slate-900 rounded-[3rem] p-3 shadow-2xl border-4 border-slate-700">

        {/* Side buttons */}
        <div className="absolute -right-1 top-32 w-1 h-16 bg-slate-700 rounded-r"></div>
        <div className="absolute -right-1 top-52 w-1 h-10 bg-slate-700 rounded-r"></div>
        <div className="absolute -left-1 top-40 w-1 h-20 bg-slate-700 rounded-l"></div>

        {/* Screen */}
        <div className="relative w-full h-full bg-white rounded-[2.4rem] overflow-hidden flex flex-col">

          {/* Status bar */}
          <div className="flex justify-between items-center px-5 pt-2 pb-1 text-xs font-semibold text-slate-800 bg-white z-10 shrink-0">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span>📶</span><span>📡</span><span>🔋</span>
            </span>
          </div>

          {/* Punch-hole camera */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full z-20"></div>

          {/* App content */}
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>

          {/* Android nav bar */}
          <div className="flex justify-around items-center py-2 bg-slate-100 border-t shrink-0">
            {/* <span className="text-slate-500 text-sm">◁</span>
            <span className="text-slate-500 text-sm">○</span>
            <span className="text-slate-500 text-sm">□</span> */}
          </div>
        </div>
      </div>
    </div>
  );
}