import React, { useState } from "react";
import { View, Text, ScrollView, Alert, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { DigitalTank } from "@/components/fin-manage/DigitalTank";
import { SavingStreak } from "@/components/fin-manage/SavingStreak";
import { YieldMaximizer } from "@/components/fin-manage/YieldMaximizer";
import { AIInsights } from "@/components/fin-manage/AIInsights";
import { MentalAccounts } from "@/components/fin-manage/MentalAccounts";
import { NudgeBanner } from "@/components/fin-manage/NudgeBanner";
import { savingStats, appState } from "@/lib/mock-data";
import { GroupSavingCard } from "@/components/saving-plan/GroupSavingCard";
import { ManageSavingPlan } from "@/components/fin-manage/ManageSavingPlan";

export default function FinManageScreen() {
  const router = useRouter();

  // Use state to track if the plan is active and current streak status
  const [isPlanActive, setIsPlanActive] = useState(appState.isGroupSavingActive);
  const [currentStreak, setCurrentStreak] = useState(savingStats.streak);

  // This function is passed to the ManageSavingPlan component to trigger UI updates
  const refreshState = () => {
    setIsPlanActive(appState.isGroupSavingActive);
    if (!appState.isGroupSavingActive) {
      setCurrentStreak(0); // Visually break the streak on termination
    }
  };

  const handleSetupSavingPlan = () => {
    router.push("/saving-plan");
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Header */}
        <View className="px-4 py-4">
          <Text className="text-foreground font-bold text-2xl">Fin Manage</Text>
          <Text className="text-foreground-muted text-sm">
            GXBank Savings Companion
          </Text>
        </View>

        {/* Digital Tank with Koi */}
        <View className="mx-4 mb-4">
          <DigitalTank height={180} />
          <View className="absolute bottom-2 left-2 bg-background/80 rounded-lg px-3 py-1">
            <Text className="text-accent text-xs font-semibold">Kira the Koi</Text>
          </View>
        </View>

        {/* Saving Streak Badge - Updated to use currentStreak state */}
        <View className="mb-4">
          <SavingStreak streak={currentStreak} />
        </View>

        {/* NEW: Plan Management - Allows users to change amounts or terminate */}
        {isPlanActive && (
          <ManageSavingPlan onUpdate={refreshState} />
        )}

        {/* Group Saving Challenge - Dashboard Version */}
        {isPlanActive && (
          <View className="mb-4">
            <GroupSavingCard isDashboardVersion={true} />
          </View>
        )}

        {/* Yield Maximizer - Rate increases when plan is active */}
        <View className="mb-4">
          <YieldMaximizer
            currentSavings={savingStats.currentSavings}
            currentRate={isPlanActive ? 4.0 : 3.5}
          />
        </View>

        {/* AI Insights */}
        <View className="mb-4">
          <AIInsights />
        </View>

        <MentalAccounts />

        {/* Nudge Banner - Only visible when no plan is active */}
        {!isPlanActive && (
          <View className="mt-2 mb-4">
            <NudgeBanner onPress={handleSetupSavingPlan} />
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}