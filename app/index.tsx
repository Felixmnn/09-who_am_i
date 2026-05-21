import { Colors } from "@/constants/theme";
import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function Index() {
  const { isUsersHydrated, isSettingsHydrated, users } = useGlobalContext();

  useEffect(() => {
    if (isUsersHydrated && isSettingsHydrated) {
      if (users.length < 2) {
        router.replace("/(onborading)/onboarding");
        return;
      }
      router.replace("/(quiz)/home");
    }
  }, [isUsersHydrated, isSettingsHydrated]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.dark.background,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator size="large" color={Colors.dark.icon} />
      <Text style={{ color: Colors.dark.text, fontSize: 18, marginTop: 16 }}>
        Lade deine Daten...
      </Text>
    </View>
  );
}
