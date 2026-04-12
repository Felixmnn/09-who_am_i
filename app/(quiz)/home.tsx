import ListOldGames from "@/components/(home)/listOldGames";
import QuickOptions from "@/components/(home)/quickOptions";
import StartGame from "@/components/(home)/startGame";
import React from "react";
import { ScrollView, Text, View } from "react-native";

const Home = () => {
  return (
    <ScrollView
      className="flex-1 bg-slate-950"
      contentContainerClassName="px-4 pb-28 pt-8"
    >
      <View className="mb-2  ">
        <Text className="text-3xl font-bold text-slate-50">Home</Text>
      </View>

      <View className="gap-2">
        <StartGame />
        <QuickOptions />
        <ListOldGames />
      </View>
    </ScrollView>
  );
};

export default Home;
