// app/(tabs)/fin-manage.tsx
import React, { useCallback, useState} from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useRouter } from "expo-router";
import { DigitalTank } from "@/components/fin-manage/DigitalTank";
import { SavingStreak } from "@/components/fin-manage/SavingStreak";
import { YieldMaximizer } from "@/components/fin-manage/YieldMaximizer";
import { AIInsights } from "@/components/fin-manage/AIInsights";
import { MentalAccounts } from "@/components/fin-manage/MentalAccounts";
import { NudgeBanner } from "@/components/fin-manage/NudgeBanner";
import { GroupSavingCard } from "@/components/saving-plan/GroupSavingCard"; // Import the card
import { ManageSavingPlan } from "@/components/fin-manage/ManageSavingPlan";
import { appState, savingStats } from "@/lib/mock-data";

export default function FinManageScreen() {
  const router = useRouter();
  const [isPlanActive, setIsPlanActive] = useState(appState.isPersonalPlanActive);
  const [currentStreak, setCurrentStreak] = useState(savingStats.streak);

  // This hook runs every time you navigate TO this screen
  useFocusEffect(
    useCallback(() => {
      // Sync local state with global flag
      setIsPlanActive(appState.isPersonalPlanActive);
      setCurrentStreak(appState.isPersonalPlanActive ? savingStats.streak : 0);
    }, [])
  );

  const refreshState = () => {
    setIsPlanActive(appState.isPersonalPlanActive);
    if (!appState.isPersonalPlanActive) setCurrentStreak(0);
  };

  const handleSetupSavingPlan = () => {
    router.push("/saving-plan");
  };

  const handleJoinGroup = () => {
    Alert.alert(
      "Join Group Challenge",
      "You'll be joining the Japan Trip Squad! Save together and earn +0.5% p.a. bonus interest.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Join", onPress: () => Alert.alert("Success!", "You have joined the squad.") },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <View className="px-4 py-4">
          <Text className="text-foreground font-bold text-2xl">Fin Manage</Text>
          <Text className="text-foreground-muted text-sm">
            Your financial wellness companion
          </Text>
        </View>

        <View className="mx-4 mb-4">
          <DigitalTank height={180} />
          <View className="absolute bottom-2 left-2 bg-background/80 rounded-lg px-3 py-1">
            <Text className="text-accent text-xs font-semibold">Kira the Koi</Text>
          </View>
        </View>

        <View className="mb-4">
          <SavingStreak streak={currentStreak} />
        </View>

        {/* CONDITION 1: Replace Nudge Banner with Editor when plan is active */}
        {isPlanActive && (
          <ManageSavingPlan onUpdate={refreshState} />
        )}

        {/* Group Saving Card remains independent */}
        <View className="px-4">
          <GroupSavingCard onJoin={handleJoinGroup} />
        </View>

        <View className="mb-4">
          <YieldMaximizer
            currentSavings={savingStats.currentSavings}
            currentRate={isPlanActive ? 4.0 : 3.5}
          />
        </View>

        <View className="mb-4">
          <AIInsights />
        </View>

        <MentalAccounts />

        {/* CONDITION 2: Only show Nudge Banner if NO personal plan is active */}
        {!isPlanActive && (
          <View className="mt-2 mb-4">
            <NudgeBanner onPress={handleSetupSavingPlan} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}