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
    localStorage.removeItem('ipelams_name');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* Sidebar */}
      <StationSidebar
        mobileOpen={mobileOpen}
        onClose={closeMenu}
      />

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">

        {/* =========================================
            MOBILE HEADER
        ========================================== */}
        <header className="md:hidden sticky top-0 z-30 h-16 bg-[#0B1F33] text-white border-b border-slate-700 shadow-md">

          <div className="h-full px-4 flex items-center">

            <button
              type="button"
              onClick={openMenu}
              className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-slate-800 transition text-xl"
              aria-label="Open navigation"
            >
              ☰
            </button>

            <div className="ml-3 flex items-center gap-2">

              <div className="w-8 h-8 rounded-md bg-emerald-700 flex items-center justify-center">
                🏔️
              </div>

              <div>

                <div className="font-bold text-sm leading-tight">
                  IPELAMS
                </div>

                <div className="text-[9px] uppercase tracking-wider text-slate-400">
                  Station Operations
                </div>

              </div>

            </div>

            <button
              type="button"
              onClick={handleChangeRole}
              className="ml-auto text-[11px] font-semibold text-emerald-300 hover:text-white"
            >
              Change role
            </button>

          </div>

        </header>

        {/* =========================================
            DESKTOP TOP BAR
        ========================================== */}
        <header className="hidden md:flex h-14 bg-white border-b border-slate-300 items-center justify-between px-6">

          <div>

            <div className="text-sm font-bold text-slate-800">
              Station Operations
            </div>

            <div className="text-[10px] text-slate-500 uppercase tracking-wider">
              Local station management system
            </div>

          </div>

          <div className="flex items-center gap-5">

            <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold text-amber-700">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Offline / Local Mode
            </div>

            <button
              type="button"
              onClick={handleChangeRole}
              className="text-xs font-semibold text-slate-500 hover:text-emerald-700"
            >
              Change role
            </button>

          </div>

        </header>

        {/* Page */}
        <main className="flex-1 min-w-0 w-full">
          <Outlet />
        </main>

      </div>

    </div>
  );
}