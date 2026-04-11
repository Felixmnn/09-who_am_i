import DisplayUsers from "@/components/displayUsers";
import { useGlobalContext } from "@/context/GlobalProvider";
import React from "react";
import { Text, View } from "react-native";

//EXP: This page is responsible for displaying the users
const Users = () => {
  const { users, setUsers } = useGlobalContext();
  return (
    <View className="flex-1 bg-gray-900 items-center justify-center">
      <Text className="text-white text-2xl">Users</Text>
      <DisplayUsers users={users} setUsers={setUsers} />
    </View>
  );
};

export default Users;
