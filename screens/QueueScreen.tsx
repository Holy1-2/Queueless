import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import * as Progress from 'react-native-progress';

const QueueScreen = ({ route, navigation }) => {
  const { service } = route.params;
  const [queueData, setQueueData] = useState({
    yourNumber: '--',
    currentNumber: service.currentNumber,
    peopleAhead: 0,
    estimatedTime: 0,
  });
  const [progress] = useState(new Animated.Value(0));

  useEffect(() => {
    // Simulate queue progress animation
    Animated.timing(progress, {
      toValue: 0.75,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, []);

  const handleTakeNumber = () => {
    const newNumber = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + 
      Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const peopleAhead = Math.floor(Math.random() * 15) + 1;
    const estimatedTime = peopleAhead * service.waitTime;
    
    setQueueData({
      yourNumber: newNumber,
      currentNumber: service.currentNumber,
      peopleAhead,
      estimatedTime,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{service.name}</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.queueCard}>
        <View style={styles.queueInfo}>
          <View style={styles.queueNumberContainer}>
            <Text style={styles.queueLabel}>YOUR NUMBER</Text>
            <Text style={styles.queueNumber}>
              {queueData.yourNumber !== '--' ? queueData.yourNumber : '--'}
            </Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.currentNumberContainer}>
            <Text style={styles.queueLabel}>NOW SERVING</Text>
            <Text style={styles.currentNumber}>{queueData.currentNumber}</Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <Progress.Bar 
            progress={0.6}
            width={null}
            height={8}
            color={Colors.primary}
            unfilledColor={Colors.surfaceLight}
            borderWidth={0}
            borderRadius={4}
          />
          <View style={styles.progressLabels}>
            <Text style={styles.progressText}>You are here</Text>
            <Text style={styles.progressText}>60% complete</Text>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Ionicons name="people-outline" size={24} color={Colors.textSecondary} />
            <Text style={styles.statValue}>{queueData.peopleAhead}</Text>
            <Text style={styles.statLabel}>People Ahead</Text>
          </View>
          
          <View style={styles.statBox}>
            <Ionicons name="time-outline" size={24} color={Colors.textSecondary} />
            <Text style={styles.statValue}>{queueData.estimatedTime}</Text>
            <Text style={styles.statLabel}>Minutes</Text>
          </View>
          
          <View style={styles.statBox}>
            <Ionicons name="alarm-outline" size={24} color={Colors.textSecondary} />
            <Text style={styles.statValue}>
              {queueData.estimatedTime > 0 ? 
                new Date(Date.now() + queueData.estimatedTime * 60000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 
                '--:--'
              }
            </Text>
            <Text style={styles.statLabel}>Estimated Time</Text>
          </View>
        </View>
      </View>

      {queueData.yourNumber === '--' ? (
        <TouchableOpacity 
          style={styles.takeNumberButton}
          onPress={handleTakeNumber}
        >
          <Ionicons name="ticket-outline" size={24} color={Colors.text} />
          <Text style={styles.takeNumberText}>Take Queue Number</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="notifications-outline" size={20} color={Colors.text} />
            <Text style={styles.actionText}>Enable Alerts</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.primaryAction]}>
            <Ionicons name="share-outline" size={20} color={Colors.text} />
            <Text style={[styles.actionText, styles.primaryActionText]}>Share Status</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.infoBox}>
        <Ionicons name="information-circle-outline" size={20} color={Colors.primary} />
        <Text style={styles.infoText}>
          You'll be notified 5 minutes before your turn. Feel free to wait elsewhere!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
  },
  queueCard: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
  },
  queueInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  queueNumberContainer: {
    alignItems: 'center',
    flex: 1,
  },
  currentNumberContainer: {
    alignItems: 'center',
    flex: 1,
  },
  queueLabel: {
    fontSize: 12,
    color: Colors.textMuted,
    marginBottom: 8,
    letterSpacing: 1,
  },
  queueNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.primary,
    letterSpacing: 2,
  },
  currentNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.text,
    letterSpacing: 2,
  },
  divider: {
    width: 1,
    height: 60,
    backgroundColor: Colors.border,
    marginHorizontal: 20,
  },
  progressContainer: {
    marginBottom: 30,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  progressText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  takeNumberButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    marginBottom: 20,
  },
  takeNumberText: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    paddingVertical: 16,
    borderRadius: 12,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  primaryAction: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  actionText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  primaryActionText: {
    color: Colors.text,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceLight,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  infoText: {
    color: Colors.textSecondary,
    fontSize: 14,
    marginLeft: 12,
    flex: 1,
  },
});

export default QueueScreen;