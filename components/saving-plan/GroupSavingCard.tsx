import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Users, TrendingUp, Sparkles, UserPlus } from "lucide-react-native";
import { appState } from "@/lib/mock-data";
import { colors } from "@/lib/constants";
import { useRouter } from "expo-router";

interface GroupSavingCardProps {
  isJoined?: boolean;
  onJoinSuccess?: () => void;
}

export function GroupSavingCard({ isJoined = false, onJoinSuccess }: GroupSavingCardProps) {
  const router = useRouter();
  // Empty state logic: show attractive marketing if not joined
  const handleJoinAction = () => {
    Alert.alert(
      "Sync Contacts",
      "Sync your contacts to find friends to save with? This will activate your +0.5% p.a. bonus interest.",
      [
        { text: "Later", style: "cancel" },
        {
          text: "Sync & Invite",
          onPress: () => {
            appState.isGroupSavingActive = true;
            if (onJoinSuccess) onJoinSuccess();
            router.push("/group-saving-onboarding");
          }
        }
      ]
    );
  };

  return (
    <View className="mb-6">
      <View className="flex-row items-center mb-4">
        <View className="w-10 h-10 rounded-full bg-[#ff006e]/20 items-center justify-center mr-3">
          <Users size={20} color={colors.accent.pink} />
        </View>
        <View>
          <Text className="text-foreground font-semibold text-base">Group Saving Challenge</Text>
          <Text className="text-foreground-muted text-sm">
            {isJoined ? "Japan Trip Squad" : "Save together, earn more"}
          </Text>
        </View>
      </View>

      <LinearGradient
        colors={[colors.background.card, colors.background.secondary]}
        style={{ borderRadius: 16, padding: 16 }}
      >
        {!isJoined ? (
          /* Attractive "Empty" Recruitment State */
          <View>
            <View className="flex-row items-center mb-3">
              <Sparkles size={16} color={colors.accent.gold} />
              <Text className="text-foreground font-bold ml-2">Exclusive Group Perks</Text>
            </View>

            <Text className="text-foreground-muted text-sm mb-4 leading-5">
              Join a squad to earn <Text className="text-accent font-bold">+0.5% p.a. bonus interest</Text> and unlock the <Text className="text-accent-pink font-bold">Limited Edition Gold Fin</Text> for Kira!
            </Text>

            <TouchableOpacity onPress={handleJoinAction} activeOpacity={0.8}>
              <LinearGradient
                colors={[colors.accent.pink, colors.accent.pinkDark]}
                style={{ borderRadius: 12, padding: 14, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
              >
                <UserPlus size={18} color="#ffffff" />
                <Text className="text-white font-bold ml-2">Join & Add Friends</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : (
          /* Active Group State */
          <View>
            <View className="flex-row justify-between mb-4">
              <View>
                <Text className="text-foreground-muted text-xs uppercase font-bold">Group Total</Text>
                <Text className="text-foreground text-2xl font-bold">RM {appState.groupPocketBalance.toLocaleString()}</Text>
              </View>
              <View className="bg-[#00f5d4]/20 rounded-full px-3 py-1 flex-row items-center self-start">
                <TrendingUp size={14} color={colors.accent.teal} />
                <Text className="text-accent font-bold text-xs ml-1">+0.5% p.a.</Text>
              </View>
            </View>
            <Text className="text-foreground-muted text-xs text-center">Your group is saving for the Japan Trip!</Text>
          </View>
        )}
      </LinearGradient>
    </View>
  );
}