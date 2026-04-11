import UserRanking from "@/components/userRanking";
import React from "react";
import { Text, View } from "react-native";

//EXP: This page is responsible for displaying the user ranking and the user stats
const Data = () => {
  return (
    <View className="flex-1 bg-gray-900 items-center justify-center">
      <Text className="text-white text-2xl">User Stats</Text>
      <UserRanking />
    </View>
  );
};

export default Data;
