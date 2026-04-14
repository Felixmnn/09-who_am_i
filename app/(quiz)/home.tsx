import ListOldGames from "@/components/(home)/listOldGames";
import QuickOptions from "@/components/(home)/quickOptions";
import StartGame from "@/components/(home)/startGame";
import { useGlobalContext } from "@/context/GlobalProvider";
import React from "react";
import { ScrollView, Text, View } from "react-native";

const Home = () => {
  const { lastGameResults } = useGlobalContext();

  return (
    <ScrollView
      className="flex-1 bg-slate-950"
      contentContainerClassName="px-4 pb-28 "
    >
      <Text className="text-2xl font-extrabold text-slate-100 py-2">Home</Text>

      <View className="gap-2">
        <StartGame />
        <QuickOptions />
        <ListOldGames games={lastGameResults} />
      </View>
    </ScrollView>
  );
};

export default Home;
