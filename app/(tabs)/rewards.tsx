import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { 
  Gift, Lock, Check, Sparkles, Flame, RotateCw, Star, 
  TrendingUp, Ticket, ShoppingBag, ChevronRight, Trophy 
} from "lucide-react-native";
import { rewards, savingStats, petStats } from "@/lib/mock-data";
import { colors } from "@/lib/constants";
import Animated, { 
  useSharedValue, useAnimatedStyle, withTiming, Easing, runOnJS 
} from "react-native-reanimated";

// Local Data
const financialBoosters = [
  { id: 'b1', name: '+0.1% p.a. Booster', desc: 'Apply to any Saving Pocket', cost: 'Level 6 Unlock', icon: 'trending', color: colors.accent.teal },
  { id: 'b2', name: '2x Cashback Multiplier', desc: 'On all GrabFood orders', cost: '15 Day Streak', icon: 'star', color: colors.accent.gold },
];

const vouchers = [
  { id: 'v1', name: 'RM5 GrabRide Voucher', desc: 'Minimum spend RM15', cost: '500 XP', icon: 'ticket' },
  { id: 'v2', name: 'Free Starbucks Upsize', desc: 'Valid at all MY outlets', cost: 'Level 5 Reward', icon: 'bag' },
];

type TabType = 'boosters' | 'vouchers' | 'sanctuary';

