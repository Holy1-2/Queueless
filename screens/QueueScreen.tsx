import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Animated,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import QueueVisualization from '../components/QueueVisualization';
import { Colors, Spacing, Typography } from '../theme/colors';
import {
  ArrowRightIcon,
  ClockIcon,
  CalendarIcon,
  CheckIcon,
  SettingsIcon,
  DoctorIcon,
  NotificationIcon,
} from '../components/Icons';

interface QueueScreenProps {
  route: any;
  navigation: any;
}

const QueueScreen: React.FC<QueueScreenProps> = ({ route, navigation }) => {
  const { service = { 
    title: 'General Consultation', 
    icon: <DoctorIcon />,
    description: 'Comprehensive medical evaluation and diagnosis by specialist doctors.',
    location: 'Level 3, Consultation Wing',
    waitTime: '5-7 min per person'
  } } = route.params || {};
  
  const [hasBooked, setHasBooked] = useState(false);
  const [queueData, setQueueData] = useState({
    currentNumber: 'P023',
    yourNumber: '',
    position: 8,
    totalPeople: 12,
    estimatedWait: 40,
    bookingCode: '',
  });

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [timer, setTimer] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (hasBooked) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [hasBooked]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
      if (timer % 2 === 0 && queueData.position > 0 && hasBooked) {
        setQueueData(prev => ({
          ...prev,
          position: prev.position - 1,
          estimatedWait: Math.max(0, prev.estimatedWait - 5),
        }));
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [timer, hasBooked]);

  const generateBookingCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleBookPosition = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    const bookingCode = generateBookingCode();
    const letters = 'PQRSTUVWXYZ';
    const letter = letters[Math.floor(Math.random() * letters.length)];
    const number = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const queueNumber = `${letter}${number}`;
    
    const position = Math.floor(Math.random() * 8) + 3;
    const waitTime = position * 5;
    
    setQueueData({
      currentNumber: 'P023',
      yourNumber: queueNumber,
      position,
      totalPeople: position + 7,
      estimatedWait: waitTime,
      bookingCode,
    });
    
    setHasBooked(true);
    
    Alert.alert(
      'Position Booked',
      `Your booking code: ${bookingCode}\n\nQueue: ${queueNumber}\nPosition: ${position}\nEst. wait: ${waitTime} minutes`,
      [{ text: 'Continue' }]
    );
  };

  const handleNotificationToggle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setNotificationsEnabled(!notificationsEnabled);
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            navigation.goBack();
          }}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Queue</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <SettingsIcon />
        </TouchableOpacity>
      </View>

      {/* Service Info Card */}
      <View style={styles.serviceCard}>
        <View style={styles.serviceHeader}>
          <View style={styles.serviceIcon}>
            {service.icon}
          </View>
          <View style={styles.serviceInfo}>
            <Text style={styles.serviceTitle}>{service.title}</Text>
            <View style={styles.serviceStats}>
              <View style={styles.statItem}>
                <ClockIcon size={14} color={Colors.textSecondary} />
                <Text style={styles.statText}>{service.waitTime}</Text>
              </View>
            </View>
          </View>
        </View>
        <Text style={styles.serviceDescription}>{service.description}</Text>
        <View style={styles.locationRow}>
          <View style={styles.locationDot} />
          <Text style={styles.locationText}>{service.location}</Text>
        </View>
      </View>

      {/* Queue Status Card */}
      <View style={styles.queueStatusCard}>
        <Text style={styles.queueStatusTitle}>Current Queue</Text>
        <View style={styles.queueNumbers}>
          <View style={styles.numberBox}>
            <Text style={styles.numberLabel}>NOW SERVING</Text>
            <Text style={styles.currentNumber}>{queueData.currentNumber}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.numberBox}>
            <Text style={styles.numberLabel}>IN QUEUE</Text>
            <Text style={styles.queueCount}>{queueData.totalPeople}</Text>
          </View>
        </View>
      </View>

      {/* Main Content */}
      {!hasBooked ? (
        <View style={styles.bookSection}>
          <View style={styles.bookInfoCard}>
            <View style={styles.bookIconContainer}>
              <CalendarIcon size={28} color={Colors.primary} />
            </View>
            <Text style={styles.bookTitle}>Join the Queue</Text>
            <Text style={styles.bookDescription}>
              Book your position and receive real-time updates. You'll be notified 15 minutes before your turn.
            </Text>
          </View>

          <TouchableOpacity 
            style={styles.bookButton}
            onPress={handleBookPosition}
            activeOpacity={0.8}
          >
            <Text style={styles.bookButtonText}>Book Position</Text>
            <ArrowRightIcon color={Colors.text} />
          </TouchableOpacity>
        </View>
      ) : (
        <Animated.View style={[styles.bookedSection, { opacity: fadeAnim }]}>
          {/* Booking Confirmation */}
          <View style={styles.confirmationCard}>
            <View style={styles.confirmationHeader}>
              <View style={styles.successBadge}>
                <CheckIcon size={16} color={Colors.success} />
              </View>
              <Text style={styles.confirmationTitle}>Position Booked</Text>
            </View>
            
            <View style={styles.bookingInfo}>
              <View style={styles.bookingCodeContainer}>
                <Text style={styles.bookingCodeLabel}>BOOKING CODE</Text>
                <Text style={styles.bookingCode}>{queueData.bookingCode}</Text>
              </View>
              <View style={styles.queueNumberContainer}>
                <Text style={styles.queueNumberLabel}>YOUR NUMBER</Text>
                <Text style={styles.queueNumber}>{queueData.yourNumber}</Text>
              </View>
            </View>
          </View>

          {/* Queue Visualization */}
          <QueueVisualization
            currentNumber={queueData.currentNumber}
            yourNumber={queueData.yourNumber}
            totalPeople={queueData.totalPeople}
            position={queueData.position}
          />

          {/* Time & Notifications */}
          <View style={styles.timeNotificationCard}>
            <View style={styles.timeContainer}>
              <ClockIcon size={20} color={Colors.primary} />
              <View style={styles.timeInfo}>
                <Text style={styles.timeLabel}>TIME REMAINING</Text>
                <Text style={styles.timeValue}>{formatTime(queueData.estimatedWait)}</Text>
              </View>
            </View>
            
            <View style={styles.notificationContainer}>
              <View style={styles.notificationHeader}>
                <NotificationIcon size={20} color={Colors.textSecondary} />
                <Text style={styles.notificationTitle}>Notifications</Text>
              </View>
              <Text style={styles.notificationText}>
                You will be notified 15 minutes before your turn
              </Text>
              <TouchableOpacity 
                style={[styles.notificationToggle, notificationsEnabled && styles.notificationToggleActive]}
                onPress={handleNotificationToggle}
              >
                <View style={[styles.toggleCircle, notificationsEnabled && styles.toggleCircleActive]} />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  backIcon: {
    fontSize: 20,
    color: Colors.text,
  },
  headerTitle: {
    ...Typography.h2,
    color: Colors.text,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  serviceCard: {
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  serviceStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Spacing.lg,
  },
  statText: {
    ...Typography.small,
    color: Colors.textSecondary,
    marginLeft: Spacing.xs,
  },
  serviceDescription: {
    ...Typography.caption,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginRight: Spacing.sm,
  },
  locationText: {
    ...Typography.small,
    color: Colors.text,
  },
  queueStatusCard: {
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  queueStatusTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  queueNumbers: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberBox: {
    flex: 1,
    alignItems: 'center',
  },
  numberLabel: {
    ...Typography.small,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
    letterSpacing: 1,
  },
  currentNumber: {
    ...Typography.h1,
    color: Colors.primary,
    fontSize: 36,
    letterSpacing: 2,
  },
  queueCount: {
    ...Typography.h1,
    color: Colors.text,
    fontSize: 36,
  },
  divider: {
    width: 1,
    height: 60,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.lg,
  },
  bookSection: {
    paddingHorizontal: Spacing.lg,
  },
  bookInfoCard: {
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.lg,
    alignItems: 'center',
  },
  bookIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  bookTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  bookDescription: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.lg,
    borderRadius: 16,
    gap: Spacing.sm,
  },
  bookButtonText: {
    ...Typography.h3,
    color: Colors.text,
    fontWeight: '600',
  },
  bookedSection: {
    paddingHorizontal: Spacing.lg,
  },
  confirmationCard: {
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.lg,
  },
  confirmationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  successBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.success + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  confirmationTitle: {
    ...Typography.h3,
    color: Colors.text,
  },
  bookingInfo: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  bookingCodeContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.surfaceLight,
    padding: Spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  bookingCodeLabel: {
    ...Typography.small,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
    letterSpacing: 1,
  },
  bookingCode: {
    ...Typography.h3,
    color: Colors.primary,
    letterSpacing: 2,
  },
  queueNumberContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.surfaceLight,
    padding: Spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  queueNumberLabel: {
    ...Typography.small,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
    letterSpacing: 1,
  },
  queueNumber: {
    ...Typography.h3,
    color: Colors.text,
  },
  timeNotificationCard: {
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.xxl,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  timeInfo: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  timeLabel: {
    ...Typography.small,
    color: Colors.textSecondary,
    marginBottom: 2,
    letterSpacing: 1,
  },
  timeValue: {
    ...Typography.h2,
    color: Colors.text,
  },
  notificationContainer: {
    backgroundColor: Colors.surfaceLight,
    padding: Spacing.lg,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  notificationTitle: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: '600',
    marginLeft: Spacing.sm,
  },
  notificationText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
    lineHeight: 18,
  },
  notificationToggle: {
    width: 52,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.border,
    padding: 2,
    alignSelf: 'flex-end',
  },
  notificationToggleActive: {
    backgroundColor: Colors.primary,
  },
  toggleCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    transform: [{ translateX: 0 }],
  },
  toggleCircleActive: {
    transform: [{ translateX: 24 }],
  },
});

export default QueueScreen;