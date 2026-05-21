import ListOldGames from "@/components/(home)/listOldGames";
import QuickOptions from "@/components/(home)/quickOptions";
import StartGame from "@/components/(home)/startGame";
import { useGlobalContext } from "@/context/GlobalProvider";
import React from "react";
import { ScrollView, View } from "react-native";

const Home = () => {
  const { lastGameResults, blackList } = useGlobalContext();

  return (
    <ScrollView
      className="flex-1 bg-slate-950"
      contentContainerClassName="px-4 pb-28 "
    >
      <View
        className="gap-2 py-2"
        style={{
          maxWidth: 480,
          alignSelf: "center",
        }}
      >
        <StartGame />
        <QuickOptions />
        <ListOldGames games={lastGameResults} />
      </View>
    </ScrollView>
  );
};

export default Home;
