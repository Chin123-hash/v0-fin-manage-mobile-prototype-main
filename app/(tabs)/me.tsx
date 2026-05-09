import React, { useState, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useFocusEffect } from "expo-router";
import { DigitalTank } from "@/components/fin-manage/DigitalTank";
import { 
  userProfile, 
  savingStats, 
  rewards, 
  formatRM, 
  personaConfigs, 
  appState, 
  type PersonaType 
} from "@/lib/mock-data";
import { 
  Settings, 
  Users, 
  Calendar, 
  Zap, 
  Trophy, 
  ChevronRight, 
  Users2, 
  User, 
  Lock 
} from "lucide-react-native";
import { colors } from "@/lib/constants";

export default function ProfileScreen() {
  const router = useRouter();
  const [showGroupTank, setShowGroupTank] = useState(false);

  // 🔥 State for synchronization with global appState
  const [hasPersona, setHasPersona] = useState(appState.hasFinishedQuiz);
  const [userPersona, setUserPersona] = useState<PersonaType>(appState.userPersona || "balancer");

  // 🔥 Ensures the profile tab refreshes and unlocks the fish immediately after the quiz
  useFocusEffect(
    useCallback(() => {
      setHasPersona(appState.hasFinishedQuiz);
      if (appState.userPersona) {
        setUserPersona(appState.userPersona);
      }
    }, [])
  );

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      {/* Header with Settings */}
      <View className="flex-row justify-between items-center px-6 py-4">
        <Text className="text-foreground font-bold text-2xl">My Profile</Text>
        <TouchableOpacity className="p-2 rounded-full bg-background-card">
          <Settings size={22} color={colors.text.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* User Identity Section */}
        <View className="flex-row items-center mb-8">
          <View className="w-20 h-20 rounded-full bg-accent items-center justify-center border-2 border-accent/20">
            <Text className="text-white text-3xl font-bold">{userProfile.name[0]}</Text>
          </View>
          <View className="ml-5">
            <Text className="text-foreground font-bold text-xl">{userProfile.name}</Text>
            <Text className="text-foreground-muted text-sm">{userProfile.accountNumber}</Text>
            <View className="bg-accent/10 self-start px-2 py-0.5 rounded mt-2">
              <Text className="text-accent text-[10px] font-bold">PREMIUM MEMBER</Text>
            </View>
          </View>
        </View>

        {/* Financial Sanctuary Section */}
        <View className="mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-foreground font-bold text-lg">Financial Sanctuary</Text>
            {hasPersona && (
              <View className="flex-row bg-background-card p-1 rounded-xl">
                <TouchableOpacity 
                  onPress={() => setShowGroupTank(false)}
                  className={`flex-row items-center px-3 py-1.5 rounded-lg ${!showGroupTank ? 'bg-background-secondary' : ''}`}
                >
                  <User size={14} color={!showGroupTank ? colors.accent.teal : colors.text.secondary} />
                  <Text className={`ml-2 text-xs font-bold ${!showGroupTank ? 'text-accent' : 'text-foreground-muted'}`}>Personal</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => setShowGroupTank(true)}
                  className={`flex-row items-center px-3 py-1.5 rounded-lg ${showGroupTank ? 'bg-background-secondary' : ''}`}
                >
                  <Users2 size={14} color={showGroupTank ? colors.accent.teal : colors.text.secondary} />
                  <Text className={`ml-2 text-xs font-bold ${showGroupTank ? 'text-accent' : 'text-foreground-muted'}`}>Group</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {!hasPersona ? (
            /* Locked State */
            <TouchableOpacity 
              onPress={() => router.push('/fin-manage')}
              className="bg-background-card h-40 rounded-3xl items-center justify-center border border-dashed border-accent/30 shadow-sm"
            >
              <Lock size={32} color={colors.accent.teal} />
              <Text className="text-foreground font-bold mt-2">Find Your Spirit Animal</Text>
              <Text className="text-foreground-muted text-xs">Complete the quiz in Fin Manage to unlock</Text>
            </TouchableOpacity>
          ) : (
            /* Unlocked State: Reflects respective persona color */
            <TouchableOpacity 
              onPress={() => router.push('/pet-hub')}
              activeOpacity={0.9}
              className="shadow-lg shadow-black/40"
            >
              <DigitalTank 
                height={160} 
                showFullTank={showGroupTank} 
                koiColor={personaConfigs[userPersona].fishColor} 
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Stats Grid: Financial Resilience */}
        <View className="flex-row flex-wrap justify-between mb-8">
          <StatCard 
            icon={<Zap size={18} color={colors.accent.teal} />} 
            label="Saving Streak" 
            value={`${savingStats.streak} Days`} 
          />
          <StatCard 
            icon={<Calendar size={18} color={colors.accent.teal} />} 
            label="Days Joined" 
            value="128 Days" 
          />
          <StatCard 
            icon={<Trophy size={18} color={colors.accent.gold} />} 
            label="Fin Managed" 
            value={formatRM(userProfile.totalBalance)} 
          />
          <StatCard 
            icon={<Users size={18} color={colors.accent.pink} />} 
            label="Friends" 
            value="12" 
          />
        </View>

        {/* Achievements Section */}
        <View className="mb-10">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-foreground font-bold text-lg">Achievements</Text>
            <TouchableOpacity>
              <Text className="text-accent text-sm font-bold">View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-6 px-6">
            {rewards.filter(r => r.isUnlocked).map((reward) => (
              <View key={reward.id} className="items-center mr-6">
                <View className="w-16 h-16 rounded-2xl bg-background-card items-center justify-center border border-accent/10 mb-2">
                  <Trophy size={28} color={colors.accent.gold} />
                </View>
                <Text className="text-foreground text-[10px] font-bold text-center w-16" numberOfLines={1}>
                  {reward.name}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Profile Settings Menu */}
        <View className="mb-10">
          <MenuLink icon={<User size={20} color={colors.text.secondary} />} label="Personal Information" />
          <MenuLink icon={<Users2 size={20} color={colors.text.secondary} />} label="Manage Group Saving" />
          <MenuLink icon={<ChevronRight size={20} color={colors.text.secondary} />} label="App Preferences" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <View className="w-[48%] bg-background-card p-4 rounded-2xl mb-4 border border-accent/5">
      <View className="mb-3">{icon}</View>
      <Text className="text-foreground-muted text-[10px] uppercase font-bold tracking-wider">{label}</Text>
      <Text className="text-foreground font-bold text-base mt-1">{value}</Text>
    </View>
  );
}

function MenuLink({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-background-card">
      <View className="flex-row items-center">
        {icon}
        <Text className="text-foreground ml-4 font-medium">{label}</Text>
      </View>
      <ChevronRight size={16} color={colors.text.secondary} />
    </TouchableOpacity>
  );
}