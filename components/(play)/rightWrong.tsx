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
    <View className="mt-3 flex-1 w-full flex-row gap-2">
      <TouchableOpacity
        onPress={() => playSound({ right: true })}
        className="flex-1 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-500/15 px-4 py-3"
      >
        <Text className="text-center font-semibold text-emerald-200">
          Correct
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => playSound({ right: false })}
        className="flex-1 items-center justify-center rounded-xl border border-rose-400/30 bg-rose-500/15 px-4 py-3"
      >
        <Text className="text-center font-semibold text-rose-200">Wrong</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RightWrong;
