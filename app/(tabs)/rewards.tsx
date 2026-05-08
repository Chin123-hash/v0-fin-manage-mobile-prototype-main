import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Gift, Lock, Check, Sparkles, Flame } from "lucide-react-native";
import { rewards, savingStats, type Reward } from "@/lib/mock-data";
import { colors } from "@/lib/constants";

interface RewardCardProps {
  reward: Reward;
}

function RewardCard({ reward }: RewardCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={reward.isUnlocked ? 0.7 : 1}
      className="mb-3"
    >
      <LinearGradient
        colors={
          reward.isUnlocked
            ? [colors.background.card, colors.background.cardLight]
            : [colors.background.secondary, colors.background.card]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 16,
          padding: 16,
          flexDirection: "row",
          alignItems: "center",
          opacity: reward.isUnlocked ? 1 : 0.7,
        }}
      >
        {/* Icon */}
        <View
          className={`w-14 h-14 rounded-2xl items-center justify-center mr-4 ${
            reward.isUnlocked ? "bg-accent/20" : "bg-foreground-muted/20"
          }`}
        >
          {reward.isUnlocked ? (
            <Sparkles size={24} color={colors.accent.teal} />
          ) : (
            <Lock size={24} color={colors.text.muted} />
          )}
        </View>

        {/* Info */}
        <View className="flex-1">
          <Text
            className={`font-semibold text-base ${
              reward.isUnlocked ? "text-foreground" : "text-foreground-muted"
            }`}
          >
            {reward.name}
          </Text>
          <Text className="text-foreground-muted text-sm">
            {reward.description}
          </Text>
          {!reward.isUnlocked && reward.requiredStreak && (
            <View className="flex-row items-center mt-1">
              <Flame size={12} color={colors.accent.pink} />
              <Text className="text-pink text-xs ml-1">
                {reward.requiredStreak}-day streak required
              </Text>
            </View>
          )}
        </View>

        {/* Status */}
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
  const unlockedCount = rewards.filter((r) => r.isUnlocked).length;
  const totalCount = rewards.length;

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Header */}
        <View className="px-4 py-4">
          <Text className="text-foreground font-bold text-2xl">Rewards</Text>
          <Text className="text-foreground-muted text-sm">
            Unlock decorations for your digital pet
          </Text>
        </View>

        {/* Progress Card */}
        <View className="mx-4 mb-6">
          <LinearGradient
            colors={[colors.accent.pink, colors.accent.pinkDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              borderRadius: 20,
              padding: 20,
            }}
          >
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-white/80 text-sm mb-1">
                  Rewards Unlocked
                </Text>
                <Text className="text-white font-bold text-3xl">
                  {unlockedCount}/{totalCount}
                </Text>
              </View>
              <View className="w-16 h-16 rounded-full bg-white/20 items-center justify-center">
                <Gift size={32} color="#ffffff" />
              </View>
            </View>

            {/* Progress bar */}
            <View className="mt-4">
              <View className="h-2 bg-white/30 rounded-full overflow-hidden">
                <View
                  className="h-full bg-white rounded-full"
                  style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
                />
              </View>
            </View>

            {/* Streak info */}
            <View className="flex-row items-center mt-3">
              <Flame size={16} color="#ffffff" fill="#ffffff" />
              <Text className="text-white ml-2">
                Current streak: {savingStats.streak} days
              </Text>
            </View>
          </LinearGradient>
        </View>

        {/* Rewards List */}
        <View className="px-4">
          <Text className="text-foreground font-semibold text-base mb-4">
            Tank Decorations
          </Text>
          {rewards.map((reward) => (
            <RewardCard key={reward.id} reward={reward} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
