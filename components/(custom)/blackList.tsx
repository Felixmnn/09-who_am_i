import { useGlobalContext } from "@/context/GlobalProvider";
import React from "react";
import { Text, View } from "react-native";
import RenderKategorys from "./renderKategorys";

const BlackList = () => {
  const { blackList } = useGlobalContext();

  return (
    <View className="w-full rounded-3xl my-3 px-4">
      <Text className="text-2xl font-bold text-slate-100">Blacklist</Text>
      <RenderKategorys kategorysToRender={blackList} />
    </View>
  );
};

export default BlackList;
