import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Wallet, Plane, ShoppingBag, Shield, ChevronRight } from "lucide-react-native";
import { mentalAccounts, formatRM, calculateProgress, type MentalAccount } from "@/lib/mock-data";
import { colors } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  wallet: Wallet,
  plane: Plane,
  shoe: ShoppingBag,
  shield: Shield,
};

const themeGradients: Record<string, [string, string]> = {
  neutral: [colors.background.card, colors.background.cardLight],
  travel: ["#1a3a5c", "#2d5a8a"],
  shopping: ["#4a1a4a", "#6d2d6d"],
  emergency: ["#1a4a3a", "#2d6d5a"],
  food: ["#4a3a1a", "#6d5a2d"],
};

interface MentalAccountCardProps {
  account: MentalAccount;
}

function MentalAccountCard({ account }: MentalAccountCardProps) {
  const Icon = iconMap[account.icon] || Wallet;
  const gradient = themeGradients[account.theme] || themeGradients.neutral;
  const progress = account.target
    ? calculateProgress(account.balance, account.target)
    : null;

  return (
    <TouchableOpacity activeOpacity={0.8}>
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          width: 160,
          borderRadius: 16,
          padding: 16,
          marginRight: 12,
        }}
      >
        {/* Icon */}
        <View className="w-10 h-10 rounded-full bg-white/10 items-center justify-center mb-3">
          <Icon size={20} color={colors.accent.teal} />
        </View>

        {/* Account name */}
        <Text className="text-foreground font-semibold text-sm mb-1" numberOfLines={1}>
          {account.name}
        </Text>

        {/* Balance */}
        <Text className="text-foreground font-bold text-lg mb-2">
          {formatRM(account.balance)}
        </Text>

        {/* Progress bar (if has target) */}
        {progress !== null && account.target && (
          <View>
            <View className="h-1.5 bg-white/20 rounded-full overflow-hidden mb-1">
              <View
                className="h-full bg-accent rounded-full"
                style={{ width: `${progress}%` }}
              />
            </View>
            <Text className="text-foreground-muted text-xs">
              {progress.toFixed(0)}% of {formatRM(account.target)}
            </Text>
          </View>
        )}

        {/* Description for accounts without target */}
        {!account.target && account.description && (
          <Text className="text-foreground-muted text-xs">{account.description}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

export function MentalAccounts() {
  return (
    <View className="mb-4">
      {/* Header */}
      <View className="flex-row items-center justify-between mx-4 mb-3">
        <View>
          <Text className="text-foreground font-bold text-base">Mental Accounts</Text>
          <Text className="text-foreground-muted text-sm">
            Organize your money by goals
          </Text>
        </View>
        <TouchableOpacity className="flex-row items-center">
          <Text className="text-accent text-sm mr-1">See all</Text>
          <ChevronRight size={16} color={colors.accent.teal} />
        </TouchableOpacity>
      </View>

      {/* Horizontal scroll of cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 16, paddingRight: 4 }}
      >
        {mentalAccounts.map((account) => (
          <MentalAccountCard key={account.id} account={account} />
        ))}
      </ScrollView>
    </View>
  );
}
