import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';

const NotificationScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [soundEnabled, setSoundEnabled] = React.useState(true);
  const [vibrationEnabled, setVibrationEnabled] = React.useState(true);

  const notifications = [
    {
      id: '1',
      title: 'Your turn is approaching!',
      message: 'Queue A023: You have 5 minutes remaining',
      time: '2 min ago',
      read: false,
      type: 'warning',
    },
    {
      id: '2',
      title: 'Queue Updated',
      message: 'Current serving: A021 - 2 people ahead of you',
      time: '15 min ago',
      read: true,
      type: 'info',
    },
    {
      id: '3',
      title: 'Welcome to QueueLess!',
      message: 'Get started by taking your first queue number',
      time: '1 day ago',
      read: true,
      type: 'success',
    },
  ];

  const getIconByType = (type) => {
    switch (type) {
      case 'warning':
        return { name: 'warning', color: Colors.warning };
      case 'info':
        return { name: 'information-circle', color: Colors.info };
      case 'success':
        return { name: 'checkmark-circle', color: Colors.success };
      default:
        return { name: 'notifications', color: Colors.primary };
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
        <Text style={styles.subtitle}>Stay updated on your queue status</Text>
      </View>

      <View style={styles.settingsCard}>
        <Text style={styles.settingsTitle}>Notification Settings</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Ionicons name="notifications" size={24} color={Colors.text} />
            <View style={styles.settingText}>
              <Text style={styles.settingLabel}>Push Notifications</Text>
              <Text style={styles.settingDescription}>Receive queue updates</Text>
            </View>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: Colors.border, true: Colors.primary }}
            thumbColor={Colors.text}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Ionicons name="volume-high" size={24} color={Colors.text} />
            <View style={styles.settingText}>
              <Text style={styles.settingLabel}>Sound</Text>
              <Text style={styles.settingDescription}>Play notification sound</Text>
            </View>
          </View>
          <Switch
            value={soundEnabled}
            onValueChange={setSoundEnabled}
            trackColor={{ false: Colors.border, true: Colors.primary }}
            thumbColor={Colors.text}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Ionicons name="phone-portrait" size={24} color={Colors.text} />
            <View style={styles.settingText}>
              <Text style={styles.settingLabel}>Vibration</Text>
              <Text style={styles.settingDescription}>Vibrate on notification</Text>
            </View>
          </View>
          <Switch
            value={vibrationEnabled}
            onValueChange={setVibrationEnabled}
            trackColor={{ false: Colors.border, true: Colors.primary }}
            thumbColor={Colors.text}
          />
        </View>

        <TouchableOpacity style={styles.advancedButton}>
          <Text style={styles.advancedButtonText}>Advanced Settings</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Recent Notifications</Text>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {notifications.map((notification) => {
          const icon = getIconByType(notification.type);
          
          return (
            <TouchableOpacity 
              key={notification.id} 
              style={[
                styles.notificationCard,
                !notification.read && styles.unreadCard
              ]}
            >
              <View style={styles.notificationIcon}>
                <Ionicons name={icon.name} size={24} color={icon.color} />
              </View>
              
              <View style={styles.notificationContent}>
                <View style={styles.notificationHeader}>
                  <Text style={styles.notificationTitle}>{notification.title}</Text>
                  {!notification.read && <View style={styles.unreadDot} />}
                </View>
                <Text style={styles.notificationMessage}>{notification.message}</Text>
                <Text style={styles.notificationTime}>{notification.time}</Text>
              </View>
              
              <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <TouchableOpacity style={styles.clearAllButton}>
        <Text style={styles.clearAllText}>Clear All Notifications</Text>
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
  settingsCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 16,
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  advancedButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    marginTop: 8,
  },
  advancedButtonText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  notificationCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  unreadCard: {
    backgroundColor: Colors.surfaceLight,
    borderColor: Colors.primary + '40',
  },
  notificationIcon: {
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginRight: 8,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  notificationMessage: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  clearAllButton: {
    backgroundColor: Colors.surface,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  clearAllText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NotificationScreen;