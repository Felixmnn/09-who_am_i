/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

// Neue, mattere Farbpalette
const tintColorLight = "#4b79c9";
const tintColorDark = "#c79a52";

export const Colors = {
  light: {
    blueFrame: "#5d7fb8", // matter Blauton für Rahmen
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    border: "#d7dce5", // weiches Grau-Blau für Border
    optionBgSelected: "#e3e9f4", // mattes Blau-Grau für ausgewählt
    optionBgUnselected: "#f1f3f7", // dezentes Off-White für nicht ausgewählt
    optionBorderSelected: tintColorLight,
    optionBorderUnselected: "#e5e7eb",
  },
  dark: {
    blueFrame: "#5d7fb8", // matter Blauton für Rahmen
    text: "#fff", // Immer weißer Text
    background: "#152d5f", // matter, dunkler Blauton
    componentBackground: "#1e3a8a", // etwas helleres, matteres Blau für Komponenten
    componentBorder: "#3554a9", // matter Blauton für Komponenten-Rahmen
    tint: tintColorDark,
    icon: "#5d7fb8", // matter Sekundärton
    tabIconDefault: "#5d7fb8",
    tabIconSelected: tintColorDark,
    border: "#5d7fb8", // matter Rahmen
    optionBgSelected: "#3f5f99", // gedämpftes Blau für ausgewählt
    optionBgUnselected: "#294985", // dunkler, matter Ton für nicht ausgewählt
    optionBorderSelected: "#5289c7", // matter Gold-Akzent
    optionBorderUnselected: "#5d7fb8", // matter Blauton für nicht ausgewählt
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
