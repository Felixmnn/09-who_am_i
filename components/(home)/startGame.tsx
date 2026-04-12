import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const StartGame = () => {
  const { currentGame } = useGlobalContext();
  return (
    <View>
      {currentGame !== null ? (
        <TouchableOpacity
          onPress={() => router.push("/(game)/play")}
          className="p-4 bg-gray-500 m-2 rounded"
        >
          <Text className="text-gray-400 mt-4 text-center">Go to Game</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => router.push("/(game)/play")}
          className="p-4 bg-gray-500 m-2 rounded"
        >
          <Text className="text-gray-400 mt-4 text-center">Start a Game</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default StartGame;
