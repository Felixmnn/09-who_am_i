import { name } from "@/constants/types";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const RenderKategorys = ({
  kategorysToRender,
}: {
  kategorysToRender: { [key: string]: name[] };
}) => {
  const kategorys = Object.keys(kategorysToRender);
  const [expandedKategory, setExpandedKategory] = React.useState<string | null>(
    null,
  );
  function returnMatchingIcon(name: string) {
    switch (name) {
      case "history":
        return "history";
      case "science":
        return "flask";
      case "sports":
        return "soccer-ball-o";
      case "media":
        return "tv";
      case "politics":
        return "university";
      default:
        return "cog";
    }
  }

  return (
    <View className=" w-full flex-row flex-wrap items-start justify-between">
      {kategorys.map((kategory) => {
        return (
          <TouchableOpacity
            key={kategory}
            className={`mt-2 rounded-xl border p-4 ${
              expandedKategory === kategory
                ? "w-full border-cyan-500/40 bg-slate-800"
                : "w-[48%] border-slate-700 bg-slate-900"
            }`}
            onPress={() => {
              setExpandedKategory(
                expandedKategory === kategory ? null : kategory,
              );
            }}
          >
            <View className="flex-row items-center">
              <FontAwesome
                name={returnMatchingIcon(kategory)}
                size={20}
                color="#e2e8f0"
              />
              <Text className="ml-2 text-base font-bold text-slate-100">
                {kategory}
              </Text>
            </View>
            {expandedKategory === kategory && (
              <View className="">
                {kategorysToRender[kategory].map(
                  (name: name, index: number) => (
                    <View key={index} className="mt-2 rounded-xl  ">
                      <Text className="text-sm font-semibold text-slate-100">
                        {name.name}
                      </Text>
                      <Text className="mt-1 text-xs text-slate-400">
                        Difficulty: {name.difficulty}
                      </Text>
                    </View>
                  ),
                )}
                {kategorysToRender[kategory].length === 0 && (
                  <Text className="mt-1 text-xs text-slate-500">
                    Keine Eintraege vorhanden.
                  </Text>
                )}
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default RenderKategorys;
