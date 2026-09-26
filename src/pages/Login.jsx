import { useNavigate } from 'react-router-dom';

const ROLES = [
  {
    id: 'goa-admin',
    name: 'Goa Admin',
    subtitle: 'NCPOR HQ · Full access',
    icon: '▣',
    view: 'web',
    route: '/goa',
    role: 'admin',
    accent: 'blue',
  },
  {
    id: 'logistics',
    name: 'Logistics Officer',
    subtitle: 'Cargo & inventory operations',
    icon: '▤',
    view: 'mobile',
    route: '/mobile',
    role: 'logistics',
    accent: 'teal',
  },
  {
    id: 'leader',
    name: 'Expedition Leader',
    subtitle: 'All locations · Approval',
    icon: '◉',
    view: 'both',
    route: '/goa',
    role: 'leader',
    accent: 'purple',
  },
  {
    id: 'station-mgr',
    name: 'Station Manager',
    subtitle: 'Station operations · Full local',
    icon: '⌂',
    view: 'web',
    route: '/station',
    role: 'station-manager',
    accent: 'emerald',
  },
  {
    id: 'station-staff',
    name: 'Station Staff',
    subtitle: 'Personnel · Inventory · Movement',
    icon: '◎',
    view: 'mobile',
    route: '/mobile',
    role: 'station',
    accent: 'emerald',
  },
  {
    id: 'medical',
    name: 'Medical Officer',
    subtitle: 'Medical operations',
    icon: '+',
    view: 'mobile',
    route: '/mobile',
    role: 'medical',
    accent: 'purple',
  },
];

const VIEW_BADGES = {
  web: {
    label: 'WEB PORTAL',
    className: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  mobile: {
    label: 'MOBILE',
    className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  both: {
    label: 'WEB + MOBILE',
    className: 'bg-violet-50 text-violet-700 border-violet-200',
  },
};

const ACCENTS = {
  blue: {
    icon: 'bg-blue-700',
    hover: 'hover:border-blue-500',
    title: 'group-hover:text-blue-700',
  },
  teal: {
    icon: 'bg-teal-700',
    hover: 'hover:border-teal-500',
    title: 'group-hover:text-teal-700',
  },
  purple: {
    icon: 'bg-violet-700',
    hover: 'hover:border-violet-500',
    title: 'group-hover:text-violet-700',
  },
  emerald: {
    icon: 'bg-emerald-700',
    hover: 'hover:border-emerald-500',
    title: 'group-hover:text-emerald-700',
  },
};

export default function Login() {
  const navigate = useNavigate();

  const handleRole = (roleData) => {
    // Store the selected role so the rest of the application
    // can render the appropriate experience.
    localStorage.setItem('ipelams_role', roleData.role);
    localStorage.setItem('ipelams_name', roleData.name);

    navigate(roleData.route, {
      state: {
        role: roleData.role,
        name: roleData.name,
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">

      {/* =========================================
          GOVERNMENT-STYLE TOP BAR
      ========================================== */}
      <header className="bg-[#0B1F33] text-white border-b-4 border-blue-700">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4">

          <div className="flex items-center justify-between gap-4">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-md bg-blue-700 flex items-center justify-center text-xl font-bold border border-blue-500">
                🧊
              </div>

              <div>
                <div className="font-bold tracking-wide">
                  IPELAMS
                </div>

                <div className="text-[10px] uppercase tracking-widest text-slate-400">
                  Integrated Polar Expedition Logistics & Asset Management
                </div>
              </div>

            </div>

            <div className="hidden sm:block text-right">
              <div className="text-[10px] uppercase tracking-widest text-slate-400">
                Operational Access
              </div>

              <div className="text-xs text-slate-200 mt-1">
                DEMO / PROTOTYPE ENVIRONMENT
              </div>
            </div>

          </div>

        </div>
      </header>

      {/* =========================================
          MAIN
      ========================================== */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:px-6">

        <div className="w-full max-w-5xl">

          {/* Access heading */}
          <div className="mb-6">

            <div className="flex items-center gap-3">

              <div className="w-1 h-10 bg-blue-700 rounded-full" />

              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Select Operational Role
                </h1>

                <p className="text-sm text-slate-500 mt-1">
                  Choose the authorized interface for this demonstration.
                </p>
              </div>

            </div>

          </div>

          {/* =========================================
              ROLE GRID
          ========================================== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {ROLES.map((roleData) => {
              const badge = VIEW_BADGES[roleData.view];
              const accent = ACCENTS[roleData.accent];

              return (
                <button
                  key={roleData.id}
                  type="button"
                  onClick={() => handleRole(roleData)}
                  className={`
                    group
                    text-left
                    bg-white
                    border
                    border-slate-300
                    rounded-lg
                    p-5
                    shadow-sm
                    ${accent.hover}
                    hover:shadow-md
                    transition-all
                    duration-150
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    focus:ring-offset-2
                  `}
                >

                  <div className="flex items-start justify-between gap-3">

                    <div
                      className={`
                        w-10 h-10 rounded-md
                        ${accent.icon}
                        text-white
                        flex items-center justify-center
                        text-xl font-bold
                      `}
                    >
                      {roleData.icon}
                    </div>

                    <span
                      className={`
                        inline-flex items-center
                        px-2 py-1
                        rounded
                        border
                        text-[9px]
                        font-bold
                        tracking-wide
                        ${badge.className}
                      `}
                    >
                      {badge.label}
                    </span>

                  </div>

                  <div className="mt-5">

                    <div
                      className={`
                        font-bold text-slate-800
                        ${accent.title}
                        transition-colors
                      `}
                    >
                      {roleData.name}
                    </div>

                    <div className="text-xs text-slate-500 mt-1">
                      {roleData.subtitle}
                    </div>

                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">

                    <span className="text-[10px] uppercase tracking-wider text-slate-400">
                      Access role
                    </span>

                    <span className="text-xs font-semibold text-slate-600 group-hover:text-slate-900">
                      Enter →
                    </span>

                  </div>

                </button>
              );
            })}

          </div>

          {/* =========================================
              DEMO NOTICE
          ========================================== */}
          <div className="mt-6 bg-white border border-slate-300 rounded-lg px-4 py-3 flex items-start gap-3">

            <div className="w-7 h-7 rounded bg-blue-50 text-blue-700 flex items-center justify-center font-bold shrink-0">
              i
            </div>

            <div>
              <div className="text-xs font-bold text-slate-700">
                Demonstration Environment
              </div>

              <div className="text-[11px] text-slate-500 mt-0.5">
                This prototype uses local mock data. No password or
                external authentication is required.
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* =========================================
          FOOTER
      ========================================== */}
      <footer className="border-t border-slate-300 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-500">

          <span>
            46 ISEA · Antarctic Expedition Support
          </span>

          <span>
            IPELAMS v0.1 · Prototype
          </span>

        </div>
      </footer>

    </div>
  );
}