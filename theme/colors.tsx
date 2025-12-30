import { Platform } from 'react-native';

// Apple SF Pro Display font weights
export const Fonts = {
  light: Platform.select({
    ios: 'System',
    android: 'Inter_300Light',
  }),
  regular: Platform.select({
    ios: 'System',
    android: 'Inter_400Regular',
  }),
  medium: Platform.select({
    ios: 'System',
    android: 'Inter_500Medium',
  }),
  semibold: Platform.select({
    ios: 'System',
    android: 'Inter_600SemiBold',
  }),
  bold: Platform.select({
    ios: 'System',
    android: 'Inter_700Bold',
  }),
};
// If you want to use different fonts for Android (Inter is a good alternative)
export const getFontFamily = (weight: keyof typeof Fonts) => {
  if (Platform.OS === 'ios') {
    return Fonts[weight];
  }
  // Fallback for Android or if font not loaded
  return {
    light: 'Inter_300Light',
    regular: 'Inter_400Regular',
    medium: 'Inter_500Medium',
    semibold: 'Inter_600SemiBold',
    bold: 'Inter_700Bold',
  }[weight];
};

export const Colors = {
  background: '#000000',
  surface: '#1A1A1A',
  surfaceLight: '#2A2A2A',
  surfaceDark: '#0F0F0F',
  
  primary: '#0066FF',
  primaryLight: '#3399FF',
  primaryDark: '#0052CC',
  
  accent: '#00D4AA',
  accentLight: '#33FFD6',
  
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  textMuted: '#666666',
  
  success: '#00CC88',
  warning: '#FFAA00',
  error: '#FF4444',
  info: '#0099FF',
  
  border: '#333333',
  borderLight: '#444444',
};
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  '3xl': 48,
};

export const Typography = {
  largeTitle: {
    fontSize: 34,
    fontWeight: '700' as const,
    lineHeight: 41,
    letterSpacing: -0.41,
  },
  title1: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 34,
    letterSpacing: -0.34,
  },
  title2: {
    fontSize: 22,
    fontWeight: '700' as const,
    lineHeight: 28,
    letterSpacing: -0.26,
  },
  title3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 24,
    letterSpacing: -0.24,
  },
  headline: {
    fontSize: 17,
    fontWeight: '600' as const,
    lineHeight: 22,
    letterSpacing: -0.41,
  },
  body: {
    fontSize: 17,
    fontWeight: '400' as const,
    lineHeight: 22,
    letterSpacing: -0.41,
  },
  callout: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 21,
    letterSpacing: -0.32,
  },
  subhead: {
    fontSize: 15,
    fontWeight: '400' as const,
    lineHeight: 20,
    letterSpacing: -0.24,
  },
  footnote: {
    fontSize: 13,
    fontWeight: '400' as const,
    lineHeight: 18,
    letterSpacing: -0.08,
  },
  caption1: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  caption2: {
    fontSize: 11,
    fontWeight: '400' as const,
    lineHeight: 13,
  },
};