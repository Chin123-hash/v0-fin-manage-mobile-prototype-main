import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Settings2, Trash2, Zap } from "lucide-react-native";
import { appState } from "@/lib/mock-data";
import { useRouter } from "expo-router";

export function ManageSavingPlan({ onUpdate }: { onUpdate: () => void }) {
    const router = useRouter();
    const { microSavingAmount, autoSaveAmount, autoSaveTrigger } = appState.activePlan;

    const handleTerminate = () => {
        Alert.alert(
            "Terminate Auto-Save?",
            "Your streak will be reset and you will stop earning bonus interest.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Terminate",
                    style: "destructive",
                    onPress: () => {
                        appState.isGroupSavingActive = false;
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
                    <View className="w-10 h-10 rounded-full bg-accent-teal/20 items-center justify-center mr-3">
                        <Settings2 size={20} color="#00f5d4" />
                    </View>
                    <Text className="text-foreground font-bold text-base">Manage Active Plan</Text>
                </View>
                <TouchableOpacity onPress={handleTerminate}>
                    <Trash2 size={20} color="#ff006e" />
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
                        <Text className="text-accent text-xs font-bold">Change</Text>
                    </TouchableOpacity>
                </View>

                <View className="h-[1px] bg-background-card w-full" />

                <View className="flex-row justify-between items-center">
                    <View>
                        <Text className="text-foreground-muted text-xs">Smart Auto-Save</Text>
                        <Text className="text-foreground font-semibold">
                            RM {autoSaveAmount} per RM {autoSaveTrigger}
                        </Text>
                    </View>
                    <View className="flex-row items-center bg-accent-teal/10 px-2 py-1 rounded-md">
                        <Zap size={12} color="#00f5d4" />
                        <Text className="text-accent text-[10px] font-bold ml-1">ACTIVE</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}