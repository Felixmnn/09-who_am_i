import { Colors } from "@/constants/theme";
import { currentGame, gameResultPlayer, users } from "@/constants/types";
import { useGlobalContext } from "@/context/GlobalProvider";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const CATEGORY_META: Record<
  string,
  { icon: keyof typeof FontAwesome.glyphMap; label: string; accent: string }
> = {
  history: {
    icon: "book",
    label: "Geschichte",
    accent: "text-amber-200",
  },
  politics: {
    icon: "university",
    label: "Politik",
    accent: "text-sky-200",
  },
  sports: {
    icon: "futbol-o",
    label: "Sport",
    accent: "text-emerald-200",
  },
  media: {
    icon: "television",
    label: "Medien",
    accent: "text-fuchsia-200",
  },
  science: {
    icon: "flask",
    label: "Wissenschaft",
    accent: "text-cyan-200",
  },
  custom: {
    icon: "star",
    label: "Eigene",
    accent: "text-rose-200",
  },
};

const createInitialGameDraft = (
  availableUsers: users[],
  availableCategories: string[],
): currentGame => ({
  dateTime: new Date(),
  participants: availableUsers.slice(0, 2).map((user) => user.id),
  kategorys: availableCategories,
  roundDuration: 60,
  answers: [],
  gameResults: [],
});

