import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { Audio } from "expo-av";

const RightWrong = () => {
  async function playSound({ right }: { right: boolean }) {
    try {
      if (right) {
        console.log("playing sound...");
        const { sound } = await Audio.Sound.createAsync(
          require("../../assets/sounds/correct.mp3"),
        );
        await sound.playAsync();
      } else {
        console.log("playing sound...");
        const { sound } = await Audio.Sound.createAsync(
          require("../../assets/sounds/wrong.mp3"),
        );
        await sound.playAsync();
      }
    } catch (e) {
      console.log("Error:", e);
    }
  }

  return (
    <View className="flex-1  w-full rounded-2xl border border-slate-800 bg-slate-900/70 p-3">
      <Text className="mb-3 text-center text-xs uppercase tracking-[2px] text-slate-500">
        Round Decision
      </Text>

      <View className="flex-row gap-2 flex-1">
        <TouchableOpacity
          onPress={() => playSound({ right: true })}
          className="flex-1 items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-500/10 px-4 py-2.5"
        >
          <Text className="text-center text-sm font-semibold text-emerald-200">
            Correct
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => playSound({ right: false })}
          className="flex-1 items-center justify-center rounded-xl border border-rose-400/25 bg-rose-500/10 px-4 py-2.5"
        >
          <Text className="text-center text-sm font-semibold text-rose-200">
            Wrong
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RightWrong;
