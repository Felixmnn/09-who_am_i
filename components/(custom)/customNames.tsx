import { useGlobalContext } from "@/context/GlobalProvider";
import React from "react";
import { Text, View } from "react-native";
import RenderKategorys from "./renderKategorys";

const CustomNames = () => {
  const { customNames } = useGlobalContext();

  return (
    <View className=" w-full rounded-3xl px-4 ">
      <Text className="text-2xl font-extrabold text-slate-100 ">
        Custom Names
      </Text>
      <RenderKategorys kategorysToRender={customNames} />
    </View>
  );
};

export default CustomNames;
