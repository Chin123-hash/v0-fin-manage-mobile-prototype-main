// app/(tabs)/fin-manage.tsx
import React, { useCallback, useState, useRef} from "react";
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
  const scrollRef = useRef<ScrollView>(null);
  const [isPlanActive, setIsPlanActive] = useState(appState.isPersonalPlanActive);
  const [currentStreak, setCurrentStreak] = useState(savingStats.streak);

  // This hook runs every time you navigate TO this screen
  useFocusEffect(
    useCallback(() => {
      const previouslyActive = isPlanActive;
      const currentlyActive = appState.isPersonalPlanActive;

      // Sync local state with global flag
      setIsPlanActive(currentlyActive);
      setCurrentStreak(currentlyActive ? savingStats.streak : 0);

      // Refresh to top only if the plan was just activated
      if (!previouslyActive && currentlyActive) {
        scrollRef.current?.scrollTo({ y: 0, animated: true });
      }
    }, [isPlanActive])
  );

  const refreshState = () => {
    setIsPlanActive(appState.isPersonalPlanActive);
    if (!appState.isPersonalPlanActive) setCurrentStreak(0);
  };

  const handleRefresh = () => {
    refreshState();
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
      <ScrollView
        ref={scrollRef} // Attach scroll reference
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

        {/* 1. Show Editor when active (replaces NudgeBanner) */}
        {isPlanActive && <ManageSavingPlan onUpdate={handleRefresh} />}

        {/* 2. Group Saving: Hidden until plan is active */}
        {isPlanActive && (
          <View className="px-4 mb-4">
            {/* Group Saving Card: Independent joined state */}
            <GroupSavingCard />
          </View>
        )}

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

        {/* 3. Nudge Banner: Visible only if no plan is active */}
        {!isPlanActive && (
          <View className="mt-2 mb-4">
            <NudgeBanner onPress={() => router.push("/saving-plan")} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}