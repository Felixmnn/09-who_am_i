import React from "react";
import { Text, View } from "react-native";

const RenderLevel = ({ label, value }: { label: string; value: string }) => {
  const colorByLevel: Record<string, string> = {
    HIGH: "bg-rose-500/20 text-rose-200 border-rose-500/40",
    MEDIUM: "bg-amber-500/20 text-amber-200 border-amber-500/40",
    LOW: "bg-emerald-500/20 text-emerald-200 border-emerald-500/40",
  };
  return (
    <View className="w-[48%] rounded-xl border  flex-row items-center justify-between">
      <Text
        className={` self-start rounded-full border px-1 py-[2px] text-[10px] font-semibold ${
          colorByLevel[value] ?? "bg-slate-700 text-slate-200 border-slate-600"
        }`}
      >
        {value}
      </Text>
    </View>
  );
};

export default RenderLevel;
