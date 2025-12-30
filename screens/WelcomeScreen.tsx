import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { Svg, Path, G } from 'react-native-svg';
import { Colors, Spacing, Typography } from '../theme/colors';

const { width, height } = Dimensions.get('window');

interface WelcomeScreenProps {
  navigation: any;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);
  const slideAnim = new Animated.Value(50);

  useEffect(() => {
    // Animate entrance
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto navigate after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace('MainTabs');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Animated Ticket SVG */}
      <Animated.View
        style={[
          styles.ticketContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Svg width="200" height="200" viewBox="0 0 200 200">
          <G>
            {/* Main Ticket Shape */}
            <Path
              d="M30,50 C30,30 50,30 50,30 L150,30 C150,30 170,30 170,50 L170,150 C170,170 150,170 150,170 L50,170 C50,170 30,170 30,150 Z"
              fill={Colors.primary}
              stroke={Colors.primaryLight}
              strokeWidth="2"
            />
            
            {/* Perforations */}
            <Path
              d="M50,30 L50,170"
              stroke={Colors.background}
              strokeWidth="4"
              strokeDasharray="4,4"
            />
            
            {/* Ticket Details */}
            <Path
              d="M70,70 L130,70"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <Path
              d="M70,90 L130,90"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <Path
              d="M70,110 L130,110"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
            />
            
            {/* Q Logo */}
            <Path
              d="M90,40 C100,35 110,35 120,40 C125,45 125,55 120,60 C115,65 105,65 100,60 C95,55 95,45 100,40"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="3"
            />
            <Path
              d="M110,60 L120,70"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </G>
        </Svg>
      </Animated.View>

      {/* App Name */}
      <Animated.Text
        style={[
          styles.appName,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        QueueLess
      </Animated.Text>

      {/* Tagline */}
      <Animated.Text
        style={[
          styles.tagline,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        Smart Digital Queue System
      </Animated.Text>

      {/* Skip Button */}
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => navigation.replace('MainTabs')}
      >
        <Text style={styles.skipText}>Skip Intro</Text>
      </TouchableOpacity>

      {/* Stats at Bottom */}
      <Animated.View
        style={[
          styles.statsContainer,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>24.5k+</Text>
          <Text style={styles.statLabel}>Hours Saved</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>18.2k+</Text>
          <Text style={styles.statLabel}>Users Served</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>245+</Text>
          <Text style={styles.statLabel}>Partners</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  ticketContainer: {
    marginBottom: Spacing.xxl,
  },
  appName: {
    ...Typography.h1,
    color: Colors.text,
    marginBottom: Spacing.sm,
    letterSpacing: 1,
  },
  tagline: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.xxl,
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.surface + '80',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  skipText: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  statsContainer: {
    position: 'absolute',
    bottom: 60,
    flexDirection: 'row',
    backgroundColor: Colors.surface + '80',
    padding: Spacing.md,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
  },
  statNumber: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: Colors.border,
  },
});

export default WelcomeScreen;