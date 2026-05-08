import React, { useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { KoiFish } from "@/components/fin-manage/KoiFish";
import { savingStats } from "@/lib/mock-data";
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

  // LOG: Check if the screen successfully mounts
  useEffect(() => {
    console.log("✅ PetHubScreen successfully mounted!");
  }, []);

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
          <Text className="text-foreground font-bold text-2xl">Kira's Sanctuary</Text>
          <Text className="text-foreground-muted text-sm">Level up your financial resilience</Text>
        </View>
      </View>

      <ScrollView 
        className="flex-1 px-4" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="bg-background-card rounded-3xl h-72 items-center justify-center mb-6 overflow-hidden border border-accent/20">
           <KoiFish size={180} color="gold" />
           <View className="absolute bottom-6 flex-row space-x-4">
             <TouchableOpacity 
               onPress={() => console.log("🍎 Feeding pet...")}
               className="bg-accent/20 px-6 py-3 rounded-full border border-accent/30"
             >
                <Text className="text-accent font-bold">🍎 Feed</Text>
             </TouchableOpacity>
             <TouchableOpacity 
               onPress={() => console.log("🧼 Cleaning tank...")}
               className="bg-accent/20 px-6 py-3 rounded-full border border-accent/30"
             >
                <Text className="text-accent font-bold">🧼 Clean</Text>
             </TouchableOpacity>
           </View>
        </View>

        <View className="bg-background-secondary p-5 rounded-2xl mb-6 border border-background-cardLight">
          <View className="flex-row justify-between items-center mb-3">
            <View>
              <Text className="text-foreground font-bold text-lg">Pet Level: 4</Text>
              <Text className="text-foreground-muted text-xs">"Saving Sage" Title</Text>
            </View>
            <Text className="text-accent font-bold">80/100 XP</Text>
          </View>
          
          <View className="h-3 bg-background-card rounded-full overflow-hidden">
            <View className="h-full bg-accent w-[80%]" />
          </View>

          <View className="mt-3 flex-row items-center">
            <View className="bg-pink/20 px-2 py-1 rounded-md">
                <Text className="text-pink text-[10px] font-bold">UPCOMING</Text>
            </View>
            <Text className="text-foreground-muted text-xs ml-2">
              Next level unlocks the Lucky Spin Wheel!
            </Text>
          </View>
        </View>

        <Text className="text-foreground font-bold text-lg mb-4">Habit-Building Missions</Text>
        
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
          description="Check your personalized AI guidance" 
          reward="5 XP"
          progress={0}
          total={1}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function MissionCard({ title, description, reward, progress, total }: MissionCardProps) {
  const isCompleted = progress >= total;

  return (
    <View className="bg-background-card p-4 rounded-2xl mb-4 border-l-4 border-accent shadow-sm">
      <View className="flex-row justify-between">
        <View className="flex-1 mr-4">
          <Text className="text-foreground font-bold text-base">{title}</Text>
          <Text className="text-foreground-muted text-xs mb-2 leading-4">{description}</Text>
          <Text className="text-accent text-[10px] font-bold uppercase tracking-wider">Reward: {reward}</Text>
        </View>
        
        <TouchableOpacity 
          className={`px-4 h-10 justify-center rounded-xl self-center ${isCompleted ? 'bg-accent' : 'bg-background-secondary'}`}
          disabled={!isCompleted}
          onPress={() => console.log(`🎁 Claiming reward for: ${title}`)}
        >
          <Text className={`text-xs font-bold ${isCompleted ? 'text-white' : 'text-foreground-muted'}`}>
            {isCompleted ? 'Claim' : `${progress}/${total}`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}