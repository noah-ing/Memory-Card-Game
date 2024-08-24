import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import GameGrid from "@/components/GameGrid";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ThemeProvider } from "@/components/theme-provider";
import SpaceBackground from "@/components/SpaceBackground";
import JungleBackground from "@/components/JungleBackground";

interface Card {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

type Difficulty = "easy" | "medium" | "hard";
type GameTheme = "space" | "jungle";

const difficultySettings = {
  easy: { pairs: 6, gridCols: 3 },
  medium: { pairs: 8, gridCols: 4 },
  hard: { pairs: 12, gridCols: 4 },
};

const themeEmojis = {
  space: [
    "🚀",
    "🛸",
    "🪐",
    "🌎",
    "🌙",
    "☄️",
    "👽",
    "🌟",
    "🌠",
    "🌌",
    "🔭",
    "🛰️",
  ],
  jungle: [
    "🐒",
    "🦁",
    "🐘",
    "🦒",
    "🦜",
    "🐍",
    "🦋",
    "🌴",
    "🍌",
    "🥥",
    "🌺",
    "🦚",
  ],
};

const App: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameTheme, setGameTheme] = useState<GameTheme>("space");

  const initializeGame = useCallback((diff: Difficulty, theme: GameTheme) => {
    const emojis = themeEmojis[theme];
    const { pairs } = difficultySettings[diff];
    const gameEmojis = emojis.slice(0, pairs);
    const initialCards: Card[] = [...gameEmojis, ...gameEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        content: emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(initialCards);
    setFlippedCards([]);
    setMoves(0);
    setGameOver(false);
    setTimer(0);
    setIsPlaying(true);
  }, []);

  useEffect(() => {
    initializeGame(difficulty, gameTheme);
  }, [difficulty, gameTheme, initializeGame]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !gameOver) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, gameOver]);

  const handleCardClick = useCallback(
    (id: number) => {
      if (flippedCards.length === 2 || gameOver) return;

      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === id ? { ...card, isFlipped: true } : card,
        ),
      );

      setFlippedCards((prev) => [...prev, id]);

      if (flippedCards.length === 1) {
        setMoves((prev) => prev + 1);
        const [firstCardId] = flippedCards;

        const checkMatch = () => {
          setCards((prevCards) => {
            const firstCard = prevCards.find((card) => card.id === firstCardId);
            const secondCard = prevCards.find((card) => card.id === id);

            if (
              firstCard &&
              secondCard &&
              firstCard.content === secondCard.content
            ) {
              const updatedCards = prevCards.map((card) =>
                card.id === firstCardId || card.id === id
                  ? { ...card, isMatched: true }
                  : card,
              );

              if (updatedCards.every((card) => card.isMatched)) {
                setGameOver(true);
                setIsPlaying(false);
              }

              return updatedCards;
            } else {
              return prevCards.map((card) =>
                card.id === firstCardId || card.id === id
                  ? { ...card, isFlipped: false }
                  : card,
              );
            }
          });
          setFlippedCards([]);
        };

        setTimeout(checkMatch, 1000);
      }
    },
    [flippedCards, gameOver],
  );

  const getThemeStyles = () => {
    if (gameTheme === "space") {
      return {
        bgColor: "bg-indigo-900",
        cardBg: "bg-indigo-600",
        textColor: "text-indigo-200",
        buttonBg: "bg-indigo-500 hover:bg-indigo-600",
      };
    } else {
      return {
        bgColor: "bg-green-800",
        cardBg: "bg-green-600",
        textColor: "text-green-200",
        buttonBg: "bg-green-500 hover:bg-green-600",
      };
    }
  };

  const themeStyles = getThemeStyles();

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div
        className={`min-h-screen ${themeStyles.bgColor} flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden relative`}
      >
        {gameTheme === "space" ? <SpaceBackground /> : <JungleBackground />}
        <motion.div
          className={`w-full max-w-4xl bg-black bg-opacity-60 backdrop-blur-md rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 border ${gameTheme === "space" ? "border-indigo-500" : "border-green-500"}`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-8">
            <h1
              className={`text-2xl sm:text-3xl md:text-4xl font-bold ${themeStyles.textColor} mb-2 sm:mb-0`}
            >
              {gameTheme === "space" ? "Cosmic Memory" : "Jungle Memory"}
            </h1>
            <ThemeToggle />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 space-y-2 sm:space-y-0">
            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
              {(["easy", "medium", "hard"] as Difficulty[]).map((diff) => (
                <Button
                  key={diff}
                  onClick={() => setDifficulty(diff)}
                  variant={difficulty === diff ? "default" : "outline"}
                  className={`${themeStyles.buttonBg} text-white text-xs sm:text-sm`}
                >
                  {diff.charAt(0).toUpperCase() + diff.slice(1)}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
              <Button
                onClick={() => setGameTheme("space")}
                variant={gameTheme === "space" ? "default" : "outline"}
                className={`${themeStyles.buttonBg} text-white text-xs sm:text-sm`}
              >
                🚀 Space
              </Button>
              <Button
                onClick={() => setGameTheme("jungle")}
                variant={gameTheme === "jungle" ? "default" : "outline"}
                className={`${themeStyles.buttonBg} text-white text-xs sm:text-sm`}
              >
                🌴 Jungle
              </Button>
            </div>
          </div>

          <div
            className={`text-sm sm:text-base md:text-lg font-semibold ${themeStyles.textColor} mb-4 text-center sm:text-left`}
          >
            Time: {timer}s | Moves: {moves}
          </div>

          <GameGrid
            cards={cards}
            onCardClick={handleCardClick}
            gridCols={difficultySettings[difficulty].gridCols}
            cardBg={themeStyles.cardBg}
          />

          <AnimatePresence>
            {gameOver && (
              <motion.div
                className="mt-4 sm:mt-8 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <p
                  className={`text-xl sm:text-2xl md:text-3xl font-bold ${themeStyles.textColor} mb-2 sm:mb-4`}
                >
                  {gameTheme === "space"
                    ? "Cosmic Victory Achieved!"
                    : "Jungle Conquest Complete!"}
                </p>
                <p
                  className={`text-base sm:text-lg md:text-xl ${themeStyles.textColor} mb-4 sm:mb-6`}
                >
                  Time: {timer}s | Moves: {moves}
                </p>
                <Button
                  onClick={() => initializeGame(difficulty, gameTheme)}
                  size="sm"
                  className={`${themeStyles.buttonBg} text-white text-sm sm:text-base`}
                >
                  {gameTheme === "space"
                    ? "New Cosmic Journey"
                    : "New Jungle Adventure"}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </ThemeProvider>
  );
};

export default App;
