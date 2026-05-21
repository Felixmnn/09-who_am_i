import { Colors } from "@/constants/theme";
import { gameResultPlayer } from "@/constants/types";
import { useGlobalContext } from "@/context/GlobalProvider";
import { getUserFromId } from "@/scripts/game";
import React from "react";
import { ScrollView, Text, View } from "react-native";

/**
 * Displays the current game status
 * Allows the participants to finish the game
 */
const Score = ({ progress }: { progress: gameResultPlayer[] }) => {
  const { users } = useGlobalContext();

  return (
    <View
      style={{
        borderRadius: 12,
        borderWidth: 2,
        borderColor: Colors.dark.componentBorder,
        backgroundColor: Colors.dark.componentBackground,
        padding: 16,
      }}
    >
      <View className="h-[40px]">
        <ScrollView className="gap-3 flex-row" horizontal>
          {progress.map((p, index) => (
            <View
              key={index}
              style={{
                marginRight: 8,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: 12,
                borderWidth: 2,
                borderColor: Colors.dark.componentBorder,
                backgroundColor: Colors.dark.componentBackground,
                padding: 16,
              }}
            >
              <View className="flex-row items-center">
                <View className="mr-3 h-9 w-9 items-center justify-center rounded-full bg-slate-800">
                  <Text className="text-sm font-bold text-slate-300">
                    {index + 1}
                  </Text>
                </View>
                <Text className="text-base font-semibold text-slate-100 mr-2">
                  {getUserFromId(p.participantId, users)?.name}
                  {/* Grund: Die Namensauflösung erfolgt jetzt immer über die aktuelle globale User-Liste, damit auch nach User-Änderungen die Anzeige korrekt bleibt. */}
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
