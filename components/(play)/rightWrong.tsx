import React from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";

import { name } from "@/constants/types";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Audio } from "expo-av";
import type { FlashOverlayHandle } from "./flashOverlay";
import TiltHandler from "./motionDetection";

const RightWrong = ({
  removeFirstName,
  rightAnswer,
  wrongAnswer,
  selectedName,
  flashRef,
}: {
  removeFirstName: () => void;
  rightAnswer: () => void;
  wrongAnswer: () => void;
  selectedName: name | null;
  flashRef: React.RefObject<FlashOverlayHandle | null>;
}) => {
  const { muted, gamePaused, alreadyGuessedNames, setAlreadyGuessedNames } =
    useGlobalContext();

  // Keep the latest values to avoid stale closure issues (e.g. sensor callbacks).
  const mutedRef = React.useRef(muted);
  const gamePausedRef = React.useRef(gamePaused);

  React.useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  React.useEffect(() => {
    gamePausedRef.current = gamePaused;
  }, [gamePaused]);

  async function playSound({ right }: { right: boolean }) {
    try {
      const isMuted = mutedRef.current;
      const isPaused = gamePausedRef.current;

      if (right) {
        const { sound } = await Audio.Sound.createAsync(
          require("../../assets/sounds/correct.mp3"),
        );
        flashRef.current?.open("right");

        if (!isMuted && !isPaused) {
          await sound.playAsync();
        }
        rightAnswer();
      } else {
        const { sound } = await Audio.Sound.createAsync(
          require("../../assets/sounds/wrong.mp3"),
        );
        flashRef.current?.open("wrong");

        if (!isMuted && !isPaused) {
          await sound.playAsync();
        }
        wrongAnswer();
      }

      if (selectedName) {
        setAlreadyGuessedNames((prev: name[]) => [...prev, selectedName]);
      }

      removeFirstName();
    } catch (e) {
      console.log("Error:", e);
    }
  }

  return (
    <View className="flex-1  w-full rounded-2xl border border-slate-800 bg-slate-900/70 p-3">
      <View className="flex-row gap-2 flex-1">
        {Platform.OS != "web" && (
          <TiltHandler
            onForward={() => {
              if (gamePaused) return;
              playSound({ right: true });
            }}
            onBackward={() => {
              if (gamePaused) return;
              playSound({ right: false });
            }}
          />
        )}
        <TouchableOpacity
          disabled={gamePaused}
          onPress={() => playSound({ right: true })}
          className="flex-1 items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-500/10 px-4 py-2.5"
        >
          <Text className="text-center text-sm font-semibold text-emerald-200">
            Got it
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={gamePaused}
          onPress={() => playSound({ right: false })}
          className="flex-1 items-center justify-center rounded-xl border border-rose-400/25 bg-rose-500/10 px-4 py-2.5"
        >
          <Text className="text-center text-sm font-semibold text-rose-200">
            Skip
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RightWrong;
