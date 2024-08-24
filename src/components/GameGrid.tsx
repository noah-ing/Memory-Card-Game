import React from "react";
import { motion } from "framer-motion";

interface GameGridProps {
  cards: Array<{
    id: number;
    content: string;
    isFlipped: boolean;
    isMatched: boolean;
  }>;
  onCardClick: (id: number) => void;
  gridCols: number;
  cardBg: string;
}

const GameGrid: React.FC<GameGridProps> = ({
  cards,
  onCardClick,
  gridCols,
  cardBg,
}) => {
  return (
    <div
      className={`grid gap-2 sm:gap-3 md:gap-4 ${
        gridCols === 3 ? "grid-cols-3" : "grid-cols-4"
      }`}
    >
      {cards.map((card) => (
        <motion.div
          key={card.id}
          className={`aspect-square rounded-xl shadow-lg 
                      flex items-center justify-center text-2xl sm:text-3xl md:text-4xl cursor-pointer overflow-hidden
                      ${card.isMatched ? "bg-green-500" : card.isFlipped ? "bg-red-500" : cardBg}`}
          onClick={() => onCardClick(card.id)}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)",
          }}
          whileTap={{ scale: 0.95 }}
          animate={{
            rotateY: card.isFlipped || card.isMatched ? 180 : 0,
            boxShadow: card.isMatched
              ? "0 0 20px rgba(52, 211, 153, 0.7)"
              : "0 0 10px rgba(255, 255, 255, 0.3)",
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute w-full h-full backface-hidden flex items-center justify-center"
            initial={false}
            animate={{ opacity: card.isFlipped || card.isMatched ? 0 : 1 }}
          >
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              ?
            </span>
          </motion.div>
          <motion.div
            className="absolute w-full h-full backface-hidden flex items-center justify-center"
            initial={false}
            animate={{ opacity: card.isFlipped || card.isMatched ? 1 : 0 }}
            style={{ transform: "rotateY(180deg)" }}
          >
            {card.content}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default GameGrid;
