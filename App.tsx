import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';
import AppNavigator from './navigation/AppNavigator';
import { Colors } from './src/theme/colors';
import { QueueProvider } from './src/services/QueueContext';
import { requestNotificationPermissions } from './src/utils/notifications';

export default function App() {
  useEffect(() => {
    // Request notification permissions on app start
    requestNotificationPermissions();
    
    // Handle notifications received while app is foregrounded
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
    });
    
    // Handle notification responses
    const responseSubscription = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification response:', response);
    });
    
    return () => {
      subscription.remove();
      responseSubscription.remove();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <QueueProvider>
        <NavigationContainer
          theme={{
            dark: true,
            colors: {
              primary: Colors.primary,
              background: Colors.background,
              card: Colors.surface,
              text: Colors.text,
              border: Colors.border,
              notification: Colors.primary,
            },
          }}
        >
          <StatusBar style="light" backgroundColor={Colors.background} />
          <AppNavigator />
        </NavigationContainer>
      </QueueProvider>
    </SafeAreaProvider>
  );
}