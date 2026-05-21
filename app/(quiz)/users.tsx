import DisplayUsers from "@/components/users";
import { Colors } from "@/constants/theme";
import { useGlobalContext } from "@/context/GlobalProvider";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//EXP: This page is responsible for displaying the users
const Users = () => {
  const { users, setUsers, isUsersHydrated } = useGlobalContext();

  if (!isUsersHydrated) {
    return (
      <SafeAreaView
        edges={["top", "left", "right"]}
        style={{
          flex: 1,
          backgroundColor: Colors.dark.background,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: Colors.dark.text, fontSize: 20 }}>
          Spieler werden geladen...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    // Grund: ScrollView statt View, damit die User-Liste bei vielen Einträgen scrollbar bleibt und die Tastatur das Layout nicht zerstört.
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
          }}
          className="items-center justify-start"
        >
          <DisplayUsers users={users} setUsers={setUsers} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Users;
