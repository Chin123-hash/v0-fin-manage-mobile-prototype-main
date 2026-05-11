import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { 
  Bell, Eye, EyeOff, ChevronRight, Archive, Zap, PlusCircle 
} from "lucide-react-native";
import { userProfile, formatRM, mentalAccounts } from "@/lib/mock-data";
import { colors } from "@/lib/constants";
import { useRouter } from "expo-router";
import { MentalAccounts } from "@/components/fin-manage/MentalAccounts";

export default function HomeScreen() {
  const [showBalance, setShowBalance] = React.useState(true);
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4">
          <View>
            <Text className="text-foreground-muted text-xs uppercase tracking-widest mb-1">Welcome back</Text>
            <Text className="text-foreground font-bold text-2xl">{userProfile.name}</Text>
          </View>
          <TouchableOpacity className="w-10 h-10 rounded-full bg-background-card items-center justify-center border border-background-cardLight">
            <Bell size={20} color={colors.text.primary} />
          </TouchableOpacity>
        </View>

        {/* 1. NATIVE LAYER: GX Account & Daily Interest */}
        <View className="px-6 mb-8">
          <LinearGradient
            colors={[colors.background.secondary, colors.background.primary]}
            style={{ borderRadius: 24, padding: 24, borderWidth: 1, borderColor: colors.background.cardLight }}
          >
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-foreground-muted text-sm font-medium">Main Account</Text>
              <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
                {showBalance ? <Eye size={20} color={colors.accent.teal} /> : <EyeOff size={20} color={colors.accent.teal} />}
              </TouchableOpacity>
            </View>
            <Text className="text-foreground font-bold text-4xl mb-2">
              {showBalance ? formatRM(userProfile.totalBalance) : "RM ****.**"}
            </Text>
            <View className="flex-row items-center">
              <Text className="text-foreground-muted text-xs mr-2">{userProfile.accountNumber}</Text>
              <View className="bg-teal/20 px-2 py-0.5 rounded">
                <Text className="text-accent text-[10px] font-bold">3.0% DAILY INT.</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* 2. NATIVE LAYER: Savings Pockets (Minimalist List) */}
        <View className="px-6 mb-8">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-foreground font-bold text-lg">Savings Pockets</Text>
            <TouchableOpacity className="flex-row items-center">
              <PlusCircle size={20} color={colors.accent.teal} />
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-6 px-6">
            <View className="flex-row">
              {["Emergency", "Travel", "Taxes"].map((pocket, i) => (
                <View key={i} className="bg-background-card px-4 py-3 rounded-2xl mr-3 border border-background-cardLight min-w-[120px]">
                  <Archive size={16} color={colors.accent.teal} className="mb-2" />
                  <Text className="text-foreground font-bold text-xs">{pocket}</Text>
                  <Text className="text-foreground-muted text-[10px]">RM 1,200.00</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>



        {/* Active Habit-Builder Nudge */}
        <View className="px-6">
          <TouchableOpacity 
            className="bg-accent/10 border border-accent/20 rounded-2xl p-5 flex-row items-center"
            onPress={() => router.push("/fin-manage")}
          >
            <View className="w-12 h-12 rounded-full bg-accent items-center justify-center mr-4">
              <Zap size={24} color={colors.background.primary} />
            </View>
            <View className="flex-1">
              <Text className="text-foreground font-bold text-base">Fin Manage Ecosystem</Text>
              <Text className="text-foreground-muted text-xs">Feed your fish by reaching saving milestones.</Text>
            </View>
            <ChevronRight size={20} color={colors.text.muted} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}