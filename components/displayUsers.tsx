import { users } from "@/constants/types";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

//EXP: This component is responsible for displaying the users
//TSK: The UI should be polished
//TSK: There should be a way to edit the users to edit a user the method setUsers should be used

const DisplayUsers = ({
  users,
  setUsers,
}: {
  users: users[];
  setUsers: React.Dispatch<React.SetStateAction<users[]>>;
}) => {
  return (
    <View>
      {users.map((user, index) => (
        <TouchableOpacity key={index} className="p-2 bg-gray-500 m-2">
          <Text>{JSON.stringify(user, null, 2)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default DisplayUsers;
