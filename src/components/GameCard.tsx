import React from "react";
import { motion } from "framer-motion";

interface GameCardProps {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: (id: number) => void;
}

const GameCard: React.FC<GameCardProps> = ({
  id,
  content,
  isFlipped,
  isMatched,
  onClick,
}) => {
  return (
    <motion.div
      className="relative w-full h-24 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => !isMatched && onClick(id)}
    >
      <motion.div
        className="absolute inset-0 rounded-lg shadow-md flex items-center justify-center text-3xl font-bold"
        initial={false}
        animate={{
          rotateY: isFlipped || isMatched ? 180 : 0,
          backgroundColor: isMatched
            ? "#68D391"
            : isFlipped
              ? "#4299E1"
              : "#CBD5E0",
        }}
        transition={{ duration: 0.6 }}
      >
        ?
      </motion.div>
      <motion.div
        className="absolute inset-0 rounded-lg shadow-md flex items-center justify-center text-3xl bg-white"
        initial={false}
        animate={{
          rotateY: isFlipped || isMatched ? 0 : -180,
          backgroundColor: isMatched ? "#68D391" : "#FFFFFF",
        }}
        transition={{ duration: 0.6 }}
      >
        {content}
      </motion.div>
    </motion.div>
  );
};

export default React.memo(GameCard);
