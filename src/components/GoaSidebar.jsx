import { NavLink, useNavigate } from 'react-router-dom';

const NAV = [
  {
    to: '/goa',
    icon: '⌂',
    label: 'Command Center',
  },
  {
    to: '/goa/cargo',
    icon: '▣',
    label: 'Cargo Management',
  },
  {
    to: '/goa/inventory',
    icon: '▤',
    label: 'Inventory',
  },
  {
    to: '/goa/predictive',
    icon: '◈',
    label: 'Predictive Analytics',
  },
  {
    to: '/goa/system',
    icon: '⚙',
    label: 'System Health',
  },
];

export default function GoaSidebar({
  mobileOpen = false,
  onClose,
}) {
  const navigate = useNavigate();

  const handleChangeRole = () => {
    localStorage.removeItem('ipelams_role');
    localStorage.removeItem('ipelams_name');
    onClose?.();
    navigate('/');
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static
          inset-y-0 left-0
          z-50
          w-64
          bg-[#0B1F33]
          text-slate-300
          flex flex-col
          shrink-0
          border-r border-slate-700
          shadow-xl
          transform
          transition-transform
          duration-200
          ease-in-out
          md:translate-x-0
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >

        {/* =========================================
            BRAND
        ========================================== */}
        <div className="px-5 py-4 border-b border-slate-700">

          <div className="flex items-center gap-3">

            <div className="w-9 h-9 rounded-md bg-blue-700 flex items-center justify-center text-lg text-white">
              🧊
            </div>

            <div className="min-w-0">

              <div className="text-white font-bold text-sm tracking-wide">
                IPELAMS
              </div>

              <div className="text-[9px] text-slate-400 uppercase tracking-widest">
                Goa Command Portal
              </div>

            </div>

            <button
              onClick={onClose}
              className="ml-auto md:hidden text-lg text-slate-400 hover:text-white"
              aria-label="Close menu"
            >
              ✕
            </button>

          </div>

          {/* System status */}
          <div className="mt-4 flex items-center justify-between">

            <div className="flex items-center gap-2 text-[9px] uppercase tracking-wider text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Operational
            </div>

            <span className="text-[9px] text-slate-500">
              v0.1
            </span>

          </div>

        </div>

        {/* =========================================
            NAVIGATION
        ========================================== */}
        <nav className="flex-1 py-4 overflow-y-auto">

          <div className="px-4 mb-2 text-[9px] uppercase tracking-widest text-slate-500 font-bold">
            Operations
          </div>

          <div className="space-y-0.5">

            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/goa'}
                onClick={onClose}
                className={({ isActive }) =>
                  `
                    flex items-center gap-3
                    px-4 py-3
                    text-[13px]
                    font-medium
                    border-l-4
                    transition-colors
                    ${
                      isActive
                        ? 'bg-blue-900/40 text-white border-blue-500'
                        : 'border-transparent text-slate-300 hover:bg-slate-800 hover:text-white'
                    }
                  `
                }
              >

                <span className="w-5 text-center text-base">
                  {item.icon}
                </span>

                <span>{item.label}</span>

              </NavLink>
            ))}

          </div>

        </nav>

        {/* =========================================
            FOOTER
        ========================================== */}
        <div className="border-t border-slate-700 p-4">

          <div className="flex items-center justify-between">

            <div>
              <div className="text-[9px] uppercase tracking-wider text-slate-500">
                Environment
              </div>

              <div className="text-[11px] text-slate-300 mt-1">
                Local Prototype
              </div>
            </div>

            <div className="w-2 h-2 rounded-full bg-emerald-500" />

          </div>

          <button
            type="button"
            onClick={handleChangeRole}
            className="mt-4 w-full text-left text-[11px] text-slate-400 hover:text-white transition"
          >
            ← Change role
          </button>

        </div>

      </aside>
    </>
  );
}