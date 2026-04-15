import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../assets/images/languages/i18n/index";
import GlobalProvider from "./../context/GlobalProvider";
import "./../global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <GlobalProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(quiz)" options={{ headerShown: false }} />
          <Stack.Screen name="(game)" options={{ headerShown: false }} />
          <Stack.Screen name="(onborading)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar hidden />
      </GlobalProvider>
    </SafeAreaProvider>
  );
}
