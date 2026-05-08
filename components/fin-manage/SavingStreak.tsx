import React, { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";
import { Flame } from "lucide-react-native";
import { colors } from "@/lib/constants";

interface SavingStreakProps {
  streak: number;
}

export function SavingStreak({ streak }: SavingStreakProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    // Pulsing animation for the flame
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );

    // Glow animation
    const glowAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    pulseAnimation.start();
    glowAnimation.start();

    return () => {
      pulseAnimation.stop();
      glowAnimation.stop();
    };
  }, [scaleAnim, glowAnim]);

  return (
    <View className="flex-row items-center bg-background-card rounded-2xl p-4 mx-4">
      {/* Flame icon with glow */}
      <View className="relative">
        <Animated.View
          style={{
            position: "absolute",
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: colors.accent.pink,
            opacity: glowAnim,
            transform: [{ scale: 1.2 }],
          }}
        />
        <Animated.View
          className="w-12 h-12 rounded-full bg-pink items-center justify-center"
          style={{ transform: [{ scale: scaleAnim }] }}
        >
          <Flame size={24} color="#ffffff" fill="#ffffff" />
        </Animated.View>
      </View>

      {/* Streak info */}
      <View className="ml-4 flex-1">
        <Text className="text-foreground text-lg font-bold">
          {streak}-Day Saving Streak!
        </Text>
        <Text className="text-foreground-muted text-sm">
          Keep it up! 5 more days for a bonus reward
        </Text>
      </View>

      {/* Streak count badge */}
      <View className="bg-pink/20 rounded-full px-3 py-1">
        <Text className="text-pink font-bold text-lg">{streak}</Text>
      </View>
    </View>
  );
}
