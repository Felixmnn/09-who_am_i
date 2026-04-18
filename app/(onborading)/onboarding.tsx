import { useGlobalContext } from "@/context/GlobalProvider";
import React from "react";
import { Text, View } from "react-native";

//TSK: Implement onboarding flow to create users and add custom names before accessing the home screen. This screen should only be shown if there are no users created yet. We can use the same components as in the manage names and manage users screen, but we need to hide the delete functionality and only show the add functionality. We also need to add a button to proceed to the home screen once at least 2 users are created.
const Onboarding = () => {
  const { users, setUsers } = useGlobalContext();
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Erstelle 2 Spieler um fortzufahren</Text>
    </View>
  );
};

export default Onboarding;
