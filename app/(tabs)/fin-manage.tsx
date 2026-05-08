import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { DigitalTank } from "@/components/fin-manage/DigitalTank";
import { SavingStreak } from "@/components/fin-manage/SavingStreak";
import { YieldMaximizer } from "@/components/fin-manage/YieldMaximizer";
import { AIInsights } from "@/components/fin-manage/AIInsights";
import { MentalAccounts } from "@/components/fin-manage/MentalAccounts";
import { NudgeBanner } from "@/components/fin-manage/NudgeBanner";
import { savingStats, petStats } from "@/lib/mock-data"; // Standardized pet data

export default function FinManageScreen() {
  const router = useRouter();

  const handleSetupSavingPlan = () => {
    router.push("/saving-plan");
  };

  // Added navigation function to Pet Hub (Sanctuary)
  const handleNavigateToPetHub = () => {
    router.push("/pet-hub");
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Header - Keeps px-4 for standard alignment */}
        <View className="px-4 py-4">
          <Text className="text-foreground font-bold text-2xl">Fin Manage</Text>
          <Text className="text-foreground-muted text-sm">
            Your financial wellness companion
          </Text>
        </View>

        {/* Updated: Interactive Digital Tank with Navigation */}
        <TouchableOpacity 
          onPress={handleNavigateToPetHub}
          activeOpacity={0.9}
          className="mx-4 mb-4"
        >
          <DigitalTank height={180} />
          <View className="absolute bottom-2 left-2 bg-background/80 rounded-lg px-3 py-1 border border-accent/20">
            {/* Synchronized Name and Level */}
            <Text className="text-accent text-xs font-bold">
              {petStats.name} {petStats.type} • LVL {petStats.level}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Saving Streak Badge - Edge-to-edge as per first design */}
        <View className="mb-4">
          <SavingStreak streak={savingStats.streak} />
        </View>

        {/* Yield Maximizer */}
        <View className="mb-4">
          <YieldMaximizer
            currentSavings={savingStats.currentSavings}
            currentRate={savingStats.interestRate}
          />
        </View>

        {/* AI Insights */}
        <View className="mb-4">
          <AIInsights />
        </View>

        {/* Mental Accounts */}
        <MentalAccounts />

        {/* Nudge Banner */}
        <View className="mt-2 mb-4">
          <NudgeBanner onPress={handleSetupSavingPlan} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}