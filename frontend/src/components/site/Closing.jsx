import { Reveal } from "../../lib/motion";
import { scrollTo } from "./Nav";
import { Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const TAGLINES = [
  "Profile Your Seat. Define Your Board Value.",
  "From Qualified to Chosen.",
  "Beyond Credentials. Toward Boardroom Relevance.",
  "Only 18 Will Be Profiled.",
];

export default function Closing({ onApply, hideCTA = false }) {
  const marqueeItems = [...TAGLINES, ...TAGLINES];
  return (
    <>
      {!hideCTA && (
        <>
          {/* Marquee */}
          <div data-testid="marquee" className="border-y border-[#141214]/12 py-10 md:py-14 overflow-hidden bg-[#F7F5F0]">
            <div className="marquee-track">
              {marqueeItems.map((t, i) => (
                <span key={i} className="font-display font-bold text-4xl md:text-6xl text-[#141214] mx-8 flex items-center gap-8">
                  {t}
                  <span className="text-[#A82B52] text-2xl">✦</span>
                </span>
              ))}
            </div>
          </div>

          {/* Final CTA band */}
          <section data-testid="final-cta" className="bg-[#141214] text-[#F7F5F0] py-28 md:py-44 text-center relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-6">
              <Reveal>
                <div className="eyebrow mb-8">The First Cohort</div>
                <h2 className="font-display font-bold text-5xl md:text-8xl leading-[0.95] tracking-tight">
                  Eighteen seats.
                  <br />
                  <span className="italic text-[#A82B52]">One will be yours?</span>
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <button
                  data-testid="final-cta-btn"
                  onClick={onApply}
                  className="mt-14 font-body text-[12px] font-semibold tracking-[0.2em] uppercase px-12 py-5 bg-[#A82B52] text-[#F7F5F0] hover:bg-[#7E1E3A] transition-colors duration-500 shadow-xl"
                >
                  Apply for Consideration
                </button>
              </Reveal>
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      <footer data-testid="footer" className="bg-[#141214] text-[#F7F5F0] border-t border-[#F7F5F0]/10">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20 py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <div className="flex items-center mb-6">
                <img
                  src="/logo_dark.png"
                  alt="Ether Board of Advisors"
                  className="h-11 md:h-13 w-auto object-contain"
                />
              </div>
              <p className="font-body font-medium text-sm text-[#F7F5F0]/70 max-w-sm leading-relaxed">
                An initiative by Etherwire — curating and profiling board-ready leaders for
                distinguished placement. Merit over network, always.
              </p>
            </div>

            <div className="md:col-span-3 md:col-start-7">
              <div className="eyebrow mb-5">Navigate</div>
              <ul className="flex flex-col gap-3">
                {[
                  { id: "initiative", l: "The Initiative" },
                  { id: "profile-seat", l: "Profile Your Seat" },
                  { id: "selection", l: "Selection" },
                  { id: "apply", l: "Apply / Enquire" },
                ].map((x) => (
                  <li key={x.id}>
                    <button
                      data-testid={`footer-link-${x.id}`}
                      onClick={() => scrollTo(x.id)}
                      className="font-body font-medium text-sm text-[#F7F5F0]/70 hover:text-[#F7F5F0] transition-colors"
                    >
                      {x.l}
                    </button>
                  </li>
                ))}
                <li>
                  <Link
                    to="/team"
                    data-testid="footer-link-team"
                    className="font-body font-semibold text-sm text-[#A82B52] hover:text-[#F7F5F0] transition-colors"
                  >
                    Key Personnel & Leadership →
                  </Link>
                </li>
              </ul>
            </div>

            <div className="md:col-span-2 md:col-start-11">
              <div className="eyebrow mb-5">Connect With Us</div>
              {/* Social icons */}
              <div className="flex items-center gap-3 mb-6">
                <a
                  data-testid="footer-linkedin"
                  href="https://www.linkedin.com/company/etherwire"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 flex items-center justify-center border border-[#F7F5F0]/20 text-[#F7F5F0]/60 hover:border-[#A82B52] hover:text-[#F7F5F0] transition-colors duration-300"
                >
                  <Linkedin size={16} />
                </a>
                <a
                  data-testid="footer-twitter"
                  href="https://twitter.com/etherwire"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X / Twitter"
                  className="w-10 h-10 flex items-center justify-center border border-[#F7F5F0]/20 text-[#F7F5F0]/60 hover:border-[#A82B52] hover:text-[#F7F5F0] transition-colors duration-300"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.728-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  data-testid="footer-instagram"
                  href="https://instagram.com/etherwire"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 flex items-center justify-center border border-[#F7F5F0]/20 text-[#F7F5F0]/60 hover:border-[#A82B52] hover:text-[#F7F5F0] transition-colors duration-300"
                >
                  <Instagram size={16} />
                </a>
              </div>
              <div className="eyebrow mb-3">Email Us</div>
              <a
                data-testid="footer-email"
                href="mailto:advisors@etherwire.com"
                className="font-body font-medium text-sm text-[#F7F5F0]/70 hover:text-[#F7F5F0] transition-colors"
              >
                advisors@etherwire.com
              </a>
            </div>
          </div>



          <div className="hairline-ink mt-16 mb-8 opacity-20" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-body font-medium text-xs text-[#F7F5F0]/50">
            <div>© {new Date().getFullYear()} Etherwire. All rights reserved.</div>
            <div className="flex items-center gap-6">
              <span className="hover:text-[#F7F5F0] transition-colors cursor-pointer">Privacy Policy</span>
              <span className="hover:text-[#F7F5F0] transition-colors cursor-pointer">Terms of Consideration</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
