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
      <View className="rounded-3xl  bg-cyan-500/8 px-5 ">
        <Text className="text-center text-4xl font-black text-slate-50">
          {name}
        </Text>
      </View>
    </View>
  );
};

export default DisplayName;
