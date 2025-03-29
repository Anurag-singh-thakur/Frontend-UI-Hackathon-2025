"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import WordGrid from "@/components/game/WordGrid"
import Keyboard from "@/components/game/Keyboard"
import GameStats from "@/components/game/GameStats"
import { Button } from "@/components/ui/button"
import GameModeSelector from "@/components/game/GameModeSelector"
import HintSystem from "@/components/game/HintSystem"
import GameTimer from "@/components/game/GameTimer"
import type { GameSettings } from "@/types/game"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { RefreshCwIcon, TrophyIcon, ClockIcon, InfoIcon, HelpCircleIcon } from "lucide-react"
import { toast } from "sonner"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

const WORD_OF_THE_DAY = "REACT"

export default function Home() {
  const [guesses, setGuesses] = useState<string[]>([])
  const [currentGuess, setCurrentGuess] = useState("")
  const [gameWon, setGameWon] = useState(false)
  const [gameLost, setGameLost] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [gameMode, setGameMode] = useState<GameSettings | null>(null)
  const [hintsRemaining, setHintsRemaining] = useState(3)

  const usedLetters: Record<string, "correct" | "present" | "absent"> = {}
  guesses.forEach((guess) => {
    guess.split("").forEach((letter, i) => {
      if (letter === WORD_OF_THE_DAY[i]) {
        usedLetters[letter] = "correct"
      } else if (WORD_OF_THE_DAY.includes(letter)) {
        usedLetters[letter] = usedLetters[letter] === "correct" ? "correct" : "present"
      } else {
        usedLetters[letter] = usedLetters[letter] || "absent"
      }
    })
  })

  const handleKeyPress = (key: string) => {
    if (gameWon || gameLost) return
    if (key === "ENTER") {
      if (currentGuess.length !== 5) {
        toast.error("Word too short. Please enter a 5-letter word")
        return
      }
      setGuesses([...guesses, currentGuess])
      if (currentGuess === WORD_OF_THE_DAY) {
        setGameWon(true)
        setTimeout(() => setShowStats(true), 1500)
      } else if (guesses.length >= 5) {
        // Lost after 6 attempts (including this one)
        setGameLost(true)
        setTimeout(() => setShowStats(true), 1500)
      }
      setCurrentGuess("")
    } else if (key === "⌫") {
      setCurrentGuess((prev) => prev.slice(0, -1))
    } else if (currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + key)
    }
  }

  const resetGame = () => {
    setGuesses([])
    setCurrentGuess("")
    setGameWon(false)
    setGameLost(false)
    setHintsRemaining(3)
    toast.success("Game reset! Good luck!")
  }

  useEffect(() => {
    // Show help dialog for first-time users
    const hasSeenHelp = localStorage.getItem("hasSeenHelp")
    if (!hasSeenHelp) {
      setShowHelp(true)
      localStorage.setItem("hasSeenHelp", "true")
    }
  }, [])

  if (!gameMode) {
    return <GameModeSelector onSelect={setGameMode} />
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background via-background to-muted/30 flex flex-col items-center justify-start py-12 px-4 sm:px-8">
      <Card className="w-full max-w-4xl border-border/30 bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl">
        <CardContent className="p-8 space-y-8">
          <header className="text-center space-y-6">
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowHelp(true)} 
                className="rounded-xl hover:bg-primary/5 hover:text-primary transition-colors relative group"
              >
                <HelpCircleIcon className="w-5 h-5" />
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  How to Play
                </span>
              </Button>

              <div className="relative">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                  Word Puzzle
                </h1>
                <div className="absolute -top-1 -right-4 w-8 h-8 bg-yellow-400/10 rounded-full blur-xl animate-pulse" />
              </div>

              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowStats(true)} 
                className="rounded-xl hover:bg-primary/5 hover:text-primary transition-colors relative group"
              >
                <TrophyIcon className="w-5 h-5" />
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  View Stats
                </span>
              </Button>
            </div>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <p className="text-muted-foreground text-sm font-medium px-3 py-1.5 bg-muted/30 rounded-full">
                Guess the word in 6 tries
              </p>
              {gameMode.mode === "timed" && (
                <Badge variant="outline" className="flex items-center gap-1.5 text-xs bg-orange-50 text-orange-600 border-orange-200 px-3 py-1.5">
                  <ClockIcon className="w-3.5 h-3.5" /> Timed Mode
                </Badge>
              )}
              {gameMode.hints && (
                <Badge variant="outline" className="flex items-center gap-1.5 text-xs bg-blue-50 text-blue-600 border-blue-200 px-3 py-1.5">
                  <InfoIcon className="w-3.5 h-3.5" /> Hints: {hintsRemaining}
                </Badge>
              )}
            </div>
          </header>

          <Separator className="bg-border/30" />

          <AnimatePresence mode="wait">
            <motion.div
              key={guesses.length + (gameWon ? "won" : "") + (gameLost ? "lost" : "")}
              initial={{ opacity: 0.8, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0.8, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="flex justify-center">
                <WordGrid
                  word={WORD_OF_THE_DAY}
                  guesses={guesses}
                  currentGuess={currentGuess}
                  gameWon={gameWon}
                  gameLost={gameLost}
                />
              </div>

              {gameMode.mode === "timed" && (
                <div className="bg-gradient-to-r from-orange-50 to-orange-50/50 rounded-xl p-4 backdrop-blur-sm border border-orange-100">
                  <GameTimer
                    duration={300}
                    onTimeUp={() => {
                      if (!gameWon) {
                        setGameLost(true)
                        setShowStats(true)
                      }
                    }}
                  />
                </div>
              )}

              {gameMode.hints && hintsRemaining > 0 && !gameWon && !gameLost && (
                <div className="flex justify-center">
                  <HintSystem
                    word={WORD_OF_THE_DAY}
                    hintsRemaining={hintsRemaining}
                    onUseHint={() => {
                      setHintsRemaining((prev) => prev - 1)
                      toast.info("Hint used! Check the hint above.")
                    }}
                  />
                </div>
              )}

              <div className="flex justify-center">
                <Keyboard onKeyPress={handleKeyPress} usedLetters={usedLetters} disabled={gameWon || gameLost} />
              </div>

              <div className="flex justify-between items-center pt-4">
                <Button
                  onClick={resetGame}
                  variant="outline"
                  className="flex items-center gap-2 border-border/50 hover:bg-primary/5 hover:border-primary/20 hover:text-primary transition-all duration-200"
                >
                  <RefreshCwIcon className="w-4 h-4" />
                  <span>New Game</span>
                </Button>

                {(gameWon || gameLost) && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button 
                      onClick={() => setShowStats(true)} 
                      variant="secondary" 
                      className="flex items-center gap-2 bg-primary/5 hover:bg-primary/10 text-primary transition-all duration-200"
                    >
                      <TrophyIcon className="w-4 h-4" />
                      <span>View Stats</span>
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Stats Dialog */}
      <Dialog open={showStats} onOpenChange={setShowStats}>
        <DialogContent className="sm:max-w-3xl bg-white/80 backdrop-blur-sm border-border/30">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Game Statistics
            </DialogTitle>
            <DialogDescription className="text-base">
              {gameWon && (
                <span className="text-green-600">
                  🎉 Congratulations! You solved the puzzle.
                </span>
              )}
            
       {gameLost && (
         <span className="text-red-600">
          The word was &quot;{WORD_OF_THE_DAY}&quot;. Better luck next time!
     </span>
      )}

              {!gameWon && !gameLost && "Here's how you're doing so far"}
            </DialogDescription>
          </DialogHeader>

          <div className="py-6">
            <GameStats
              stats={{
                gamesPlayed: 10,
                gamesWon: 8,
                currentStreak: 3,
                maxStreak: 5,
                guessDistribution: [2, 4, 3, 1, 0, 0],
              }}
            />
          </div>

          <DialogFooter>
            <Button
              onClick={() => {
                setShowStats(false)
                if (gameWon || gameLost) resetGame()
              }}
              className="bg-gradient-to-r from-primary to-primary/80 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {gameWon || gameLost ? "Play Again" : "Close"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Help Dialog */}
      <Dialog open={showHelp} onOpenChange={setShowHelp}>
        <DialogContent className="sm:max-w-md bg-white/80 backdrop-blur-sm border-border/30">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              How to Play
            </DialogTitle>
            <DialogDescription className="text-base">
              Guess the WORD in 6 tries
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <p className="text-sm text-muted-foreground bg-muted/30 p-4 rounded-xl">
              Each guess must be a valid 5-letter word. Hit the enter button to submit.
            </p>

            <div className="space-y-4">
              <p className="text-sm font-medium">After each guess, the color of the tiles will change:</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="w-10 h-10 bg-primary/90 text-primary-foreground flex items-center justify-center rounded-lg font-bold shadow-lg">
                    R
                  </div>
                  <span className="text-sm">Letter is in the correct spot</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="w-10 h-10 bg-yellow-500/80 text-primary-foreground flex items-center justify-center rounded-lg font-bold shadow-lg">
                    E
                  </div>
                  <span className="text-sm">Letter is in the word but in the wrong spot</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="w-10 h-10 bg-muted text-muted-foreground flex items-center justify-center rounded-lg font-bold shadow-lg">
                    Z
                  </div>
                  <span className="text-sm">Letter is not in the word</span>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              onClick={() => setShowHelp(false)}
              className="bg-gradient-to-r from-primary to-primary/80 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Got it
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

