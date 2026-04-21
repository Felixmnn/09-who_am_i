import { forwardRef, useImperativeHandle, useState } from "react";
import { Animated, Modal, StyleSheet, View } from "react-native";

export type FlashOverlayHandle = {
  open: (type: "right" | "wrong") => void;
};

const FlashOverlay = forwardRef<FlashOverlayHandle>((_, ref) => {
  const [visible, setVisible] = useState(false);
  const opacity = useState(new Animated.Value(0))[0];
  const [color, setColor] = useState("transparent");

  useImperativeHandle(ref, () => ({
    open: (type: "right" | "wrong") => {
      console.log("FlashOverlay opened with type:", type);
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

  return (
    <Modal visible={visible} transparent animationType="none">
      <View style={StyleSheet.absoluteFill}>
        <Animated.View
          pointerEvents="none"
          style={[StyleSheet.absoluteFill, { backgroundColor: color, opacity }]}
        />
      </View>
    </Modal>
  );
});

export default FlashOverlay;
