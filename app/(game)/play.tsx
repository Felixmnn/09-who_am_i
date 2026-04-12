import Console from "@/components/(play)/console";
import DisplayName from "@/components/(play)/displayName";
import Score from "@/components/(play)/score";
import { useGlobalContext } from "@/context/GlobalProvider";
import React from "react";
import { View } from "react-native";

const Play = () => {
  const { currentGame } = useGlobalContext();

  return (
    <View className="flex-1 bg-gray-900 items-center justify-center">
      <Score />
      <DisplayName />
      <Console />
    </View>
  );
};

export default Play;
