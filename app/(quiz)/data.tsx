import UserRanking from "@/components/data";
import React from "react";
import { View } from "react-native";

//EXP: This page is responsible for displaying the user ranking and the user stats
const Data = () => {
  return (
    <View className="flex-1 bg-slate-950 items-center justify-start">
      <UserRanking />
    </View>
  );
};

export default Data;
