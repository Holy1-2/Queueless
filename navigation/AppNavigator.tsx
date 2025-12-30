import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import QueueScreen from '../screens/QueueScreen';
import NotificationScreen from '../screens/NotificationScreen';
import AdminScreen from '../screens/AdminScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Colors } from '../theme/colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack Navigator for Queue Flow
const QueueStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.background,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: Colors.text,
      headerTitleStyle: {
        fontWeight: '600',
      },
      cardStyle: {
        backgroundColor: Colors.background,
      },
    }}
  >
    <Stack.Screen 
      name="Home" 
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="Queue" 
      component={QueueScreen}
      options={{ 
        headerShown: false,
        gestureEnabled: true 
      }}
    />
    <Stack.Screen 
      name="Notifications" 
      component={NotificationScreen}
      options={{
        title: 'Notifications',
        headerBackTitle: 'Back',
      }}
    />
  </Stack.Navigator>
);

// Main Tab Navigator
const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        
        switch (route.name) {
          case 'Home':
            iconName = focused ? 'home' : 'home-outline';
            break;
          case 'Notifications':
            iconName = focused ? 'notifications' : 'notifications-outline';
            break;
          case 'Admin':
            iconName = focused ? 'settings' : 'settings-outline';
            break;
          case 'Profile':
            iconName = focused ? 'person' : 'person-outline';
            break;
        }
        
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: Colors.primary,
      tabBarInactiveTintColor: Colors.textSecondary,
      tabBarStyle: {
        backgroundColor: Colors.surface,
        borderTopColor: Colors.border,
        borderTopWidth: 1,
        paddingBottom: 5,
        paddingTop: 5,
        height: 60,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '500',
        marginBottom: 4,
      },
      headerShown: false,
    })}
  >
    <Tab.Screen 
      name="Home" 
      component={QueueStack}
      options={{ 
        title: 'Services',
        unmountOnBlur: true 
      }}
    />
    <Tab.Screen 
      name="Notifications" 
      component={NotificationScreen}
      options={{ 
        title: 'Alerts',
        tabBarBadge: 3 // Demo badge
      }}
    />
    <Tab.Screen 
      name="Admin" 
      component={AdminScreen}
      options={{ 
        title: 'Manage' 
      }}
    />
    <Tab.Screen 
      name="Profile" 
      component={ProfileScreen}
      options={{ 
        title: 'Profile' 
      }}
    />
  </Tab.Navigator>
);

// Root Navigator
const RootStack = createStackNavigator();

const AppNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: Colors.background,
        },
      }}
    >
      <RootStack.Screen name="MainTabs" component={MainTabNavigator} />
    </RootStack.Navigator>
  );
};

export default AppNavigator;