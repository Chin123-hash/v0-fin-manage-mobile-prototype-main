import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ChevronLeft, Target, Gift } from "lucide-react-native";
import { DigitalTank } from "@/components/fin-manage/DigitalTank";
import { KoiFish } from "@/components/fin-manage/KoiFish";
import { appState, personaConfigs } from "@/lib/mock-data";

export default function GroupTankScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const group = appState.groups.find(g => g.id === id);

    // Get the user's specific fish color based on their quiz persona
    const userPersona = appState.userPersona || 'balancer';
    const myFishColor = personaConfigs[userPersona].fishColor;

    const showMissions = () => {
        Alert.alert(
            "Squad Missions",
            "1. Save RM100 total (0/100)\n2. Maintain 3-day group streak\n\nReward: Neon Gold Fins",
            [{ text: "Got it!" }]
        );
    };

    // Pre-defined random swimming positions for teammates
    const positions = [
        { top: '25%', left: '15%', scaleX: 1, size: 55 },
        { top: '65%', left: '75%', scaleX: -1, size: 50 },
        { top: '45%', left: '80%', scaleX: -1, size: 60 },
        { top: '75%', left: '20%', scaleX: 1, size: 45 },
    ];
    
    // Pool of colors to assign to teammate fishes
    const fishColors = ["sakura", "neon", "calico", "cloud", "fire"];

    return (
        <View className="flex-1 bg-background">
            {/* Immersive Full Screen Tank */}
            {/* 🔥 Un-hide the fish and pass the user's specific Koi color! */}
            <DigitalTank isFullScreen={true} hideFish={false} koiColor={myFishColor}>
                
                {/* 🐟 Generate Teammate Fishes */}
                {group?.members?.map((member, index) => {
                    const pos = positions[index % positions.length];
                    const color = fishColors[index % fishColors.length];
                    
                    return (
                        <View
                            key={member.id}
                            style={{
                                position: 'absolute',
                                top: pos.top as any, 
                                left: pos.left as any, 
                                transform: [{ translateX: -pos.size / 2 }, { scaleX: pos.scaleX }],
                                alignItems: 'center',
                                zIndex: 10
                            }}
                        >
                            {/* 🔥 Explicitly set teammates to Level 5 so they don't get the crown */}
                            <KoiFish size={pos.size} color={color as any} level={5} />
                            
                            {/* Teammate Name Tag */}
                            <View 
                                className="bg-black/50 px-2 py-1 rounded-full mt-2" 
                                style={{ transform: [{ scaleX: pos.scaleX }] }} // reverse the mirror effect on the text
                            >
                                <Text className="text-white text-[9px] font-bold uppercase tracking-wider">{member.name}</Text>
                            </View>
                        </View>
                    );
                })}

                {/* Content Overlay */}
                {/* 🔥 FIX: Changed to pointerEvents="box-none" and added high z-index */}
                <SafeAreaView className="flex-1" edges={["top"]} pointerEvents="box-none" style={{ zIndex: 50 }}>
                    
                    {/* Header over the tank */}
                    <View className="flex-row items-center justify-between px-4 py-3" pointerEvents="box-none">
                        <TouchableOpacity
                            onPress={() => router.back()}
                            className="w-10 h-10 rounded-full bg-black/20 items-center justify-center z-50"
                        >
                            <ChevronLeft size={24} color="#ffffff" />
                        </TouchableOpacity>

                        <View className="items-center pointer-events-none">
                            <Text className="text-white font-bold text-lg">{group?.name || "Squad Tank"}</Text>
                            <Text className="text-white/60 text-[10px] uppercase tracking-widest">Shared Save Pocket</Text>
                        </View>

                        {/* Rewards Button moved to top right */}
                        <TouchableOpacity
                            onPress={() => router.push("/(tabs)/rewards")}
                            className="w-10 h-10 rounded-full bg-accent-pink/80 items-center justify-center border border-white/20 z-50"
                        >
                            <Gift size={20} color="#ffffff" />
                        </TouchableOpacity>
                    </View>

                    {/* Content Spacing */}
                    <View className="flex-1 items-center justify-center px-10" pointerEvents="none" />

                </SafeAreaView>

            </DigitalTank>
        </View>
    );
}