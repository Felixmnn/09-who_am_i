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
    { label: "View stats", route: "/(quiz)/data", icon: "circle" },
    { label: "Add names", route: "/(quiz)/custom", icon: "user-plus" },
    { label: "Add users", route: "/(quiz)/users", icon: "users" },
  ];
  return (
    <View className="w-full rounded-xl border border-slate-800 bg-slate-900/80 p-4">
      <Text className="text-lg font-semibold text-slate-100">
        Quick Options
      </Text>
      <View className="flex-row mt-2">
        {quickOptions.map((option) => (
          <TouchableOpacity
            key={option.label}
            className="items-center justify-center mx-2 rounded-lg bg-slate-800 px-3 py-2 h-[80px] flex-1"
            onPress={() => router.push(option.route)}
          >
            <FontAwesome name={option.icon} size={16} color="white" />
            <Text className=" mt-1 text-sm font-medium text-slate-400">
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default QuickOptions;
