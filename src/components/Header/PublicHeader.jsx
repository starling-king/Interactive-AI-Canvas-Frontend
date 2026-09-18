import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
// Note: We don't need the Container wrapper anymore because the header is a floating pill.
// We are mapping to your new GlassCard UI.
import GlassCard from "../ui/GlassCard.jsx";
import ElectricButton from "../ui/ElectricButton.jsx";

export default function PublicHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Documentation", url: "/docs" },
    { name: "Showcase", url: "/showcase" },
  ];

  return (
    // 1. FLOATING WRAPPER: Disconnects from the edges to create the "pill" look.
    <header className="fixed top-6 left-0 right-0 z-50 px-4 sm:px-8 mx-auto max-w-5xl pointer-events-none">

      {/* 2. THE GLASS PILL: Re-enables pointer events just for the card */}
      <GlassCard
        padding="none"
        className="pointer-events-auto shadow-2xl shadow-black/50 border-moon-800"
      >
        <div className="flex items-center justify-between px-6 py-3">

          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group shrink-0 outline-none">
            <div className="flex items-center justify-center w-8 h-8 text-electric transition-transform duration-300 ease-out bg-moon-900 rounded-lg group-hover:scale-105 shadow-[0_0_15px_var(--color-electric-glow)]">
              <span className="font-mono text-base font-bold tracking-tighter">
                {">_"}
              </span>
            </div>
            <span className="text-xl font-black tracking-tight text-slate-100 transition-colors">
              Organic<span className="text-electric">.Flow</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.url;
              return (
                <button
                  key={item.name}
                  onClick={() => navigate(item.url)}
                  className={`px-4 py-2 text-sm font-bold tracking-wide rounded-lg transition-all duration-300 outline-none ${isActive
                      ? "text-electric bg-moon-900/50 shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-moon-800/40 hover:-translate-y-0.5"
                    }`}
                >
                  {item.name}
                </button>
              );
            })}
          </nav>

          {/* Call to Action */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/login")}
              className="hidden sm:block text-sm font-bold tracking-wide text-slate-400 hover:text-slate-200 transition-colors"
            >
              Sign In
            </button>
            <ElectricButton
              variant="primary"
              size="sm"
              onClick={() => navigate("/login")}
            >
              Initialize Engine
            </ElectricButton>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-electric transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown (Animated inside the GlassCard) */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-moon-900/40 border-t border-moon-800/50 ${mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 border-t-0"
            }`}
        >
          <div className="px-6 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.url);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 text-sm font-bold text-slate-400 hover:text-electric hover:bg-moon-800/50 rounded-lg transition-colors"
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => navigate("/login")}
              className="w-full text-left px-4 py-3 text-sm font-bold text-slate-400 hover:text-white hover:bg-moon-800/50 rounded-lg transition-colors border-t border-moon-800/50 mt-2"
            >
              Admin Access
            </button>
          </div>
        </div>
      </GlassCard>
    </header>
  );
}