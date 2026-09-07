import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MaskLine, EASE } from "../../lib/motion";

const HERO_IMG =
  "https://images.unsplash.com/photo-1503423571797-2d2bb372094a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHw0fHxlbXB0eSUyMG1lZXRpbmclMjByb29tJTIwbHV4dXJ5fGVufDB8fHx8MTc4NDUyOTczNXww&ixlib=rb-4.1.0&q=85";

export default function Hero({ onApply, onEnquire }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      data-testid="hero-section"
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16"
    >
      {/* Parallax image, right column */}
      <motion.div
        style={{ y: imgY, scale: imgScale }}
        className="absolute right-0 top-0 h-full w-full md:w-[46%] overflow-hidden"
      >
        <div className="absolute inset-0 bg-[#F7F5F0] md:bg-transparent z-10 opacity-70 md:opacity-0" />
        <img
          src={HERO_IMG}
          alt="An empty, light-filled boardroom"
          className="w-full h-full object-cover duotone"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F7F5F0] via-transparent to-transparent" />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-20 max-w-screen-2xl mx-auto pl-4 md:pl-6 lg:pl-10 pr-6 md:pr-12 lg:pr-20 w-full"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="eyebrow mb-8"
        >
          An Initiative by Etherwire
        </motion.div>

        <h1 className="font-display font-bold text-[10vw] leading-[0.92] md:text-[6vw] lg:text-[5.2vw] tracking-[-0.02em] text-[#141214] max-w-[15ch]">
          <MaskLine delay={0.45}>Where Board</MaskLine>
          <MaskLine delay={0.6}>
            Readiness Meets
          </MaskLine>
          <MaskLine delay={0.75} className="italic text-[#A82B52]">
            Board Distinction
          </MaskLine>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.05, ease: EASE }}
          className="font-body text-base md:text-lg font-medium text-[#141214]/80 mt-8 max-w-md tracking-wide"
        >
          Beyond Credentials. Toward Boardroom Relevance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.25, ease: EASE }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mt-10"
        >
          <button
            data-testid="hero-apply-btn"
            onClick={onApply}
            className="font-body text-[12px] font-semibold tracking-[0.18em] uppercase px-8 py-4 bg-[#A82B52] text-[#F7F5F0] hover:bg-[#7E1E3A] transition-colors duration-500 shadow-md"
          >
            Apply for Consideration
          </button>
          <button
            data-testid="hero-enquire-btn"
            onClick={onEnquire}
            className="font-body text-[12px] font-semibold tracking-[0.18em] uppercase px-8 py-4 border border-[#A82B52] text-[#A82B52] hover:bg-[#A82B52] hover:text-[#F7F5F0] transition-colors duration-500"
          >
            Enquire as a Company
          </button>
        </motion.div>

        {/* Badge — 18 placed inline below buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4, ease: EASE }}
          data-testid="hero-badge"
          className="flex items-center gap-4 mt-12 pt-8 border-t border-[#141214]/12 max-w-xs"
        >
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full border-2 border-[#A82B52] shrink-0 bg-[#A82B52]/10">
            <span className="font-display text-2xl font-bold text-[#A82B52] leading-none">18</span>
          </div>
          <span className="eyebrow max-w-[9rem] leading-snug">Only 18 Will Be Profiled</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
