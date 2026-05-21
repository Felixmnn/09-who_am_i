import { Colors } from "@/constants/theme";
import { useGlobalContext } from "@/context/GlobalProvider";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import RenderKategorys from "./renderKategorys";

const BlackList = () => {
  const { blackList } = useGlobalContext();
  const [expanded, setExpanded] = React.useState(true);

  return (
    <View
      style={{
        marginBottom: 16,
        marginRight: 16,
        width: "100%",
        borderRadius: 12,
        borderWidth: 2,
        borderColor: Colors.dark.componentBorder,
        backgroundColor: Colors.dark.componentBackground,
        padding: 16,
      }}
    >
      <TouchableOpacity
        className="flex-row items-center justify-between"
        onPress={() => setExpanded((prev) => !prev)}
      >
        <Text className="text-2xl font-bold text-slate-100">Sperrliste</Text>
        <FontAwesome
          name={expanded ? "chevron-up" : "chevron-down"}
          size={16}
          color="#94a3b8"
        />
      </TouchableOpacity>

      {expanded && <RenderKategorys kategorysToRender={blackList} />}
    </View>
  );
};

export default BlackList;
