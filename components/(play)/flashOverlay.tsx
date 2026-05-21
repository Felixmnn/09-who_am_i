import { forwardRef, useImperativeHandle, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";

export type FlashOverlayHandle = {
  open: (type: "right" | "wrong") => void;
};

const FlashOverlay = forwardRef<FlashOverlayHandle>((_, ref) => {
  const [visible, setVisible] = useState(false);
  const opacity = useState(new Animated.Value(0))[0];
  const [color, setColor] = useState("transparent");

  useImperativeHandle(ref, () => ({
    open: (type: "right" | "wrong") => {
      const flashColor = type === "right" ? "green" : "red";
      setColor(flashColor);
      setVisible(true);

      opacity.setValue(0); // wichtig: reset

      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setVisible(false);
      });
    },
  }));

  if (!visible) {
    return null;
  }

  return (
    <View pointerEvents="none" style={styles.overlayContainer}>
      <Animated.View
        style={[StyleSheet.absoluteFill, { backgroundColor: color, opacity }]}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
    elevation: 999,
  },
});

export default FlashOverlay;
