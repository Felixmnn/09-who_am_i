import AGB from "@/components/(custom)/agb";
import ManageNames from "@/components/(custom)/manageNames";
import ResetApp from "@/components/(custom)/resetApp";
import { Colors } from "@/constants/theme";
import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//EXP: This page is responsible for displaying the custom characters and concepts
const Custom = () => {
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={{ flex: 1, backgroundColor: Colors.dark.background }}
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: Colors.dark.background }}
        contentContainerStyle={{ paddingBottom: 24 }}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={{
            maxWidth: 480,
            width: "100%",
            alignSelf: "center",
            backgroundColor: Colors.dark.background,
          }}
          className="flex-1 items-center justify-start p-2"
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
    </SafeAreaView>
  );
};

export default Custom;
