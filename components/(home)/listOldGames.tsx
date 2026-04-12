import { gameResult } from "@/constants/types";
import { useGlobalContext } from "@/context/GlobalProvider";
import React from "react";
import { Text, View } from "react-native";

const ListOldGames = () => {
  const { lastGameResults } = useGlobalContext();
  return (
    <View className="w-full rounded-xl border border-slate-800 bg-slate-900/80 p-4">
      <Text className="text-lg font-semibold text-slate-100">Last Games</Text>
      {lastGameResults.length === 0 ? (
        <Text className="text-slate-400 mt-2">No games played yet.</Text>
      ) : (
        lastGameResults.map((result: gameResult, index: number) => (
          <View key={index}>
            <Text className="mt-1 text-xs text-slate-400">
              Game from: {new Date(result.dateTime).toLocaleString()}
            </Text>
            <Text className="mt-1 text-sm text-slate-300">
              Winner - {result.gameResults[0].participantId} with{" "}
              {result.gameResults[0].pointsEarned} points
            </Text>
          </View>
        ))
      )}
    </View>
  );
};

export default ListOldGames;
