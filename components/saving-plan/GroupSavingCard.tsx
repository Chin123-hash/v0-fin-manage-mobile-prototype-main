import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Users, Plus, TrendingUp } from "lucide-react-native";
import { groupMembers } from "@/lib/mock-data";
import { colors } from "@/lib/constants";

interface GroupSavingCardProps {
  onJoin?: () => void;
}

export function GroupSavingCard({ onJoin }: GroupSavingCardProps) {
  return (
    <View className="mb-6">
      <View className="flex-row items-center mb-4">
        <View className="w-10 h-10 rounded-full bg-pink/20 items-center justify-center mr-3">
          <Users size={20} color={colors.accent.pink} />
        </View>
        <View>
          <Text className="text-foreground font-semibold text-base">
            Group Saving Challenge
          </Text>
          <Text className="text-foreground-muted text-sm">
            Save together with friends
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
        {/* Bonus badge */}
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-foreground font-semibold">Japan Trip Squad</Text>
          <View className="flex-row items-center bg-accent/20 rounded-full px-3 py-1">
            <TrendingUp size={14} color={colors.accent.teal} />
            <Text className="text-accent font-bold text-sm ml-1">
              +0.5% p.a. bonus
            </Text>
          </View>
        </View>

        {/* Group members */}
        <View className="flex-row items-center mb-4">
          {/* Avatar stack */}
          <View className="flex-row">
            {groupMembers.map((member, index) => (
              <View
                key={member.id}
                className="w-10 h-10 rounded-full items-center justify-center border-2 border-background-card"
                style={{
                  backgroundColor: member.color,
                  marginLeft: index > 0 ? -12 : 0,
                  zIndex: groupMembers.length - index,
                }}
              >
                <Text className="text-white font-bold text-sm">
                  {member.initials}
                </Text>
              </View>
            ))}
            {/* Add member button */}
            <TouchableOpacity
              className="w-10 h-10 rounded-full items-center justify-center border-2 border-dashed border-foreground-muted bg-background-secondary"
              style={{ marginLeft: -12 }}
            >
              <Plus size={18} color={colors.text.muted} />
            </TouchableOpacity>
          </View>

          <View className="ml-4 flex-1">
            <Text className="text-foreground-muted text-sm">
              {groupMembers.length} members saving
            </Text>
            <Text className="text-foreground font-semibold">RM 8,500 total</Text>
          </View>
        </View>

        {/* Member names */}
        <View className="flex-row flex-wrap gap-2 mb-4">
          {groupMembers.map((member) => (
            <View
              key={member.id}
              className="bg-background-secondary rounded-full px-3 py-1"
            >
              <Text className="text-foreground-muted text-xs">{member.name}</Text>
            </View>
          ))}
        </View>

        {/* Join button */}
        <TouchableOpacity onPress={onJoin} activeOpacity={0.8}>
          <LinearGradient
            colors={[colors.accent.pink, colors.accent.pinkDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              borderRadius: 12,
              padding: 14,
              alignItems: "center",
            }}
          >
            <Text className="text-white font-bold">Join Group Challenge</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Info text */}
        <Text className="text-foreground-muted text-xs text-center mt-3">
          Earn bonus interest when you save together!
        </Text>
      </LinearGradient>
    </View>
  );
}
