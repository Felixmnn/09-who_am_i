import UserRanking from "@/components/data";
import React from "react";
import { Text, View } from "react-native";

//EXP: This page is responsible for displaying the user ranking and the user stats
const Data = () => {
  return (
    <View className="flex-1 bg-slate-950 items-center justify-center">
      <Text className="text-white text-2xl">User Stats</Text>
      <UserRanking />
    </View>
  );
};

export default Data;
