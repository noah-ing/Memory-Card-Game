import React from "react";
import { motion } from "framer-motion";

const JungleBackground: React.FC = () => {
  const leaves = Array.from({ length: 30 }, (_, i) => i);
  const animals = ["🐒", "🦜", "🦋"];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {leaves.map((leaf) => (
        <motion.div
          key={leaf}
          className="absolute bg-green-300 w-2 h-2 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 100 + 50],
            rotate: [0, 360],
            opacity: [1, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      ))}
      {animals.map((animal, index) => (
        <motion.div
          key={index}
          className="absolute text-2xl"
          style={{
            top: `${Math.random() * 100}%`,
            left: `-20%`,
          }}
          animate={{
            x: ["0%", "120%"],
            y: [0, Math.random() * 50 - 25],
          }}
          transition={{
            duration: Math.random() * 15 + 10,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          {animal}
        </motion.div>
      ))}
      <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-green-800 to-transparent" />
    </div>
  );
};

export default JungleBackground;
