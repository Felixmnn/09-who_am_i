import AGB from "@/components/(custom)/agb";
import ManageNames from "@/components/(custom)/manageNames";
import ResetApp from "@/components/(custom)/resetApp";
import React from "react";
import { ScrollView, View } from "react-native";

//EXP: This page is responsible for displaying the custom characters and concepts
const Custom = () => {
  return (
    <ScrollView
      className="flex-1 bg-slate-950"
      contentContainerStyle={{ paddingBottom: 24 }}
      keyboardShouldPersistTaps="handled"
    >
      <View
        style={{
          maxWidth: 480,
          alignSelf: "center",
        }}
        className="flex-1  bg-slate-950 items-center justify-start p-2"
      >
        <ManageNames />
        {/*
          <CustomNames />
          <BlackList />
          */}
        <AGB />
        <ResetApp />
      </View>
    </ScrollView>
  );
};

export default Custom;
