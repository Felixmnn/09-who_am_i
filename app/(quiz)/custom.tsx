import { name } from "@/constants/types";
import { useGlobalContext } from "@/context/GlobalProvider";
import React from "react";
import { Text, View } from "react-native";

//EXP: This page is responsible for displaying the custom characters and concepts
const Custom = () => {
  const { customNames } = useGlobalContext();
  const kategorys = Object.keys(customNames);
  return (
    <View className="flex-1 bg-gray-900 items-center justify-center">
      {kategorys.map((kategory) => {
        return (
          <View key={kategory} className="p-4 bg-gray-500 m-2 ">
            <Text className="text-xl font-bold text-gray-200">{kategory}</Text>
            <View className="mt-2">
              {customNames[kategory].map((name: name, index: number) => (
                <View key={index} className="p-2 bg-gray-700 m-1">
                  <Text>{JSON.stringify(name, null, 2)}</Text>
                </View>
              ))}
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default Custom;
