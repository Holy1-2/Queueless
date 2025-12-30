import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';

const QueueCard = ({ queue, onPress, showActions = true }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return Colors.success;
      case 'waiting':
        return Colors.warning;
      case 'completed':
        return Colors.info;
      default:
        return Colors.textSecondary;
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.serviceName}>{queue.service}</Text>
          <Text style={styles.location}>{queue.location || 'Main Branch'}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(queue.status) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(queue.status) }]}>
            {queue.status?.toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.queueInfo}>
        <View style={styles.infoRow}>
          <Ionicons name="ticket-outline" size={16} color={Colors.textSecondary} />
          <Text style={styles.infoLabel}>Your Number:</Text>
          <Text style={styles.infoValue}>{queue.yourNumber}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={16} color={Colors.textSecondary} />
          <Text style={styles.infoLabel}>Now Serving:</Text>
          <Text style={styles.infoValue}>{queue.currentNumber}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="people-outline" size={16} color={Colors.textSecondary} />
          <Text style={styles.infoLabel}>Ahead:</Text>
          <Text style={styles.infoValue}>{queue.peopleAhead} people</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="hourglass-outline" size={16} color={Colors.textSecondary} />
          <Text style={styles.infoLabel}>Est. Time:</Text>
          <Text style={styles.infoValue}>{queue.estimatedTime} minutes</Text>
        </View>
      </View>

      {showActions && (
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="notifications-outline" size={18} color={Colors.text} />
            <Text style={styles.actionText}>Remind Me</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.primaryAction]}>
            <Ionicons name="share-outline" size={18} color={Colors.text} />
            <Text style={[styles.actionText, styles.primaryActionText]}>Share</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  queueInfo: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 8,
    marginRight: 4,
    width: 100,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surfaceLight,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 8,
  },
  primaryAction: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  actionText: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  primaryActionText: {
    color: Colors.text,
  },
});

export default QueueCard;