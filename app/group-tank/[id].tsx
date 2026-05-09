// app/group-tank/[id].tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ChevronLeft, Target } from "lucide-react-native";
import { DigitalTank } from "@/components/fin-manage/DigitalTank";
import { colors } from "@/lib/constants";

export default function GroupTankScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
            <View className="flex-row items-center justify-between px-4 py-3 border-b border-white/5">
                <TouchableOpacity onPress={() => router.back()} className="p-1">
                    <ChevronLeft size={24} color={colors.text.primary} />
                </TouchableOpacity>
                <Text className="text-foreground font-bold text-lg">Squad Fish Tank</Text>
                <View className="w-6" />
            </View>

            <View className="flex-1 justify-center px-4">
                <View className="relative">
                    {/* We render a customized DigitalTank. 
              Note: To make it truly empty, you could modify DigitalTank.tsx 
              to accept a 'hideFish' prop. */}
                    <DigitalTank height={400} />

                    <View className="absolute inset-0 items-center justify-center bg-black/20 rounded-[20px]">
                        <Text className="text-white font-bold text-lg">Tank is currently empty</Text>
                        <Text className="text-white/60 text-xs mt-1 text-center px-10">
                            Achieve your squad goals to see your pets appear here!
                        </Text>
                    </View>
                </View>

                {/* Mission Button */}
                <TouchableOpacity
                    className="mt-10 bg-accent-teal rounded-2xl p-4 flex-row items-center justify-center"
                    onPress={() => alert("Missions: 1. Save RM100 total (0/100)\n2. Maintain 3-day group streak")}
                >
                    <Target size={20} color="#1a0a2e" strokeWidth={2.5} />
                    <Text className="text-[#1a0a2e] font-bold text-lg ml-2">View Missions</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}