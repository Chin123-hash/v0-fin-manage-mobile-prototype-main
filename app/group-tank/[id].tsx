// app/group-tank/[id].tsx
import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ChevronLeft, Target, Info } from "lucide-react-native";
import { DigitalTank } from "@/components/fin-manage/DigitalTank";
import { colors } from "@/lib/constants";
import { appState } from "@/lib/mock-data";

export default function GroupTankScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const group = appState.groups.find(g => g.id === id);

    const showMissions = () => {
        Alert.alert(
            "Squad Missions",
            "1. Save RM100 total (0/100)\n2. Maintain 3-day group streak\n\nReward: Neon Gold Fins",
            [{ text: "Got it!" }]
        );
    };

    return (
        <View className="flex-1 bg-background">
            {/* Immersive Full Screen Tank */}
            <DigitalTank isFullScreen={true} hideFish={true}>

                {/* Content Overlay */}
                <SafeAreaView className="flex-1" edges={["top"]}>

                    {/* Header over the tank */}
                    <View className="flex-row items-center justify-between px-4 py-3">
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

                    {/* Empty State Message */}
                    <View className="flex-1 items-center justify-center px-10">
                        <View className="bg-black/30 p-6 rounded-3xl border border-white/10 items-center">
                            <Text className="text-white font-bold text-xl mb-2 text-center">Your Tank is Empty</Text>
                            <Text className="text-white/70 text-center leading-5">
                                This is where your squad's rewards will appear. Start saving together to unlock rare pets and decorations!
                            </Text>
                        </View>
                    </View>

                    {/* Bottom Action Area */}
                    <View className="p-6 mb-4">
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