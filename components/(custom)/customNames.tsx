import { useGlobalContext } from "@/context/GlobalProvider";
import React from "react";
import { Text, View } from "react-native";
import RenderKategorys from "./renderKategorys";

const CustomNames = () => {
  const { customNames } = useGlobalContext();

  return (
    <View className="mb-4 w-full rounded-3xl  p-4">
      <Text className="text-2xl font-bold text-slate-100">Custom Names</Text>
      <RenderKategorys kategorysToRender={customNames} />
    </View>
  );
};

export default CustomNames;
