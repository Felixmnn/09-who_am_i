import { gameResultPlayer } from "@/constants/types";
import { getUserFromId } from "@/scripts/game";
import React from "react";
import { ScrollView, Text, View } from "react-native";

/**
 * Displays the current game status
 * Allows the participants to finish the game
 */
const Score = ({ progress }: { progress: gameResultPlayer[] }) => {
  return (
    <View className=" rounded-2xl border border-slate-800 bg-slate-900/85 px-5 py-5">
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
                <Text className="text-base font-semibold text-slate-100 mr-2">
                  {getUserFromId(p.participantId)?.name}
                </Text>
              </View>
              <Text className="text-base font-bold text-emerald-300">
                {p.pointsEarned} pts
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Score;
