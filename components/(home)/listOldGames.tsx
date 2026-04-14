import { gameResult } from "@/constants/types";
import { getUserFromId } from "@/scripts/game";
import React from "react";
import { Text, View } from "react-native";

type GameItemProps = {
  result: gameResult;
  index: number;
};

const GameItem = ({ result, index }: GameItemProps) => {
  return (
    <View key={index}>
      <Text className="mt-1 text-xs text-slate-400">
        Game from: {new Date(result.dateTime).toLocaleString()}
      </Text>
      <Text className="mt-1 text-sm text-slate-300">
        Winner -{" "}
        {getUserFromId(result.gameResults[0]?.participantId)?.name ?? "Unknown"}{" "}
        with {result.gameResults[0]?.pointsEarned ?? 0} points
      </Text>
    </View>
  );
};

type ListOldGamesProps = {
  games: gameResult[];
};

const ListOldGames = ({ games }: ListOldGamesProps) => {
  return (
    <View className="w-full rounded-xl border border-slate-800 bg-slate-900/80 p-4">
      <Text className="text-lg font-semibold text-slate-100">Last Games</Text>
      {games.length === 0 ? (
        <Text className="text-slate-400 mt-2">No games played yet.</Text>
      ) : (
        games.map((result: gameResult, index: number) => (
          <GameItem key={index} result={result} index={index} />
        ))
      )}
    </View>
  );
};

export default ListOldGames;
