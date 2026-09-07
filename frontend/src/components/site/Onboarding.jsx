import { Reveal } from "../../lib/motion";
import { Check } from "lucide-react";

const ELIGIBILITY = [
  "20+ years of professional leadership",
  "Government / registry ID certified",
  "3+ years of demonstrable thought leadership",
];

const SECTORS = ["Renewables", "Water", "Manufacturing", "Artificial Intelligence", "Pharma", "Social Impact"];

const STAGES = [
  { n: "01", t: "Screening", d: "Applications assessed against the eight-criteria framework." },
  { n: "02", t: "Panel Interview", d: "Shortlisted leaders meet the selection panel for depth review." },
  { n: "03", t: "The Final 18", d: "The cohort is confirmed and strategic profiling begins." },
];

export default function Onboarding({ onApply, onEnquire }) {
  return (
    <>
      <section id="onboarding" data-testid="onboarding-section" className="py-24 md:py-40 bg-[#F7F5F0]">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20">
          <Reveal>
            <div className="eyebrow mb-6 text-xs md:text-sm font-bold tracking-[0.28em]">Chapter 07 — Onboarding & Selection · First Batch</div>
            <h2 className="font-display font-light text-4xl md:text-6xl tracking-tight max-w-3xl leading-[1.02]">
              A deliberate path from application to the final eighteen.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 mt-20">
            {/* Eligibility */}
            <div className="md:col-span-4">
              <Reveal>
                <div className="eyebrow mb-8">Eligibility</div>
                <ul className="flex flex-col gap-5">
                  {ELIGIBILITY.map((e) => (
                    <li key={e} className="flex items-start gap-4">
                      <span className="mt-1 w-5 h-5 border-2 border-[#A82B52] flex items-center justify-center shrink-0">
                        <Check size={12} className="text-[#A82B52]" />
                      </span>
                      <span className="font-body font-medium text-base text-[#141214]/85 leading-snug">{e}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* Categories */}
            <div className="md:col-span-8 grid sm:grid-cols-2 gap-px bg-[#141214]/10 border border-[#141214]/10">
              <Reveal className="bg-[#F7F5F0] p-8 md:p-10">
                <div className="font-display text-3xl font-bold text-[#A82B52] mb-4">A</div>
                <h3 className="font-display font-bold text-2xl mb-3 text-[#141214]">Category A</h3>
                <p className="font-body font-medium text-base md:text-lg leading-relaxed text-[#141214]/75">
                  Established directors with prior or current board experience seeking sharper
                  positioning and aligned placement.
                </p>
              </Reveal>
              <Reveal delay={0.1} className="bg-[#F7F5F0] p-8 md:p-10">
                <div className="font-display text-3xl font-bold text-[#A82B52] mb-4">B</div>
                <h3 className="font-display font-bold text-2xl mb-3 text-[#141214]">Category B</h3>
                <p className="font-body font-medium text-base md:text-lg leading-relaxed text-[#141214]/75">
                  Senior leaders board-ready for the first time, whose substance warrants a
                  considered, editorially-authored introduction.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Sectors */}
          <Reveal className="mt-20">
            <div className="eyebrow mb-6">Target Sectors — First Batch</div>
            <div className="flex flex-wrap gap-3">
              {SECTORS.map((s) => (
                <span
                  key={s}
                  className="font-body text-sm font-medium tracking-wide px-5 py-2.5 border border-[#141214]/20 text-[#141214]/90 hover:border-[#A82B52] hover:text-[#A82B52] transition-colors duration-500"
                >
                  {s}
                </span>
              ))}
            </div>
          </Reveal>

          {/* 3 stage flow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#141214]/10 border border-[#141214]/10 mt-16">
            {STAGES.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1} className="bg-[#F7F5F0] p-8 md:p-10">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="font-display text-4xl font-bold text-[#A82B52]">{s.n}</span>
                  <h3 className="font-display font-bold text-2xl text-[#141214]">{s.t}</h3>
                </div>
                <p className="font-body font-medium text-base leading-relaxed text-[#141214]/75">{s.d}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14">
            <p className="font-body font-medium text-base text-[#141214]/60 tracking-wide">
              Timeline snapshot — Applications open now · Screening rolling · Panel interviews by
              invitation · Final cohort announced privately to selected leaders.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Who this is for */}
      <section id="who" data-testid="who-section" className="py-24 md:py-40 bg-[#141214] text-[#F7F5F0] relative overflow-hidden">
        {/* Background image overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-45 pointer-events-none"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141214]/95 via-[#141214]/85 to-[#141214]/70 pointer-events-none" />

        <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20">
          <Reveal>
            <div className="eyebrow mb-6 text-xs md:text-sm font-bold tracking-[0.28em]">Chapter 08 — Who This Is For</div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mt-8">
            <Reveal className="border-t border-[#A82B52]/40 pt-10">
              <h3 className="font-display font-semibold text-4xl md:text-5xl mb-8">For Directors</h3>
              <p className="font-body font-medium text-base md:text-lg leading-relaxed text-[#F7F5F0]/80 mb-10">
                For the leader whose substance outpaces their visibility. Who is ready for the board
                room but under-represented in the search. We make your relevance unmistakable.
              </p>
              <button
                data-testid="who-apply-btn"
                onClick={onApply}
                className="font-body text-[12px] font-semibold tracking-[0.18em] uppercase px-8 py-4 bg-[#A82B52] text-[#F7F5F0] hover:bg-[#7E1E3A] transition-colors duration-500 shadow-md"
              >
                Apply for Consideration
              </button>
            </Reveal>
            <Reveal delay={0.1} className="border-t border-[#A82B52]/40 pt-10">
              <h3 className="font-display font-semibold text-4xl md:text-5xl mb-8">For Companies</h3>
              <p className="font-body font-medium text-base md:text-lg leading-relaxed text-[#F7F5F0]/80 mb-10">
                For the board seeking perspective it cannot find through the usual channels. Tell us
                your priorities; we align you with distinguished, board-ready leadership.
              </p>
              <button
                data-testid="who-enquire-btn"
                onClick={onEnquire}
                className="font-body text-[12px] font-semibold tracking-[0.18em] uppercase px-8 py-4 border border-[#A82B52] text-[#A82B52] hover:bg-[#A82B52] hover:text-[#F7F5F0] transition-colors duration-500"
              >
                Enquire as a Company
              </button>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
