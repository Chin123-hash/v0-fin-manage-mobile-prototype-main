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
  // Calculate progress percentage (max at 10000)
  const maxAmount = 10000;
  const progress = Math.min((currentSavings / maxAmount) * 100, 100);

  // Find current milestone and next milestone
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
            <Text className="text-foreground-muted text-sm">Earn higher interest</Text>
          </View>
        </View>
        <View className="bg-accent/20 rounded-full px-3 py-1">
          <Text className="text-accent font-bold">{currentRate}% p.a.</Text>
        </View>
      </View>

      {/* Progress bar */}
      <View className="mb-3">
        <View className="h-3 bg-background-secondary rounded-full overflow-hidden">
          <LinearGradient
            colors={[colors.accent.teal, colors.accent.tealDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              width: `${progress}%`,
              height: "100%",
              borderRadius: 999,
            }}
          />
        </View>

        {/* Milestone markers */}
        <View className="flex-row justify-between mt-2">
          {yieldMilestones.map((milestone, index) => {
            const position = (milestone.amount / maxAmount) * 100;
            const isReached = currentSavings >= milestone.amount;
            const isCurrent = index === currentMilestoneIndex;

            return (
              <View
                key={milestone.amount}
                style={{
                  position: index === 0 ? "relative" : "absolute",
                  left: index === 0 ? 0 : `${position}%`,
                  transform: index === 0 ? [] : [{ translateX: -20 }],
                }}
              >
                {/* Milestone dot */}
                <View
                  className={`w-3 h-3 rounded-full ${
                    isReached ? "bg-accent" : "bg-background-secondary"
                  } ${isCurrent ? "border-2 border-accent" : ""}`}
                  style={{
                    marginBottom: 4,
                    alignSelf: "center",
                  }}
                />
                {/* Label */}
                <Text
                  className={`text-xs ${
                    isReached ? "text-accent" : "text-foreground-muted"
                  }`}
                  style={{ textAlign: "center" }}
                >
                  {milestone.label}
                </Text>
                {/* Rate */}
                <Text
                  className={`text-xs ${
                    isReached ? "text-accent" : "text-foreground-muted"
                  }`}
                  style={{ textAlign: "center" }}
                >
                  {milestone.rate}%
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Current savings */}
      <View className="flex-row items-center justify-between mt-4 pt-4 border-t border-background-secondary">
        <View>
          <Text className="text-foreground-muted text-sm">Current Savings</Text>
          <Text className="text-foreground font-bold text-xl">
            {formatRM(currentSavings)}
          </Text>
        </View>
        {nextMilestone && (
          <View className="items-end">
            <Text className="text-foreground-muted text-sm">Next milestone</Text>
            <Text className="text-accent font-semibold">
              {formatRM(nextMilestone.amount)} ({nextMilestone.rate}%)
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
