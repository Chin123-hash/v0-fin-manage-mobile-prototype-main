import { Tabs, usePathname } from "expo-router";
import { View, Text } from "react-native";
import { Home, Gift, TrendingUp, User } from "lucide-react-native";
import { colors } from "@/lib/constants";
import { useState, useEffect } from "react";
import { appState } from "@/lib/mock-data";

interface TabIconProps {
  focused: boolean;
  Icon: React.ElementType;
  label: string;
  hasNotification?: boolean; // 🔥 Added this prop
}

function TabIcon({ focused, Icon, label, hasNotification }: TabIconProps) {
  return (
    <View className="items-center justify-center w-16 pt-1">
      <View className="relative">
        <Icon
          size={24}
          color={focused ? colors.accent.teal : colors.text.muted}
          strokeWidth={focused ? 2.5 : 2}
        />
        {/* 🔥 The Red Dot Notification Badge */}
        {hasNotification && (
          <View className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-[2px] border-background-secondary" />
        )}
      </View>
      <Text
        className={`text-[10px] mt-1 ${focused ? "text-accent font-semibold" : "text-foreground-muted"
          }`}
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  const pathname = usePathname(); // Listens for tab changes
  const [finManageNotif, setFinManageNotif] = useState(!appState.isPersonalPlanActive);
  const [rewardsNotif, setRewardsNotif] = useState(appState.hasUnclaimedReward);

  // 🔥 Re-check the state every time the user navigates between tabs
  useEffect(() => {
    setFinManageNotif(!appState.isPersonalPlanActive);
    setRewardsNotif(appState.hasUnclaimedReward);
  }, [pathname]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background.secondary,
          borderTopColor: colors.background.card,
          borderTopWidth: 1,
          minHeight: 65,
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
            <TabIcon
              focused={focused}
              Icon={Gift}
              label="Rewards"
              hasNotification={rewardsNotif} // 🔥 Add notification condition
            />
          ),
        }}
      />
      <Tabs.Screen
        name="fin-manage"
        options={{
          title: "Fin Manage",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              Icon={TrendingUp}
              label="Fin Manage"
              hasNotification={finManageNotif} // 🔥 Add notification condition
            />
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