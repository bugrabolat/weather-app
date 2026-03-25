import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';


import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { FavoriteProvider } from "@/context/favoriteContext";
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <FavoriteProvider>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarInactiveTintColor: "rgba(255, 255, 255, 0.5)",
        tabBarShowLabel: false,
        tabBarItemStyle: {
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
          borderRadius: 50,
          margin: 6,
        },
        tabBarIconStyle: {
          marginTop: 0,
        },
        tabBarStyle: {
          width: "90%",
          height: 70,
          alignSelf: "center",
          margin: 20,
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.4)",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.25,
          shadowRadius: 20,
          elevation: 10,
          borderStyle: "solid",
          borderRadius: 20,
          position: 'absolute',
          left: 0,
          right: 0,
          alignItems: "center",
          paddingBottom: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={32} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <Ionicons name="search" size={32} color={color} />
          ,

        }}
      />
      <Tabs.Screen
        name="week"
        options={{ href: null }}
      />
    </Tabs>
    </FavoriteProvider>
  );
}
