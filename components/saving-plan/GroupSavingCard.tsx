// components/saving-plan/GroupSavingCard.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Users, TrendingUp, Sparkles, UserPlus, Plus } from "lucide-react-native";
import { appState } from "@/lib/mock-data";
import { colors } from "@/lib/constants";
import { useRouter } from "expo-router";

export function GroupSavingCard() {
  const router = useRouter();
  const groups = appState.groups;
  const isJoined = groups.length > 0;

  const handleGroupPress = (id: string, name: string) => {
    router.push({
      pathname: "/group-chat/[id]",
      params: { id, name }
    });
  };

  const handleJoinAction = () => {
    router.push("/group-saving-onboarding");
  };

  return (
    <View className="mb-6">
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <View className="w-10 h-10 rounded-full bg-[#ff006e]/20 items-center justify-center mr-3">
            <Users size={20} color={colors.accent.pink} />
          </View>
          <View>
            <Text className="text-foreground font-semibold text-base">Group Saving Challenge</Text>
            <Text className="text-foreground-muted text-sm">
              {isJoined ? `${groups.length} Active Squads` : "Save together, earn more"}
            </Text>
          </View>
        </View>

        {/* The + Button: Only show if user has 1 group (Max 2) */}
        {groups.length === 1 && (
          <TouchableOpacity
            onPress={handleJoinAction}
            className="w-10 h-10 rounded-full bg-accent/10 border border-accent/30 items-center justify-center"
          >
            <Plus size={20} color={colors.accent.teal} />
          </TouchableOpacity>
        )}
      </View>

      <LinearGradient
        colors={[colors.background.card, colors.background.secondary]}
        style={{ borderRadius: 16, padding: 16 }}
      >
        {!isJoined ? (
          <View>
            <View className="flex-row items-center mb-3">
              <Sparkles size={16} color={colors.accent.gold} />
              <Text className="text-foreground font-bold ml-2">Exclusive Group Perks</Text>
            </View>
            <Text className="text-foreground-muted text-sm mb-4 leading-5">
              Join a squad to earn <Text className="text-accent font-bold">+0.5% p.a. bonus interest</Text> and unlock the <Text className="text-accent-pink font-bold">Gold Fin</Text>!
            </Text>
            <TouchableOpacity onPress={handleJoinAction} activeOpacity={0.8}>
              <LinearGradient colors={[colors.accent.pink, colors.accent.pinkDark]} style={{ borderRadius: 12, padding: 14, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <UserPlus size={18} color="#ffffff" />
                <Text className="text-white font-bold ml-2">Join & Add Friends</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="gap-4">
            {groups.map((group, index) => (
              <TouchableOpacity
                key={group.id}
                onPress={() => handleGroupPress(group.id, group.name)} // Added navigation
                activeOpacity={0.7}
                className={index > 0 ? "pt-4 border-t border-white/5" : ""}
              >
                <View className="flex-row justify-between mb-2">
                  <View>
                    <Text className="text-foreground-secondary text-[10px] uppercase font-bold tracking-widest">{group.name}</Text>
                    <Text className="text-foreground text-2xl font-bold">RM {group.balance.toLocaleString()}</Text>
                  </View>
                  <View className="bg-accent/20 rounded-full px-3 py-1 flex-row items-center self-start">
                    <TrendingUp size={14} color={colors.accent.teal} />
                    <Text className="text-accent font-bold text-xs ml-1">+0.5% p.a.</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </LinearGradient>
    </View>
  );
}