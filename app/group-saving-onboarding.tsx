// app/group-saving-onboarding.tsx
import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { X, ChevronRight, Users, Sparkles, TrendingUp, Check, Plus } from "lucide-react-native";
import { colors } from "@/lib/constants";
import { fakeContacts, appState } from "@/lib/mock-data";

export default function GroupSavingOnboardingScreen() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

    const handleNext = () => {
        if (step < 2) setStep(step + 1);
        else handleComplete();
    };

    const toggleContact = (id: string) => {
        if (selectedContacts.includes(id)) {
            setSelectedContacts(selectedContacts.filter(c => c !== id));
        } else {
            setSelectedContacts([...selectedContacts, id]);
        }
    };

    const handleComplete = () => {
        appState.isGroupSavingActive = true;
        appState.groupPocketBalance = 0; // Initialize empty as requested
        router.replace("/(tabs)/fin-manage");
    };

    const renderStep = () => {
        switch (step) {
            case 0:
                return (
                    <View className="items-center px-6">
                        <View className="w-24 h-24 rounded-full bg-accent-pink/20 items-center justify-center mb-6">
                            <Users size={48} color={colors.accent.pink} />
                        </View>
                        <Text className="text-foreground text-2xl font-bold text-center mb-4">Save Faster, Together</Text>
                        <Text className="text-foreground-muted text-center text-base leading-6">
                            Group Saving Challenge lets you and your friends pool money into a shared GXBank Save Pocket.
                            Stay motivated with a collective streak!
                        </Text>
                    </View>
                );
            case 1:
                return (
                    <View className="px-6">
                        <Text className="text-foreground text-2xl font-bold text-center mb-6">Exclusive Rewards</Text>

                        <View className="bg-background-card p-5 rounded-2xl mb-4 border border-accent/20">
                            <View className="flex-row items-center mb-2">
                                <TrendingUp size={24} color={colors.accent.teal} />
                                <Text className="text-accent font-bold text-lg ml-3">+0.5% p.a. Bonus</Text>
                            </View>
                            <Text className="text-foreground-muted text-sm">Boost your group's collective interest rate just by saving together consistently.</Text>
                        </View>

                        <View className="bg-background-card p-5 rounded-2xl border border-accent-pink/20">
                            <View className="flex-row items-center mb-2">
                                <Sparkles size={24} color={colors.accent.pink} />
                                <Text className="text-accent-pink font-bold text-lg ml-3">Gold Fin Decoration</Text>
                            </View>
                            <Text className="text-foreground-muted text-sm">Reach the RM10,000 group goal to unlock the legendary Neon Gold Fin for Kira the Koi.</Text>
                        </View>
                    </View>
                );
            case 2:
                return (
                    <View className="flex-1 px-4">
                        <Text className="text-foreground text-xl font-bold mb-4">Invite Your Squad</Text>
                        <FlatList
                            data={fakeContacts}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => toggleContact(item.id)}
                                    className="flex-row items-center justify-between py-4 border-b border-background-card"
                                >
                                    <View className="flex-row items-center">
                                        <View className="w-12 h-12 rounded-full bg-background-secondary items-center justify-center mr-4">
                                            <Text className="text-foreground font-bold text-lg">{item.name[0]}</Text>
                                        </View>
                                        <View>
                                            <Text className="text-foreground font-semibold">{item.name}</Text>
                                            <Text className="text-foreground-muted text-xs">{item.phone}</Text>
                                        </View>
                                    </View>
                                    <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${selectedContacts.includes(item.id) ? 'bg-accent border-accent' : 'border-foreground-muted'}`}>
                                        {selectedContacts.includes(item.id) && <Check size={14} color="#1a0a2e" strokeWidth={4} />}
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                );
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-background">
            <View className="flex-row items-center justify-between px-4 py-4">
                <TouchableOpacity onPress={() => router.back()}>
                    <X size={24} color={colors.text.primary} />
                </TouchableOpacity>
                <View className="flex-row gap-2">
                    {[0, 1, 2].map((i) => (
                        <View key={i} className={`w-8 h-1.5 rounded-full ${step >= i ? 'bg-accent' : 'bg-background-card'}`} />
                    ))}
                </View>
                <View className="w-6" />
            </View>

            <View className="flex-1 mt-8">
                {renderStep()}
            </View>

            <View className="p-6">
                <TouchableOpacity onPress={handleNext} activeOpacity={0.9}>
                    <LinearGradient
                        colors={[colors.accent.pink, colors.accent.pinkDark]}
                        style={{ borderRadius: 16, padding: 18, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Text className="text-white font-bold text-lg mr-2">
                            {step === 2 ? `Invite ${selectedContacts.length} Friends` : 'Continue'}
                        </Text>
                        {step < 2 && <ChevronRight size={20} color="#ffffff" />}
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}