import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Settings2, Trash2, Zap } from "lucide-react-native";
import { appState } from "@/lib/mock-data";
import { useRouter } from "expo-router";
import { colors } from "@/lib/constants";

export function ManageSavingPlan({ onUpdate }: { onUpdate: () => void }) {
    const router = useRouter();
    const { microSavingAmount, autoSaveAmount, autoSaveTrigger } = appState.activePlan;

    const handleTerminate = () => {
        Alert.alert(
            "Terminate Plan?",
            "You will stop earning bonus interest and your streak will reset.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Terminate",
                    style: "destructive",
                    onPress: () => {
                        appState.isPersonalPlanActive = false; // Deactivate personal plan
                        onUpdate();
                    }
                }
            ]
        );
    };

    return (
        <View className="bg-background-card rounded-2xl p-4 mx-4 mb-4">
            <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center">
                    <View className="w-10 h-10 rounded-full bg-accent/20 items-center justify-center mr-3">
                        <Settings2 size={20} color={colors.accent.teal} />
                    </View>
                    <Text className="text-foreground font-bold text-base">Active Saving Plan</Text>
                </View>
                <TouchableOpacity onPress={handleTerminate}>
                    <Trash2 size={20} color={colors.accent.pink} />
                </TouchableOpacity>
            </View>

            <View className="bg-background-secondary rounded-xl p-3 gap-3">
                <View className="flex-row justify-between items-center">
                    <View>
                        <Text className="text-foreground-muted text-xs">Daily Micro-Saving</Text>
                        <Text className="text-foreground font-semibold">RM {microSavingAmount}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => router.push("/saving-plan")}
                        className="bg-background-card px-3 py-1.5 rounded-lg"
                    >
                        <Text className="text-accent text-xs font-bold">Edit</Text>
                    </TouchableOpacity>
                </View>

                <View className="h-[0.5px] bg-foreground/10 w-full" />

                <View className="flex-row justify-between items-center">
                    <View>
                        <Text className="text-foreground-muted text-xs">Smart Auto-Save</Text>
                        <Text className="text-foreground font-semibold">
                            RM {autoSaveAmount} / RM {autoSaveTrigger}
                        </Text>
                    </View>
                    <View className="flex-row items-center bg-accent/10 px-2 py-1 rounded-md">
                        <Zap size={12} color={colors.accent.teal} />
                        <Text className="text-accent text-[10px] font-bold ml-1">AUTO</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}