import React from "react";
import { Text, View } from "react-native";

/**
 * Displays the current game status
 * Allows the participants to finish the game
 */
const Score = ({
  progress,
}: {
  progress: { username: string; score: number }[];
}) => {
  return (
    <View className="flex-row">
      {progress.map((p, index) => (
        <View key={index} className="mr-4 ml-2 flex-row items-center">
          <Text className="text-white">{p.username}</Text>
          <Text className="text-gray-400">{p.score} points</Text>
        </View>
      ))}
    </View>
  );
};

export default Score;
