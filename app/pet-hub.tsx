import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { KoiFish } from "@/components/fin-manage/KoiFish";
import { 
  savingStats, 
  petStats, 
  personaConfigs, 
  appState // 🔥 Import global state for persona synchronization
} from "@/lib/mock-data";
import { colors } from "@/lib/constants";

interface MissionCardProps {
  title: string;
  description: string;
  reward: string;
  progress: number;
  total: number;
}

export default function PetHubScreen() {
  const router = useRouter();

  // 🔥 Dynamically retrieve the persona from the global state
  // Default to 'balancer' if the quiz hasn't been completed yet
  const userPersona = appState.userPersona || "balancer"; 
  const config = personaConfigs[userPersona];

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      {/* Header with Navigation */}
      <View className="flex-row items-center px-4 py-4">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="mr-4 w-10 h-10 items-center justify-center rounded-full bg-background-card"
        >
          <ChevronLeft size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <View>
          <Text className="text-foreground font-bold text-2xl">{petStats.name}'s Sanctuary</Text>
          <Text className="text-foreground-muted text-sm">
            {config.name} • Level up your resilience
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Main Pet Interaction Area */}
        <View className="bg-background-card rounded-[40px] h-80 items-center justify-center mb-6 border border-accent/20 shadow-xl shadow-black/20">
           {/* 🔥 Dynamically apply Fish Color based on the Unlocked Persona */}
           <KoiFish size={200} color={config.fishColor as any} />
           
           <View className="absolute bottom-8 flex-row space-x-4">
             <TouchableOpacity className="bg-accent/20 px-8 py-3.5 rounded-full border border-accent/30 shadow-sm">
                <Text className="text-accent font-bold">🍎 Feed</Text>
             </TouchableOpacity>
             <TouchableOpacity className="bg-accent/20 px-8 py-3.5 rounded-full border border-accent/30 shadow-sm">
                <Text className="text-accent font-bold">🧼 Clean</Text>
             </TouchableOpacity>
           </View>
        </View>

        {/* Level & Progression Status */}
        <View className="bg-background-secondary p-6 rounded-3xl mb-8 border border-background-cardLight">
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="text-foreground font-bold text-xl">Level {petStats.level}</Text>
              <Text className="text-accent text-xs font-bold uppercase tracking-widest">
                Saving Sage
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-accent font-extrabold text-lg">80/100</Text>
              <Text className="text-foreground-muted text-[10px] font-bold">XP TO NEXT LEVEL</Text>
            </View>
          </View>
          
          <View className="h-3 bg-background-card rounded-full overflow-hidden">
            <View className="h-full bg-accent" style={{ width: '80%' }} />
          </View>

          <View className="mt-4 flex-row items-center bg-background-card/50 p-3 rounded-xl border border-accent/10">
            <View className="bg-pink/20 px-2 py-1 rounded-md">
                <Text className="text-pink text-[9px] font-bold">UNLOCKS AT LVL 6</Text>
            </View>
            <Text className="text-foreground-muted text-xs ml-3 flex-1">
              Next level unlocks the "Premium Gold" tank theme!
            </Text>
          </View>
        </View>

        {/* Behavioral Habit-Building Missions */}
        <Text className="text-foreground font-bold text-lg mb-4 px-1">Habit-Building Missions</Text>
        
        <MissionCard 
          title="Micro-Saver" 
          description="Save RM5 into your Goal today" 
          reward="10 XP + 1 Fish Food"
          progress={1}
          total={1}
        />
        
        <MissionCard 
          title="Streak Protector" 
          description="Maintain your savings streak for 7 days" 
          reward="50 XP + Rare Coral Decor"
          progress={savingStats.streak}
          total={7}
        />

        <MissionCard 
          title="Insight Seeker" 
          description="Review your weekly AI spending analysis" 
          reward="5 XP"
          progress={0}
          total={1}
        />
        
        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}

/**
 * Shared Mission Card Component
 */
function MissionCard({ title, description, reward, progress, total }: MissionCardProps) {
  const isCompleted = progress >= total;
  
  return (
    <View className="bg-background-card p-5 rounded-3xl mb-4 border border-background-cardLight shadow-sm">
      <View className="flex-row justify-between items-center">
        <View className="flex-1 mr-4">
          <Text className="text-foreground font-bold text-base mb-1">{title}</Text>
          <Text className="text-foreground-muted text-xs mb-2 leading-4">{description}</Text>
          <View className="flex-row items-center">
             <View className="w-2 h-2 rounded-full bg-accent mr-2" />
             <Text className="text-accent text-[10px] font-bold uppercase tracking-wider">
               Reward: {reward}
             </Text>
          </View>
        </View>
        <TouchableOpacity 
          className={`px-5 h-11 justify-center rounded-2xl ${isCompleted ? 'bg-accent' : 'bg-background-secondary'}`}
          activeOpacity={isCompleted ? 0.7 : 1}
        >
          <Text className={`text-xs font-bold ${isCompleted ? 'text-white' : 'text-foreground-muted'}`}>
            {isCompleted ? 'Claim' : `${progress}/${total}`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}