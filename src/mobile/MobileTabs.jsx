// src/mobile/MobileTabs.jsx
export default function MobileTabs({ tabs, current, onChange }) {
  return (
    <div className="flex border-t border-slate-200 bg-white shrink-0">
      {tabs.map((t) => {
        const isActive = current === t.id;
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={`flex-1 py-2 flex flex-col items-center gap-0.5 transition relative ${
              isActive ? 'text-blue-600' : 'text-slate-400'
            }`}
          >
            <span className="text-base">{t.icon}</span>
            <span className="text-[10px] font-semibold">{t.label}</span>
            {t.badge ? (
              <span className="absolute top-1 right-1/4 text-[8px] font-bold px-1 rounded-full bg-amber-500 text-white">
                {t.badge}
              </span>
            ) : null}
            {isActive && (
              <span className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-blue-600 rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
}