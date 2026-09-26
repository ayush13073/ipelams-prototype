import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import StationSidebar from '../components/StationSidebar';

export default function StationPortal() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const openMenu = () => {
    setMobileOpen(true);
  };

  const closeMenu = () => {
    setMobileOpen(false);
  };

  const handleChangeRole = () => {
    localStorage.removeItem('ipelams_role');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* =========================================
          STATION SIDEBAR
          Desktop: visible
          Mobile: slide-in drawer
      ========================================== */}
      <StationSidebar
        mobileOpen={mobileOpen}
        onClose={closeMenu}
      />

      {/* =========================================
          MAIN AREA
      ========================================== */}
      <div className="flex-1 min-w-0 flex flex-col">

        {/* =========================================
            MOBILE HEADER
        ========================================== */}
        <header className="md:hidden sticky top-0 z-30 h-16 bg-emerald-950 text-white flex items-center px-4 shadow-md">

          {/* Hamburger */}
          <button
            type="button"
            onClick={openMenu}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-emerald-900 active:bg-emerald-800 transition text-xl"
            aria-label="Open station navigation"
          >
            ☰
          </button>

          {/* Logo */}
          <div className="ml-3 flex items-center gap-2 min-w-0">

            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-sm shrink-0">
              🏔️
            </div>

            <div className="min-w-0">
              <div className="font-bold text-sm leading-tight">
                IPELAMS
              </div>

              <div className="text-[10px] text-emerald-300 leading-tight">
                Station Portal
              </div>
            </div>

          </div>

          {/* Change Role */}
          <button
            type="button"
            onClick={handleChangeRole}
            className="ml-auto shrink-0 text-xs text-emerald-300 hover:text-white font-medium whitespace-nowrap"
          >
            ← Change role
          </button>

        </header>

        {/* =========================================
            PAGE CONTENT
        ========================================== */}
        <main className="flex-1 min-w-0 w-full">
          <Outlet />
        </main>

      </div>

    </div>
  );
}