import DisplayName from "@/components/(play)/displayName";
import type { FlashOverlayHandle } from "@/components/(play)/flashOverlay";
import FlashOverlay from "@/components/(play)/flashOverlay";
import RightWrong from "@/components/(play)/rightWrong";
import TimeBar from "@/components/(play)/timeBar";
import { currentGame, gameResultPlayer, name, users } from "@/constants/types";
import { useGlobalContext } from "@/context/GlobalProvider";
import { getNextName } from "@/scripts/algorithm";
import { FontAwesome } from "@expo/vector-icons";
import { Redirect, router } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useEffect, useRef } from "react";
import {
  Platform,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import histroyNames from "../../assets/names/history.json";
import mediaNames from "../../assets/names/media.json";
import politicsNames from "../../assets/names/politics.json";
import scienceNames from "../../assets/names/science.json";
import sportsNames from "../../assets/names/sports.json";

type CustomNamesMap = Record<string, name[]>;

function shuffleNames<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function getNamesForGame(
  currentGame: currentGame | null,
  customNames: CustomNamesMap,
  blackList: name[] | null,
): name[] {
  if (!currentGame) {
    return [];
  }

  const selectedNames: name[] = [];

  for (const category of currentGame.kategorys) {
    switch (category) {
      case "history":
        selectedNames.push(...histroyNames, ...customNames.history);
        break;
      case "media":
        selectedNames.push(...mediaNames, ...customNames.media);
        break;
      case "politics":
        selectedNames.push(...politicsNames, ...customNames.politics);
        break;
      case "science":
        selectedNames.push(...scienceNames, ...customNames.science);
        break;
      case "sports":
        selectedNames.push(...sportsNames, ...customNames.sports);
        break;
      case "custom":
        selectedNames.push(...customNames.custom);
        break;
      default:
        break;
    }
  }

  const filteredNames = blackList?.length
    ? selectedNames.filter(
      (currentName) =>
        !blackList.some(
          (blacklisted: name) => blacklisted.name === currentName.name,
        ),
    )
    : selectedNames;

  return shuffleNames(filteredNames);
}

const Play = () => {
  const {
    currentGame,
    setCurrentGame,
    gamePaused,
    setGamePaused,
    blackList,
    setBlackList,
    muted,
    setMuted,
    lastGameResults,
    setLastGameResults,
    users,
    setUsers,
    customNames,
    alreadyGuessedNames,
  } = useGlobalContext();

  const hasValidParticipants = React.useMemo(() => {
    if (!currentGame || !Array.isArray(currentGame.participants)) {
      return false;
    }

    return currentGame.participants.some((participantId: number) =>
      users.some((user: users) => user.id === participantId),
    );
  }, [currentGame, users]);

  useEffect(() => {
    if (currentGame && !hasValidParticipants) {
      setGamePaused(false);
      setCurrentGame(null);
    }
  }, [currentGame, hasValidParticipants, setCurrentGame, setGamePaused]);

  const shouldRedirect =
    !currentGame || !currentGame.gameResults || !hasValidParticipants;

  useEffect(() => {
    if (Platform.OS === "web") return; // Landscape lock ist auf Web nicht relevant
    // Landscape lock aktivieren
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT,
    );

    return () => {
      // Optional: wieder entsperren beim Verlassen
      ScreenOrientation.unlockAsync();
    };
  }, []);

  const { width } = useWindowDimensions();

  const [selectedUser, setSelectedUser] = React.useState(0);
  const [remainingSeconds, setRemainingSeconds] = React.useState(
    currentGame ? currentGame.roundDuration : 0,
  );

  const namesForGame = React.useMemo(
    () => getNamesForGame(currentGame, customNames, blackList),
    [currentGame, customNames, blackList],
  );

  const [names, setNames] = React.useState<name[]>(namesForGame);
  const lastSelectedUserIdRef = React.useRef<number | null>(null);
  const [currentName, setCurrentName] = React.useState<name | null>(null);

  React.useEffect(() => {
    setNames(namesForGame);
  }, [namesForGame]);

  useEffect(() => {
    if (!currentGame) {
      setSelectedUser(0);
      setRemainingSeconds(0);
      return;
    }

    if (selectedUser >= currentGame.participants.length) {
      setSelectedUser(0);
    }

    setRemainingSeconds(currentGame.roundDuration);
  }, [currentGame, selectedUser]);

  // Grund: currentName wird jetzt lokal verwaltet, damit die Anzeige stabil bleibt und nicht durch globale State-Änderungen springt.

  function removeNameById(nameId: string | null | undefined) {
    if (!nameId) {
      return;
    }

    setNames((prevNames) =>
      prevNames.filter((existingName) => existingName.id !== nameId),
    );
  }
  // Grund: Entfernt gezielt einen Namen anhand der ID, statt immer nur das erste Element zu löschen.

  useEffect(() => {
    if (!blackList || blackList.length === 0) {
      return;
    }

    setNames((prevNames) =>
      prevNames.filter(
        (currentName) =>
          !blackList.some(
            (blacklisted: name) => blacklisted.name === currentName.name,
          ),
      ),
    );
  }, [blackList]);
  const userId = currentGame?.participants?.[selectedUser];
  const user =
    userId !== undefined
      ? users.find((candidate: users) => candidate.id === userId) || null
      : null;
  // Grund: Nutzer werden jetzt direkt aus dem aktuellen users-Array gesucht, nicht mehr über eine Hilfsfunktion mit globalem Kontext.

  useEffect(() => {
    const selectedUserChanged = lastSelectedUserIdRef.current !== userId;

    setCurrentName((prevName: name | null) => {
      const hasCurrentName =
        !!prevName && names.some((candidate) => candidate.id === prevName.id);

      // Keep the displayed name stable during countdown ticks.
      if (!selectedUserChanged && hasCurrentName) {
        return prevName;
      }

      return getNextName({ names, user, alreadyGuessedNames });
    });

    lastSelectedUserIdRef.current = userId ?? null;
  }, [names, user, userId, alreadyGuessedNames]);
  // Grund: Sorgt dafür, dass der Name nur wechselt, wenn sich der Nutzer ändert oder ein Name entfernt wurde.

  function rightAnswer() {
    if (!currentName) {
      return;
    }

    setCurrentGame((prev: currentGame) => {
      if (!prev) return prev;
      const updatedAnswers = [
        ...prev.answers,
        {
          questionId: currentName.id,
          name: currentName.name,
          difficulty: currentName.difficulty,
          correct: true,
          byParticipant: currentGame.participants[selectedUser],
        },
      ];
      const updatedGameResults = [...prev.gameResults];
      const participantResult = updatedGameResults.find(
        (result) =>
          result.participantId === currentGame.participants[selectedUser],
      );
      if (participantResult) {
        participantResult.pointsEarned += 10;
      }

      return {
        ...prev,
        answers: updatedAnswers,
        gameResults: updatedGameResults,
      };
    });
  }
  function wrongAnswer() {
    if (!currentName) {
      return;
    }

    setCurrentGame((prev: currentGame) => {
      if (!prev) return prev;
      const updatedAnswers = [
        ...prev.answers,
        {
          questionId: currentName.id,
          name: currentName.name,
          difficulty: currentName.difficulty,
          correct: false,
          byParticipant: currentGame.participants[selectedUser],
        },
      ];
      return {
        ...prev,
        answers: updatedAnswers,
      };
    });
  }
  //Dieser Use Effect zählt die verbleibende Zeit herunter, wenn das Spiel nicht pausiert ist
  //Wird 0 erreicht, wird der nächste Teilnehmer ausgewählt und die Zeit zurückgesetzt
  useEffect(() => {
    if (!currentGame) return;
    if (!gamePaused) {
      const timer = setInterval(() => {
        setRemainingSeconds((prev: any) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            //Nächsten Teilnehmer auswählen
            setSelectedUser((prevUser) => {
              const nextUser = (prevUser + 1) % currentGame.participants.length;
              return nextUser;
            });
            return currentGame.roundDuration; //Zeit zurücksetzen
          }
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gamePaused, currentGame]);

  const activePlayerName =
    currentGame?.participants[selectedUser] !== undefined
      ? users.find(
        (candidate: users) =>
          candidate.id === currentGame.participants[selectedUser],
      )?.name
      : "No user selected";
  const hasNames = names.length > 0 && !!currentName;

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
      console.error("Error saving game results:", error);
    }
    setCurrentGame(null);
    router.push("/home");
  }
  const flashRef = useRef<FlashOverlayHandle | null>(null);

  if (shouldRedirect) {
    return <Redirect href="/(quiz)/home" />;
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-950 px-4 py-3">
      <FlashOverlay ref={flashRef} />

      <View className="flex-row">
        <View className="flex-1 rounded-3xl border border-slate-800 bg-slate-900/80 px-4 py-4">
          <View className="mb-3 flex-row items-center justify-between">
            <View className="flex-row items-center justify-center">
              <View className=" w-[50px] h-[50px] rounded-full border border-slate-800 bg-slate-900/80 mr-2 items-center justify-center">
                <Text className="text-lg font-semibold text-slate-100">
                  {currentGame?.gameResults
                    ?.filter((result: gameResultPlayer) =>
                      currentGame.participants?.[selectedUser]
                        ? result.participantId ===
                        currentGame.participants[selectedUser]
                        : false,
                    )
                    .reduce(
                      (total: number, result: gameResultPlayer) =>
                        total + result.pointsEarned,
                      0,
                    ) ?? 0}
                </Text>
              </View>
              <View>
                <Text className="text-xs uppercase tracking-[2px] text-slate-400">
                  Active Round
                </Text>
                <Text className="mt-1 text-2xl font-bold text-slate-50">
                  {activePlayerName}
                </Text>
              </View>
            </View>

            {width > 400 && (
              <View className="rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2">
                <Text className="text-xs text-slate-400">Time Left</Text>
                <Text className="text-lg font-bold text-emerald-300">
                  {remainingSeconds}s
                </Text>
              </View>
            )}
          </View>

          <TimeBar
            remainingTime={remainingSeconds}
            totalTime={currentGame.roundDuration}
          />
        </View>
        <View className="">
          <View className="flex-row mb-1">
            <TouchableOpacity
              onPress={stopGame}
              className="ml-3  rounded-full border border-slate-800 bg-slate-900/80 px-4 py-3 items-center justify-center"
            >
              <FontAwesome name="stop" size={24} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/home")}
              className="ml-3  rounded-full border border-slate-800 bg-slate-900/80 px-4 py-3 items-center justify-center"
            >
              <FontAwesome name="home" size={24} color="gray" />
            </TouchableOpacity>
          </View>
          <View className="flex-row">
            <TouchableOpacity
              onPress={() => setGamePaused((prev: boolean) => !prev)}
              className="ml-3  rounded-full border border-slate-800 bg-slate-900/80 px-4 py-3 items-center justify-center"
            >
              <FontAwesome
                name={gamePaused ? "play" : "pause"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setMuted((prev: boolean) => !prev)}
              className="ml-3  rounded-full border border-slate-800 bg-slate-900/80 px-4 py-3 items-center justify-center"
            >
              <FontAwesome
                name={muted ? "volume-off" : "volume-up"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="mt-4 flex-1">
        <View className="flex-row">
          <View className="flex-1">
            {hasNames ? (
              <DisplayName
                name={currentName.name}
                kategory={currentName.difficulty}
                onAddToBlacklist={() => {
                  setBlackList((prev: name[]) => {
                    if (
                      (prev ?? []).some(
                        (blacklisted: name) =>
                          blacklisted.name === currentName.name,
                      )
                    ) {
                      return prev;
                    }
                    return [...(prev ?? []), currentName];
                  });
                  removeNameById(currentName.id);
                }}
              />
            ) : (
              <View className="min-h-[220px] items-center justify-center rounded-3xl border border-slate-800 bg-slate-900/80 px-6">
                <Text className="text-center text-2xl font-bold text-slate-100">
                  Keine Namen mehr vorhanden
                </Text>
              </View>
            )}
          </View>
        </View>
        {hasNames && (
          <View className="mt-4 flex-1">
            <RightWrong
              removeFirstName={removeNameById}
              rightAnswer={rightAnswer}
              wrongAnswer={wrongAnswer}
              selectedName={currentName}
              flashRef={flashRef}
            />
          </View>
        )}
        {/*}
        <View className="mt-4 flex-1">
          <Score progress={currentGame.gameResults} />
        </View>
        */}
      </View>
    </SafeAreaView>
  );
};

export default Play;
