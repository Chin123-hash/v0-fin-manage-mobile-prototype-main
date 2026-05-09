import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Gift, CheckCircle, Sparkles, ChevronRight } from "lucide-react-native";
import { colors } from "@/lib/constants";

interface NudgeBannerProps {
  onPress?: () => void;
  isActive?: boolean;
}

export function NudgeBanner({ onPress, isActive = false }: NudgeBannerProps) {
  // If active, we show an "Achievement Unlocked" style UI
  const title = isActive ? "Initial Reward Collected!" : "Unlock a New Reward!";
  const description = isActive
    ? "Neon Moss added to your tank. Keep saving for the next reward!"
    : "Save RM50 more to earn Neon Coral decoration for your pet!";
  const icon = isActive ? <CheckCircle size={24} color="#ffffff" /> : <Gift size={24} color="#ffffff" />;

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} className="mx-4">
      <LinearGradient
        colors={isActive ? ["#2d1b4e", "#1a0a2e"] : [colors.accent.teal, colors.accent.tealDark]}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        style={{ borderRadius: 16, padding: 16, borderWidth: isActive ? 1 : 0, borderColor: colors.accent.teal }}
      >
        <View className="flex-row items-center">
          <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center mr-4">
            {icon}
          </View>
          <View className="flex-1">
            <View className="flex-row items-center mb-1">
              <Sparkles size={14} color={isActive ? colors.accent.teal : "#ffffff"} />
              <Text className="text-white font-bold text-base ml-1">{title}</Text>
            </View>
            <Text className="text-white/80 text-sm">{description}</Text>
          </View>
          {!isActive && <ChevronRight size={24} color="#ffffff" />}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}