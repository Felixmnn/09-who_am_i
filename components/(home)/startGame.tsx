import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const StartGame = () => {
  return (
    <TouchableOpacity
      onPress={() => router.push("/(game)/play")}
      className="p-4 bg-gray-500 m-2 rounded"
    >
      <Text className="text-gray-400 mt-4 text-center">Start a Game</Text>
    </TouchableOpacity>
  );
};

export default StartGame;
