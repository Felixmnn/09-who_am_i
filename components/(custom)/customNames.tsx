import { useGlobalContext } from "@/context/GlobalProvider";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import RenderKategorys from "./renderKategorys";

const CustomNames = () => {
  const { customNames } = useGlobalContext();
  const [expanded, setExpanded] = React.useState(true);

  return (
    <View className="mb-4 w-full rounded-2xl border border-slate-800 bg-slate-900/90 p-4 mr-4">
      <TouchableOpacity
        className="flex-row items-center justify-between"
        onPress={() => setExpanded((prev) => !prev)}
      >
        <Text className="text-2xl font-extrabold text-slate-100 ">
          Custom Names
        </Text>
        <FontAwesome
          name={expanded ? "chevron-up" : "chevron-down"}
          size={16}
          color="#94a3b8"
        />
      </TouchableOpacity>

      {expanded && <RenderKategorys kategorysToRender={customNames} />}
    </View>
  );
};

export default CustomNames;
