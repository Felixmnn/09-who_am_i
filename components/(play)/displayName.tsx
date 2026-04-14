import React from "react";
import { Text, View } from "react-native";

/**
 * Shows the current name, kategory
 * Aditionally allows blacklisting
 */
const DisplayName = ({
  name,
  kategory,
}: {
  name: string;
  kategory: string;
}) => {
  return (
    <View className="w-full rounded-xl border border-slate-800 bg-slate-900/85 px-6 py-6">
      <View className="flex-row justify-between">
        <Text className="text-xs uppercase tracking-[2px] text-slate-400">
          Current Name
        </Text>
        <Text className="text-base font-semibold capitalize text-cyan-300">
          {kategory}
        </Text>
      </View>
      <View className="mt-5 rounded-3xl border border-cyan-500/20 bg-cyan-500/8 px-5 py-8">
        <Text className="text-center text-4xl font-black text-slate-50">
          {name}
        </Text>
      </View>
      <Text className="mt-4 text-center text-sm text-slate-500">
        Fokus auf den Begriff, bevor die Bewertung erfolgt.
      </Text>
    </View>
  );
};

export default DisplayName;
