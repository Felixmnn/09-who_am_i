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
    <View className="flex-row">
      <TouchableOpacity
        onPress={() => playSound({ right: true })}
        className="bg-green-500 px-4 py-2 mr-1 rounded"
      >
        <Text className="text-white">Play Right Sound</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => playSound({ right: false })}
        className="bg-red-500 px-4 py-2 ml-1 rounded"
      >
        <Text className="text-white">Play Wrong Sound</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RightWrong;
