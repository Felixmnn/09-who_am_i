import { Colors } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

/**
 * Shows the current name, kategory
 * Aditionally allows blacklisting
 */
const DisplayName = ({
  name,
  kategory,
  onAddToBlacklist,
}: {
  name: string;
  kategory: string;
  onAddToBlacklist?: () => void;
}) => {
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
      <View className="flex-row items-center rounded-3xl bg-cyan-500/8 px-5">
        <Text className="flex-1 text-center text-4xl font-black text-slate-50">
          {name}
        </Text>
        {onAddToBlacklist && (
          <TouchableOpacity
            onPress={onAddToBlacklist}
            className="ml-2 rounded-full border border-slate-700 bg-slate-800/80 p-2"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <FontAwesome name="ban" size={18} color="#f87171" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default DisplayName;
