import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Carousel from '../components/Carousel';
import GlassCard from '../components/GlassCard';
import { Colors, Spacing, Typography } from '../theme/colors';
import {
  NotificationIcon,
  DoctorIcon,CalendarIcon,
  EmergencyIcon,
  PharmacyIcon,
  LabIcon,
  LocationIcon,
} from '../components/Icons';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {



  const recentVisits = [
    { id: '1', service: 'Cardiology', doctor: 'Dr. Smith', date: 'Today, 10:30 AM' },
    { id: '2', service: 'Dental', doctor: 'Dr. Johnson', date: 'Yesterday' },
    { id: '3', service: 'General Checkup', doctor: 'Dr. Williams', date: 'Dec 12' },
  ];

  const handleServicePress = (service: any) => {
    navigation.navigate('Queue', { service });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.userName}>Alex Morgan</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <NotificationIcon />
        </TouchableOpacity>
      </View>

      {/* Services Grid */}
      <Text style={styles.sectionTitle}>Hospital Services</Text>
   

      {/* Carousel */}
      <Carousel onItemPress={handleServicePress} />

      {/* Quick Actions */}
      
      {/* Recent Visits */}
      <Text style={styles.sectionTitle}>Recent Visits</Text>
      {recentVisits.map((visit) => (
        <GlassCard key={visit.id} style={styles.visitCard}>
          <View style={styles.visitContent}>
            <View style={styles.visitIcon}>
              <DoctorIcon />
            </View>
            <View style={styles.visitInfo}>
              <Text style={styles.visitService}>{visit.service}</Text>
              <Text style={styles.visitDoctor}>{visit.doctor}</Text>
            </View>
            <View style={styles.visitDate}>
              <Text style={styles.dateText}>{visit.date}</Text>
            </View>
          </View>
        </GlassCard>
      ))}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.lg,
  },
  greeting: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  userName: {
    ...Typography.h2,
    color: Colors.text,
    marginTop: 2,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.text,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    marginTop: Spacing.lg,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  serviceCard: {
    width: '48%',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: Spacing.md,
    marginRight: '4%',
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  serviceIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  serviceTitle: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: '600',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  actionCard: {
    width: '48%',
    marginRight: '4%',
    marginBottom: Spacing.md,
    padding: Spacing.md,
    alignItems: 'center',
  },
  actionIconContainer: {
    marginBottom: Spacing.sm,
  },
  actionTitle: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: '500',
    textAlign: 'center',
  },
  visitCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  visitContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
  },
  visitIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  visitInfo: {
    flex: 1,
  },
  visitService: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: '600',
    marginBottom: 2,
  },
  visitDoctor: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  visitDate: {
    alignItems: 'flex-end',
  },
  dateText: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
});

export default HomeScreen;