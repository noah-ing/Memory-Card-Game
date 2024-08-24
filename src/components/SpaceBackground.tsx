import React from "react";
import { motion } from "framer-motion";

const SpaceBackground: React.FC = () => {
  const stars = Array.from({ length: 50 }, (_, i) => i);
  const planets = ["🪐", "🌎", "🌙"];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star}
          className="absolute bg-white w-1 h-1"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
      {planets.map((planet, index) => (
        <motion.div
          key={index}
          className="absolute text-2xl"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          {planet}
        </motion.div>
      ))}
    </div>
  );
};

export default SpaceBackground;
