// src/pages/MobilePreview.jsx
import { useNavigate, useLocation } from 'react-router-dom';
import PhoneFrame from '../components/PhoneFrame';
import MobileApp from '../mobile/MobileApp';

/* ─────────────────────────────────────────────
   ROLE META
   Maps every role value that can reach /mobile
   to display info for the header badge.
────────────────────────────────────────────── */
const ROLE_INFO = {
  logistics: {
    name: 'Logistics Officer',
    badge: 'bg-teal-50 text-teal-700 border-teal-200',
  },
  station: {
    name: 'Station Staff',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  'station-staff': {
    name: 'Station Staff',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  'station-manager': {
    name: 'Station Manager',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  medical: {
    name: 'Medical Officer',
    badge: 'bg-violet-50 text-violet-700 border-violet-200',
  },
  leader: {
    name: 'Expedition Leader',
    badge: 'bg-blue-50 text-blue-700 border-blue-200',
  },
};

/* The role values that `MobileApp` actually knows how to render.
   Anything outside this set falls back to logistics. */
const SUPPORTED_MOBILE_ROLES = ['logistics', 'station', 'station-staff', 'medical'];

export default function MobilePreview() {
  const navigate = useNavigate();
  const { state } = useLocation();

  /* Resolve role: state → localStorage → default */
  const rawRole =
    state?.role ||
    localStorage.getItem('ipelams_role') ||
    'logistics';

  /* If the role has no mobile app (e.g. 'admin'), fall back to logistics */
  const role = SUPPORTED_MOBILE_ROLES.includes(rawRole) ? rawRole : 'logistics';

  /* Resolve display name: state → localStorage → role info → fallback */
  const name =
    state?.name ||
    localStorage.getItem('ipelams_name') ||
    ROLE_INFO[role]?.name ||
    'Field User';

  const roleInfo = ROLE_INFO[role] || ROLE_INFO.logistics;

  const handleChangeRole = () => {
    localStorage.removeItem('ipelams_role');
    localStorage.removeItem('ipelams_name');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0B1F33] flex flex-col">

      {/* ───────── Header ───────── */}
      <header className="border-b border-slate-700 bg-[#0B1F33]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4">

            <div>
              <div className="text-white font-bold tracking-wide">
                IPELAMS
              </div>
              <div className="text-[10px] uppercase tracking-widest text-slate-400 mt-1">
                Field Mobile Interface
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs text-slate-300">{name}</div>
              <div
                className={`
                  inline-flex mt-1
                  px-2 py-0.5
                  rounded
                  border
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-wide
                  ${roleInfo.badge}
                `}
              >
                {roleInfo.name}
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* ───────── Phone Preview ───────── */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-6">

        <div className="mb-4 text-center">
          <div className="text-[10px] uppercase tracking-widest text-slate-400">
            Device Preview
          </div>
          <div className="text-sm font-semibold text-white mt-1">
            {roleInfo.name}
          </div>
        </div>

        <PhoneFrame label={`Android · ${role}`}>
          <MobileApp role={role} />
        </PhoneFrame>

        <button
          type="button"
          onClick={handleChangeRole}
          className="mt-5 text-xs text-slate-400 hover:text-white transition underline underline-offset-4"
        >
          ← Change role
        </button>

      </main>

      {/* ───────── Footer ───────── */}
      <footer className="text-center px-4 pb-5">
        <div className="text-[10px] text-slate-500">
          Prototype preview · Local mock data
        </div>
        <div className="text-[9px] text-slate-600 mt-1">
          Production interface intended for field mobile devices
        </div>
      </footer>

    </div>
  );
}