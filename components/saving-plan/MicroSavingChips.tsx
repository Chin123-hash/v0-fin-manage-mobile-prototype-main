import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Utensils, Soup, Film } from "lucide-react-native";
import { microSavingOptions, type MicroSavingOption } from "@/lib/mock-data";
import { colors } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  utensils: Utensils,
  "cooking-pot": Soup,
  film: Film,
};

interface MicroSavingChipsProps {
  selectedAmount: number | null;
  onSelect: (amount: number) => void;
}

interface ChipProps {
  option: MicroSavingOption;
  isSelected: boolean;
  onPress: () => void;
}

function Chip({ option, isSelected, onPress }: ChipProps) {
  const Icon = iconMap[option.icon] || Utensils;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} className="flex-1">
      <LinearGradient
        colors={
          isSelected
            ? [colors.accent.teal, colors.accent.tealDark]
            : [colors.background.card, colors.background.secondary]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 16,
          padding: 16,
          alignItems: "center",
          borderWidth: isSelected ? 0 : 1,
          borderColor: colors.background.cardLight,
        }}
      >
        {/* Icon */}
        <View
          className={`w-12 h-12 rounded-full items-center justify-center mb-2 ${
            isSelected ? "bg-white/20" : "bg-accent/10"
          }`}
        >
          <Icon
            size={24}
            color={isSelected ? "#ffffff" : colors.accent.teal}
          />
        </View>

        {/* Amount */}
        <Text
          className={`font-bold text-xl mb-1 ${
            isSelected ? "text-white" : "text-foreground"
          }`}
        >
          RM{option.amount}
        </Text>

        {/* Label */}
        <Text
          className={`text-xs text-center ${
            isSelected ? "text-white/80" : "text-foreground-muted"
          }`}
        >
          {option.label}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export function MicroSavingChips({ selectedAmount, onSelect }: MicroSavingChipsProps) {
  return (
    <View className="mb-6">
      <Text className="text-foreground font-semibold text-base mb-2">
        Micro-Saving Amount
      </Text>
      <Text className="text-foreground-muted text-sm mb-4">
        Skip a small expense to save automatically
      </Text>

      <View className="flex-row gap-3">
        {microSavingOptions.map((option) => (
          <Chip
            key={option.id}
            option={option}
            isSelected={selectedAmount === option.amount}
            onPress={() => onSelect(option.amount)}
          />
        ))}
      </View>
    </View>
  );
}
