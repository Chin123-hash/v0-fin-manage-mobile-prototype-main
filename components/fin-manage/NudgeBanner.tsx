import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Gift, ChevronRight, Sparkles } from "lucide-react-native";
import { colors } from "@/lib/constants";

interface NudgeBannerProps {
  onPress?: () => void;
}

export function NudgeBanner({ onPress }: NudgeBannerProps) {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    shimmerAnimation.start();
    return () => shimmerAnimation.stop();
  }, [shimmerAnim]);

  const shimmerTranslate = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} className="mx-4">
      <LinearGradient
        colors={[colors.accent.teal, colors.accent.tealDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          borderRadius: 16,
          padding: 16,
          overflow: "hidden",
        }}
      >
        {/* Shimmer effect */}
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: 100,
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            transform: [{ translateX: shimmerTranslate }, { skewX: "-20deg" }],
          }}
        />

        <View className="flex-row items-center">
          {/* Icon */}
          <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center mr-4">
            <Gift size={24} color="#ffffff" />
          </View>

          {/* Content */}
          <View className="flex-1">
            <View className="flex-row items-center mb-1">
              <Sparkles size={14} color="#ffffff" />
              <Text className="text-white font-bold text-base ml-1">
                Unlock a New Reward!
              </Text>
            </View>
            <Text className="text-white/80 text-sm">
              Save RM50 more to earn Neon Coral decoration for your pet!
            </Text>
          </View>

          {/* Arrow */}
          <ChevronRight size={24} color="#ffffff" />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
