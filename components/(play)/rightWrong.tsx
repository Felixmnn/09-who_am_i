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
  removeFirstName: (nameId: string | null | undefined) => void;
  rightAnswer: () => void;
  wrongAnswer: () => void;
  selectedName: name | null;
  flashRef: React.RefObject<FlashOverlayHandle | null>;
}) => {
  const { muted, gamePaused, alreadyGuessedNames, setAlreadyGuessedNames } =
    useGlobalContext();

  // Keep latest state without extra effects to avoid callback churn.
  const mutedRef = React.useRef(muted);
  const gamePausedRef = React.useRef(gamePaused);
  const handlingInputRef = React.useRef(false);

  mutedRef.current = muted;
  gamePausedRef.current = gamePaused;

  async function playSound({ right }: { right: boolean }) {
    if (handlingInputRef.current) {
      return;
    }

    try {
      handlingInputRef.current = true;
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

      removeFirstName(selectedName?.id); // Grund: Es wird jetzt die ID des Namens verwendet, um gezielt das richtige Element zu entfernen und Mehrdeutigkeiten zu vermeiden.
    } catch (e) {
      console.log("Error:", e);
    } finally {
      // Small cooldown prevents repeated sensor-trigger bursts.
      setTimeout(() => {
        handlingInputRef.current = false;
      }, 220);
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
