import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ChevronLeft, Target, Info } from "lucide-react-native";
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
                                top: pos.top as any, // FIX: Tell TypeScript to accept the percentage string
                                left: pos.left as any, // FIX: Tell TypeScript to accept the percentage string
                                transform: [{ translateX: -pos.size / 2 }, { scaleX: pos.scaleX }],
                                alignItems: 'center',
                                zIndex: 10
                            }}
                        >
                            <KoiFish size={pos.size} color={color as any} />
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
                <SafeAreaView className="flex-1 pointer-events-none" edges={["top"]}>
                    {/* Header over the tank */}
                    <View className="flex-row items-center justify-between px-4 py-3 pointer-events-auto">
                        <TouchableOpacity
                            onPress={() => router.back()}
                            className="w-10 h-10 rounded-full bg-black/20 items-center justify-center"
                        >
                            <ChevronLeft size={24} color="#ffffff" />
                        </TouchableOpacity>

                        <View className="items-center">
                            <Text className="text-white font-bold text-lg">{group?.name || "Squad Tank"}</Text>
                            <Text className="text-white/60 text-[10px] uppercase tracking-widest">Shared Save Pocket</Text>
                        </View>

                        <TouchableOpacity className="w-10 h-10 rounded-full bg-black/20 items-center justify-center">
                            <Info size={20} color="#ffffff" />
                        </TouchableOpacity>
                    </View>

                    {/* Content Spacing */}
                    <View className="flex-1 items-center justify-center px-10 pointer-events-none" />

                    {/* Bottom Action Area */}
                    <View className="p-6 mb-4 pointer-events-auto">
                        <TouchableOpacity
                            onPress={showMissions}
                            activeOpacity={0.8}
                            className="bg-accent-teal rounded-2xl p-5 flex-row items-center justify-center shadow-lg"
                        >
                            <Target size={24} color="#1a0a2e" strokeWidth={2.5} />
                            <Text className="text-[#1a0a2e] font-bold text-lg ml-3">View Rewards Mission</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>

            </DigitalTank>
        </View>
    );
}