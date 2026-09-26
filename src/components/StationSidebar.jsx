import { NavLink, useNavigate } from 'react-router-dom';

const BASE_NAV = [
  {
    to: '/station',
    icon: '⌂',
    label: 'Station Dashboard',
    end: true,
  },
  {
    to: '/station/inventory',
    icon: '▤',
    label: 'Inventory',
  },
  {
    to: '/station/cargo',
    icon: '▣',
    label: 'Cargo Receiving',
  },
  {
    to: '/station/waste',
    icon: '▥',
    label: 'Waste Management',
  },
  {
    to: '/station/personnel',
    icon: '◎',
    label: 'Personnel',
  },
  {
    to: '/station/emergency',
    icon: '!',
    label: 'Emergency',
    danger: true,
  },
];

const MEDICAL_ITEM = {
  to: '/station/medical',
  icon: '+',
  label: 'Medical Module',
  medical: true,
};

const SYNC_ITEM = {
  to: '/station/sync',
  icon: '↻',
  label: 'Sync Status',
  badge: 247,
};

export default function StationSidebar({
  mobileOpen = false,
  onClose,
}) {
  const navigate = useNavigate();

  const role =
    localStorage.getItem('ipelams_role') ||
    'station-manager';

  const isMedical = role === 'medical';

  const NAV = [...BASE_NAV];

  if (isMedical) {
    NAV.push(MEDICAL_ITEM);
  }

  NAV.push(SYNC_ITEM);

  const handleChangeRole = () => {
    localStorage.removeItem('ipelams_role');
    localStorage.removeItem('ipelams_name');
    onClose?.();
    navigate('/');
  };

  return (
    <>
      {/* =========================================
          MOBILE OVERLAY
      ========================================== */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 md:hidden"
          onClick={onClose}
        />
      )}

      {/* =========================================
          SIDEBAR
      ========================================== */}
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

            <div className="w-9 h-9 rounded-md bg-emerald-700 flex items-center justify-center text-lg text-white">
              🏔️
            </div>

            <div className="min-w-0">

              <div className="text-white font-bold text-sm tracking-wide">
                IPELAMS
              </div>

              <div className="text-[9px] text-slate-400 uppercase tracking-widest">
                Station Operations
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

          {/* Station status */}
          <div className="mt-4 flex items-center justify-between">

            <div className="flex items-center gap-2 text-[9px] uppercase tracking-wider text-amber-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Local / Offline
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
            Station Operations
          </div>

          <div className="space-y-0.5">

            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={onClose}
                className={({ isActive }) => {

                  let activeClass = '';

                  if (isActive) {
                    if (item.danger) {
                      activeClass =
                        'bg-red-900/30 text-red-100 border-red-500';
                    } else if (item.medical) {
                      activeClass =
                        'bg-violet-900/30 text-violet-100 border-violet-500';
                    } else {
                      activeClass =
                        'bg-emerald-900/40 text-white border-emerald-500';
                    }
                  } else {
                    if (item.danger) {
                      activeClass =
                        'border-transparent text-red-300 hover:bg-red-950/40 hover:text-red-100';
                    } else if (item.medical) {
                      activeClass =
                        'border-transparent text-violet-300 hover:bg-violet-950/40 hover:text-violet-100';
                    } else {
                      activeClass =
                        'border-transparent text-slate-300 hover:bg-slate-800 hover:text-white';
                    }
                  }

                  return `
                    flex items-center justify-between
                    gap-3
                    px-4 py-3
                    text-[13px]
                    font-medium
                    border-l-4
                    transition-colors
                    ${activeClass}
                  `;
                }}
              >

                <span className="flex items-center gap-3 min-w-0">

                  <span
                    className={`
                      w-5 text-center font-bold text-base shrink-0
                      ${
                        item.danger
                          ? 'text-red-400'
                          : item.medical
                          ? 'text-violet-400'
                          : 'text-slate-300'
                      }
                    `}
                  >
                    {item.icon}
                  </span>

                  <span className="truncate">
                    {item.label}
                  </span>

                </span>

                {item.badge && (
                  <span className="shrink-0 min-w-6 px-1.5 py-0.5 rounded-full bg-amber-500 text-amber-950 text-[9px] font-bold text-center">
                    {item.badge}
                  </span>
                )}

              </NavLink>
            ))}

          </div>

        </nav>

        {/* =========================================
            STATUS FOOTER
        ========================================== */}
        <div className="border-t border-slate-700 p-4">

          <div className="flex items-center gap-2">

            <span className="w-2 h-2 rounded-full bg-amber-500" />

            <div>

              <div className="text-[9px] uppercase tracking-wider text-amber-400 font-bold">
                Offline Mode
              </div>

              <div className="text-[10px] text-slate-500 mt-0.5">
                Local data only
              </div>

            </div>

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