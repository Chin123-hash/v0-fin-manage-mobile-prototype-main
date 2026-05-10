// app/group-details/[id].tsx
import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft, Edit2, Users, Phone } from "lucide-react-native";
import { colors } from "@/lib/constants";
import { appState } from "@/lib/mock-data";

export default function GroupDetailsScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();

    // Find the specific group from global state
    const group = appState.groups.find(g => g.id === id);

    if (!group) {
        return (
            <View className="flex-1 bg-background items-center justify-center">
                <Text className="text-white">Group not found</Text>
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
            <View className="flex-row items-center px-4 py-3 border-b border-white/5">
                <TouchableOpacity onPress={() => router.back()} className="p-1">
                    <ChevronLeft size={24} color={colors.text.primary} />
                </TouchableOpacity>
                <Text className="text-foreground font-bold text-lg ml-2">Squad Details</Text>
            </View>

            <ScrollView className="flex-1 p-4">
                {/* Group Name Section */}
                <View className="bg-background-card rounded-2xl p-4 mb-6">
                    <View className="flex-row justify-between items-center mb-2">
                        <Text className="text-foreground-muted text-xs uppercase font-bold">Group Name</Text>
                        <TouchableOpacity><Edit2 size={16} color={colors.accent.teal} /></TouchableOpacity>
                    </View>
                    <Text className="text-foreground text-xl font-bold">{group.name}</Text>
                </View>

                {/* Member Count Summary */}
                <View className="flex-row items-center mb-4">
                    <Users size={20} color={colors.accent.pink} />
                    <Text className="text-foreground font-bold text-lg ml-2">
                        Members ({group.members.length + 1})
                    </Text>
                </View>

                {/* Members List */}
                <View className="bg-background-card rounded-2xl overflow-hidden mb-6">
                    {/* Always include "Me" as the creator */}
                    <View className="flex-row items-center p-4 border-b border-white/5">
                        <View className="w-10 h-10 rounded-full bg-accent/20 items-center justify-center mr-3">
                            <Text className="text-accent font-bold">ME</Text>
                        </View>
                        <View>
                            <Text className="text-foreground font-semibold">You (Leader)</Text>
                            <Text className="text-foreground-muted text-xs">012-***-5678</Text>
                        </View>
                    </View>

                    {/* List the fetched invited members */}
                    {group.members.map((member) => (
                        <View key={member.id} className="flex-row items-center p-4 border-b border-white/5">
                            <View className="w-10 h-10 rounded-full bg-background-secondary items-center justify-center mr-3">
                                <Text className="text-foreground font-bold">{member.name[0]}</Text>
                            </View>
                            <View className="flex-1">
                                <Text className="text-foreground font-semibold">{member.name}</Text>
                                <View className="flex-row items-center">
                                    <Phone size={10} color={colors.text.muted} />
                                    {/* FIX: Display actual phone instead of initials */}
                                    <Text className="text-foreground-muted text-xs ml-1">{member.phone}</Text>
                                </View>
                            </View>
                            <View className="bg-accent/10 px-2 py-0.5 rounded-md">
                                <Text className="text-accent text-[10px] font-bold">SAVER</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}