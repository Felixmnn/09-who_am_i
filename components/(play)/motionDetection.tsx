import { Accelerometer } from "expo-sensors";
import { useEffect, useRef } from "react";

export default function TiltHandler({
  onForward,
  onBackward,
}: {
  onForward?: () => void;
  onBackward?: () => void;
}) {
  const lastState = useRef<"neutral" | "forward" | "backward">("neutral");
  const lastTriggerAtMs = useRef(0);

  useEffect(() => {
    Accelerometer.setUpdateInterval(200);

    // Grund: Hysterese und Cooldown verhindern, dass kleine Bewegungen oder Sensorrauschen zu mehrfachen Auslösungen führen. Nur deutliche Kippbewegungen werden erkannt und nach jedem Trigger gibt es eine Sperrzeit.
    const sub = Accelerometer.addListener(({ z }) => {
      let currentState: "neutral" | "forward" | "backward" =
        lastState.current;

      // Hysteresis: require stronger tilt to enter forward/backward,
      // and a wide neutral zone to avoid sensor-noise bouncing.
      if (lastState.current === "neutral") {
        if (z < -0.85) {
          currentState = "forward";
        } else if (z > 0.85) {
          currentState = "backward";
        }
      } else if (Math.abs(z) < 0.35) {
        currentState = "neutral";
      }

      if (currentState !== lastState.current) {
        const now = Date.now();
        const inCooldown = now - lastTriggerAtMs.current < 1200;

        if (currentState === "forward") {
          if (!inCooldown) {
            onForward && onForward();
            lastTriggerAtMs.current = now;
          }
        }

        if (currentState === "backward") {
          if (!inCooldown) {
            onBackward && onBackward();
            lastTriggerAtMs.current = now;
          }
        }

        lastState.current = currentState;
      }
    });

    return () => sub.remove();
  }, []);

  return null;
}
