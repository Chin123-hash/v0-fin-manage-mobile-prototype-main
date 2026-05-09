import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Wallet, Plane, ShoppingBag, Shield, X, Plus, Utensils } from "lucide-react-native";
import { formatRM, calculateProgress, type MentalAccount } from "@/lib/mock-data";
import { colors } from "@/lib/constants";

// 图标映射
const iconMap: Record<string, React.ElementType> = {
  wallet: Wallet,
  plane: Plane,
  shoe: ShoppingBag,
  shield: Shield,
  utensils: Utensils,
};

// 渐变色主题定义
const themeGradients: Record<string, [string, string]> = {
  neutral: [colors.background.card, colors.background.cardLight],
  travel: ["#1a3a5c", "#2d5a8a"],
  shopping: ["#4a1a4a", "#6d2d6d"],
  emergency: ["#1a4a3a", "#2d6d5a"],
  food: ["#4a3a1a", "#6d5a2d"],
};

interface MentalAccountCardProps {
  account: MentalAccount;
  onDelete?: (id: string) => void;
}

function MentalAccountCard({ account, onDelete }: MentalAccountCardProps) {
  const Icon = iconMap[account.icon] || Wallet;
  const gradient = themeGradients[account.theme] || themeGradients.neutral;
  const progress = account.target ? calculateProgress(account.balance, account.target) : null;

  return (
    <View style={{ marginRight: 12 }}>
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          width: 160,
          borderRadius: 24,
          padding: 16,
          height: 180,
        }}
      >
        <View className="flex-row justify-between items-start mb-3">
          <View className="w-10 h-10 rounded-full bg-white/10 items-center justify-center">
            <Icon size={20} color={account.theme === "neutral" ? colors.accent.teal : "white"} />
          </View>
          
          {/* Daily Account 不能删除 */}
          {account.id !== "daily" && account.id !== "1" && (
            <TouchableOpacity 
              onPress={() => onDelete?.(account.id)}
              className="bg-black/20 p-1.5 rounded-full"
            >
              <X size={12} color="white" />
            </TouchableOpacity>
          )}
        </View>

        <Text className="text-white font-semibold text-sm mb-1" numberOfLines={1}>
          {account.name}
        </Text>

        <Text className="text-white font-bold text-lg mb-2">
          {formatRM(account.balance)}
        </Text>

        <View className="mt-auto">
          {progress !== null && account.target ? (
            <View>
              <View className="h-1.5 bg-white/20 rounded-full overflow-hidden mb-1">
                <View
                  className="h-full bg-accent rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </View>
              <Text className="text-white/60 text-[10px]">
                {progress.toFixed(0)}% to Goal
              </Text>
            </View>
          ) : (
            <Text className="text-white/60 text-[10px]">{account.description}</Text>
          )}
        </View>
      </LinearGradient>
    </View>
  );
}

interface MentalAccountsProps {
  accounts: MentalAccount[];
  onAddAccount: (name: string) => void;
  onDeleteAccount: (id: string) => void;
}

export function MentalAccounts({ accounts, onAddAccount, onDeleteAccount }: MentalAccountsProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [text, setText] = useState("");

  const handleCreate = () => {
    if (text.trim()) {
      onAddAccount(text.trim());
      setText("");
      setIsAdding(false);
    }
  };

  return (
    <View className="mb-6">
      <View className="flex-row items-center justify-between mx-4 mb-4">
        <View>
          <Text className="text-foreground font-bold text-lg">Mental Accounts</Text>
          <Text className="text-foreground-muted text-xs">Organize your money by goals</Text>
        </View>
        <TouchableOpacity 
          onPress={() => setIsAdding(!isAdding)}
          className="flex-row items-center bg-accent/10 px-3 py-1.5 rounded-full"
        >
          <Plus size={14} color={colors.accent.teal} />
          <Text className="text-accent text-xs font-bold ml-1">
            {isAdding ? "Cancel" : "Add Account"}
          </Text>
        </TouchableOpacity>
      </View>

      {isAdding && (
        <View className="mx-4 mb-4 flex-row items-center bg-background-card p-2 rounded-2xl border border-accent/30 shadow-sm">
          <TextInput
            placeholder="Account name (e.g. Travel)"
            placeholderTextColor="#666"
            className="flex-1 px-3 text-foreground py-2"
            value={text}
            onChangeText={setText}
            autoFocus
          />
          <TouchableOpacity onPress={handleCreate} className="bg-accent px-4 py-2 rounded-xl">
            <Text className="text-white font-bold text-xs">Create</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 24, paddingRight: 12 }}
      >
        {accounts.map((account) => (
          <MentalAccountCard key={account.id} account={account} onDelete={onDeleteAccount} />
        ))}
        
        {/* Add New Account Button - Encouraging user action */}
        <TouchableOpacity 
          className="w-40 bg-background-card rounded-[24px] p-4 items-center justify-center border border-dashed border-accent/30"
          activeOpacity={0.7}
        >
          <View className="w-10 h-10 rounded-full bg-accent/10 items-center justify-center mb-2">
            <PlusCircle size={24} color={colors.accent.teal} />
          </View>
          <Text className="text-foreground text-xs font-bold">New Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
