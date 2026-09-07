import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Award, BookOpen, Briefcase, ExternalLink, Linkedin, Sparkles } from "lucide-react";
import Lenis from "lenis";
import Nav from "@/components/site/Nav";
import Closing from "@/components/site/Closing";
import { CATEGORIES, TEAM_MEMBERS } from "@/data/teamData";
import { EASE } from "@/lib/motion";

function getInitials(name) {
  if (!name) return "EW";
  const cleanName = name.replace(/^(Dr\.|Shri\.|Prof\.|Mr\.|Mrs\.|Ms\.)\s+/i, "");
  const parts = cleanName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function TeamPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedMember, setSelectedMember] = useState(null);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Lock body scroll and add Escape key listener when modal is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedMember(null);
      }
    };

    if (selectedMember) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedMember]);

  const filteredMembers =
    activeCategory === "all"
      ? TEAM_MEMBERS
      : TEAM_MEMBERS.filter((m) => m.category === activeCategory);

  const featuredLeader = TEAM_MEMBERS.find((m) => m.id === "jyoti-rai");

  return (
    <div className="App bg-[#F7F5F0] text-[#141214] min-h-screen selection:bg-[#A82B52] selection:text-[#F7F5F0]">
      <Nav />

      <main className="pt-28 pb-20">
        {/* HERO SECTION */}
        <section className="relative px-6 md:px-12 lg:px-20 max-w-screen-2xl mx-auto py-16 md:py-24 border-b border-[#141214]/10">
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="inline-flex items-center gap-2 text-xs md:text-sm uppercase tracking-[0.25em] font-semibold text-[#A82B52]"
            >
              <Sparkles size={14} className="animate-pulse text-[#A82B52]" />
              Etherwire Key Personnel & Leadership
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: EASE }}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[0.95]"
            >
              The Minds Shaping <br />
              <span className="italic font-normal text-[#A82B52]">Etherwire.Ai</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
              className="font-body text-lg md:text-xl font-light text-[#141214]/70 max-w-3xl leading-relaxed mt-2"
            >
              Meet the visionary founders, seasoned independent board directors, and distinguished financial leaders driving India's professional media landscape and ethical AI innovation.
            </motion.p>
          </div>
        </section>

        {/* FEATURED SPOTLIGHT: FOUNDER & CEO */}
        {featuredLeader && (
          <section className="px-6 md:px-12 lg:px-20 max-w-screen-2xl mx-auto py-16 md:py-20 border-b border-[#141214]/10">
            <div className="bg-[#141214] text-[#F7F5F0] p-8 md:p-14 lg:p-16 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#A82B52]/10 blur-[120px] pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
                {/* Photo Column */}
                <div className="lg:col-span-5 relative">
                  <div className="aspect-[4/5] relative overflow-hidden border border-[#A82B52]/30">
                    <img
                      src={featuredLeader.image}
                      alt={featuredLeader.name}
                      className="w-full h-full object-cover object-top filter grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141214] via-transparent to-transparent opacity-60" />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-[#A82B52] text-[#F7F5F0] px-4 py-2 text-xs font-mono tracking-widest uppercase border border-[#F7F5F0]/20">
                    Founder & CEO
                  </div>
                </div>

                {/* Info Column */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#A82B52]">
                      Executive Spotlight
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl font-light">
                      {featuredLeader.name}
                    </h2>
                    <p className="font-body text-[#F7F5F0]/60 text-sm md:text-base font-light italic">
                      "{featuredLeader.tagline}"
                    </p>
                  </div>

                  <p className="font-body text-base md:text-lg text-[#F7F5F0]/80 leading-relaxed font-light">
                    {featuredLeader.summary}
                  </p>

                  {/* Highlight Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-[#F7F5F0]/10 my-2">
                    {featuredLeader.stats.map((st, i) => (
                      <div key={i} className="flex flex-col gap-1">
                        <span className="font-display text-2xl md:text-3xl text-[#A82B52] font-normal">
                          {st.value}
                        </span>
                        <span className="font-body text-xs text-[#F7F5F0]/60 uppercase tracking-wider">
                          {st.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4 pt-2">
                    <button
                      onClick={() => setSelectedMember(featuredLeader)}
                      className="font-body text-xs uppercase tracking-[0.2em] font-semibold px-6 py-3.5 bg-[#A82B52] text-[#F7F5F0] hover:bg-[#852140] transition-colors inline-flex items-center gap-2 group/btn"
                    >
                      Read Complete Biography
                      <ArrowUpRight size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                    {featuredLeader.linkedin && (
                      <a
                        href={featuredLeader.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="font-body text-xs uppercase tracking-[0.2em] font-semibold px-6 py-3.5 border border-[#F7F5F0]/30 text-[#F7F5F0] hover:bg-[#F7F5F0] hover:text-[#141214] transition-colors inline-flex items-center gap-2"
                      >
                        <Linkedin size={16} />
                        LinkedIn Profile
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CATEGORY FILTER & PERSONNEL GRID */}
        <section className="px-6 md:px-12 lg:px-20 max-w-screen-2xl mx-auto py-16 md:py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-[#141214]/10">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#A82B52] block mb-2">
                Team Directory
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-light">
                Key Leaders & Board Advisors
              </h2>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 md:gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`font-body text-xs uppercase tracking-widest px-4 py-2.5 transition-all duration-300 ${
                    activeCategory === cat.id
                      ? "bg-[#141214] text-[#F7F5F0]"
                      : "bg-[#141214]/5 text-[#141214]/70 hover:bg-[#141214]/10"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {filteredMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
                className="group flex flex-col justify-between bg-[#F7F5F0] border border-[#141214]/10 p-6 hover:border-[#A82B52]/50 transition-all duration-500 hover:shadow-xl relative"
              >
                <div>
                  {/* Photo container / Initial Avatar */}
                  {member.image ? (
                    <div className="aspect-[4/3] w-full overflow-hidden bg-[#141214]/5 mb-6 relative border border-[#141214]/10">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-top filter grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                      />
                      <div className="absolute top-3 left-3 bg-[#141214]/80 backdrop-blur-sm text-[#F7F5F0] px-3 py-1 text-[11px] font-mono tracking-wider uppercase">
                        {member.category === "leadership"
                          ? "Executive Leadership"
                          : member.category === "directors"
                          ? "Board Director"
                          : "Board Advisor"}
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-[4/3] w-full overflow-hidden bg-[#141214] text-[#F7F5F0] mb-6 relative border border-[#A82B52]/30 flex flex-col items-center justify-center p-6 group-hover:border-[#A82B52] transition-colors">
                      <div className="absolute top-3 left-3 bg-[#A82B52]/90 backdrop-blur-sm text-[#F7F5F0] px-3 py-1 text-[11px] font-mono tracking-wider uppercase">
                        {member.category === "leadership"
                          ? "Executive Leadership"
                          : member.category === "directors"
                          ? "Board Director"
                          : "Board Advisor"}
                      </div>
                      <div className="w-16 h-16 rounded-full bg-[#A82B52]/20 border border-[#A82B52]/50 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-500">
                        <span className="font-display text-2xl font-light text-[#F7F5F0]">
                          {getInitials(member.name)}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-[#F7F5F0]/50 tracking-widest uppercase mt-1">
                        Etherwire Key Personnel
                      </span>
                    </div>
                  )}

                  {/* Header info */}
                  <div className="space-y-2 mb-4">
                    <h3 className="font-display text-2xl md:text-3xl font-normal group-hover:text-[#A82B52] transition-colors">
                      {member.name}
                    </h3>
                    <p className="font-body text-xs font-semibold uppercase tracking-wider text-[#A82B52]">
                      {member.role}
                    </p>
                    <p className="font-body text-xs text-[#141214]/60 font-light italic">
                      {member.subtitle}
                    </p>
                  </div>

                  {/* Summary */}
                  <p className="font-body text-sm text-[#141214]/70 leading-relaxed font-light line-clamp-4 mb-6">
                    {member.summary}
                  </p>
                </div>

                {/* Footer action */}
                <div className="pt-4 border-t border-[#141214]/10 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedMember(member)}
                    className="font-body text-xs font-semibold uppercase tracking-widest text-[#141214] group-hover:text-[#A82B52] transition-colors inline-flex items-center gap-1.5"
                  >
                    View Full Profile
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>

                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#141214] hover:text-[#A82B52] transition-colors p-1"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Linkedin size={16} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* MODAL / DRAWER FOR DETAILED BIO */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="fixed inset-0 bg-[#141214]/70 backdrop-blur-sm"
            />

            {/* Slide-over Content Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: EASE }}
              className="relative w-full max-w-3xl bg-[#F7F5F0] text-[#141214] h-full overflow-y-auto shadow-2xl z-10 p-8 md:p-12 flex flex-col justify-between border-l border-[#A82B52]/30"
            >
              <div>
                {/* Modal Top Bar */}
                <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#141214]/10">
                  <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#A82B52]">
                    Key Personnel Bio Profile
                  </span>
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="p-2 border border-[#141214]/20 hover:border-[#A82B52] hover:text-[#A82B52] transition-colors"
                    aria-label="Close modal"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Hero Header in Drawer */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-start mb-10">
                  <div className="sm:col-span-5 aspect-[4/5] overflow-hidden border border-[#A82B52]/30 bg-[#141214] flex flex-col items-center justify-center relative">
                    {selectedMember.image ? (
                      <img
                        src={selectedMember.image}
                        alt={selectedMember.name}
                        className="w-full h-full object-cover object-top filter grayscale contrast-105"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-20 h-20 rounded-full bg-[#A82B52]/20 border border-[#A82B52]/50 flex items-center justify-center mb-3">
                          <span className="font-display text-3xl font-light text-[#F7F5F0]">
                            {getInitials(selectedMember.name)}
                          </span>
                        </div>
                        <span className="font-mono text-xs text-[#F7F5F0]/60 tracking-widest uppercase">
                          Etherwire Key Personnel
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="sm:col-span-7 space-y-3">
                    <h2 className="font-display text-3xl md:text-4xl font-light">
                      {selectedMember.name}
                    </h2>
                    <p className="font-body text-sm font-semibold uppercase tracking-wider text-[#A82B52]">
                      {selectedMember.role}
                    </p>
                    <p className="font-body text-xs text-[#141214]/60 italic">
                      {selectedMember.subtitle}
                    </p>

                    {selectedMember.tagline && (
                      <blockquote className="font-display text-lg italic text-[#141214]/80 pt-2 border-t border-[#141214]/10">
                        "{selectedMember.tagline}"
                      </blockquote>
                    )}

                    {selectedMember.linkedin && (
                      <a
                        href={selectedMember.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#A82B52] hover:underline pt-2"
                      >
                        <Linkedin size={15} />
                        View LinkedIn Profile
                      </a>
                    )}
                  </div>
                </div>

                {/* Stats Bar if available */}
                {selectedMember.stats && selectedMember.stats.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#141214] text-[#F7F5F0] mb-8">
                    {selectedMember.stats.map((st, i) => (
                      <div key={i} className="flex flex-col">
                        <span className="font-display text-xl text-[#A82B52] font-normal">
                          {st.value}
                        </span>
                        <span className="font-body text-[10px] text-[#F7F5F0]/60 uppercase tracking-wider">
                          {st.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Full Biography Paragraphs */}
                <div className="space-y-6 mb-10">
                  <h3 className="font-display text-2xl font-light border-b border-[#141214]/10 pb-2 flex items-center gap-2">
                    <Briefcase size={18} className="text-[#A82B52]" />
                    Executive Overview & Leadership
                  </h3>
                  {selectedMember.fullBio.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="font-body text-base text-[#141214]/80 leading-relaxed font-light"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Credentials */}
                {selectedMember.credentials && (
                  <div className="space-y-4 mb-10">
                    <h3 className="font-display text-2xl font-light border-b border-[#141214]/10 pb-2 flex items-center gap-2">
                      <BookOpen size={18} className="text-[#A82B52]" />
                      Education & Qualifications
                    </h3>
                    <ul className="space-y-2">
                      {selectedMember.credentials.map((cred, i) => (
                        <li key={i} className="font-body text-sm text-[#141214]/80 flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 bg-[#A82B52] rounded-full mt-2 shrink-0" />
                          <span>{cred}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Awards & Recognition */}
                {selectedMember.awards && (
                  <div className="space-y-4 mb-10">
                    <h3 className="font-display text-2xl font-light border-b border-[#141214]/10 pb-2 flex items-center gap-2">
                      <Award size={18} className="text-[#A82B52]" />
                      Awards & Strategic Recognition
                    </h3>
                    <ul className="space-y-2">
                      {selectedMember.awards.map((awd, i) => (
                        <li key={i} className="font-body text-sm text-[#141214]/80 flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 bg-[#A82B52] rounded-full mt-2 shrink-0" />
                          <span>{awd}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Key Focus Areas */}
                {selectedMember.keyFocusAreas && (
                  <div className="space-y-4 mb-10">
                    <h3 className="font-display text-2xl font-light border-b border-[#141214]/10 pb-2">
                      Core Domain Expertise
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.keyFocusAreas.map((fa, i) => (
                        <span
                          key={i}
                          className="font-body text-xs uppercase tracking-wider px-3.5 py-1.5 bg-[#141214]/5 text-[#141214] border border-[#141214]/10"
                        >
                          {fa}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer Footer */}
              <div className="pt-6 border-t border-[#141214]/10 flex items-center justify-between">
                <span className="font-mono text-xs text-[#141214]/50 uppercase">
                  Etherwire Key Personnel Document
                </span>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="font-body text-xs uppercase tracking-widest font-semibold text-[#A82B52] hover:underline"
                >
                  Close Profile
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Closing hideCTA={true} />
    </div>
  );
}
