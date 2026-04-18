import {
  ALREADY_GUESSED_NAMES_STORAGE_KEY,
  BLACKLIST_STORAGE_KEY,
  createDefaultBlackList,
  createDefaultCustomNames,
  createDefaultLastGameResults,
  createDefaultUsers,
  CURRENT_GAME_STORAGE_KEY,
  CUSTOM_NAMES_STORAGE_KEY,
  GAME_PAUSED_STORAGE_KEY,
  LAST_GAME_RESULTS_STORAGE_KEY,
  MUTED_STORAGE_KEY,
  useGlobalContext,
  USERS_STORAGE_KEY,
} from "@/context/GlobalProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

const ResetApp = () => {
  const {
    setUsers,
    setMuted,
    setBlackList,
    setLastGameResults,
    setCustomNames,
    setCurrentGame,
    setGamePaused,
    setAlreadyGuessedNames,
  } = useGlobalContext();
  const [isResetting, setIsResetting] = React.useState(false);

  const resetAppData = async () => {
    if (isResetting) {
      return;
    }

    setIsResetting(true);

    try {
      await AsyncStorage.multiRemove([
        USERS_STORAGE_KEY,
        MUTED_STORAGE_KEY,
        BLACKLIST_STORAGE_KEY,
        LAST_GAME_RESULTS_STORAGE_KEY,
        CUSTOM_NAMES_STORAGE_KEY,
        CURRENT_GAME_STORAGE_KEY,
        GAME_PAUSED_STORAGE_KEY,
        ALREADY_GUESSED_NAMES_STORAGE_KEY,
      ]);

      setUsers(createDefaultUsers());
      setMuted(false);
      setBlackList(createDefaultBlackList());
      setLastGameResults(createDefaultLastGameResults());
      setCustomNames(createDefaultCustomNames());
      setCurrentGame(null);
      setGamePaused(false);
      setAlreadyGuessedNames([]);
    } catch (error) {
      console.warn("Could not reset app data", error);
    } finally {
      setIsResetting(false);
    }
  };

  const confirmReset = () => {
    if (isResetting) {
      return;
    }

    Alert.alert(
      "App zurücksetzen",
      "Alle gespeicherten Daten werden gelöscht. Dieser Schritt kann nicht rückgängig gemacht werden.",
      [
        {
          text: "Abbrechen",
          style: "cancel",
        },
        {
          text: "Alles löschen",
          style: "destructive",
          onPress: resetAppData,
        },
      ],
    );
  };

  return (
    <View className="mt-4 w-full rounded-xl border border-rose-500/30 bg-slate-900/90 p-4">
      <Text className="text-2xl font-extrabold text-slate-100">Reset App</Text>
      <Text className="mt-2 text-sm text-slate-400">
        Löscht alle gespeicherten App-Daten!
      </Text>

      <TouchableOpacity
        onPress={confirmReset}
        disabled={isResetting}
        className={`mt-4 rounded-xl px-4 py-3 ${
          isResetting
            ? "bg-slate-700"
            : "border border-rose-400/40 bg-rose-500/15"
        }`}
      >
        <Text className="text-center font-bold text-rose-200">
          {isResetting ? "Reset läuft..." : "Alle Daten löschen"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResetApp;
