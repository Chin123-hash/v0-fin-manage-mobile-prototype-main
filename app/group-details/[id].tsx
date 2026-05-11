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
    const group = appState.groups.find(g => g.id === id);

    if (!group) return null;

    return (
        <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
            <View className="flex-row items-center px-4 py-3 border-b border-white/5">
                <TouchableOpacity onPress={() => router.back()} className="p-1">
                    <ChevronLeft size={24} color={colors.text.primary} />
                </TouchableOpacity>
                <Text className="text-foreground font-bold text-lg ml-2">Squad Details</Text>
            </View>

            <ScrollView className="flex-1 p-4">
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
                        {/* 🔥 FIX: Count directly from members array */}
                        Members ({group.members.length})
                    </Text>
                </View>

                {/* Members List */}
                <View className="bg-background-card rounded-2xl overflow-hidden mb-6">
                    {/* 🔥 FIX: Combined list that dynamically styles 'Me' */}
                    {group.members.map((member) => (
                        <View key={member.id} className="flex-row items-center p-4 border-b border-white/5">
                            <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${member.id === 'me' ? 'bg-accent/20' : 'bg-background-secondary'}`}>
                                <Text className={`font-bold ${member.id === 'me' ? 'text-accent' : 'text-foreground'}`}>{member.id === 'me' ? 'ME' : member.name[0]}</Text>
                            </View>
                            <View className="flex-1">
                                <Text className="text-foreground font-semibold">{member.name}{member.id === 'me' ? ' (Leader)' : ''}</Text>
                                <View className="flex-row items-center">
                                    <Phone size={10} color={colors.text.muted} />
                                    <Text className="text-foreground-muted text-xs ml-1">{member.phone || '01*-***-****'}</Text>
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