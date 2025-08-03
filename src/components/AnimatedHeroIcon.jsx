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
      {/* Left Bracket */}
      <motion.path
        d="M 75,50 L 50,100 L 75,150"
        stroke="currentColor"
        className="text-primary"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
        variants={draw}
      />
      {/* Right Bracket */}
      <motion.path
        d="M 125,50 L 150,100 L 125,150"
        stroke="currentColor"
        className="text-primary"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
        variants={draw}
      />
      {/* Heart - UPDATED with a much better shape */}
      <motion.path
        d="M100 130 C 80 115, 70 100, 80 85 A 15 15 0 0 1 100 80 A 15 15 0 0 1 120 85 C 130 100, 120 115, 100 130 Z"
        fill="currentColor"
        className="text-secondary"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        style={{
          // Pulsating animation
          animation: 'pulse 2s infinite cubic-bezier(0.4, 0, 0.6, 1)',
        }}
      />
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); transform-origin: center; }
          50% { transform: scale(1.1); transform-origin: center; }
        }
      `}</style>
    </motion.svg>
  );
};

export default AnimatedHeroIcon;