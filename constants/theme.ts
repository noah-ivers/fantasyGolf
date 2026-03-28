/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { DarkTheme, DefaultTheme, type Theme } from '@react-navigation/native';
import { Platform } from 'react-native';

/** Primary accent — high-contrast on dark (Spotify-style green). */
const accent = '#1DB954';

const tintColorLight = '#1a7f37';
const tintColorDark = accent;

/**
 * Semantic surfaces and text. Dark mode is tuned like Spotify / VS Code: near-black bases,
 * lifted cards, subtle borders, crisp accent.
 */
export const Masters = {
  green: '#1a7f37',
  greenDark: accent,
  cream: '#f0f0f0',
  creamAlt: '#ffffff',
  darkBg: '#121212',
  darkBgAlt: '#1e1e1e',
  gold: accent,
  goldBright: '#ffffff',
  cardBorder: 'rgba(255, 255, 255, 0.1)',
  cardBorderLight: 'rgba(0, 0, 0, 0.08)',
  cardTextLight: '#141414',
  cardTextDark: '#b3b3b3',
  headerBgLight: '#e8e8e8',
  headerBgDark: '#0d0d0d',
  /** Muted line for outlined controls (light). */
  secondaryActionBorder: 'rgba(0, 0, 0, 0.12)',
  secondaryActionBackground: 'transparent',
  link: '#4ea3ff',
  linkLight: '#0969da',
  danger: '#f85149',
} as const;

export const Colors = {
  light: {
    text: '#141414',
    background: '#f0f0f0',
    tint: tintColorLight,
    icon: '#6e6e6e',
    tabIconDefault: '#6e6e6e',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#e8e8e8',
    background: Masters.darkBg,
    tint: tintColorDark,
    icon: '#8b8b8b',
    tabIconDefault: '#8b8b8b',
    tabIconSelected: accent,
  },
};

/** React Navigation — matches app dark surfaces. */
export const NavigationDarkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: accent,
    background: Masters.darkBg,
    card: Masters.darkBgAlt,
    text: '#ffffff',
    border: 'rgba(255, 255, 255, 0.12)',
    notification: accent,
  },
};

/** React Navigation — clean light surfaces. */
export const NavigationLightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: tintColorLight,
    background: Colors.light.background,
    card: Masters.creamAlt,
    text: Colors.light.text,
    border: 'rgba(0, 0, 0, 0.08)',
    notification: tintColorLight,
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
