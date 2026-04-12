import ListOldGames from "@/components/(home)/listOldGames";
import QuickOptions from "@/components/(home)/quickOptions";
import StartGame from "@/components/(home)/startGame";
import React from "react";
import { Text, View } from "react-native";

const Home = () => {
  return (
    <View className="flex-1 bg-gray-900 items-center justify-center">
      <Text className="text-white text-2xl">Home</Text>
      <StartGame />
      <QuickOptions />
      <ListOldGames />
    </View>
  );
};

export default Home;
