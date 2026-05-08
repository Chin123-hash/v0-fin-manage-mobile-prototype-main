import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Alert, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useRouter } from "expo-router";
import { DigitalTank } from "@/components/fin-manage/DigitalTank";
import { SavingStreak } from "@/components/fin-manage/SavingStreak";
import { YieldMaximizer } from "@/components/fin-manage/YieldMaximizer";
import { AIInsights } from "@/components/fin-manage/AIInsights";
import { MentalAccounts } from "@/components/fin-manage/MentalAccounts";
import { NudgeBanner } from "@/components/fin-manage/NudgeBanner";
import { savingStats, appState } from "@/lib/mock-data";
import { formatRM } from "@/lib/mock-data";
import { colors } from "@/lib/constants";
import { LinearGradient } from "expo-linear-gradient"; 
import { GroupSavingCard } from "@/components/saving-plan/GroupSavingCard";

export default function FinManageScreen() {
  const router = useRouter();
  const [isPlanActive, setIsPlanActive] = useState(appState.isGroupSavingActive);
  const [currentStreak, setCurrentStreak] = useState(savingStats.streak);

  // Simulate breaking the streak
  const handleTerminatePlan = () => {
    Alert.alert(
      "Terminate Plan?",
      "Stopping micro-saves will break your personal AND group streak.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Terminate",
          style: "destructive",
          onPress: () => {
            setCurrentStreak(0);
            setIsPlanActive(false);
            appState.isGroupSavingActive = false;
          }
        }
      ]
    );
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

        {/* Saving Streak Badge */}
        <View className="mb-4">
          <SavingStreak streak={savingStats.streak} />
        </View>

        {/* CONDITION 1: Show Group Saving only if plan is active */}
        {isPlanActive && (
          <View className="mb-4">
            <GroupSavingCard isDashboardVersion={true} />
          </View>
        )}

        {/* Yield Maximizer */}
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
        
        {/* CONDITION 2: Show Nudge Banner ONLY if plan is NOT active */}
        {!isPlanActive && (
          <View className="mt-2 mb-4">
            <NudgeBanner onPress={handleSetupSavingPlan} />
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}