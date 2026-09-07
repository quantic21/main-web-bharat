import { motion } from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1];

// Slow fade-up used across sections
export const Reveal = ({ children, delay = 0, y = 34, className = "", as = "div" }) => {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.2, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
};

// Masked line reveal (hero)
export const MaskLine = ({ children, delay = 0, className = "" }) => (
  <span className="reveal-mask">
    <motion.span
      style={{ display: "block" }}
      className={className}
      initial={{ y: "110%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  </span>
);

export const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export const staggerChild = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
};
