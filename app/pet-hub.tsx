import React, { useState, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useFocusEffect } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { KoiFish } from "@/components/fin-manage/KoiFish";
import { 
  savingStats, 
  personaConfigs, 
  appState 
} from "@/lib/mock-data";
import { colors } from "@/lib/constants";

interface MissionCardProps {
  id: string;
  title: string;
  description: string;
  reward: string;
  progress: number;
  total: number;
  onClaim: (id: string) => void;
  isClaimed: boolean;
}

export default function PetHubScreen() {
  const router = useRouter();
  const [xp, setXp] = useState(appState.petStats.xp);
  const [level, setLevel] = useState(appState.petStats.level);
  const [claimedMissions, setClaimedMissions] = useState<string[]>([]);

  const userPersona = appState.userPersona || "balancer"; 
  const config = personaConfigs[userPersona];

  const handleClaim = (missionId: string) => {
    if (claimedMissions.includes(missionId)) return;

    setClaimedMissions([...claimedMissions, missionId]);
    
    // Logic for XP gain
    let xpGain = 25;
    let nextXp = xp + xpGain;
    let nextLevel = level;

    if (nextXp >= 100) {
      nextLevel += 1;
      nextXp = nextXp - 100;
      Alert.alert("Level Up! 🎉", `${appState.petStats.name} is now Level ${nextLevel}! You've unlocked a new decoration.`);
      
      // Unlock the next decoration
      const lockedDecor = appState.rewards.find(r => !r.isUnlocked && r.type === "decoration");
      if (lockedDecor) {
        lockedDecor.isUnlocked = true;
      }
    }

    setXp(nextXp);
    setLevel(nextLevel);
    
    // Sync to global state
    appState.petStats.xp = nextXp;
    appState.petStats.level = nextLevel;
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="flex-row items-center px-4 py-4">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="mr-4 w-10 h-10 items-center justify-center rounded-full bg-background-card"
        >
          <ChevronLeft size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <View>
          <Text className="text-foreground font-bold text-2xl">{appState.petStats.name}'s Sanctuary</Text>
          <Text className="text-foreground-muted text-sm">
            {config.name} • Level up your resilience
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <View className="bg-background-card rounded-[40px] h-80 items-center justify-center mb-6 border border-accent/20 shadow-xl shadow-black/20">
           <KoiFish size={200} color={config.fishColor as any} />
           
           <View className="absolute bottom-8 flex-row space-x-4">
             <TouchableOpacity className="bg-accent/20 px-8 py-3.5 rounded-full border border-accent/30 shadow-sm">
                <Text className="text-accent font-bold">🍕 Feed</Text>
             </TouchableOpacity>
             <TouchableOpacity className="bg-accent/20 px-8 py-3.5 rounded-full border border-accent/30 shadow-sm">
                <Text className="text-accent font-bold">🧼 Clean</Text>
             </TouchableOpacity>
           </View>
        </View>

        <View className="bg-background-secondary p-6 rounded-3xl mb-8 border border-background-cardLight">
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="text-foreground font-bold text-xl">Level {level}</Text>
              <Text className="text-accent text-xs font-bold uppercase tracking-widest">
                Saving Sage
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-accent font-extrabold text-lg">{xp}/100</Text>
              <Text className="text-foreground-muted text-[10px] font-bold">XP TO NEXT LEVEL</Text>
            </View>
          </View>
          
          <View className="h-3 bg-background-card rounded-full overflow-hidden">
            <View className="h-full bg-accent" style={{ width: `${xp}%` }} />
          </View>

          <View className="mt-4 flex-row items-center bg-background-card/50 p-3 rounded-xl border border-accent/10">
            <View className="bg-pink/20 px-2 py-1 rounded-md">
                <Text className="text-pink text-[9px] font-bold">UNLOCKS AT LVL {level + 1}</Text>
            </View>
            <Text className="text-foreground-muted text-xs ml-3 flex-1">
              Next level unlocks more decorations for your tank!
            </Text>
          </View>
        </View>

        <Text className="text-foreground font-bold text-lg mb-4 px-1">Habit-Building Missions</Text>
        
        <MissionCard 
          id="m1"
          title="Micro-Saver" 
          description="Save RM5 into your Goal today" 
          reward="25 XP + 1 Fish Food"
          progress={1}
          total={1}
          onClaim={handleClaim}
          isClaimed={claimedMissions.includes("m1")}
        />
        
        <MissionCard 
          id="m2"
          title="Streak Protector" 
          description="Maintain your savings streak for 7 days" 
          reward="25 XP + Rare Coral Decor"
          progress={savingStats.streak}
          total={7}
          onClaim={handleClaim}
          isClaimed={claimedMissions.includes("m2")}
        />

        <MissionCard 
          id="m3"
          title="Insight Seeker" 
          description="Review your weekly AI spending analysis" 
          reward="25 XP"
          progress={1}
          total={1}
          onClaim={handleClaim}
          isClaimed={claimedMissions.includes("m3")}
        />
        
        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}

function MissionCard({ id, title, description, reward, progress, total, onClaim, isClaimed }: MissionCardProps) {
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
          className={`px-5 h-11 justify-center rounded-2xl ${isClaimed ? 'bg-background-card border border-border' : isCompleted ? 'bg-accent' : 'bg-background-secondary'}`}
          activeOpacity={isCompleted && !isClaimed ? 0.7 : 1}
          onPress={() => isCompleted && !isClaimed && onClaim(id)}
          disabled={!isCompleted || isClaimed}
        >
          <Text className={`text-xs font-bold ${isClaimed ? 'text-foreground-muted' : isCompleted ? 'text-white' : 'text-foreground-muted'}`}>
            {isClaimed ? 'Claimed' : isCompleted ? 'Claim' : `${progress}/${total}`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}