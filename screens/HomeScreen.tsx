import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useQueue } from '../services/QueueContext';
import { Colors } from '../theme/colors';

const HomeScreen = ({ navigation }) => {
  const { services } = useQueue();

  const ServiceCard = ({ service }) => {
    const iconMap = {
      bank: 'business',
      hospital: 'medkit',
      building: 'business',
      mail: 'mail'
    };

    return (
      <TouchableOpacity
        style={styles.serviceCard}
        onPress={() => navigation.navigate('Queue', { service })}
      >
        <View style={styles.cardHeader}>
          <Ionicons name={iconMap[service.icon]} size={32} color={Colors.primary} />
          <View style={styles.waitTimeBadge}>
            <Text style={styles.waitTimeText}>{service.waitTime} min avg</Text>
          </View>
        </View>
        
        <Text style={styles.serviceName}>{service.name}</Text>
        <Text style={styles.currentNumber}>Now serving: {service.currentNumber}</Text>
        
        <View style={styles.cardFooter}>
          <Text style={styles.availableText}>Available</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>QueueLess</Text>
        <Text style={styles.subtitle}>Smart Waiting System</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Ionicons name="time-outline" size={24} color={Colors.primary} />
          <Text style={styles.statNumber}>24.5k+</Text>
          <Text style={styles.statLabel}>Hours Saved</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="people-outline" size={24} color={Colors.primary} />
          <Text style={styles.statNumber}>18.2k+</Text>
          <Text style={styles.statLabel}>Users Served</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="business-outline" size={24} color={Colors.primary} />
          <Text style={styles.statNumber}>245+</Text>
          <Text style={styles.statLabel}>Partners</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Available Services</Text>
      <FlatList
        data={services}
        renderItem={({ item }) => <ServiceCard service={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
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
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.text,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  serviceCard: {
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
    alignItems: 'center',
    marginBottom: 15,
  },
  waitTimeBadge: {
    backgroundColor: Colors.primary + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  waitTimeText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  serviceName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  currentNumber: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 15,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 15,
  },
  availableText: {
    color: Colors.success,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default HomeScreen;