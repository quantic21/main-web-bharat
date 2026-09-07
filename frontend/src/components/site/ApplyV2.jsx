import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, EASE } from "../../lib/motion";
import { MapPin, Mail, ChevronRight, Check } from "lucide-react";
import { toast } from "sonner";

const API = process.env.REACT_APP_BACKEND_URL || (typeof window !== "undefined" && window.location.hostname !== "localhost" ? "/api" : "http://localhost:8000/api");

const SECTORS = ["Renewable Energy", "Water", "Manufacturing", "Artificial Intelligence", "Pharma", "Social Impact", "Other"];

function Label({ children }) {
  return <span className="block font-body text-[11px] font-bold tracking-[0.16em] uppercase text-[#A82B52] mb-2">{children}</span>;
}

const cardInput =
  "w-full bg-white/90 border border-[#141214]/15 rounded-sm px-4 py-3 font-body font-medium text-sm text-[#141214] placeholder-[#141214]/45 outline-none focus:border-[#A82B52] focus:bg-white transition-colors duration-300";

export default function ApplyV2({ mode, setMode }) {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(null);

  const [dir, setDir] = useState({
    full_name: "", email: "", phone: "", linkedin: "", years: "",
    sector: "Renewable Energy", links: "", statement: "",
  });
  const [co, setCo] = useState({
    company_name: "", contact_name: "", email: "", phone: "", website: "", sector: "Renewable Energy", board_priorities: "",
  });

  const wordCount = dir.statement.trim() ? dir.statement.trim().split(/\s+/).length : 0;

  const submitDirector = async (e) => {
    e.preventDefault();
    if (wordCount > 500) { toast.error("Statement of Board Purpose must be 500 words or fewer."); return; }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("full_name", dir.full_name);
      fd.append("email", dir.email);
      fd.append("phone", dir.phone);
      fd.append("linkedin", dir.linkedin);
      fd.append("sector_expertise", dir.sector);
      fd.append("board_experience", `${dir.years} years of professional experience.`);
      fd.append("thought_leadership_links", dir.links);
      fd.append("statement_of_purpose", dir.statement);
      fd.append("eligibility_confirmed", true);
      const res = await fetch(`${API}/applications/director`, { method: "POST", body: fd });
      if (!res.ok) throw new Error((await res.json()).detail || "Submission failed");
      setDone("director");
      toast.success("Application received. Check your inbox for confirmation.");
    } catch (err) {
      toast.error(err.message || "Something went wrong.");
    } finally { setSubmitting(false); }
  };

  const submitCompany = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`${API}/enquiries/company`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(co),
      });
      if (!res.ok) throw new Error((await res.json()).detail || "Submission failed");
      setDone("company");
      toast.success("Enquiry received. Check your inbox for confirmation.");
    } catch (err) {
      toast.error(err.message || "Something went wrong.");
    } finally { setSubmitting(false); }
  };

  return (
    <section id="apply" data-testid="apply-section" className="bg-[#141214] text-[#F7F5F0] relative overflow-hidden">
      {/* Background image overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 pointer-events-none"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1920&q=80')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#141214]/95 via-[#141214]/85 to-[#141214]/65 pointer-events-none" />

      {/* faint texture */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #A82B52 0, transparent 40%), radial-gradient(circle at 80% 70%, #7E1E3A 0, transparent 45%)" }} />

      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left column */}
          <div>
            <Reveal>
              <div className="eyebrow mb-8">Let's Connect</div>
              <h2 className="font-display font-semibold text-6xl md:text-7xl leading-[0.98] tracking-tight text-[#F7F5F0]">
                Ready for Distinguished Boardroom Opportunities?
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-body font-medium text-base md:text-lg leading-relaxed text-[#F7F5F0]/80 mt-10 max-w-md">
                Ether Board of Advisors connects pre-qualified leaders with companies seeking strategic
                growth, governance depth, and commercial networks. Select your pathway to begin.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-14 flex flex-col gap-8">
                <div className="flex items-center gap-5">
                  <span className="w-11 h-11 rounded-full border-2 border-[#A82B52] flex items-center justify-center shrink-0 bg-[#A82B52]/10">
                    <MapPin size={18} className="text-[#A82B52]" />
                  </span>
                  <div>
                    <div className="eyebrow text-[0.6rem] text-[#F7F5F0]/60 mb-1">Initiative Headquarters</div>
                    <div className="font-body font-medium text-base text-[#F7F5F0]">BKC Corporate Hub, Mumbai, India</div>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <span className="w-11 h-11 rounded-full border-2 border-[#A82B52] flex items-center justify-center shrink-0 bg-[#A82B52]/10">
                    <Mail size={18} className="text-[#A82B52]" />
                  </span>
                  <div>
                    <div className="eyebrow text-[0.6rem] text-[#F7F5F0]/60 mb-1">Direct Inquiries</div>
                    <a href="mailto:advisors@etherwire.co" className="font-body font-medium text-base text-[#F7F5F0] hover:text-[#F7F5F0]/70 transition-colors">advisors@etherwire.co</a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right column — card */}
          <Reveal delay={0.15}>
            <div data-testid="apply-card" className="bg-[#F7F5F0] text-[#141214] rounded-lg shadow-2xl shadow-black/40 relative overflow-hidden">
              <div className="h-1.5 w-full bg-[#A82B52]" />
              <div className="p-7 md:p-10">
                {/* Tabs */}
                <div className="grid grid-cols-2 border-b border-[#141214]/10 mb-8" data-testid="apply-toggle">
                  {[{ k: "director", l: "Apply for Cohort" }, { k: "company", l: "Enquire as Company" }].map((t) => (
                    <button
                      key={t.k}
                      data-testid={`toggle-${t.k}`}
                      onClick={() => { setMode(t.k); setDone(null); }}
                      className={`font-body text-[11px] md:text-xs tracking-[0.14em] uppercase py-3 relative transition-colors duration-300 ${
                        mode === t.k ? "text-[#A82B52] font-bold" : "text-[#141214]/60 hover:text-[#141214]"
                      }`}
                    >
                      {t.l}
                      {mode === t.k && (
                        <motion.span layoutId="v2-tab-underline" className="absolute -bottom-px left-0 right-0 h-0.5 bg-[#A82B52]" />
                      )}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {done ? (
                    <motion.div key="done" data-testid="apply-success"
                      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: EASE }} className="py-8 text-center">
                      <div className="w-12 h-12 rounded-full border-2 border-[#A82B52] flex items-center justify-center mx-auto mb-6">
                        <Check className="text-[#A82B52]" />
                      </div>
                      <h3 className="font-display font-bold text-3xl mb-3">
                        {done === "director" ? "From qualified to chosen." : "We'll be in touch."}
                      </h3>
                      <p className="font-body font-medium text-sm text-[#141214]/75 max-w-sm mx-auto leading-relaxed">
                        A confirmation has been sent to your email.
                      </p>
                      <button data-testid="apply-reset" onClick={() => setDone(null)}
                        className="mt-8 font-body font-semibold text-[11px] tracking-[0.16em] uppercase underline underline-offset-4 text-[#A82B52]">
                        Submit another
                      </button>
                    </motion.div>
                  ) : mode === "director" ? (
                    <motion.form key="director" onSubmit={submitDirector} data-testid="director-form"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                      <div>
                        <Label>Your Full Name</Label>
                        <input required data-testid="dir-full_name" className={cardInput} placeholder="E.g., John Doe"
                          value={dir.full_name} onChange={(e) => setDir({ ...dir, full_name: e.target.value })} />
                      </div>
                      <div>
                        <Label>Business Email</Label>
                        <input required type="email" data-testid="dir-email" className={cardInput} placeholder="E.g., name@company.com"
                          value={dir.email} onChange={(e) => setDir({ ...dir, email: e.target.value })} />
                      </div>
                      <div>
                        <Label>Phone Number</Label>
                        <input data-testid="dir-phone" className={cardInput} placeholder="E.g., +91 98765 43210"
                          value={dir.phone} onChange={(e) => setDir({ ...dir, phone: e.target.value })} />
                      </div>
                      <div>
                        <Label>LinkedIn Profile URL</Label>
                        <input data-testid="dir-linkedin" className={cardInput} placeholder="https://linkedin.com/in/username"
                          value={dir.linkedin} onChange={(e) => setDir({ ...dir, linkedin: e.target.value })} />
                      </div>
                      <div>
                        <Label>Years of Professional Experience</Label>
                        <input type="number" min="0" data-testid="dir-years" className={cardInput} placeholder="E.g., 22"
                          value={dir.years} onChange={(e) => setDir({ ...dir, years: e.target.value })} />
                      </div>
                      <div>
                        <Label>Primary Target Sector</Label>
                        <select data-testid="dir-sector" className={cardInput}
                          value={dir.sector} onChange={(e) => setDir({ ...dir, sector: e.target.value })}>
                          {SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <Label>Thought Leadership &amp; Publishing Links (Past 3 Years)</Label>
                        <input data-testid="dir-thought_links" className={cardInput} placeholder="E.g., link to articles, papers, or blogs"
                          value={dir.links} onChange={(e) => setDir({ ...dir, links: e.target.value })} />
                      </div>
                      <div className="sm:col-span-2">
                        <Label>Statement of Board Purpose (Max 500 Words)</Label>
                        <textarea required rows={4} data-testid="dir-statement" className={`${cardInput} resize-none`}
                          placeholder="Briefly describe your boardroom aspirations and strategic contribution..."
                          value={dir.statement} onChange={(e) => setDir({ ...dir, statement: e.target.value })} />
                        <span data-testid="word-count" className={`font-body font-medium text-[11px] mt-1.5 block ${wordCount > 500 ? "text-red-500" : "text-[#141214]/50"}`}>
                          {wordCount} / 500 words
                        </span>
                      </div>
                      <div className="sm:col-span-2 mt-1">
                        <button type="submit" disabled={submitting} data-testid="director-submit"
                          className="w-full flex items-center justify-center gap-2 font-body font-semibold text-sm tracking-[0.05em] px-8 py-4 bg-[#A82B52] text-[#F7F5F0] rounded-sm hover:bg-[#7E1E3A] transition-colors duration-500 shadow-md disabled:opacity-50">
                          {submitting ? "Submitting…" : "Submit Application for Consideration"}
                          {!submitting && <ChevronRight size={16} />}
                        </button>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.form key="company" onSubmit={submitCompany} data-testid="company-form"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                      <div>
                        <Label>Company Name</Label>
                        <input required data-testid="co-company_name" className={cardInput} placeholder="E.g., Etherwire Ltd."
                          value={co.company_name} onChange={(e) => setCo({ ...co, company_name: e.target.value })} />
                      </div>
                      <div>
                        <Label>Contact Name</Label>
                        <input required data-testid="co-contact_name" className={cardInput} placeholder="E.g., Jane Doe"
                          value={co.contact_name} onChange={(e) => setCo({ ...co, contact_name: e.target.value })} />
                      </div>
                      <div>
                        <Label>Business Email</Label>
                        <input required type="email" data-testid="co-email" className={cardInput} placeholder="E.g., name@company.com"
                          value={co.email} onChange={(e) => setCo({ ...co, email: e.target.value })} />
                      </div>
                      <div>
                        <Label>Phone Number</Label>
                        <input data-testid="co-phone" className={cardInput} placeholder="E.g., +91 98765 43210"
                          value={co.phone} onChange={(e) => setCo({ ...co, phone: e.target.value })} />
                      </div>
                      <div>
                        <Label>Website</Label>
                        <input data-testid="co-website" className={cardInput} placeholder="https://"
                          value={co.website} onChange={(e) => setCo({ ...co, website: e.target.value })} />
                      </div>
                      <div>
                        <Label>Primary Target Sector</Label>
                        <select data-testid="co-sector" className={cardInput}
                          value={co.sector} onChange={(e) => setCo({ ...co, sector: e.target.value })}>
                          {SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <Label>Board Priorities</Label>
                        <textarea required rows={4} data-testid="co-priorities" className={`${cardInput} resize-none`}
                          placeholder="What perspective, expertise or governance depth is your board seeking?"
                          value={co.board_priorities} onChange={(e) => setCo({ ...co, board_priorities: e.target.value })} />
                      </div>
                      <div className="sm:col-span-2 mt-1">
                        <button type="submit" disabled={submitting} data-testid="company-submit"
                          className="w-full flex items-center justify-center gap-2 font-body font-semibold text-sm tracking-[0.05em] px-8 py-4 bg-[#A82B52] text-[#F7F5F0] rounded-sm hover:bg-[#7E1E3A] transition-colors duration-500 shadow-md disabled:opacity-50">
                          {submitting ? "Submitting…" : "Submit Enquiry"}
                          {!submitting && <ChevronRight size={16} />}
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
