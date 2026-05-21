import { Colors } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useEffect } from "react";
import { Platform } from "react-native";

export default function _layout() {
  useEffect(() => {
    if (Platform.OS === "web") return; // Landscape lock ist auf Web nicht relevant
    // Landscape lock aktivieren
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);

    return () => {
      //
      ScreenOrientation.unlockAsync();
    };
  }, []);

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: Colors.dark.text,
          tabBarInactiveTintColor: Colors.dark.icon,
          tabBarStyle: {
            backgroundColor: Colors.dark.background,
            borderTopColor: Colors.dark.border,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Start",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="home" size={size} color={color} />
            ),
          }}
        />
        {/*
        <Tabs.Screen
          name="data"
          options={{
            title: "Data",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="bar-chart" size={size} color={color} />
            ),
          }}
        />
        */}
        <Tabs.Screen
          name="users"
          options={{
            title: "Spieler",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="users" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Einstellungen",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="cogs" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
