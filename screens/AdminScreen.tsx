import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';

const AdminScreen = () => {
  const services = [
    { id: 1, name: 'Counter 1', current: 'A023', next: 'A024', status: 'active' },
    { id: 2, name: 'Counter 2', current: 'B015', next: 'B016', status: 'active' },
    { id: 3, name: 'Counter 3', current: '--', next: 'C001', status: 'idle' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Admin Panel</Text>
        <Text style={styles.subtitle}>Queue Management</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {services.map((service) => (
          <View key={service.id} style={styles.counterCard}>
            <View style={styles.counterHeader}>
              <View style={styles.counterInfo}>
                <Text style={styles.counterName}>{service.name}</Text>
                <View style={[styles.statusBadge, 
                  service.status === 'active' ? styles.activeBadge : styles.idleBadge
                ]}>
                  <Text style={styles.statusText}>
                    {service.status === 'active' ? 'Active' : 'Idle'}
                  </Text>
                </View>
              </View>
              <Ionicons name="settings-outline" size={24} color={Colors.textSecondary} />
            </View>

            <View style={styles.counterStats}>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>Current</Text>
                <Text style={styles.statValue}>{service.current}</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>Next</Text>
                <Text style={styles.statValue}>{service.next}</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>Waiting</Text>
                <Text style={styles.statValue}>12</Text>
              </View>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity style={[styles.actionButton, styles.nextButton]}>
                <Ionicons name="play-forward" size={20} color={Colors.text} />
                <Text style={styles.actionText}>Call Next</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, styles.resetButton]}>
                <Ionicons name="refresh" size={20} color={Colors.text} />
                <Text style={styles.actionText}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.floatingButton}>
        <Ionicons name="add" size={24} color={Colors.text} />
      </TouchableOpacity>
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
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  counterCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  counterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  counterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeBadge: {
    backgroundColor: Colors.success + '20',
  },
  idleBadge: {
    backgroundColor: Colors.warning + '20',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  counterStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
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
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  nextButton: {
    backgroundColor: Colors.primary,
  },
  resetButton: {
    backgroundColor: Colors.surfaceLight,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  actionText: {
    color: Colors.text,
    fontWeight: '600',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: Colors.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});

export default AdminScreen;