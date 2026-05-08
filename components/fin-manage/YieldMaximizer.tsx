import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TrendingUp } from "lucide-react-native";
import { formatRM, yieldMilestones } from "@/lib/mock-data";
import { colors } from "@/lib/constants";

interface YieldMaximizerProps {
  currentSavings: number;
  currentRate: number;
}

export function YieldMaximizer({ currentSavings, currentRate }: YieldMaximizerProps) {
  const maxAmount = 10000;
  const progress = Math.min((currentSavings / maxAmount) * 100, 100);

  const currentMilestoneIndex = yieldMilestones.findIndex(
    (m, i) =>
      currentSavings >= m.amount &&
      (i === yieldMilestones.length - 1 || currentSavings < yieldMilestones[i + 1].amount)
  );
  const nextMilestone = yieldMilestones[currentMilestoneIndex + 1];

  return (
    <View className="bg-background-card rounded-2xl p-4 mx-4">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <View className="w-10 h-10 rounded-full bg-accent/20 items-center justify-center mr-3">
            <TrendingUp size={20} color={colors.accent.teal} />
          </View>
          <View>
            <Text className="text-foreground font-bold text-base">Yield Maximizer</Text>
            <Text className="text-foreground-muted text-xs">Earn higher interest</Text>
          </View>
        </View>
        <View className="bg-accent/20 rounded-full px-3 py-1">
          <Text className="text-accent font-bold">{currentRate}% p.a.</Text>
        </View>
      </View>

      {/* Progress bar and timeline area */}
      <View className="mb-10"> 
        {/* Track */}
        <View className="h-3 bg-background-secondary rounded-full overflow-hidden">
          <LinearGradient
            colors={[colors.accent.teal, colors.accent.tealDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ width: `${progress}%`, height: "100%", borderRadius: 999 }}
          />
        </View>

        {/* Milestone markers */}
        <View className="relative w-full mt-2 h-10">
          {yieldMilestones.map((milestone, index) => {
            const position = (milestone.amount / maxAmount) * 100;
            const isReached = currentSavings >= milestone.amount;
            const isCurrent = index === currentMilestoneIndex;
            
            const isFirst = index === 0;
            const isLast = index === yieldMilestones.length - 1;

            return (
              <View
                key={milestone.amount}
                style={{
                  position: "absolute",
                  // CRITICAL FIX: If last, use right: 0 instead of left: 100%
                  left: isLast ? undefined : `${position}%`,
                  right: isLast ? 0 : undefined,
                  alignItems: isFirst ? "flex-start" : isLast ? "flex-end" : "center",
                }}
              >
                {/* The Dot */}
                <View
                  className={`w-3 h-3 rounded-full ${
                    isReached ? "bg-accent" : "bg-background-secondary"
                  } ${isCurrent ? "border-2 border-accent" : ""}`}
                  style={{ 
                    marginBottom: 4,
                    // Offset dots to center them on the logic line
                    // The first and last dots stay flush to the edges
                    marginLeft: isFirst || isLast ? 0 : -6 
                  }}
                />
                
                {/* Labels */}
                <View 
                  style={{
                    alignItems: isFirst ? "flex-start" : isLast ? "flex-end" : "center",
                    // Shift the second milestone (1k) right to avoid 'Start' overlap
                    marginLeft: index === 1 ? 12 : 0
                  }}
                >
                  <Text 
                    className={`text-[10px] ${isReached ? "text-accent" : "text-foreground-muted"}`} 
                    numberOfLines={1}
                  >
                    {milestone.label}
                  </Text>
                  <Text 
                    className={`text-[10px] font-bold ${isReached ? "text-accent" : "text-foreground-muted"}`}
                  >
                    {milestone.rate}%
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>

      {/* Current savings footer */}
      <View className="flex-row items-center justify-between mt-4 pt-4 border-t border-background-secondary">
        <View>
          <Text className="text-foreground-muted text-xs mb-1">Current Savings</Text>
          <Text className="text-foreground font-bold text-xl">
            {formatRM(currentSavings)}
          </Text>
        </View>
        {nextMilestone && (
          <View className="items-end">
            <Text className="text-foreground-muted text-xs mb-1">Next milestone</Text>
            <Text className="text-accent font-semibold">
              {formatRM(nextMilestone.amount)} ({nextMilestone.rate}%)
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}