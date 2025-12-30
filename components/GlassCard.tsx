import React, { ReactNode } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
  StyleProp,
  Platform,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Colors, Spacing } from '../theme/colors';

interface GlassCardProps extends TouchableOpacityProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  intensity?: number;
  tint?: 'light' | 'dark' | 'default' | 'extraLight';
  borderWidth?: number;
  borderRadius?: number;
  shadow?: boolean;
  blurType?: 'light' | 'dark' | 'xlight' | 'regular' | 'prominent';
  fallbackOpacity?: number;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  intensity = 80,
  tint = 'dark',
  borderWidth = 1,
  borderRadius = 20,
  shadow = true,
  blurType = 'regular',
  fallbackOpacity = 0.1,
  ...props
}) => {
  // For web or when blur is not supported
  const isBlurSupported = Platform.OS !== 'web';

  if (!isBlurSupported) {
    return (
      <TouchableOpacity
        style={[
          styles.container,
          shadow && styles.shadow,
          {
            borderRadius,
            borderWidth,
            borderColor: Colors.border + '80',
            backgroundColor: Colors.surface + Math.round(fallbackOpacity * 255).toString(16),
          },
          style,
        ]}
        activeOpacity={0.8}
        {...props}
      >
        <View style={styles.content}>
          {children}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        shadow && styles.shadow,
        {
          borderRadius,
          borderWidth,
          borderColor: Colors.border + '80',
        },
        style,
      ]}
      activeOpacity={0.8}
      {...props}
    >
      <BlurView
        intensity={intensity}
        tint={tint}
        style={[
          styles.blurContainer,
          {
            borderRadius: borderRadius - 1,
          },
        ]}
      >
        {/* Gradient overlay for better glass effect */}
        <View
          style={[
            styles.gradientOverlay,
            {
              borderRadius: borderRadius - 1,
              backgroundColor: Colors.surface + '20',
            },
          ]}
        />
        
        {/* Inner shine effect */}
        <View style={styles.shineEffect} />
        
        {/* Content */}
        <View style={styles.content}>
          {children}
        </View>
      </BlurView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  shadow: {
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
  blurContainer: {
    flex: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  shineEffect: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 1,
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
});

export default GlassCard;