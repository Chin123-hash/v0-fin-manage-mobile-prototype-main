import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import {
  Heart,
  Sparkles,
  Settings,
  ChevronRight,
  Fish,
  Utensils,
} from "lucide-react-native";
import { DigitalTank } from "@/components/fin-manage/DigitalTank";
import { petStats, rewards, userProfile } from "@/lib/mock-data";
import { colors } from "@/lib/constants";

interface StatBarProps {
  label: string;
  value: number;
  maxValue: number;
  color: string;
  Icon: React.ElementType;
}

function StatBar({ label, value, maxValue, color, Icon }: StatBarProps) {
  const percentage = (value / maxValue) * 100;

  return (
    <View className="mb-4">
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center">
          <Icon size={16} color={color} />
          <Text className="text-foreground-muted text-sm ml-2">{label}</Text>
        </View>
        <Text className="text-foreground font-semibold">{value}%</Text>
      </View>
      <View className="h-2 bg-background-secondary rounded-full overflow-hidden">
        <View
          className="h-full rounded-full"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </View>
    </View>
  );
}

interface DecorationItemProps {
  name: string;
  isPlaced: boolean;
  onToggle: () => void;
}

function DecorationItem({ name, isPlaced, onToggle }: DecorationItemProps) {
  return (
    <TouchableOpacity
      onPress={onToggle}
      className={`px-3 py-2 rounded-xl mr-2 mb-2 ${
        isPlaced ? "bg-accent/20 border border-accent" : "bg-background-card"
      }`}
    >
      <Text
        className={`text-sm ${isPlaced ? "text-accent" : "text-foreground-muted"}`}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
}

export default function MeScreen() {
  const [placedDecorations, setPlacedDecorations] = useState<string[]>([
    "neon-moss",
    "lucky-coin",
  ]);

  const unlockedRewards = rewards.filter((r) => r.isUnlocked);

  const toggleDecoration = (id: string) => {
    setPlacedDecorations((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-4">
          <View>
            <Text className="text-foreground font-bold text-2xl">Pet Home</Text>
            <Text className="text-foreground-muted text-sm">
              Care for your digital companion
            </Text>
          </View>
          <TouchableOpacity className="w-10 h-10 rounded-full bg-background-card items-center justify-center">
            <Settings size={20} color={colors.text.primary} />
          </TouchableOpacity>
        </View>

        {/* Expanded Digital Tank */}
        <View className="mx-4 mb-4">
          <DigitalTank height={200} showFullTank />
        </View>

        {/* Pet Info Card */}
        <View className="mx-4 mb-4">
          <LinearGradient
            colors={[colors.background.card, colors.background.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 20,
              padding: 20,
            }}
          >
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center">
                <View className="w-12 h-12 rounded-full bg-accent/20 items-center justify-center mr-3">
                  <Fish size={24} color={colors.accent.teal} />
                </View>
                <View>
                  <Text className="text-foreground font-bold text-lg">
                    {petStats.name}
                  </Text>
                  <Text className="text-foreground-muted text-sm">
                    Level {petStats.level} {petStats.type}
                  </Text>
                </View>
              </View>
              <TouchableOpacity className="flex-row items-center">
                <Text className="text-accent text-sm mr-1">Details</Text>
                <ChevronRight size={16} color={colors.accent.teal} />
              </TouchableOpacity>
            </View>

            {/* Stats */}
            <StatBar
              label="Happiness"
              value={petStats.happiness}
              maxValue={100}
              color={colors.accent.gold}
              Icon={Heart}
            />
            <StatBar
              label="Health"
              value={petStats.health}
              maxValue={100}
              color={colors.accent.teal}
              Icon={Sparkles}
            />

            {/* Feed button */}
            <TouchableOpacity
              className="flex-row items-center justify-center bg-accent/20 rounded-xl py-3 mt-2"
              activeOpacity={0.7}
            >
              <Utensils size={18} color={colors.accent.teal} />
              <Text className="text-accent font-semibold ml-2">
                Feed ({petStats.feedCount}/{petStats.maxFeedCount} today)
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Decorations Section */}
        <View className="mx-4 mb-4">
          <Text className="text-foreground font-semibold text-base mb-3">
            Tank Decorations
          </Text>
          <Text className="text-foreground-muted text-sm mb-3">
            Tap to place or remove decorations from your tank
          </Text>
          <View className="flex-row flex-wrap">
            {unlockedRewards.map((reward) => (
              <DecorationItem
                key={reward.id}
                name={reward.name}
                isPlaced={placedDecorations.includes(reward.id)}
                onToggle={() => toggleDecoration(reward.id)}
              />
            ))}
          </View>
        </View>

        {/* User Profile Section */}
        <View className="mx-4">
          <LinearGradient
            colors={[colors.background.card, colors.background.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 16,
              padding: 16,
            }}
          >
            <Text className="text-foreground font-semibold text-base mb-2">
              Account
            </Text>
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-foreground-muted text-sm">
                  {userProfile.name}
                </Text>
                <Text className="text-foreground-muted text-xs">
                  {userProfile.accountNumber}
                </Text>
              </View>
              <ChevronRight size={20} color={colors.text.muted} />
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
