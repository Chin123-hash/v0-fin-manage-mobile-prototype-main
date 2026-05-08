import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import { Home, Gift, TrendingUp, User } from "lucide-react-native";
import { colors } from "@/lib/constants";

interface TabIconProps {
  focused: boolean;
  Icon: React.ElementType;
  label: string;
}

function TabIcon({ focused, Icon, label }: TabIconProps) {
  return (
    <View className="items-center justify-center pt-2">
      <Icon
        size={24}
        color={focused ? colors.accent.teal : colors.text.muted}
        strokeWidth={focused ? 2.5 : 2}
      />
      <Text
        className={`text-xs mt-1 ${
          focused ? "text-accent font-semibold" : "text-foreground-muted"
        }`}
      >
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background.secondary,
          borderTopColor: colors.background.card,
          borderTopWidth: 1,
          height: 80,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.accent.teal,
        tabBarInactiveTintColor: colors.text.muted,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} Icon={Home} label="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          title: "Rewards",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} Icon={Gift} label="Rewards" />
          ),
        }}
      />
      <Tabs.Screen
        name="fin-manage"
        options={{
          title: "Fin Manage",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} Icon={TrendingUp} label="Fin Manage" />
          ),
        }}
      />
      <Tabs.Screen
        name="me"
        options={{
          title: "Me",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} Icon={User} label="Me" />
          ),
        }}
      />
    </Tabs>
  );
}