export default function RewardsScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('boosters');
  const [isSpinning, setIsSpinning] = useState(false);
  const rotation = useSharedValue(0);

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    const newRotation = rotation.value + 1800 + Math.random() * 360;
    rotation.value = withTiming(newRotation, {
      duration: 3000,
      easing: Easing.out(Easing.quad),
    }, (finished) => {
      if (finished) {
        runOnJS(setIsSpinning)(false);
        runOnJS(Alert.alert)("Congratulations!", "You won a +0.05% p.a. Interest Booster!");
      }
    });
  };

  const animatedWheelStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const renderIcon = (type: string, color: string) => {
    switch (type) {
      case 'trending': return <TrendingUp size={24} color={color} />;
      case 'star': return <Star size={24} color={color} />;
      case 'ticket': return <Ticket size={24} color={color} />;
      case 'bag': return <ShoppingBag size={24} color={color} />;
      case 'sparkle': return <Sparkles size={24} color={color} />;
      default: return <Gift size={24} color={color} />;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* Tier Progress Header */}
        <View className="px-4 py-6">
          <LinearGradient
            colors={[colors.background.card, colors.background.cardLight]}
            style={styles.headerCard}
          >
            <View className="flex-row justify-between items-center mb-4">
              <View>
                <Text className="text-accent font-bold text-xs uppercase tracking-widest">Current Status</Text>
                <Text className="text-foreground font-bold text-2xl">Silver Member</Text>
              </View>
              <View className="w-12 h-12 rounded-full bg-accent/20 items-center justify-center">
                <Trophy size={24} color={colors.accent.teal} />
              </View>
            </View>
            <View className="h-2 bg-background-primary rounded-full overflow-hidden mb-4">
              <View className="h-full bg-accent" style={{ width: '80%' }} />
            </View>
            <View className="flex-row items-center bg-accent/5 p-3 rounded-2xl border border-accent/10">
              <Sparkles size={16} color={colors.accent.teal} />
              <Text className="text-foreground-muted text-[11px] ml-2 flex-1">
                Reach Level 6 to unlock exclusive High-Yield Interest Boosters.
              </Text>
            </View>
          </LinearGradient>
        </View>

        {/* Lucky Spin Section */}
        <View className="mx-4 mb-8 bg-background-card rounded-[32px] p-6 border border-accent/20">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-foreground font-bold text-lg">Daily Lucky Spin</Text>
            <View className="bg-pink/20 px-3 py-1 rounded-full"><Text className="text-pink text-[10px] font-bold">1 SPIN</Text></View>
          </View>
          <View className="items-center justify-center py-4">
            <Animated.View style={animatedWheelStyle}>
              <View className="w-48 h-48 rounded-full border-4 border-accent/30 items-center justify-center">
                 {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                    <View key={deg} style={[styles.wheelLine, { transform: [{rotate: `${deg}deg`}] }]} />
                 ))}
                 <View className="w-12 h-12 rounded-full bg-accent items-center justify-center"><Star size={24} color={colors.background.primary} /></View>
              </View>
            </Animated.View>
            <View className="absolute top-0 w-4 h-6 bg-pink rounded-b-full" />
          </View>
          <TouchableOpacity 
            // FIXED: Changed colors.accent to colors.accent.teal to fix the Type Error
            style={[styles.spinButton, { backgroundColor: isSpinning ? colors.background.secondary : colors.accent.teal }]}
            onPress={spinWheel}
            disabled={isSpinning}
          >
            <RotateCw size={20} color={isSpinning ? colors.text.muted : colors.background.primary} />
            <Text style={[styles.spinButtonText, { color: isSpinning ? colors.text.muted : colors.background.primary }]}>
              {isSpinning ? 'SPINNING...' : 'SPIN NOW'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Switcher */}
        <View className="px-4">
          <View className="flex-row bg-background-card p-1 rounded-2xl border border-border/50 mb-6">
            {(['boosters', 'vouchers', 'sanctuary'] as TabType[]).map((tab) => (
              <Pressable
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[styles.tabButton, activeTab === tab && styles.activeTabButton]}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
              </Pressable>
            ))}
          </View>

          <View key={activeTab}>
            {activeTab === 'boosters' && financialBoosters.map((item) => (
              <View key={item.id} style={styles.rewardCard}>
                <View style={[styles.iconContainer, { backgroundColor: `${item.color}20` }]}>
                  {renderIcon(item.icon, item.color)}
                </View>
                <View className="flex-1">
                  <Text className="text-foreground font-bold text-base">{item.name}</Text>
                  <Text className="text-foreground-muted text-xs">{item.desc}</Text>
                  <View className="mt-2 self-start bg-accent/10 px-2 py-0.5 rounded-md"><Text className="text-accent text-[9px] font-extrabold">{item.cost}</Text></View>
                </View>
                <ChevronRight size={18} color={colors.text.muted} />
              </View>
            ))}
            
            {activeTab === 'vouchers' && vouchers.map((item) => (
              <View key={item.id} style={styles.rewardCard}>
                <View style={styles.iconContainer}>{renderIcon(item.icon, colors.accent.teal)}</View>
                <View className="flex-1">
                  <Text className="text-foreground font-bold text-base">{item.name}</Text>
                  <Text className="text-foreground-muted text-xs">{item.desc}</Text>
                  <View className="mt-2 self-start bg-accent/10 px-2 py-0.5 rounded-md"><Text className="text-accent text-[9px] font-extrabold">{item.cost}</Text></View>
                </View>
                <ChevronRight size={18} color={colors.text.muted} />
              </View>
            ))}

            {activeTab === 'sanctuary' && rewards.map((reward) => (
              <View key={reward.id} style={[styles.rewardCard, !reward.isUnlocked && { opacity: 0.6 }]}>
                <View style={styles.iconContainer}>
                  {reward.isUnlocked ? <Sparkles size={24} color={colors.accent.teal} /> : <Lock size={24} color={colors.text.muted} />}
                </View>
                <View className="flex-1">
                  <Text className="text-foreground font-bold text-base">{reward.name}</Text>
                  <Text className="text-foreground-muted text-xs">{reward.description}</Text>
                  {!reward.isUnlocked && reward.requiredStreak && (
                    <View className="flex-row items-center mt-1"><Flame size={10} color={colors.accent.pink} /><Text className="text-pink text-[9px] ml-1">{reward.requiredStreak} Day Streak</Text></View>
                  )}
                </View>
                {reward.isUnlocked ? <Check size={18} color={colors.accent.teal} /> : <ChevronRight size={18} color={colors.text.muted} />}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerCard: { borderRadius: 32, padding: 24, borderWidth: 1, borderColor: 'rgba(0, 245, 212, 0.1)' },
  wheelLine: { position: 'absolute', width: '100%', height: 1, backgroundColor: 'rgba(0, 245, 212, 0.2)' },
  spinButton: { marginTop: 24, paddingVertical: 16, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  spinButtonText: { fontWeight: 'bold', marginLeft: 8 },
  tabButton: { flex: 1, paddingVertical: 10, borderRadius: 12, alignItems: 'center' },
  activeTabButton: { backgroundColor: colors.background.secondary },
  tabText: { fontSize: 12, fontWeight: 'bold', color: colors.text.muted, textTransform: 'capitalize' },
  activeTabText: { color: colors.accent.teal },
  rewardCard: { marginBottom: 16, padding: 16, borderRadius: 24, backgroundColor: colors.background.card, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)', flexDirection: 'row', alignItems: 'center' },
  iconContainer: { width: 56, height: 56, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center', marginRight: 16 }
});