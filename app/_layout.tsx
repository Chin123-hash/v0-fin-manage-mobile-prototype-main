import "../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DraggablePet } from "../components/fin-manage/DraggablePet"; // Ensure you have created this file

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" />
      
      {/* The Stack manages your app navigation. 
          The DraggablePet is placed outside of it so it stays 
          on top of all screens and doesn't reset when you navigate.
      */}
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#1a0a2e" },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="saving-plan"
          options={{
            presentation: "modal",
            animation: "slide_from_bottom",
          }}
        />
      </Stack>

      {/* Persistent interactive companion */}
      <DraggablePet />
      
    </GestureHandlerRootView>
  );
}