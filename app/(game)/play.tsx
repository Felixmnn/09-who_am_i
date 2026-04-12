import { useGlobalContext } from "@/context/GlobalProvider";
import React from "react";
import { Text, View } from "react-native";

const Play = () => {
  const { currentGame } = useGlobalContext();
  return (
    <View className="flex-1 bg-gray-900 items-center justify-center">
      <Text>P</Text>
    </View>
  );
};

export default Play;
