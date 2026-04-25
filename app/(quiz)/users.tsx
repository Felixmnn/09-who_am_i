import DisplayUsers from "@/components/users";
import { useGlobalContext } from "@/context/GlobalProvider";
import React from "react";
import { ScrollView, Text, View } from "react-native";

//EXP: This page is responsible for displaying the users
const Users = () => {
  const { users, setUsers, isUsersHydrated } = useGlobalContext();

  if (!isUsersHydrated) {
    return (
      <View className="flex-1 bg-slate-950 items-center justify-center">
        <Text className="text-white text-xl">Loading users...</Text>
      </View>
    );
  }

  return (
    // Grund: ScrollView statt View, damit die User-Liste bei vielen Einträgen scrollbar bleibt und die Tastatur das Layout nicht zerstört.
    <ScrollView
      className="flex-1 bg-slate-950"
      contentContainerStyle={{ paddingBottom: 24 }}
      keyboardShouldPersistTaps="handled"
    >
      <View className="items-center justify-start">
        <DisplayUsers users={users} setUsers={setUsers} />
      </View>
    </ScrollView>
  );
};

export default Users;
