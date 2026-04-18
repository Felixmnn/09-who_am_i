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
    <View className="flex-1 bg-gray-900 items-center justify-center">
      <ActivityIndicator size="large" color="#3b82f6" />
      <Text className="text-white text-lg mt-4">Lade deine Daten...</Text>
    </View>
  );
}
