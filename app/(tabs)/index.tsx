import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowRightLeft,
  CreditCard,
  PlusCircle,
  Scan,
  Bell,
  Eye,
  EyeOff,
} from "lucide-react-native";
import { userProfile, formatRM } from "@/lib/mock-data";
import { colors } from "@/lib/constants";

const quickActions = [
  { id: "transfer", label: "Transfer", Icon: ArrowRightLeft },
  { id: "pay", label: "Pay", Icon: CreditCard },
  { id: "top-up", label: "Top Up", Icon: PlusCircle },
  { id: "scan", label: "Scan", Icon: Scan },
];

export default function HomeScreen() {
  const [showBalance, setShowBalance] = React.useState(true);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4">
        <View>
          <Text className="text-foreground-muted text-sm">Good evening,</Text>
          <Text className="text-foreground font-bold text-xl">
            {userProfile.name}
          </Text>
        </View>
        <TouchableOpacity className="w-10 h-10 rounded-full bg-background-card items-center justify-center">
          <Bell size={20} color={colors.text.primary} />
        </TouchableOpacity>
      </View>

      {/* Balance Card */}
      <View className="mx-4 mb-6">
        <LinearGradient
          colors={[colors.background.secondary, colors.background.card]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderRadius: 20,
            padding: 24,
            borderWidth: 1,
            borderColor: colors.background.cardLight,
          }}
        >
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-foreground-muted text-sm">Total Balance</Text>
            <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
              {showBalance ? (
                <Eye size={20} color={colors.text.muted} />
              ) : (
                <EyeOff size={20} color={colors.text.muted} />
              )}
            </TouchableOpacity>
          </View>

          <Text className="text-foreground font-bold text-4xl mb-1">
            {showBalance ? formatRM(userProfile.totalBalance) : "RM ****.**"}
          </Text>

          <Text className="text-foreground-muted text-sm">
            Account: {userProfile.accountNumber}
          </Text>

          {/* GX Bank branding accent */}
          <View className="absolute top-4 right-4 w-16 h-16 rounded-full bg-accent/10" />
          <View className="absolute top-8 right-8 w-8 h-8 rounded-full bg-pink/10" />
        </LinearGradient>
      </View>

      {/* Quick Actions */}
      <View className="mx-4 mb-6">
        <Text className="text-foreground font-semibold text-base mb-4">
          Quick Actions
        </Text>
        <View className="flex-row justify-between">
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              className="items-center"
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={[colors.background.card, colors.background.secondary]}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 8,
                }}
              >
                <action.Icon size={24} color={colors.accent.teal} />
              </LinearGradient>
              <Text className="text-foreground-muted text-xs">{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Promo Banner */}
      <View className="mx-4">
        <LinearGradient
          colors={[colors.accent.teal, colors.accent.tealDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            borderRadius: 16,
            padding: 20,
          }}
        >
          <Text className="text-white font-bold text-lg mb-1">
            Fin Manage is here!
          </Text>
          <Text className="text-white/80 text-sm mb-3">
            Level up your savings with gamification, AI insights, and earn
            rewards for your digital pet!
          </Text>
          <TouchableOpacity className="bg-white/20 self-start px-4 py-2 rounded-full">
            <Text className="text-white font-semibold">Explore Now</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
}
