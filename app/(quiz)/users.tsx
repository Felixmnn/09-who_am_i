import DisplayUsers from "@/components/displayUsers";
import { useGlobalContext } from "@/context/GlobalProvider";
import React from "react";
import { Text, View } from "react-native";

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
    <View className="flex-1 bg-slate-950 items-center justify-center">
      <DisplayUsers users={users} setUsers={setUsers} />
    </View>
  );
};

export default Users;
