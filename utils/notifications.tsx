import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const requestNotificationPermissions = async () => {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('queue-updates', {
      name: 'Queue Updates',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#0066FF',
    });
  }

  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
};

export const scheduleQueueNotification = async (queueData) => {
  const { yourNumber, estimatedTime } = queueData;
  
  // Schedule notification 5 minutes before estimated time
  const triggerTime = new Date(Date.now() + (estimatedTime - 5) * 60000);
  
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Your turn is approaching! ⏰',
      body: `Queue ${yourNumber}: Head to the counter in 5 minutes`,
      data: { queueNumber: yourNumber },
      sound: true,
      badge: 1,
    },
    trigger: triggerTime,
  });
};

export const cancelAllNotifications = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};