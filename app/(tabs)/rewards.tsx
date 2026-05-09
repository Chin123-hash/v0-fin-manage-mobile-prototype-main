import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Gift, Lock, Check, Sparkles, Flame, RotateCw, Star } from "lucide-react-native";
import { rewards, savingStats, petStats, type Reward } from "@/lib/mock-data";
import { colors } from "@/lib/constants";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  easing, 
  runOnJS 
} from "react-native-reanimated";

interface RewardCardProps {
  reward: Reward;
}

function RewardCard({ reward }: RewardCardProps) {
  return (
    <TouchableOpacity activeOpacity={reward.isUnlocked ? 0.7 : 1} className="mb-3">
      <LinearGradient
        colors={reward.isUnlocked ? [colors.background.card, colors.background.cardLight] : [colors.background.secondary, colors.background.card]}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={{ borderRadius: 16, padding: 16, flexDirection: "row", alignItems: "center", opacity: reward.isUnlocked ? 1 : 0.7 }}
      >
        <View className={`w-14 h-14 rounded-2xl items-center justify-center mr-4 ${reward.isUnlocked ? "bg-accent/20" : "bg-foreground-muted/20"}`}>
          {reward.isUnlocked ? <Sparkles size={24} color={colors.accent.teal} /> : <Lock size={24} color={colors.text.muted} />}
        </View>
        <View className="flex-1">
          <Text className={`font-semibold text-base ${reward.isUnlocked ? "text-foreground" : "text-foreground-muted"}`}>{reward.name}</Text>
          <Text className="text-foreground-muted text-sm">{reward.description}</Text>
          {!reward.isUnlocked && reward.requiredStreak && (
            <View className="flex-row items-center mt-1">
              <Flame size={12} color={colors.accent.pink} />
              <Text className="text-pink text-xs ml-1">{reward.requiredStreak}-day streak required</Text>
            </View>
          )}
        </View>
        {reward.isUnlocked && (
          <View className="w-8 h-8 rounded-full bg-accent items-center justify-center">
            <Check size={18} color="#1a0a2e" strokeWidth={3} />
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default function RewardsScreen() {
  const [isSpinning, setIsSpinning] = useState(false);
  const rotation = useSharedValue(0);
  const unlockedCount = rewards.filter((r) => r.isUnlocked).length;
  const totalCount = rewards.length;

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    
    // Logic: Spin 5 full rotations + a random angle
    const newRotation = rotation.value + 1800 + Math.random() * 360;
    
    rotation.value = withTiming(newRotation, {
      duration: 3000,
      easing: easing.out(easing.quad),
    }, (finished) => {
      if (finished) {
        runOnJS(setIsSpinning)(false);
        runOnJS(Alert.alert)("Congratulations!", "You won 1x Premium Fish Food!");
      }
    });
  };

  const animatedWheelStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View className="px-4 py-4">
          <Text className="text-foreground font-bold text-2xl">Rewards</Text>
          <Text className="text-foreground-muted text-sm">Unlock benefits for your financial discipline</Text>
        </View>

        {/* Level 5 Unlock: Lucky Spin Wheel */}
        <View className="mx-4 mb-8 bg-background-card rounded-[32px] p-6 border border-accent/20 overflow-hidden">
          <View className="flex-row justify-between items-center mb-6">
            <View>
              <Text className="text-accent font-bold text-lg">Lucky Spin</Text>
              <Text className="text-foreground-muted text-xs">Daily spin unlocked at Level 5</Text>
            </View>
            <View className="bg-accent/20 px-3 py-1 rounded-full">
              <Text className="text-accent text-[10px] font-bold">LVL {petStats.level} ACTIVE</Text>
            </View>
          </View>

          {/* Wheel Visual */}
          <View className="items-center justify-center py-4">
            <Animated.View style={[animatedWheelStyle]}>
              <View className="w-48 h-48 rounded-full border-4 border-accent/30 items-center justify-center">
                 {/* Placeholder for Wheel segments */}
                 <View className="absolute w-full h-[2px] bg-accent/20" style={{ transform: [{rotate: '45deg'}] }} />
                 <View className="absolute w-full h-[2px] bg-accent/20" style={{ transform: [{rotate: '90deg'}] }} />
                 <View className="absolute w-full h-[2px] bg-accent/20" style={{ transform: [{rotate: '135deg'}] }} />
                 <View className="absolute w-full h-[2px] bg-accent/20" />
                 <View className="w-12 h-12 rounded-full bg-accent items-center justify-center z-10 shadow-lg shadow-accent">
                    <Star size={24} color={colors.background.primary} />
                 </View>
              </View>
            </Animated.View>
            {/* The Pointer */}
            <View className="absolute top-0 w-4 h-6 bg-pink rounded-b-full z-20" />
          </View>

          <TouchableOpacity 
            className={`mt-6 py-4 rounded-2xl items-center justify-center flex-row ${isSpinning ? 'bg-background-secondary' : 'bg-accent'}`}
            onPress={spinWheel}
            disabled={isSpinning}
          >
            <RotateCw size={20} color={isSpinning ? colors.text.muted : colors.background.primary} className="mr-2" />
            <Text className={`font-bold ${isSpinning ? 'text-foreground-muted' : 'text-background-primary'}`}>
              {isSpinning ? 'SPINNING...' : 'SPIN FOR 10 XP'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Progress Card */}
        <View className="mx-4 mb-8">
          <LinearGradient
            colors={[colors.accent.pink, colors.accent.pinkDark]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={{ borderRadius: 24, padding: 24 }}
          >
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-white/80 text-sm mb-1">Decorations Unlocked</Text>
                <Text className="text-white font-bold text-3xl">{unlockedCount}/{totalCount}</Text>
              </View>
              <View className="w-14 h-14 rounded-full bg-white/20 items-center justify-center">
                <Gift size={28} color="#ffffff" />
              </View>
            </View>
            <View className="mt-4 h-2 bg-white/30 rounded-full overflow-hidden">
                <View className="h-full bg-white rounded-full" style={{ width: `${(unlockedCount / totalCount) * 100}%` }} />
            </View>
            <View className="flex-row items-center mt-4">
              <Flame size={16} color="#ffffff" fill="#ffffff" />
              <Text className="text-white ml-2 text-xs font-bold uppercase tracking-wider">Streak: {savingStats.streak} days</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Rewards List */}
        <View className="px-4">
          <Text className="text-foreground font-bold text-lg mb-4">Tank Decorations</Text>
          {rewards.map((reward) => (
            <RewardCard key={reward.id} reward={reward} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}