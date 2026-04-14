import DisplayName from "@/components/(play)/displayName";
import RightWrong from "@/components/(play)/rightWrong";
import Score from "@/components/(play)/score";
import TimeBar from "@/components/(play)/timeBar";
import { useGlobalContext } from "@/context/GlobalProvider";
import { getUserFromId } from "@/scripts/game";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Play = () => {
  const { currentGame, gamePaused } = useGlobalContext();
  const [selectedUser, setSelectedUser] = React.useState(0);
  const [remainingSeconds, setRemainingSeconds] = React.useState(
    currentGame ? currentGame.roundDuration : 0,
  );

  const names = [
    {
      id: 1,
      name: "Felix",
      kategory: "media",
    },
  ];

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
      <View className="rounded-3xl border border-slate-800 bg-slate-900/80 px-4 py-4">
        <View className="mb-3 flex-row items-center justify-between">
          <View>
            <Text className="text-xs uppercase tracking-[2px] text-slate-400">
              Active Round
            </Text>
            <Text className="mt-1 text-2xl font-bold text-slate-50">
              {activePlayerName}
            </Text>
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

      <View className="mt-4 flex-1">
        <View className="">
          <DisplayName name={names[0].name} kategory={names[0].kategory} />
        </View>
        <View className="mt-4 flex-1">
          <RightWrong />
        </View>

        <View className="mt-4 flex-1">
          <Score
            progress={[
              { username: "Felix", score: 10 },
              { username: "Parmveer", score: 20 },
            ]}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Play;
