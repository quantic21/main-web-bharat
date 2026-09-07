import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { EASE } from "../../lib/motion";

const LINKS = [
  { id: "initiative", label: "The Initiative" },
  { id: "profile-seat", label: "Profile Your Seat" },
  { id: "selection", label: "Selection" },
  { id: "who", label: "For Whom" },
];

export default function Nav({ onApply }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleLogoClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleApplyClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        if (onApply) onApply();
        else {
          document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
    } else if (onApply) {
      onApply();
    } else {
      document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.header
      data-testid="main-nav"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.2, ease: EASE }}
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
        scrolled ? "bg-[#F7F5F0]/90 backdrop-blur-md border-b border-[#141214]/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between h-[72px]">
        <button
          data-testid="nav-logo"
          onClick={handleLogoClick}
          className="flex items-center group focus:outline-none"
        >
          <img
            src="/logo.png"
            alt="Ether Board of Advisors"
            className="h-10 md:h-12 w-auto object-contain group-hover:opacity-90 transition-opacity"
          />
        </button>

        <nav className="hidden md:flex items-center gap-9">
          {LINKS.map((l) => (
            <button
              key={l.id}
              data-testid={`nav-link-${l.id}`}
              onClick={() => handleNavClick(l.id)}
              className="font-body text-[13px] font-medium tracking-wide text-[#141214]/80 hover:text-[#A82B52] transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#A82B52] group-hover:w-full transition-all duration-500" />
            </button>
          ))}

          {/* Dedicated Key Personnel Link */}
          <Link
            to="/team"
            data-testid="nav-link-team"
            className={`font-body text-[13px] font-medium tracking-wide hover:text-[#A82B52] transition-colors relative group ${
              location.pathname === "/team" ? "text-[#A82B52] font-semibold" : "text-[#141214]/80"
            }`}
          >
            Key Personnel
            <span
              className={`absolute -bottom-1 left-0 h-[2px] bg-[#A82B52] transition-all duration-500 ${
                location.pathname === "/team" ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </Link>

          <button
            data-testid="nav-apply-btn"
            onClick={handleApplyClick}
            className="font-body text-[12px] font-semibold tracking-[0.18em] uppercase px-5 py-2.5 border border-[#A82B52] text-[#A82B52] hover:bg-[#A82B52] hover:text-[#F7F5F0] transition-colors duration-500"
          >
            Apply
          </button>
        </nav>

        <button
          data-testid="nav-mobile-toggle"
          className="md:hidden text-[#141214]"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-[#141214] text-[#F7F5F0] flex flex-col p-8 z-50"
          >
            <div className="flex justify-end">
              <button data-testid="mobile-menu-close" onClick={() => setOpen(false)} aria-label="Close menu">
                <X size={26} />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center gap-6">
              {LINKS.map((l, i) => (
                <motion.button
                  key={l.id}
                  data-testid={`mobile-link-${l.id}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i, ease: EASE }}
                  onClick={() => {
                    handleNavClick(l.id);
                    setOpen(false);
                  }}
                  className="font-display text-4xl text-left"
                >
                  {l.label}
                </motion.button>
              ))}

              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35, ease: EASE }}
                onClick={() => {
                  navigate("/team");
                  setOpen(false);
                }}
                className="font-display text-4xl text-left text-[#A82B52]"
              >
                Key Personnel
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export { LINKS };

