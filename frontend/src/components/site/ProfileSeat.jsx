import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "../../lib/motion";

const QUESTIONS = [
  { n: "i", q: "Why this leader?", d: "The distinct substance you bring — not your title, but your judgment." },
  { n: "ii", q: "Why this perspective?", d: "The lens only your journey affords a room of decision-makers." },
  { n: "iii", q: "Why this board?", d: "The precise alignment between your value and their mandate." },
  { n: "iv", q: "Why now?", d: "The moment that makes your contribution timely, not merely available." },
];

const SEAT_IMG =
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwzfHxlbXB0eSUyMG1lZXRpbmclMjByb29tJTIwbHV4dXJ5fGVufDB8fHx8MTc4NDUyOTczNXww&ixlib=rb-4.1.0&q=85";

const THE_18_BG =
  "https://images.unsplash.com/photo-1497215728101-856f4ea42174?crop=entropy&cs=srgb&fm=jpg&w=1600&q=80";

export default function ProfileSeat() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bigY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <>
      <section
        id="profile-seat"
        data-testid="profile-seat-section"
        className="py-24 md:py-40 bg-[#141214] text-[#F7F5F0] relative overflow-hidden"
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
            <div className="md:col-span-6">
              <Reveal>
                <div className="eyebrow mb-6 text-xs md:text-sm font-bold tracking-[0.28em]">Chapter 03 — The Signature Instrument</div>
                <h2 className="font-display font-bold text-5xl md:text-7xl leading-[0.98] tracking-tight">
                  Profile <span className="italic text-[#A82B52]">Your Seat</span>
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="font-body font-medium text-lg leading-relaxed text-[#F7F5F0]/85 mt-10 max-w-lg">
                  A Profile is not a résumé. A résumé lists what you have done. A Profile argues why it
                  matters — in the specific language a board understands. It is positioning, authored
                  with editorial precision and strategic intent.
                </p>
              </Reveal>
              <Reveal delay={0.25}>
                <div className="mt-12 overflow-hidden border border-[#A82B52]/25">
                  <img src={SEAT_IMG} alt="Minimal boardroom interior" className="w-full h-[300px] object-cover duotone" />
                </div>
              </Reveal>
            </div>

            <div className="md:col-span-6 md:pt-6">
              <Reveal delay={0.1}>
                <p className="eyebrow mb-10 text-xs md:text-sm font-bold tracking-[0.28em]">The four boardroom questions it answers</p>
              </Reveal>
              <div className="flex flex-col">
                {QUESTIONS.map((item, i) => (
                  <Reveal
                    key={item.n}
                    delay={i * 0.1}
                    className="grid grid-cols-[auto_1fr] gap-6 py-7 border-t border-[#F7F5F0]/15"
                  >
                    <span className="font-display italic font-bold text-2xl text-[#A82B52] w-8">{item.n}</span>
                    <div>
                      <h3 className="font-display font-semibold text-2xl md:text-3xl mb-2">{item.q}</h3>
                      <p className="font-body font-medium text-sm text-[#F7F5F0]/70 leading-relaxed">{item.d}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 18 typographic moment with background image */}
      <section
        id="the-18"
        ref={ref}
        data-testid="the-18-section"
        className="py-28 md:py-48 relative overflow-hidden bg-[#141214] text-[#F7F5F0]"
      >
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0 opacity-25 overflow-hidden">
          <img
            src={THE_18_BG}
            alt="Boardroom architectural background"
            className="w-full h-full object-cover duotone scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141214] via-[#141214]/80 to-[#141214]/90" />
        </div>

        <motion.div
          style={{ y: bigY }}
          className="relative z-10 pointer-events-none select-none flex justify-center"
          aria-hidden="true"
        >
          <span className="font-display font-bold text-[46vw] md:text-[34vw] leading-none text-[#A82B52]/20 tracking-tighter">
            18
          </span>
        </motion.div>

        <div className="absolute inset-0 z-20 flex items-center">
          <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20 w-full grid md:grid-cols-12 gap-10">
            <Reveal className="md:col-span-5 md:col-start-1">
              <div className="eyebrow mb-6 text-xs md:text-sm font-bold tracking-[0.28em]">Chapter 04 — Exclusivity</div>
              <h2 className="font-display font-semibold text-4xl md:text-5xl leading-tight tracking-tight text-[#F7F5F0]">
                Why only eighteen.
              </h2>
            </Reveal>
            <Reveal delay={0.15} className="md:col-span-5 md:col-start-8 md:pt-16">
              <p className="font-body font-medium text-base md:text-lg leading-relaxed text-[#F7F5F0]/85">
                Eighteen is a discipline, not a limit. A cohort small enough to preserve integrity,
                large enough to represent breadth. Each seat is protected — diversity of sector,
                perspective, and journey is a design principle, never an afterthought. Scarcity is
                what makes selection meaningful.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
