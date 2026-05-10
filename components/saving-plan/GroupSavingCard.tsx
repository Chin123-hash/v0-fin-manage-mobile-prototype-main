// components/saving-plan/GroupSavingCard.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Users, TrendingUp, Sparkles, UserPlus, Plus, PlusCircle, ShieldCheck } from "lucide-react-native";
import { appState } from "@/lib/mock-data";
import { colors } from "@/lib/constants";
import { useRouter } from "expo-router";

export function GroupSavingCard() {
  const router = useRouter();
  const [localGroups, setLocalGroups] = useState(appState.groups);
  const [topUpModalVisible, setTopUpModalVisible] = useState(false);
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);

  const isJoined = localGroups.length > 0;

  const handleGroupPress = (id: string, name: string) => {
    router.push({
      pathname: "/group-chat/[id]", 
      params: { id, name }
    });
  };

  const handleJoinAction = () => {
    router.push("/group-saving-onboarding");
  };

  const handleTopUpConfirm = (amount: number) => {
    const updatedGroups = localGroups.map(group => {
      if (group.id === activeGroupId) {
        return { ...group, balance: group.balance + amount };
      }
      return group;
    });

    // Update local UI and global mock state
    setLocalGroups(updatedGroups);
    appState.groups = updatedGroups;
    setTopUpModalVisible(false);
  };

  const openTopUpModal = (groupId: string) => {
    setActiveGroupId(groupId);
    setTopUpModalVisible(true);
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
              {isJoined ? `${localGroups.length} Active Squads` : "Save together, earn more"}
            </Text>
          </View>
        </View>

        {/* The + Button: Only show if user has 1 group (Max 2) */}
        {localGroups.length === 1 && (
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
            {localGroups.map((group, index) => (
              <View
                key={group.id}
                className={index > 0 ? "pt-5 border-t border-white/5" : ""}
              >
                <View className="flex-row justify-between mb-4">
                  <View>
                    <Text className="text-foreground-secondary text-[10px] uppercase font-bold tracking-widest mb-1">{group.name}</Text>
                    <Text className="text-foreground text-3xl font-bold">RM {group.balance.toLocaleString()}</Text>
                  </View>
                  <View className="bg-accent/20 rounded-full px-3 py-1 flex-row items-center self-start border border-accent/30">
                    <TrendingUp size={14} color={colors.accent.teal} />
                    <Text className="text-accent font-bold text-xs ml-1">+0.5% p.a.</Text>
                  </View>
                </View>

                {/* 🔥 New Task 3: Group Streak Progress Bar */}
                <View className="mb-4 bg-background p-3 rounded-2xl border border-border/50">
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-foreground font-semibold text-sm">Squad Streak: 1 Day</Text>
                    <Text className="text-accent font-bold text-xs">9/10 to Reward</Text>
                  </View>
                  <View className="h-2 w-full bg-background-cardLight rounded-full overflow-hidden mb-2">
                    <View className="h-full bg-accent rounded-full" style={{ width: '10%' }} />
                  </View>
                  <Text className="text-foreground-muted text-[10px] leading-3 italic">
                    Keep on working up on personal saving to continue the group streak!
                  </Text>
                </View>

                {/* 🔥 The Action Buttons */}
                <View className="flex-row gap-3">
                  <TouchableOpacity
                    onPress={() => handleGroupPress(group.id, group.name)}
                    activeOpacity={0.7}
                    className="flex-1 bg-background-cardLight py-2.5 rounded-xl items-center justify-center border border-border"
                  >
                    <Text className="text-foreground font-semibold text-sm">Squad Chat</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => openTopUpModal(group.id)}
                    activeOpacity={0.7}
                    className="flex-1 bg-accent py-2.5 rounded-xl items-center justify-center flex-row shadow-lg shadow-accent/30"
                  >
                    <PlusCircle size={16} color="#ffffff" />
                    <Text className="text-white font-semibold text-sm ml-1.5">Top Up</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </LinearGradient>

      {/* 🔥 The Top Up Modal with GXBank Promotion */}
      <Modal visible={topUpModalVisible} transparent={true} animationType="slide">
        <View className="flex-1 justify-end bg-black/60">
          <View className="bg-background-card rounded-t-[32px] p-6 border-t border-accent/20">

            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-foreground font-bold text-xl">Top Up Squad Pocket</Text>
              <TouchableOpacity onPress={() => setTopUpModalVisible(false)} className="bg-background-cardLight rounded-full p-2">
                <Text className="text-foreground-muted font-bold text-sm">✕</Text>
              </TouchableOpacity>
            </View>

            {/* GXBank Promo Banner */}
            <View className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-4 mb-6 flex-row items-center">
              <View className="w-10 h-10 bg-purple-500/20 rounded-full items-center justify-center mr-3">
                <ShieldCheck size={20} color="#a855f7" />
              </View>
              <View className="flex-1">
                <Text className="text-purple-400 font-bold text-sm">GXBank Savings Pocket</Text>
                <Text className="text-foreground-muted text-xs mt-1 leading-4">
                  Your funds are secure and actively earning <Text className="text-foreground font-semibold">2.00% + 0.50% (Group Rewards) p.a. daily interest</Text>.
                </Text>
              </View>
            </View>

            <Text className="text-foreground font-semibold mb-3">Quick Amount</Text>
            <View className="flex-row gap-3 mb-8">
              {[10, 50, 100].map(amount => (
                <TouchableOpacity
                  key={amount}
                  onPress={() => handleTopUpConfirm(amount)}
                  className="flex-1 bg-background-cardLight border border-border py-4 rounded-xl items-center active:bg-accent/20"
                >
                  <Text className="text-foreground font-bold text-lg">RM {amount}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              onPress={() => setTopUpModalVisible(false)}
              className="w-full py-4 rounded-xl items-center mb-4"
            >
              <Text className="text-foreground-muted font-bold">Cancel</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </View>
  );
}