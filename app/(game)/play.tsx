import DisplayName from "@/components/(play)/displayName";
import RightWrong from "@/components/(play)/rightWrong";
import Score from "@/components/(play)/score";
import TimeBar from "@/components/(play)/timeBar";
import { useGlobalContext } from "@/context/GlobalProvider";
import { getUserFromId } from "@/scripts/game";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

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

  return (
    <View className="flex-1 bg-gray-900 items-center justify-start p-2">
      <TimeBar
        remainingTime={remainingSeconds}
        totalTime={currentGame.roundDuration}
      />
      <Text className="text-white text-lg mb-2">
        It's your turn,{" "}
        {currentGame?.participants[selectedUser] !== undefined
          ? getUserFromId(currentGame.participants[selectedUser])?.name
          : "No user selected"}
      </Text>
      <DisplayName name={names[0].name} kategory={names[0].kategory} />
      <RightWrong />
      <Score
        progress={[
          { username: "Felix", score: 10 },
          { username: "Parmveer", score: 20 },
        ]}
      />
    </View>
  );
};

export default Play;
