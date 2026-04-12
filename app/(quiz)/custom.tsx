import BlackList from "@/components/(custom)/blackList";
import CustomNames from "@/components/(custom)/customNames";
import React from "react";
import { ScrollView } from "react-native";

//EXP: This page is responsible for displaying the custom characters and concepts
const Custom = () => {
  return (
    <ScrollView className="flex-1 bg-slate-950 items-center justify-start p-2">
      <CustomNames />
      <BlackList />
    </ScrollView>
  );
};

export default Custom;
