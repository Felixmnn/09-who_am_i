import { users } from "@/constants/types";
import { useGlobalContext } from "@/context/GlobalProvider";
import React from "react";
import { Text, View } from "react-native";

//EXP: This page is responsible for displaying the user ranking and the user stats
//TSK: The UI should be polished

const UserRanking = () => {
  const { users } = useGlobalContext();
  const sortedUsers = [...users].sort((a, b) => b.points - a.points);

  return (
    <View>
      {sortedUsers.map((user: users) => {
        return (
          <View className="p-2 bg-gray-500 m-2">
            <Text>{JSON.stringify(user, null, 2)}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default UserRanking;
