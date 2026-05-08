import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, ScrollView, FlatList, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Users, Plus, TrendingUp, Wallet, CheckCircle2 } from "lucide-react-native";
import { groupMembers, fakeContacts, appState } from "@/lib/mock-data";
import { colors } from "@/lib/constants";

interface GroupSavingCardProps {
  onJoin?: () => void;
  isDashboardVersion?: boolean;
}

export function GroupSavingCard({ onJoin, isDashboardVersion = false }: GroupSavingCardProps) {
  const [showContacts, setShowContacts] = useState(false);
  const [balance, setBalance] = useState(appState.groupPocketBalance);
  const progress = (balance / appState.targetAmount) * 100; 
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);

  const handleAddMoney = () => {
    const amount = 50;
    setBalance(prev => prev + amount);
    Alert.alert("Success!", `RM${amount} added to GXBank Group Pocket!`);
  };

  const selectFriend = (name: string) => {
    Alert.alert("Invitation Sent", `Invited ${name} to the Japan Trip Squad.`);
    setShowContacts(false);
  };

  return (
    <View className="mb-6">
      <View className="flex-row items-center mb-4 px-4">
        <View className="w-10 h-10 rounded-full bg-[#ff006e]/20 items-center justify-center mr-3">
          <Users size={20} color="#ff006e" />
        </View>
        <View>
          <Text className="text-foreground font-semibold text-base">
            Group Saving Challenge
          </Text>
          <Text className="text-foreground-muted text-sm">
            {isDashboardVersion ? "Saving for Japan Trip Squad" : "Save together with friends"}
          </Text>
        </View>
      </View>

      <LinearGradient
        colors={["#1a1a2e", "#16213e"]}
        style={{ borderRadius: 20, padding: 20, marginHorizontal: 16 }}
      >
        <View className="flex-row justify-between items-start mb-4">
          <View>
            <Text className="text-foreground-muted text-xs uppercase font-bold tracking-wider">Group Total</Text>
            <Text className="text-foreground text-2xl font-bold">RM {balance.toLocaleString()}</Text>
          </View>
          <View className="bg-[#00f5d4]/20 rounded-full px-3 py-1 flex-row items-center">
            <TrendingUp size={14} color="#00f5d4" />
            <Text className="text-[#00f5d4] font-bold text-xs ml-1">+0.5% p.a.</Text>
          </View>
        </View>

        {/* Progress to Reward */}
        <View className="mb-4">
          <View className="flex-row justify-between mb-1">
            <Text className="text-foreground-muted text-xs">Progress to Gold Fin Reward</Text>
            <Text className="text-accent text-xs font-bold">{Math.round(progress)}%</Text>
          </View>
          <View className="h-2 bg-background/50 rounded-full overflow-hidden">
            <View style={{ width: `${progress}%`, height: '100%', backgroundColor: '#00f5d4' }} />
          </View>
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-row">
            {groupMembers.slice(0, 3).map((member, i) => (
              <View
                key={member.id}
                className="w-8 h-8 rounded-full border-2 border-[#1a1a2e] items-center justify-center"
                style={{ backgroundColor: member.color, marginLeft: i > 0 ? -10 : 0 }}
              >
                <Text className="text-white text-[10px] font-bold">{member.initials}</Text>
              </View>
            ))}
            <TouchableOpacity
              onPress={() => setShowContacts(true)}
              className="w-8 h-8 rounded-full bg-background/30 border-2 border-dashed border-foreground-muted items-center justify-center"
              style={{ marginLeft: -10 }}
            >
              <Plus size={14} color="#fff" />
            </TouchableOpacity>
          </View>

          {isDashboardVersion ? (
            <TouchableOpacity
              onPress={handleAddMoney}
              className="bg-accent-teal px-4 py-2 rounded-xl flex-row items-center"
            >
              <Wallet size={16} color="#1a0a2e" className="mr-2" />
              <Text className="text-[#1a0a2e] font-bold">Add RM50</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onJoin} className="bg-accent-pink px-6 py-2 rounded-xl">
              <Text className="text-white font-bold">Join Group</Text>
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>

      {/* Contacts Modal */}
      <Modal visible={showContacts} animationType="slide" transparent>
        <View className="flex-1 justify-end bg-black/60">
          <View className="bg-background rounded-t-3xl p-6 h-2/3">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-foreground text-xl font-bold">Sync Contacts</Text>
              <TouchableOpacity onPress={() => setShowContacts(false)}>
                <Text className="text-accent font-bold">Cancel</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={fakeContacts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => selectFriend(item.name)}
                  className="flex-row items-center justify-between py-4 border-b border-background-card"
                >
                  <View className="flex-row items-center">
                    <View className="w-10 h-10 rounded-full bg-background-secondary items-center justify-center mr-3">
                      <Text className="text-foreground font-bold">{item.name[0]}</Text>
                    </View>
                    <View>
                      <Text className="text-foreground font-semibold">{item.name}</Text>
                      <Text className="text-foreground-muted text-xs">{item.phone}</Text>
                    </View>
                  </View>
                  <Plus size={20} color="#00f5d4" />
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}