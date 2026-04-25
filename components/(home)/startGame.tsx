import { currentGame, users } from "@/constants/types";
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
    label: "History",
    accent: "text-amber-200",
  },
  politics: {
    icon: "university",
    label: "Politics",
    accent: "text-sky-200",
  },
  sports: {
    icon: "futbol-o",
    label: "Sports",
    accent: "text-emerald-200",
  },
  media: {
    icon: "television",
    label: "Media",
    accent: "text-fuchsia-200",
  },
  science: {
    icon: "flask",
    label: "Science",
    accent: "text-cyan-200",
  },
  custom: {
    icon: "star",
    label: "Custom",
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
  const { currentGame, users, customNames, setCurrentGame } =
    useGlobalContext();
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

  return (
    <View className="w-full rounded-xl border border-slate-800 bg-slate-900/80 p-4">
      {currentGame !== null ? (
        <TouchableOpacity
          onPress={() => router.push("/(game)/play")}
          className="rounded-xl border border-emerald-400/30 bg-emerald-500/15 px-4 py-5"
        >
          <View className="flex-row items-center justify-center gap-2">
            <FontAwesome name="play-circle" size={18} color="#34d399" />
            <Text className="text-center text-base font-semibold text-emerald-200">
              Go To Current Game
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View className="w-full">
          <TouchableOpacity
            onPress={() => setExpanded(!expanded)}
            className={`rounded-xl  `}
          >
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-lg font-semibold text-slate-100">
                  Start A New Game
                </Text>
                <Text className="mt-1 text-xs text-slate-400">
                  Wähle Spieler, Kategorien und Rundenzeit.
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {true && (
            <View className="mt-3 gap-3">
              <View className="">
                <View className="mb-2 flex-row items-center justify-between">
                  <Text className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                    Participants
                  </Text>
                  <Text className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                    {selectedParticipantsCount} selected
                  </Text>
                </View>
                <View className="flex-row flex-wrap gap-2">
                  {users.map((user: users) => {
                    const isSelected = tmpCurrentGame.participants.includes(
                      user.id,
                    );
                    return (
                      <TouchableOpacity
                        key={user.id}
                        className={`min-w-[140px] flex-1 rounded-xl border px-3 py-2.5 ${isSelected
                            ? "border-cyan-400/40 bg-cyan-500/15"
                            : "border-slate-700 bg-slate-900"
                          }`}
                        onPress={() => toggleParticipant(user.id)}
                      >
                        <View className="flex-row items-center justify-between">
                          <View className="flex-row items-center">
                            <View
                              className={`mr-2.5 h-8 w-8 items-center justify-center rounded-full ${isSelected ? "bg-cyan-500/20" : "bg-slate-800"
                                }`}
                            >
                              <Text
                                className={`text-xs font-bold ${isSelected
                                    ? "text-cyan-200"
                                    : "text-slate-300"
                                  }`}
                              >
                                {user.name.slice(0, 1).toUpperCase()}
                              </Text>
                            </View>
                            <View>
                              <Text
                                className={`text-sm font-semibold ${isSelected
                                    ? "text-slate-50"
                                    : "text-slate-200"
                                  }`}
                              >
                                {user.name}
                              </Text>
                              <Text className="text-[11px] text-slate-500">
                                {user.points} pts
                              </Text>
                            </View>
                          </View>

                          <FontAwesome
                            name={isSelected ? "check-circle" : "circle-o"}
                            size={16}
                            color={isSelected ? "#67e8f9" : "#64748b"}
                          />
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              <View className="">
                <View className="mb-2 flex-row items-center justify-between">
                  <Text className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                    Categories
                  </Text>
                  <Text className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-200">
                    {selectedCategoriesCount} selected
                  </Text>
                </View>
                <View className="flex-row flex-wrap gap-2">
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
                        className={`min-w-[125px] flex-1 rounded-xl border px-3 py-2.5 ${isSelected
                            ? "border-cyan-400/40 bg-cyan-500/15"
                            : "border-slate-700 bg-slate-900"
                          }`}
                        onPress={() => toggleKategory(kategory)}
                      >
                        <View className="flex-row items-start justify-between">
                          <View
                            className={`h-8 w-8 items-center justify-center rounded-lg ${isSelected ? "bg-cyan-500/20" : "bg-slate-800"
                              }`}
                          >
                            <FontAwesome
                              name={meta.icon}
                              size={15}
                              color={isSelected ? "#67e8f9" : "#cbd5e1"}
                            />
                          </View>
                          <FontAwesome
                            name={isSelected ? "check-circle" : "circle-o"}
                            size={16}
                            color={isSelected ? "#67e8f9" : "#64748b"}
                          />
                        </View>

                        <Text
                          className={`mt-2 text-sm font-semibold ${isSelected ? "text-slate-50" : meta.accent
                            }`}
                        >
                          {meta.label}
                        </Text>
                        <Text className="mt-0.5 text-[11px] uppercase tracking-wide text-slate-500">
                          {kategory}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              <View className="">
                <Text className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Round Duration
                </Text>
                <View className="mt-2.5 flex-row items-center justify-between rounded-xl ">
                  <TouchableOpacity
                    className={`h-10 w-10 items-center justify-center rounded-lg ${tmpCurrentGame.roundDuration <= 5
                        ? "bg-slate-800"
                        : "border border-slate-700 bg-slate-800"
                      }`}
                    disabled={tmpCurrentGame.roundDuration <= 5}
                    onPress={() =>
                      setTmpCurrentGame({
                        ...tmpCurrentGame,
                        roundDuration: tmpCurrentGame.roundDuration - 5,
                      })
                    }
                  >
                    <FontAwesome name="minus" size={14} color="#e2e8f0" />
                  </TouchableOpacity>

                  <View className="items-center">
                    <Text className="mt-0.5 text-2xl font-extrabold text-slate-50">
                      {tmpCurrentGame.roundDuration}
                      <Text className="text-base text-cyan-200">s</Text>
                    </Text>
                  </View>

                  <TouchableOpacity
                    className="h-10 w-10 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10"
                    onPress={() =>
                      setTmpCurrentGame({
                        ...tmpCurrentGame,
                        roundDuration: tmpCurrentGame.roundDuration + 5,
                      })
                    }
                  >
                    <FontAwesome name="plus" size={14} color="#67e8f9" />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                disabled={
                  tmpCurrentGame.participants.length < 2 ||
                  tmpCurrentGame.kategorys.length < 1
                }
                className={`rounded-xl border py-2.5
                    ${tmpCurrentGame.participants.length < 2 ||
                    tmpCurrentGame.kategorys.length < 1
                    ? "border-rose-400/30 bg-rose-500/10 cursor-not-allowed"
                    : "border-emerald-400/30 bg-emerald-500/15"
                  }
                  `}
                onPress={() => {
                  // Validate that there are at least 2 participants and 1 kategory
                  if (
                    tmpCurrentGame.participants.length < 2 ||
                    tmpCurrentGame.kategorys.length < 1
                  ) {
                    alert(
                      "Please select at least 2 participants and 1 category.",
                    );
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
                  Start Game
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
