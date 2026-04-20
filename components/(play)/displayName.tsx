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
    <View className="w-full rounded-xl border border-slate-800 bg-slate-900/85 px-6 py-6">
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
