import React from "react";
import { ScrollView, Text, View } from "react-native";

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
    <View className=" rounded-[28px] border border-slate-800 bg-slate-900/85 px-5 py-5">
      <View className="mb-4 flex-row items-end justify-between">
        <View>
          <Text className="text-xs uppercase tracking-[2px] text-slate-400">
            Round Progress
          </Text>
          <Text className="mt-1 text-xl font-bold text-slate-50">
            Current Standings
          </Text>
        </View>
        <Text className="text-sm text-slate-500">
          {progress.length} players
        </Text>
      </View>
      <View className="h-[40px]">
        <ScrollView className="gap-3 flex-row" horizontal>
          {progress.map((p, index) => (
            <View
              key={index}
              className=" mr-2 flex-row items-center justify-between rounded-2xl border border-slate-700 bg-slate-950 px-4 "
            >
              <View className="flex-row items-center">
                <View className="mr-3 h-9 w-9 items-center justify-center rounded-full bg-slate-800">
                  <Text className="text-sm font-bold text-slate-300">
                    {index + 1}
                  </Text>
                </View>
                <Text className="text-base font-semibold text-slate-100">
                  {p.username}
                </Text>
              </View>
              <Text className="text-base font-bold text-emerald-300">
                {p.score} pts
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Score;
