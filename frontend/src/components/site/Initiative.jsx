import { Reveal } from "../../lib/motion";

const PILLARS = [
  { n: "01", t: "Unlock Access", d: "Open doors to boardroom conversations that credentials alone never reach." },
  { n: "02", t: "Strategic Thinking", d: "Position the depth of judgment a modern board demands beyond the résumé." },
  { n: "03", t: "Investor Reassurance", d: "Signal governance maturity and stewardship investors quietly look for." },
  { n: "04", t: "Brand Elevation", d: "Refine how a leader is perceived — from qualified candidate to chosen voice." },
  { n: "05", t: "Sector Depth", d: "Anchor relevance in the industries where your perspective compounds value." },
];

const INITIATIVE_IMG =
  "https://images.pexels.com/photos/14528981/pexels-photo-14528981.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

export default function Initiative() {
  return (
    <>
      <section id="initiative" data-testid="initiative-section" className="py-24 md:py-40">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
            <div className="md:col-span-5">
              <Reveal>
                <div className="eyebrow mb-6 text-xs md:text-sm font-bold tracking-[0.28em]">Chapter 01 — The Initiative</div>
                <div className="hairline w-16 mb-10" />
              </Reveal>
              <Reveal delay={0.1}>
                <div className="relative overflow-hidden">
                  <img
                    src={INITIATIVE_IMG}
                    alt="Architectural detail in monochrome"
                    className="w-full h-[420px] object-cover duotone"
                  />
                  <div className="absolute bottom-4 left-4 font-body text-[0.72rem] tracking-[0.28em] uppercase font-semibold text-[#F7F5F0] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    Boardroom, unoccupied
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="md:col-span-7 md:pt-4">
              <Reveal>
                <h2 className="font-display font-semibold text-5xl md:text-7xl leading-[1.02] tracking-tight text-[#141214]">
                  Elevating boardroom presence for the modern era.
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="font-body font-medium text-lg md:text-xl leading-relaxed text-[#141214]/85 mt-10 max-w-2xl">
                  The Ether Board of Advisors exists for a narrow, deliberate purpose: to identify
                  leaders whose contribution to a board would be material — and to make that
                  contribution legible. We do not manufacture credentials. We surface relevance.
                </p>
              </Reveal>

              <Reveal delay={0.25}>
                <div className="mt-16 border-t border-[#141214]/12 pt-10">
                  <div className="eyebrow mb-4 text-xs md:text-sm font-bold tracking-[0.28em]">The Market Gap</div>
                  <p className="font-body font-medium text-base md:text-lg leading-relaxed text-[#141214]/80 max-w-2xl">
                    Boards are searched by network, not by merit. Highly qualified directors go
                    overlooked — not for lack of substance, but for lack of a frame that answers the
                    only questions a nominating committee truly asks. We build that frame.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Five Pillars */}
      <section id="pillars" data-testid="pillars-section" className="pb-24 md:pb-40">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20">
          <Reveal>
            <div className="flex items-end justify-between mb-14">
              <div>
                <div className="eyebrow mb-4 text-xs md:text-sm font-bold tracking-[0.28em]">Chapter 02 — Core Value</div>
                <h2 className="font-display font-semibold text-4xl md:text-5xl tracking-tight text-[#141214]">
                  Five Pillars
                </h2>
              </div>

            </div>
          </Reveal>

          <div className="border-t border-[#A82B52]/40 grid grid-cols-1 md:grid-cols-5 md:divide-x divide-[#A82B52]/30">
            {PILLARS.map((p, i) => (
              <Reveal
                key={p.n}
                delay={i * 0.08}
                className="py-10 md:py-12 md:px-6 border-b md:border-b-0 border-[#141214]/10 group hover:bg-[#A82B52] transition-colors duration-500"
              >
                <div className="px-1">
                  <div className="font-display text-3xl font-bold text-[#A82B52] group-hover:text-[#F7F5F0] mb-6 transition-colors">{p.n}</div>
                  <h3 className="font-display text-2xl md:text-[1.6rem] font-bold text-[#141214] group-hover:text-[#F7F5F0] transition-colors duration-500 mb-4 leading-tight">
                    {p.t}
                  </h3>
                  <p className="font-body font-medium text-base md:text-lg leading-relaxed text-[#141214]/70 group-hover:text-[#F7F5F0]/85 transition-colors duration-500">
                    {p.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
