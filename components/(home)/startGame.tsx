import { currentGame, users } from "@/constants/types";
import { useGlobalContext } from "@/context/GlobalProvider";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const StartGame = () => {
  const { currentGame, users, customNames, setCurrentGame } =
    useGlobalContext();
  const [expanded, setExpanded] = React.useState(false);
  const [tmpCurrentGame, setTmpCurrentGame] = React.useState<currentGame>({
    dateTime: new Date(),
    participants: [],
    kategorys: [],
    roundDuration: 60,
    answers: [],
    gameResults: [],
  });
  const kategorys = customNames ? Object.keys(customNames) : [];

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
              <FontAwesome
                name={expanded ? "chevron-up" : "chevron-down"}
                size={16}
                color="#cbd5e1"
              />
            </View>
          </TouchableOpacity>

          {expanded && (
            <View className="mt-4 gap-4">
              <View className="rounded-xl">
                <Text className="mb-1 text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Participants
                </Text>
                <View className="flex-row flex-wrap">
                  {users.map((user: users) => {
                    const isSelected = tmpCurrentGame.participants.includes(
                      user.id,
                    );
                    return (
                      <TouchableOpacity
                        key={user.id}
                        className={`mr-2 mt-2 rounded-xl border px-2 py-1 ${
                          isSelected
                            ? "border-cyan-400/30 bg-cyan-500/15"
                            : "border-slate-700 bg-slate-900"
                        }`}
                        onPress={() => toggleParticipant(user.id)}
                      >
                        <Text
                          className={`text-sm font-semibold ${
                            isSelected ? "text-emerald-200" : "text-gray-200"
                          }`}
                        >
                          {user.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              <View className="rounded-xl">
                <Text className="mb-1 text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Categories
                </Text>
                <View className="flex-row flex-wrap">
                  {kategorys.map((kategory) => (
                    <TouchableOpacity
                      key={kategory}
                      className={`mr-2 mt-2 rounded-xl border px-2 py-1 ${
                        tmpCurrentGame.kategorys.includes(kategory)
                          ? "border-cyan-400/30 bg-cyan-500/15"
                          : "border-slate-700 bg-slate-900"
                      }`}
                      onPress={() => toggleKategory(kategory)}
                    >
                      <Text
                        className={`text-sm font-semibold ${
                          tmpCurrentGame.kategorys.includes(kategory)
                            ? "text-cyan-200"
                            : "text-slate-300"
                        }`}
                      >
                        {kategory}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View className="rounded-xl">
                <Text className="mb-1 text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Round Duration
                </Text>
                <View className="flex-row items-center">
                  <TouchableOpacity
                    className={`rounded-xl px-4 py-2 ${
                      tmpCurrentGame.roundDuration <= 5
                        ? "bg-slate-800"
                        : "bg-slate-700"
                    }`}
                    disabled={tmpCurrentGame.roundDuration <= 5}
                    onPress={() =>
                      setTmpCurrentGame({
                        ...tmpCurrentGame,
                        roundDuration: tmpCurrentGame.roundDuration - 5,
                      })
                    }
                  >
                    <Text className="text-lg font-bold text-slate-200">-</Text>
                  </TouchableOpacity>
                  <Text className="mx-3 min-w-[72px] text-center text-base font-semibold text-slate-100">
                    {tmpCurrentGame.roundDuration}s
                  </Text>
                  <TouchableOpacity
                    className="rounded-xl bg-slate-700 px-4 py-2"
                    onPress={() =>
                      setTmpCurrentGame({
                        ...tmpCurrentGame,
                        roundDuration: tmpCurrentGame.roundDuration + 5,
                      })
                    }
                  >
                    <Text className="text-lg font-bold text-slate-200">+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                disabled={
                  tmpCurrentGame.participants.length < 2 ||
                  tmpCurrentGame.kategorys.length < 1
                }
                className={`rounded-xl border py-2
                    ${
                      tmpCurrentGame.participants.length < 2 ||
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
