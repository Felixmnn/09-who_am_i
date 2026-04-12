import React from "react";
import { View } from "react-native";

const TimeBar = ({
  remainingTime,
  totalTime,
}: {
  remainingTime: number;
  totalTime: number;
}) => {
  return (
    <View
      className="w-full rounded-3xl bg-gray-300 "
      style={{
        height: 6,
      }}
    >
      <View
        className="h-full rounded-3xl bg-emerald-500"
        style={{ width: `${(remainingTime / totalTime) * 100}%` }}
      />
    </View>
  );
};

export default TimeBar;
