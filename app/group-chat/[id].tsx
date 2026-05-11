// app/group-chat/[id].tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft, Fish, Send } from "lucide-react-native";
import { colors } from "@/lib/constants";
import { appState } from "@/lib/mock-data";

export default function GroupChatScreen() {
  const router = useRouter();
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
  const [message, setMessage] = useState("");
  const group = appState.groups.find(g => g.id === id);
  
  // 🔥 FIX: Use length directly since 'You' is already in the array
  const memberCount = group ? group.members.length : 1;

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
          <Text className="text-foreground-muted text-[10px] uppercase tracking-widest">{memberCount} Members • Active</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push(`/group-tank/${id}`)} className="w-10 h-10 rounded-full bg-accent/10 items-center justify-center">
          <Fish size={20} color={colors.accent.teal} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View className={`mb-4 max-w-[80%] ${item.isMe ? "self-end items-end" : "self-start items-start"}`}>
            {!item.isMe && <Text className="text-foreground-muted text-[10px] mb-1 ml-1">{item.sender}</Text>}
            <View className={`px-4 py-3 rounded-2xl ${item.isMe ? "bg-accent rounded-tr-none" : "bg-background-card rounded-tl-none border border-border"}`}>
              <Text className={`${item.isMe ? "text-white" : "text-foreground"} text-sm`}>{item.text}</Text>
            </View>
            <Text className="text-foreground-muted text-[10px] mt-1 opacity-50">{item.time}</Text>
          </View>
        )}
      />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={100}>
        <View className="flex-row items-center p-4 bg-background-card border-t border-border">
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            placeholderTextColor={colors.text.muted}
            className="flex-1 bg-background px-4 py-3 rounded-full text-foreground mr-3 border border-border"
          />
          <TouchableOpacity disabled={!message.trim()} className={`w-11 h-11 rounded-full items-center justify-center ${message.trim() ? "bg-accent" : "bg-accent/30"}`}>
            <Send size={18} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}