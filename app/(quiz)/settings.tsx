import AGB from "@/components/(custom)/agb";
import ManageNames from "@/components/(custom)/manageNames";
import ResetApp from "@/components/(custom)/resetApp";
import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//EXP: This page is responsible for displaying the custom characters and concepts
const Custom = () => {
  return (
    <SafeAreaView className="flex-1 bg-slate-950 items-center justify-start">
      <ScrollView>
        <View className="flex-1  bg-slate-950 items-center justify-start p-2">
          <ManageNames />
          {/*
          <CustomNames />
          <BlackList />
          */}
          <AGB />
          <ResetApp />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Custom;
