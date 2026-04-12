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
    <View className="flex-row items-center">
      <Text className="mr-2 text-lg  text-slate-100">Name {name}</Text>
      <Text className="text-lg text-slate-300">Kategory {kategory}</Text>
    </View>
  );
};

export default DisplayName;
