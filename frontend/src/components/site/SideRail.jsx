import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero", label: "Top" },
  { id: "initiative", label: "The Initiative" },
  { id: "pillars", label: "Five Pillars" },
  { id: "profile-seat", label: "Profile Your Seat" },
  { id: "the-18", label: "The 18" },
  { id: "selection", label: "Selection" },
  { id: "process", label: "How It Works" },
  { id: "onboarding", label: "Onboarding" },
  { id: "who", label: "For Whom" },
  { id: "apply", label: "Apply" },
];

export default function SideRail() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      data-testid="side-rail"
      className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-4"
    >
      {SECTIONS.map((s) => (
        <button
          key={s.id}
          data-testid={`rail-${s.id}`}
          onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
          className="group flex items-center justify-end gap-3"
          aria-label={s.label}
        >
          <span
            className={`font-body text-[10px] font-bold tracking-[0.15em] uppercase transition-all duration-500 ${
              active === s.id ? "opacity-100 text-[#A82B52]" : "opacity-0 group-hover:opacity-60 text-[#141214]"
            }`}
          >
            {s.label}
          </span>
          <span
            className={`block h-[2px] transition-all duration-500 ${
              active === s.id ? "w-8 bg-[#A82B52]" : "w-4 bg-[#141214]/30 group-hover:w-6"
            }`}
          />
        </button>
      ))}
    </div>
  );
}


