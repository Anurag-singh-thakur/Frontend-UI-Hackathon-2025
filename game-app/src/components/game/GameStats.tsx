"use client"

import { motion } from "framer-motion"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { TrophyIcon, Flame, ActivityIcon, BarChart2Icon, AwardIcon, PercentIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

interface GameStats {
  gamesPlayed: number
  gamesWon: number
  currentStreak: number
  maxStreak: number
  guessDistribution: number[]
}

export default function GameStats({ stats }: { stats: GameStats }) {
  const winRate = (stats.gamesWon / stats.gamesPlayed) * 100 || 0
  const maxGuesses = Math.max(...stats.guessDistribution, 1) // Prevent division by zero
  const totalGuesses = stats.guessDistribution.reduce((sum, count) => sum + count, 0)

  // Calculate average guesses (only for games won)
  const avgGuesses =
    totalGuesses > 0
      ? stats.guessDistribution.reduce((sum, count, index) => sum + count * (index + 1), 0) / totalGuesses
      : 0

  const statItems = [
    {
      label: "Played",
      value: stats.gamesPlayed,
      icon: ActivityIcon,
      description: "Total games played",
    },
    {
      label: "Win Rate",
      value: `${winRate.toFixed(0)}%`,
      icon: PercentIcon,
      description: `Won ${stats.gamesWon} out of ${stats.gamesPlayed} games`,
    },
    {
      label: "Current Streak",
      value: stats.currentStreak,
      icon: Flame,
      description: "Consecutive wins",
    },
    {
      label: "Max Streak",
      value: stats.maxStreak,
      icon: TrophyIcon,
      description: "Best winning streak",
    },
    {
      label: "Avg. Guesses",
      value: totalGuesses > 0 ? avgGuesses.toFixed(1) : "-",
      icon: AwardIcon,
      description: "Average guesses per win",
    },
  ]

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  return (
    <motion.div 
      initial="hidden" 
      animate="show" 
      variants={container} 
      className="w-full"
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Stats Section */}
        <motion.div variants={item} className="md:w-2/5">
          <Card className="h-full border-border/30 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                <ActivityIcon className="w-5 h-5 text-primary" />
                Game Overview
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {statItems.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <HoverCard key={index}>
                      <HoverCardTrigger asChild>
                        <motion.div 
                          whileHover={{ scale: 1.02, backgroundColor: "rgba(0, 0, 0, 0.02)" }} 
                          className="flex flex-col gap-2 cursor-help p-4 rounded-xl border border-border/40 bg-white/50 hover:shadow-sm transition-all duration-200"
                        >
                          <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                              <Icon className="w-4 h-4 text-primary" />
                            </div>
                            <div className="text-sm font-medium text-muted-foreground">
                              {stat.label}
                            </div>
                          </div>
                          <div className="text-2xl font-bold tracking-tight text-foreground">
                            {stat.value}
                          </div>
                        </motion.div>
                      </HoverCardTrigger>
                      <HoverCardContent 
                        side="top" 
                        className="w-auto bg-white/95 backdrop-blur-sm border-border/30 shadow-lg"
                      >
                        <p className="text-sm text-muted-foreground">{stat.description}</p>
                      </HoverCardContent>
                    </HoverCard>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Guess Distribution */}
        <motion.div variants={item} className="md:w-3/5">
          <Card className="h-full border-border/30 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                <BarChart2Icon className="w-5 h-5 text-primary" />
                Guess Distribution
              </h3>

              {stats.gamesPlayed > 0 ? (
                <div className="space-y-3">
                  {stats.guessDistribution.map((count, i) => {
                    const percentage = (count / maxGuesses) * 100
                    const isHighest = count === maxGuesses && count > 0

                    return (
                      <div key={i} className="group">
                        <div className="flex items-center gap-4">
                          <div className="w-6 text-sm font-semibold text-muted-foreground">
                            {i + 1}
                          </div>
                          <div className="relative flex-1 h-9">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.max(percentage, count > 0 ? 8 : 0)}%` }}
                              transition={{ 
                                type: "spring",
                                stiffness: 100,
                                damping: 20,
                                delay: i * 0.1 
                              }}
                              className={cn(
                                "absolute inset-y-0 left-0 flex items-center justify-end px-3 rounded-lg",
                                isHighest 
                                  ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-sm" 
                                  : "bg-slate-100 dark:bg-slate-800",
                                count === 0 && "bg-slate-50",
                                "transition-colors duration-200"
                              )}
                            >
                              {count > 0 && (
                                <span className="text-sm font-medium">
                                  {count}
                                </span>
                              )}
                            </motion.div>
                          </div>
                        </div>

                        {/* Enhanced tooltip */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-muted-foreground mt-1 ml-10 bg-slate-50 p-1 rounded-md inline-block">
                          {count === 0
                            ? `No games won in ${i + 1} ${i === 0 ? "guess" : "guesses"}`
                            : `${count} ${count === 1 ? "game" : "games"} won in ${i + 1} ${i === 0 ? "guess" : "guesses"}`}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[200px] gap-4 text-muted-foreground">
                  <BarChart2Icon className="w-12 h-12 text-slate-200" />
                  <p className="text-sm">Play your first game to see statistics</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}

