import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Helper to check if a link is active for styling
  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Old Version", path: "/trad" },
    { name: "New Version (RQ)", path: "/req" },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="shrink-0 flex items-center group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3 group-hover:rotate-12 transition-transform">
              <span className="text-white font-bold">B</span>
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              Brand<span className="text-blue-600">Name</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? "text-blue-600 bg-blue-50"
                    : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="h-6 w-[px] bg-slate-200 mx-4"></div>

            <button className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-600 transition-colors shadow-sm">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="px-6 py-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-semibold ${
                  isActive(link.path)
                    ? "text-blue-600 bg-blue-50"
                    : "text-slate-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4">
              <button className="w-full bg-blue-600 text-white px-5 py-4 rounded-xl font-bold">
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
