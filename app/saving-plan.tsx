// app/saving-plan.tsx
import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { X, Check, Sparkles, ShieldCheck } from "lucide-react-native";
import { MicroSavingChips } from "@/components/saving-plan/MicroSavingChips";
import { FutureSavingLogic } from "@/components/saving-plan/FutureSavingLogic";
// Removed GroupSavingCard import
import { colors } from "@/lib/constants";
import { appState } from "@/lib/mock-data";

export default function SavingPlanScreen() {
  const router = useRouter();

  const [selectedMicroAmount, setSelectedMicroAmount] = useState<number | null>(10);
  const [saveAmount, setSaveAmount] = useState(10);
  const [triggerAmount, setTriggerAmount] = useState(100);

  const handleClose = () => {
    router.back();
  };

  const handleActivate = () => {
    // Update the personal plan flag
    appState.isPersonalPlanActive = true;
    appState.activePlan = {
      microSavingAmount: selectedMicroAmount || 10,
      autoSaveAmount: saveAmount,
      autoSaveTrigger: triggerAmount,
    };

    Alert.alert(
      "Saving Plan Activated!",
      "Your rewards are ready. Check your dashboard!",
      [
        {
          text: "Awesome!",
          onPress: () => router.back(), // Navigates back to trigger refresh logic
        },
      ]
    );
  };
  // Removed handleJoinGroup function

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-background-card">
        <TouchableOpacity
          onPress={handleClose}
          className="w-10 h-10 rounded-full bg-background-card items-center justify-center"
        >
          <X size={20} color={colors.text.primary} />
        </TouchableOpacity>

        <View className="flex-row items-center">
          <Sparkles size={20} color={colors.accent.teal} />
          <Text className="text-foreground font-bold text-lg ml-2">
            Setup Saving Plan
          </Text>
        </View>
        <View className="w-10" />
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
      >
        <View className="mb-4">
          <Text className="text-foreground-muted text-center">
            Create smart saving habits with automated rules. Every small step
            counts towards your goals!
          </Text>
        </View>

        {/* 🔥 GXBank Promo Banner */}
        <View className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-4 mb-6 flex-row items-center">
          <View className="w-10 h-10 bg-purple-500/20 rounded-full items-center justify-center mr-3">
            <ShieldCheck size={20} color="#a855f7" />
          </View>
          <View className="flex-1">
            <Text className="text-purple-400 font-bold text-sm">Powered by GXBank</Text>
            <Text className="text-foreground-muted text-xs mt-1 leading-4">
              Your automated savings go to a secure Save Pocket earning <Text className="text-foreground font-semibold">2.00% p.a. daily interest</Text>.
            </Text>
          </View>
        </View>

        <MicroSavingChips
          selectedAmount={selectedMicroAmount}
          onSelect={setSelectedMicroAmount}
        />

        <FutureSavingLogic
          saveAmount={saveAmount}
          triggerAmount={triggerAmount}
          onSaveAmountChange={setSaveAmount}
          onTriggerAmountChange={setTriggerAmount}
        />

        {/* Summary */}
        <View className="bg-background-card rounded-xl p-4 mb-4">
          <Text className="text-foreground font-semibold mb-3">
            Your Saving Plan Summary
          </Text>
          <View className="gap-2">
            <View className="flex-row justify-between">
              <Text className="text-foreground-muted">Daily micro-save</Text>
              <Text className="text-foreground font-semibold">
                RM{selectedMicroAmount || 0}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-foreground-muted">Auto-save rule</Text>
              <Text className="text-foreground font-semibold">
                RM{saveAmount} per RM{triggerAmount}
              </Text>
            </View>
            <View className="flex-row justify-between pt-2 border-t border-background-secondary">
              <Text className="text-foreground-muted">Est. monthly savings</Text>
              <Text className="text-accent font-bold">
                RM{(selectedMicroAmount || 0) * 30 + saveAmount * 4}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Activate Button */}
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t border-background-card">
        <TouchableOpacity onPress={handleActivate} activeOpacity={0.9}>
          <LinearGradient
            colors={[colors.accent.teal, colors.accent.tealDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              borderRadius: 16,
              padding: 18,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Check size={22} color="#1a0a2e" strokeWidth={3} />
            <Text className="text-background font-bold text-lg ml-2">
              Activate Saving Plan
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}