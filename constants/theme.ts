/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

// switch the primary/tint color to a golf-friendly green
// this will be used throughout the app for buttons, tabs, etc.
const tintColorLight = '#2e7d32'; // a rich green
const tintColorDark = '#fff';

/** Global Masters/golf theme palette – use these for consistent styling across Home, Leagues, etc. */
export const Masters = {
  green: '#346C50',
  greenDark: '#0B6623',
  cream: '#DAD9D4',
  creamAlt: '#EBE6DC',
  darkBg: '#21483C',
  darkBgAlt: '#152515',
  gold: '#D4AF37',
  goldBright: '#fce300',
  cardBorder: 'rgba(11, 102, 35, 0.4)',
  cardBorderLight: 'rgba(11, 102, 35, 0.6)',
  cardTextLight: '#1a2e1a',
  cardTextDark: '#E8E4DC',
  headerBgLight: '#0B6623',
  headerBgDark: '#012512',
} as const;

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
