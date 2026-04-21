import { Accelerometer } from "expo-sensors";
import { useEffect, useRef } from "react";

export default function TiltHandler({
  onForward,
  onBackward,
}: {
  onForward?: () => void;
  onBackward?: () => void;
}) {
  const lastState = useRef("neutral");

  useEffect(() => {
    Accelerometer.setUpdateInterval(200);

    const sub = Accelerometer.addListener(({ z }) => {
      let currentState = "neutral";

      // nach vorne kippen
      if (z < -0.7) {
        currentState = "forward";
      }

      // nach hinten kippen
      else if (z > 0.6) {
        currentState = "backward";
      }

      if (currentState !== lastState.current) {
        if (currentState === "forward") {
          onForward && onForward();
        }

        if (currentState === "backward") {
          onBackward && onBackward();
        }

        lastState.current = currentState;
      }
    });

    return () => sub.remove();
  }, []);

  return null;
}
