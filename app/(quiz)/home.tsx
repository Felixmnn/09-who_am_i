import ListOldGames from "@/components/(home)/listOldGames";
import QuickOptions from "@/components/(home)/quickOptions";
import StartGame from "@/components/(home)/startGame";
import { Colors } from "@/constants/theme";
import { useGlobalContext } from "@/context/GlobalProvider";
import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const { lastGameResults, blackList } = useGlobalContext();

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={{ flex: 1, backgroundColor: Colors.dark.background }}
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: Colors.dark.background }}
        contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 112 }}
      >
        <View
          style={{
            gap: 8,
            paddingVertical: 8,
            maxWidth: 480,
            width: "100%",
            alignSelf: "center",
          }}
        >
          <StartGame />
          <QuickOptions />
          <ListOldGames games={lastGameResults} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