const StartGame = () => {
  const {
    currentGame,
    users,
    customNames,
    setCurrentGame,
    setGamePaused,
    setUsers,
    setLastGameResults,
  } = useGlobalContext();
  const [expanded, setExpanded] = React.useState(false);
  const kategorys = customNames ? Object.keys(customNames) : [];
  const hasInitializedDefaults = React.useRef(false);
  const [tmpCurrentGame, setTmpCurrentGame] = React.useState<currentGame>(() =>
    createInitialGameDraft(users, kategorys),
  );

  React.useEffect(() => {
    if (hasInitializedDefaults.current) {
      return;
    }

    if (users.length === 0 && kategorys.length === 0) {
      return;
    }

    setTmpCurrentGame((prev) => ({
      ...prev,
      participants: users.slice(0, 2).map((user: users) => user.id),
      kategorys,
    }));
    hasInitializedDefaults.current = true;
  }, [users, kategorys]);

  const toggleParticipant = (userId: number) => {
    setTmpCurrentGame((prev) => ({
      ...prev,
      participants: prev.participants.includes(userId)
        ? prev.participants.filter((id) => id !== userId)
        : [...prev.participants, userId],
    }));
  };

  const toggleKategory = (kategory: string) => {
    setTmpCurrentGame((prev) => ({
      ...prev,
      kategorys: prev.kategorys.includes(kategory)
        ? prev.kategorys.filter((k) => k !== kategory)
        : [...prev.kategorys, kategory],
    }));
  };

  const selectedParticipantsCount = tmpCurrentGame.participants.length;
  const selectedCategoriesCount = tmpCurrentGame.kategorys.length;

  function stopGame() {
    try {
      const gameResults = {
        dateTime: currentGame
          ? currentGame.dateTime.toISOString()
          : new Date().toISOString(),
        participants: currentGame ? currentGame.participants : [],
        answers: currentGame ? currentGame.answers : [],
        gameResults: currentGame ? currentGame.gameResults : [],
      };
      setUsers((prevUsers: users[]) =>
        prevUsers.map((user) => {
          if (currentGame.participants.includes(user.id)) {
            const participantResult = gameResults.gameResults.find(
              (result: gameResultPlayer) => result.participantId === user.id,
            );
            return {
              ...user,
              points: user.points + (participantResult?.pointsEarned || 0),
            };
          }
          return user;
        }),
      );
      setLastGameResults((prev: any) => [...prev, gameResults]);
    } catch (error) {
      console.error("Fehler beim Speichern der Spielergebnisse:", error);
    }
    setCurrentGame(null);
    setGamePaused(false);
    router.push("/home");
  }

  return (
    <View
      style={{
        width: "100%",
        borderRadius: 12,
        borderWidth: 2,
        borderColor: Colors.dark.componentBorder,
        backgroundColor: Colors.dark.componentBackground,
        padding: 16,
      }}
    >
      {currentGame !== null ? (
        <View className="gap-2">
          <TouchableOpacity
            onPress={() => router.push("/(game)/play")}
            className="rounded-xl border border-emerald-400/30 bg-emerald-500/15 px-4 py-5"
          >
            <View className="flex-row items-center justify-center gap-2">
              <FontAwesome name="play-circle" size={18} color="#34d399" />
              <Text className="text-center text-base font-semibold text-emerald-200">
                Zum laufenden Spiel
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={stopGame}
            className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-4"
          >
            <View className="flex-row items-center justify-center gap-2">
              <FontAwesome name="stop-circle" size={18} color="#fda4af" />
              <Text className="text-center text-base font-semibold text-rose-200">
                Aktuelles Spiel beenden
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="w-full">
          <TouchableOpacity
            onPress={() => setExpanded(!expanded)}
            className={`rounded-xl  `}
          >
            <View className="flex-row items-center justify-between">
              <View>
                <Text
                  style={{ fontSize: 18, fontWeight: "600", color: "#fff" }}
                >
                  Neues Spiel starten
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {true && (
            <View className="mt-3 gap-3">
              <View className="">
                <View className="mb-2 flex-row items-center justify-between">
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      color: "#fff",
                    }}
                  >
                    Spieler
                  </Text>
                  <Text
                    style={{
                      borderRadius: 999,
                      borderWidth: 1,
                      borderColor: Colors.dark.tabIconDefault,
                      backgroundColor: Colors.dark.icon,
                      paddingHorizontal: 12,
                      paddingVertical: 4,
                      fontSize: 12,
                      fontWeight: "600",
                      color: "#fff",
                    }}
                  >
                    {selectedParticipantsCount} ausgewählt
                  </Text>
                </View>
                <View
                  style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}
                >
                  {users.map((user: users) => {
                    const isSelected = tmpCurrentGame.participants.includes(
                      user.id,
                    );
                    return (
                      <TouchableOpacity
                        key={user.id}
                        style={{
                          minWidth: 140,
                          flex: 1,
                          borderRadius: 16,
                          borderWidth: 1,
                          borderColor: isSelected
                            ? Colors.dark.optionBorderSelected
                            : Colors.dark.optionBorderUnselected,
                          backgroundColor: isSelected
                            ? Colors.dark.optionBgSelected
                            : Colors.dark.optionBgUnselected,
                          paddingHorizontal: 12,
                          paddingVertical: 10,
                          marginBottom: 8,
                        }}
                        onPress={() => toggleParticipant(user.id)}
                      >
                        <View className="flex-row items-center justify-between">
                          <View className="flex-row items-center">
                            <View
                              className={`mr-2.5 h-8 w-8 items-center justify-center rounded-full ${
                                isSelected ? "bg-cyan-500/20" : "bg-slate-800"
                              }`}
                            >
                              <Text
                                className={`text-xs font-bold `}
                                style={{
                                  color: isSelected
                                    ? Colors.dark.tabIconSelected
                                    : "text-slate-300",
                                }}
                              >
                                {user.name.slice(0, 1).toUpperCase()}
                              </Text>
                            </View>
                            <View>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontWeight: "600",
                                  color: "#fff",
                                }}
                              >
                                {user.name}
                              </Text>
                              <Text style={{ fontSize: 11, color: "#fff" }}>
                                {user.points} Pkt
                              </Text>
                            </View>
                          </View>

                          <FontAwesome
                            name={isSelected ? "check-circle" : "circle-o"}
                            size={16}
                            color={
                              isSelected
                                ? Colors.dark.tabIconSelected
                                : Colors.dark.optionBorderUnselected
                            }
                          />
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              <View className="">
                <View className="mb-2 flex-row items-center justify-between">
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      color: "#fff",
                    }}
                  >
                    Kategorien
                  </Text>
                  <Text
                    style={{
                      borderRadius: 999,
                      borderWidth: 1,
                      borderColor: Colors.dark.tabIconDefault,
                      backgroundColor: Colors.dark.icon,
                      paddingHorizontal: 12,
                      paddingVertical: 4,
                      fontSize: 12,
                      fontWeight: "600",
                      color: "#fff",
                    }}
                  >
                    {selectedCategoriesCount} ausgewählt
                  </Text>
                </View>
                <View
                  style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}
                >
                  {kategorys.map((kategory) => {
                    const isSelected =
                      tmpCurrentGame.kategorys.includes(kategory);
                    const meta = CATEGORY_META[kategory] ?? {
                      icon: "tag",
                      label: kategory,
                      accent: "text-slate-200",
                    };
                    return (
                      <TouchableOpacity
                        key={kategory}
                        style={{
                          minWidth: 125,
                          flex: 1,
                          borderRadius: 16,
                          borderWidth: 1,
                          borderColor: isSelected
                            ? Colors.dark.optionBorderSelected
                            : Colors.dark.optionBorderUnselected,
                          backgroundColor: isSelected
                            ? Colors.dark.optionBgSelected
                            : Colors.dark.optionBgUnselected,
                          paddingHorizontal: 12,
                          paddingVertical: 10,
                          marginBottom: 8,
                        }}
                        onPress={() => toggleKategory(kategory)}
                      >
                        <View className="flex-row items-start justify-between">
                          <View
                            className={`h-8 w-8 items-center justify-center rounded-lg ${
                              isSelected ? "bg-cyan-500/20" : "bg-slate-800"
                            }`}
                          >
                            <FontAwesome
                              name={meta.icon}
                              size={15}
                              color={
                                isSelected
                                  ? Colors.dark.tabIconSelected
                                  : "#ffffff"
                              }
                            />
                          </View>
                          <FontAwesome
                            name={isSelected ? "check-circle" : "circle-o"}
                            size={16}
                            color={
                              isSelected
                                ? Colors.dark.tabIconSelected
                                : Colors.dark.optionBorderUnselected
                            }
                          />
                        </View>

                        <Text
                          className={`mt-2 text-sm font-semibold ${
                            isSelected ? "text-slate-50" : meta.accent
                          }`}
                        >
                          {meta.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              <View className="">
                <Text className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Rundendauer
                </Text>
                <View
                  style={{
                    marginTop: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: 16,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      height: 40,
                      width: 40,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 12,
                      backgroundColor: Colors.dark.optionBgUnselected,
                      borderWidth: tmpCurrentGame.roundDuration > 5 ? 1 : 0,
                      borderColor: Colors.dark.optionBorderUnselected,
                    }}
                    disabled={tmpCurrentGame.roundDuration <= 5}
                    onPress={() =>
                      setTmpCurrentGame({
                        ...tmpCurrentGame,
                        roundDuration: tmpCurrentGame.roundDuration - 5,
                      })
                    }
                  >
                    <FontAwesome name="minus" size={14} color="#ffffff" />
                  </TouchableOpacity>

                  <View className="items-center">
                    <Text className="mt-0.5 text-2xl font-extrabold text-slate-50">
                      {tmpCurrentGame.roundDuration}
                      <Text className="text-base text-cyan-200">s</Text>
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={{
                      height: 40,
                      width: 40,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 12,
                      backgroundColor: Colors.dark.optionBgSelected,
                      borderWidth: 1,
                      borderColor: Colors.dark.optionBorderSelected,
                    }}
                    onPress={() =>
                      setTmpCurrentGame({
                        ...tmpCurrentGame,
                        roundDuration: tmpCurrentGame.roundDuration + 5,
                      })
                    }
                  >
                    <FontAwesome
                      name="plus"
                      size={14}
                      color={Colors.dark.tabIconSelected}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                disabled={
                  tmpCurrentGame.participants.length < 2 ||
                  tmpCurrentGame.kategorys.length < 1
                }
                style={{
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor:
                    tmpCurrentGame.participants.length < 2 ||
                    tmpCurrentGame.kategorys.length < 1
                      ? Colors.dark.optionBorderUnselected
                      : Colors.dark.optionBorderSelected,
                  backgroundColor:
                    tmpCurrentGame.participants.length < 2 ||
                    tmpCurrentGame.kategorys.length < 1
                      ? Colors.dark.optionBgUnselected
                      : Colors.dark.optionBgSelected,
                  paddingVertical: 10,
                  marginTop: 12,
                }}
                onPress={() => {
                  // Validate that there are at least 2 participants and 1 kategory
                  if (
                    tmpCurrentGame.participants.length < 2 ||
                    tmpCurrentGame.kategorys.length < 1
                  ) {
                    alert("Bitte wähle mindestens 2 Spieler und 1 Kategorie.");
                    return;
                  }
                  const gameResults = tmpCurrentGame.participants.map(
                    (participantId) => ({
                      participantId,
                      pointsEarned: 0,
                    }),
                  );
                  setTmpCurrentGame({
                    ...tmpCurrentGame,
                    gameResults: gameResults,
                    dateTime: new Date(),
                  });
                  setCurrentGame({
                    ...tmpCurrentGame,
                    gameResults: gameResults,
                    dateTime: new Date(),
                  });
                  router.push("/(game)/play");
                }}
              >
                <Text className="text-center text-base font-semibold text-gray-200">
                  Spiel starten
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default StartGame;
