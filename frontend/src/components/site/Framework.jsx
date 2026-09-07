import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Reveal, EASE } from "../../lib/motion";

const CRITERIA = [
  { label: "Strategic Value", weight: 20, desc: "Capacity to shape direction, not merely oversee it." },
  { label: "Leadership Substance", weight: 15, desc: "A track record of decisions made under real consequence." },
  { label: "Board Readiness", weight: 15, desc: "Fluency in governance, fiduciary duty and boardroom conduct." },
  { label: "SME Relevance", weight: 15, desc: "Depth that matters to small and mid-sized enterprises." },
  { label: "Domain Depth", weight: 10, desc: "Authority earned within a specific sector or discipline." },
  { label: "Influence", weight: 10, desc: "Networks and standing that open doors for the board." },
  { label: "Clarity of Positioning", weight: 10, desc: "A distinct, articulable reason to be in the room." },
  { label: "Professional Integrity", weight: 5, desc: "An unimpeachable record — the non-negotiable baseline." },
];

const STEPS = [
  { n: "01", t: "Curated Selection", d: "We identify and vet leaders against a weighted framework — merit over network, always." },
  { n: "02", t: "Strategic Profiling", d: "Each selected leader is profiled with editorial rigour, answering the board's four questions." },
  { n: "03", t: "Visibility & Alignment", d: "Profiles are aligned with the mandates of boards actively seeking distinct perspective." },
  { n: "04", t: "Better Board Conversations", d: "Introductions become substantive dialogues — from qualified candidate to chosen voice." },
];

function AnimatedPercent({ weight, delay }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf, start;
    const dur = 1200;
    const run = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * weight));
      if (p < 1) raf = requestAnimationFrame(run);
    };
    const timer = setTimeout(() => { raf = requestAnimationFrame(run); }, delay * 1000);
    return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [weight, delay]);
  return <>{val}%</>;
}

function Bar({ n, label, weight, desc, i }) {
  const [seen, setSeen] = useState(false);
  return (
    <motion.div
      className="group border-t border-[#141214]/10 pt-5 pb-1 transition-colors duration-500 hover:border-[#A82B52]"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, delay: i * 0.06, ease: EASE }}
      onViewportEnter={() => setSeen(true)}
    >
      <div className="flex items-baseline justify-between gap-4">
        <div className="flex items-baseline gap-4">
          <span className="font-body text-[11px] font-bold tracking-[0.2em] text-[#A82B52] tabular-nums">{n}</span>
          <span className="font-display font-semibold text-2xl md:text-3xl text-[#141214] leading-none">{label}</span>
        </div>
        <span className="font-display font-bold text-2xl md:text-3xl text-[#A82B52] tabular-nums shrink-0">
          {seen ? <AnimatedPercent weight={weight} delay={i * 0.06 + 0.2} /> : "0%"}
        </span>
      </div>

      {/* description reveals on hover / focus */}
      <div className="overflow-hidden max-h-0 opacity-0 group-hover:max-h-16 group-hover:opacity-100 transition-all duration-500 ease-out">
        <p className="font-body font-medium text-sm text-[#141214]/75 pt-3 pl-8 max-w-md">{desc}</p>
      </div>

      <div className="h-[3px] w-full bg-[#141214]/8 relative overflow-hidden mt-4">
        <motion.div
          className="absolute left-0 top-0 h-full bg-[#A82B52]"
          style={{ transformOrigin: "left" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: weight / 20 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.4, delay: i * 0.06, ease: EASE }}
        />
      </div>
    </motion.div>
  );
}

export default function Framework() {
  return (
    <>
      <section id="selection" data-testid="selection-section" className="py-24 md:py-40 bg-[#F7F5F0]">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
            <div className="md:col-span-4">
              <Reveal>
                <div className="eyebrow mb-6 text-xs md:text-sm font-bold tracking-[0.28em]">Chapter 05 — Selection Framework</div>
                <h2 className="font-display font-semibold text-4xl md:text-6xl leading-[1.02] tracking-tight text-[#141214]">
                  Eight weighted criteria.
                </h2>
                <p className="font-body font-medium text-base leading-relaxed text-[#141214]/80 mt-8 max-w-sm">
                  Every candidate is measured against a transparent rubric. The weighting reflects what
                  boards genuinely value — strategic contribution above all.
                </p>

                <div className="mt-12 flex items-stretch gap-8 border-t border-[#141214]/10 pt-8 max-w-sm">
                  <div>
                    <div className="font-display font-bold text-5xl text-[#A82B52] leading-none">08</div>
                    <div className="eyebrow text-[0.6rem] mt-2 opacity-90">Criteria</div>
                  </div>
                  <div className="w-px bg-[#141214]/10" />
                  <div>
                    <div className="font-display font-bold text-5xl text-[#A82B52] leading-none">100<span className="text-2xl align-top">%</span></div>
                    <div className="eyebrow text-[0.6rem] mt-2 opacity-90">Total Weighting</div>
                  </div>
                </div>

                <p className="font-body font-medium text-base text-[#141214]/60 mt-8 max-w-sm leading-relaxed">
                  Hover any criterion to read what it measures.
                </p>
                <div className="hairline w-16 mt-8" />
              </Reveal>
            </div>
            <div className="md:col-span-7 md:col-start-6 flex flex-col md:pt-4">
              {CRITERIA.map((c, i) => (
                <Bar key={c.label} n={String(i + 1).padStart(2, "0")} {...c} i={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="process" data-testid="process-section" className="py-24 md:py-40 bg-[#141214] text-[#F7F5F0]">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20">
          <Reveal>
            <div className="eyebrow mb-6 text-xs md:text-sm font-bold tracking-[0.28em]">Chapter 06 — How It Works</div>
            <h2 className="font-display font-semibold text-4xl md:text-6xl tracking-tight mb-16 max-w-2xl">
              Four movements, one outcome.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
            {STEPS.map((s, i) => (
              <Reveal
                key={s.n}
                delay={i * 0.1}
                className="grid grid-cols-[auto_1fr] gap-8 border-t border-[#F7F5F0]/15 pt-8"
              >
                <span className="font-display font-bold text-5xl md:text-6xl text-[#A82B52] leading-none">{s.n}</span>
                <div>
                  <h3 className="font-display font-bold text-2xl md:text-3xl mb-3">{s.t}</h3>
                  <p className="font-body font-medium text-sm md:text-base leading-relaxed text-[#F7F5F0]/75">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
