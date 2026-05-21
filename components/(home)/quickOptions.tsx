import { Colors } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type QuickOption = {
  label: string;
  route: Href;
  icon: React.ComponentProps<typeof FontAwesome>["name"];
};

const QuickOptions = () => {
  const quickOptions: QuickOption[] = [
    { label: "Spieler ansehen", route: "/(quiz)/users", icon: "trophy" },
    {
      label: "Einstellungen öffnen",
      route: "/(quiz)/settings",
      icon: "user-plus",
    },
  ];
  return (
    <View
      style={{
        width: "100%",
        borderRadius: 12,
        borderWidth: 2,
        borderColor: Colors.dark.componentBorder,
        backgroundColor: Colors.dark.componentBackground,
        padding: 16,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "600", color: "#fff" }}>
        Schnellzugriff
      </Text>
      <View style={{ flexDirection: "row", marginTop: 8 }}>
        {quickOptions.map((option) => (
          <TouchableOpacity
            key={option.label}
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginHorizontal: 8,
              borderRadius: 12,
              backgroundColor: Colors.dark.optionBgSelected,
              borderColor: Colors.dark.optionBorderSelected,
              borderWidth: 1,
              paddingHorizontal: 12,
              paddingVertical: 8,
              height: 80,
              flex: 1,
            }}
            onPress={() => router.push(option.route)}
          >
            <FontAwesome
              name={option.icon}
              size={16}
              color={Colors.dark.tint}
            />
            <Text
              style={{
                marginTop: 4,
                fontSize: 14,
                fontWeight: "500",
                color: "#fff",
                textAlign: "center",
              }}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default QuickOptions;
