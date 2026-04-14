import DisplayName from "@/components/(play)/displayName";
import RightWrong from "@/components/(play)/rightWrong";
import TimeBar from "@/components/(play)/timeBar";
import { currentGame, gameResultPlayer } from "@/constants/types";
import { useGlobalContext } from "@/context/GlobalProvider";
import { getUserFromId } from "@/scripts/game";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import histroyNames from "../../assets/names/history.json";
import mediaNames from "../../assets/names/media.json";
import politicsNames from "../../assets/names/politics.json";
import scienceNames from "../../assets/names/science.json";
import sportsNames from "../../assets/names/sports.json";

const Play = () => {
  const { currentGame, setCurrentGame, gamePaused, blacklist, setBlacklist } =
    useGlobalContext();
  const [selectedUser, setSelectedUser] = React.useState(0);
  const [remainingSeconds, setRemainingSeconds] = React.useState(
    currentGame ? currentGame.roundDuration : 0,
  );

  function getNamesForGame() {
    const selectedNames = [];
    //TSK: Später anpassen sodass nach schwierigkeit gefiltert wird sowie nach Blacklist und Custom Names
    for (let i = 0; i < currentGame.kategorys.length; i++) {
      const category = currentGame.kategorys[i];
      switch (category) {
        case "history":
          selectedNames.push(...histroyNames);
          break;
        case "media":
          selectedNames.push(...mediaNames);
          break;
        case "politics":
          selectedNames.push(...politicsNames);
          break;
        case "science":
          selectedNames.push(...scienceNames);
          break;
        case "sports":
          selectedNames.push(...sportsNames);
          break;
        default:
          break;
      }
    }
    return selectedNames;
  }

  const [names, setNames] = React.useState(getNamesForGame());

  function removeFirstName() {
    setNames((prevNames) => prevNames.slice(1));
  }
  function rightAnswer() {
    setCurrentGame((prev: currentGame) => {
      if (!prev) return prev;
      const updatedAnswers = [
        ...prev.answers,
        {
          questionId: names[0].id,
          name: names[0].name,
          difficulty: names[0].difficulty,
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
    setCurrentGame((prev: currentGame) => {
      if (!prev) return prev;
      const updatedAnswers = [
        ...prev.answers,
        {
          questionId: names[0].id,
          name: names[0].name,
          difficulty: names[0].difficulty,
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
      ? getUserFromId(currentGame.participants[selectedUser])?.name
      : "No user selected";

  return (
    <SafeAreaView className="flex-1 bg-slate-950 px-4 py-3">
      <View className="flex-row">
        <View className="flex-1 rounded-3xl border border-slate-800 bg-slate-900/80 px-4 py-4">
          <View className="mb-3 flex-row items-center justify-between">
            <View className="flex-row items-center justify-center">
              <View className=" w-[50px] h-[50px] rounded-full border border-slate-800 bg-slate-900/80 mr-2 items-center justify-center">
                <Text className="text-lg font-semibold text-slate-100">
                  {currentGame.gameResults
                    .filter((result: gameResultPlayer) =>
                      currentGame.participants[selectedUser]
                        ? result.participantId ===
                          currentGame.participants[selectedUser]
                        : false,
                    )
                    .reduce(
                      (total: number, result: gameResultPlayer) =>
                        total + result.pointsEarned,
                      0,
                    )}
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
            <View className="rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2">
              <Text className="text-xs text-slate-400">Time Left</Text>
              <Text className="text-lg font-bold text-emerald-300">
                {remainingSeconds}s
              </Text>
            </View>
          </View>

          <TimeBar
            remainingTime={remainingSeconds}
            totalTime={currentGame.roundDuration}
          />
        </View>
        <TouchableOpacity
          onPress={() => router.push("/home")}
          className="ml-3  rounded-3xl border border-slate-800 bg-slate-900/80 px-4 py-4 items-center justify-center"
        >
          <FontAwesome name="home" size={24} color="gold" />
        </TouchableOpacity>
      </View>
      <View className="mt-4 flex-1">
        <View className="flex-row">
          <View className="flex-1">
            <DisplayName name={names[0].name} kategory={names[0].difficulty} />
          </View>
          <TouchableOpacity className="ml-3  rounded-3xl border border-slate-800 bg-slate-900/80 px-4 py-4 items-center justify-center">
            <FontAwesome name="list" size={24} color="gold" />
          </TouchableOpacity>
        </View>
        <View className="mt-4 flex-1">
          <RightWrong
            removeFirstName={removeFirstName}
            rightAnswer={rightAnswer}
            wrongAnswer={wrongAnswer}
          />
        </View>
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
