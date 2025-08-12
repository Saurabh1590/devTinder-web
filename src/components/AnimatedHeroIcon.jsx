import React from "react";
import { motion } from "framer-motion";

const AnimatedHeroIcon = () => {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 1.5, bounce: 0 },
        opacity: { duration: 0.01 },
      },
    },
  };

  return (
    <motion.svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      initial="hidden"
      animate="visible"
      className="mx-auto"
    >
      <motion.path
        d="M 70,40 L 40,100 L 70,160"
        stroke="currentColor"
        className="text-primary"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
        variants={draw}
      />
      <motion.path
        d="M 130,40 L 160,100 L 130,160"
        stroke="currentColor"
        className="text-primary"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
        variants={draw}
      />
      <motion.path
        d="M100 125
           C 118 110, 145 95, 120 70
           C 110 60, 100 70, 100 80
           C 100 70, 90 60, 80 70
           C 55 95, 82 110, 100 125
           Z"
        fill="currentColor"
        className="text-secondary"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.13 }}
        whileTap={{ scale: 0.97 }}
        transition={{ delay: 1, duration: 0.5 }}
        style={{
          animation: 'pulse 2s infinite cubic-bezier(0.4, 0, 0.6, 1)',
          transformOrigin: 'center',
        }}
      />
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.13); }
        }
      `}</style>
    </motion.svg>
  );
};


export default AnimatedHeroIcon;