// app/group-chat/[id].tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft, Fish, Send } from "lucide-react-native";
import { colors } from "@/lib/constants";
import { groupMembers } from "@/lib/mock-data";

export default function GroupChatScreen() {
  const router = useRouter();
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
  const [message, setMessage] = useState("");

  const messages = [
    { id: "1", sender: "Aisyah", text: "Saved RM10 today! 🚀", time: "10:30 AM", isMe: false },
    { id: "2", sender: "Me", text: "Let's hit the target tonight!", time: "12:00 PM", isMe: true },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-white/5">
        <TouchableOpacity onPress={() => router.back()}><ChevronLeft size={24} color={colors.text.primary} /></TouchableOpacity>
        <TouchableOpacity onPress={() => router.push(`/group-details/${id}`)} className="flex-1 items-center">
          <Text className="text-foreground font-bold text-lg">{name}</Text>
          <Text className="text-foreground-muted text-[10px]">{groupMembers.length} Members</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push(`/group-tank/${id}`)} className="w-10 h-10 rounded-full bg-accent/10 items-center justify-center border border-accent/20">
          <Fish size={22} color={colors.accent.teal} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className={`mb-4 max-w-[80%] p-3 rounded-2xl ${item.isMe ? 'self-end bg-accent-teal' : 'self-start bg-background-card'}`}>
            <Text className={`text-sm ${item.isMe ? 'text-[#1a0a2e]' : 'text-white'}`}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={{ padding: 16 }}
      />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View className="p-4 bg-background-secondary flex-row items-center gap-3">
          <TextInput className="flex-1 bg-background-card text-white p-3 rounded-xl" placeholder="Message..." placeholderTextColor="#8b7a9e" value={message} onChangeText={setMessage} />
          <TouchableOpacity className="w-12 h-12 rounded-full bg-accent-teal items-center justify-center"><Send size={20} color="#1a0a2e" /></TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}