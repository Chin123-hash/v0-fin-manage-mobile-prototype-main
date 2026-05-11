// app/group-saving-onboarding.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { X, ChevronRight, Users, Sparkles, TrendingUp, Check, Edit3, ShieldCheck } from "lucide-react-native";
import { colors } from "@/lib/constants";
import { fakeContacts, appState, GroupInstance } from "@/lib/mock-data";

export default function GroupSavingOnboardingScreen() {
    const router = useRouter();

    // Check if user already has 1 group to skip intro
    const isSecondGroup = appState.groups.length > 0;
    const [step, setStep] = useState(isSecondGroup ? 2 : 0);

    const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
    const [groupName, setGroupName] = useState(""); // State for custom name

    const handleNext = () => {
        // Step logic: 0 (Intro) -> 1 (Rewards) -> 2 (Contacts) -> 3 (Naming) -> Complete
        if (step < 3) setStep(step + 1);
        else handleComplete();
    };

    const toggleContact = (id: string) => {
        setSelectedContacts(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        );
    };

    const handleComplete = () => {
        const finalName = groupName.trim() || (appState.groups.length === 0 ? "Japan Trip Squad" : "Gaming Fund");

        const invitedMembers = fakeContacts.filter(c => selectedContacts.includes(c.id));
        
        // Import reference data to match streaks and colors
        const { groupMembers, personaConfigs } = require('@/lib/mock-data');

        const newGroup: GroupInstance = {
            id: `group-${appState.groups.length + 1}`,
            name: finalName,
            balance: 1500.0, // 🔥 Set default starting amount
            members: invitedMembers.map((c) => {
                // Find matching member in mock-data to preserve their assigned streak
                const mockFriend = groupMembers.find((m: any) => 
                    m.name.toLowerCase().includes(c.name.toLowerCase())
                );
                
                return {
                    id: c.id,
                    name: c.name,
                    initials: c.name[0],
                    color: mockFriend?.color || colors.accent.pink,
                    streak: mockFriend?.streak || 1, // 🔥 Preserve the streak from mock-data
                    phone: c.phone
                };
            }),
        };

        // Add yourself to the group correctly
        const userPersona = appState.userPersona || 'balancer';
        newGroup.members.unshift({
            id: 'me',
            name: 'You',
            initials: 'Y', 
            color: personaConfigs[userPersona].fishColor === 'gold' ? '#FFD700' : colors.accent.teal,
            streak: 15, // Your high streak
        });

        // 🔥 Replace groups (don't .push) to avoid Raj or "Double Me" ghosts from old data
        appState.groups = [newGroup]; 
        appState.isGroupSavingActive = true;
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
                            Pool money with your friends effortlessly while securing your funds in a shared digital vault.
                        </Text>

                        {/* 🔥 GXBank Promo Banner */}
                        <View className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-4 mt-8 w-full flex-row items-center">
                            <View className="w-12 h-12 bg-purple-500/20 rounded-full items-center justify-center mr-4">
                                <ShieldCheck size={24} color="#a855f7" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-purple-400 font-bold text-base mb-1">GXBank Savings Pocket</Text>
                                <Text className="text-foreground-muted text-xs leading-4">
                                    Your squad's funds are secured and actively earning <Text className="text-foreground font-semibold">2.00% + 0.50% (Group Rewards) p.a. daily interest</Text>.
                                </Text>
                            </View>
                        </View>
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
                            <Text className="text-foreground-muted text-sm">Boost your group's collective interest rate on top of the base 2.00% p.a. from GXBank!</Text>
                        </View>
                        <View className="bg-background-card p-5 rounded-2xl border border-accent-pink/20">
                            <View className="flex-row items-center mb-2">
                                <Sparkles size={24} color={colors.accent.pink} />
                                <Text className="text-accent-pink font-bold text-lg ml-3">Gold Fin Decoration</Text>
                            </View>
                            <Text className="text-foreground-muted text-sm">Unlock the legendary Neon Gold Fin for your pet Koi.</Text>
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
                                            <Text className="text-foreground font-bold">{item.name[0]}</Text>
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
            case 3:
                return (
                    <View className="px-6">
                        <View className="w-20 h-20 rounded-full bg-accent/10 items-center justify-center mb-6 self-center">
                            <Edit3 size={32} color={colors.accent.teal} />
                        </View>
                        <Text className="text-foreground text-2xl font-bold text-center mb-2">Name Your Squad</Text>
                        <Text className="text-foreground-muted text-center mb-8">What should we call this saving challenge?</Text>

                        <View className="bg-background-card rounded-2xl p-4 border border-white/5">
                            <TextInput
                                value={groupName}
                                onChangeText={setGroupName}
                                placeholder={isSecondGroup ? "Gaming Gear Squad" : "Japan Trip Squad"}
                                placeholderTextColor="#8b7a9e"
                                className="text-foreground text-lg font-semibold py-2"
                                autoFocus
                            />
                        </View>
                        <Text className="text-foreground-muted text-xs mt-3 text-center">
                            You're inviting {selectedContacts.length} friends to join this squad.
                        </Text>
                    </View>
                );
            default: return null;
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 bg-background"
        >
            <SafeAreaView className="flex-1">
                <View className="flex-row items-center justify-between px-4 py-4">
                    <TouchableOpacity onPress={() => router.back()}>
                        <X size={24} color={colors.text.primary} />
                    </TouchableOpacity>
                    <View className="flex-row gap-2">
                        {[0, 1, 2, 3].map((i) => (
                            <View key={i} className={`w-6 h-1.5 rounded-full ${step >= i ? 'bg-accent' : 'bg-background-card'}`} />
                        ))}
                    </View>
                    <View className="w-6" />
                </View>

                <View className="flex-1 mt-8">{renderStep()}</View>

                <View className="p-6">
                    <TouchableOpacity
                        onPress={handleNext}
                        activeOpacity={0.9}
                        disabled={step === 2 && selectedContacts.length === 0}
                        style={{ opacity: (step === 2 && selectedContacts.length === 0) ? 0.5 : 1 }}
                    >
                        <LinearGradient
                            colors={[colors.accent.pink, colors.accent.pinkDark]}
                            style={{ borderRadius: 16, padding: 18, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <Text className="text-white font-bold text-lg mr-2">
                                {step === 2 ? 'Next: Name Squad' : step === 3 ? 'Create Squad' : 'Continue'}
                            </Text>
                            {step < 3 && <ChevronRight size={20} color="#ffffff" />}
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}