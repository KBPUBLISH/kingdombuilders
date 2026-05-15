import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/books", label: "Books" },
  { to: "/listen", label: "Listen" },
  { to: "/store", label: "Store" },
  { to: "/newsletter", label: "Newsletter" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-ink-900/10 bg-parchment/85 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container-page flex h-20 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-ink-900"
                    : "text-ink-700 hover:text-ink-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gold-500" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/books" className="btn-gold">
            Shop Books
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-900/15 bg-white/70 text-ink-900 transition hover:bg-white lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden">
          <div className="container-page pb-6">
            <div className="card overflow-hidden p-2">
              <nav className="flex flex-col" aria-label="Mobile">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/"}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-ink-900/5 text-ink-900"
                          : "text-ink-700 hover:bg-ink-900/5 hover:text-ink-900"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                <Link to="/books" onClick={closeMenu} className="btn-gold mx-2 my-2">
                  Shop Books
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
