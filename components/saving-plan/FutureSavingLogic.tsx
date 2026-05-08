import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Zap, Plus, Minus } from "lucide-react-native";
import { colors } from "@/lib/constants";

interface FutureSavingLogicProps {
  saveAmount: number;
  triggerAmount: number;
  onSaveAmountChange: (amount: number) => void;
  onTriggerAmountChange: (amount: number) => void;
}

interface AmountInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  step?: number;
}

function AmountInput({ label, value, onChange, step = 5 }: AmountInputProps) {
  const increment = () => onChange(value + step);
  const decrement = () => onChange(Math.max(0, value - step));

  return (
    <View className="flex-1">
      <Text className="text-foreground-muted text-xs mb-2 text-center">
        {label}
      </Text>
      <View className="flex-row items-center bg-background-secondary rounded-xl overflow-hidden">
        <TouchableOpacity
          onPress={decrement}
          className="p-3 bg-background-card"
          activeOpacity={0.7}
        >
          <Minus size={18} color={colors.text.muted} />
        </TouchableOpacity>
        <View className="flex-1 items-center py-3">
          <Text className="text-foreground font-bold text-lg">RM{value}</Text>
        </View>
        <TouchableOpacity
          onPress={increment}
          className="p-3 bg-background-card"
          activeOpacity={0.7}
        >
          <Plus size={18} color={colors.accent.teal} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export function FutureSavingLogic({
  saveAmount,
  triggerAmount,
  onSaveAmountChange,
  onTriggerAmountChange,
}: FutureSavingLogicProps) {
  return (
    <View className="mb-6">
      <View className="flex-row items-center mb-4">
        <View className="w-10 h-10 rounded-full bg-accent/20 items-center justify-center mr-3">
          <Zap size={20} color={colors.accent.teal} />
        </View>
        <View>
          <Text className="text-foreground font-semibold text-base">
            Smart Auto-Save Rule
          </Text>
          <Text className="text-foreground-muted text-sm">
            Set up automatic saving triggers
          </Text>
        </View>
      </View>

      <LinearGradient
        colors={[colors.background.card, colors.background.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 16,
          padding: 16,
        }}
      >
        {/* Rule description */}
        <View className="bg-background/50 rounded-xl p-4 mb-4">
          <Text className="text-foreground text-center text-base">
            <Text className="text-foreground-muted">Save </Text>
            <Text className="text-accent font-bold">RM{saveAmount}</Text>
            <Text className="text-foreground-muted"> every time I add </Text>
            <Text className="text-pink font-bold">RM{triggerAmount}</Text>
            <Text className="text-foreground-muted"> to my account</Text>
          </Text>
        </View>

        {/* Input controls */}
        <View className="flex-row gap-4">
          <AmountInput
            label="Save this amount"
            value={saveAmount}
            onChange={onSaveAmountChange}
            step={5}
          />
          <AmountInput
            label="When I add"
            value={triggerAmount}
            onChange={onTriggerAmountChange}
            step={50}
          />
        </View>

        {/* Preview */}
        <View className="mt-4 pt-4 border-t border-background-secondary">
          <Text className="text-foreground-muted text-xs text-center">
            Example: Add RM{triggerAmount} salary, auto-save RM{saveAmount}
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
}
