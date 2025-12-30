import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Svg, Path, Circle, G, Text as SvgText } from 'react-native-svg';
import { Colors, Spacing } from '../theme/colors';

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
} 

const BottomTabBar: React.FC<TabBarProps> = ({ state, descriptors, navigation }) => {
  const tabs = [
    {
      name: 'Home',
      icon: (focused: boolean) => (
        <Svg width="24" height="24" viewBox="0 0 24 24">
          <Path
            d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z"
            fill={focused ? Colors.primary : Colors.textSecondary}
          />
        </Svg>
      ),
    },
    {
      name: 'Queue',
      icon: (focused: boolean) => (
        <Svg width="24" height="24" viewBox="0 0 24 24">
          <Path
            d="M4 5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5V7C20 7.55228 19.5523 8 19 8H5C4.44772 8 4 7.55228 4 7V5Z"
            fill={focused ? Colors.primary : Colors.textSecondary}
          />
          <Path
            d="M4 11C4 10.4477 4.44772 10 5 10H19C19.5523 10 20 10.4477 20 11V13C20 13.5523 19.5523 14 19 14H5C4.44772 14 4 13.5523 4 13V11Z"
            fill={focused ? Colors.primary : Colors.textSecondary}
          />
          <Path
            d="M5 16C4.44772 16 4 16.4477 4 17V19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V17C20 16.4477 19.5523 16 19 16H5Z"
            fill={focused ? Colors.primary : Colors.textSecondary}
          />
        </Svg>
      ),
    },
    {
      name: 'Scan',
      icon: (focused: boolean) => (
        <View style={styles.scanButton}>
          <Svg width="28" height="28" viewBox="0 0 28 28">
            <Circle cx="14" cy="14" r="14" fill={Colors.primary} />
            <G transform="translate(7, 7)" fill={Colors.text}>
              <Path d="M0 4H2V0H0V4ZM0 14H2V10H0V14ZM4 4H14V2H4V4ZM4 14H14V12H4V14ZM0 18V20H2V18H0ZM16 0H14V4H16V0ZM16 10H14V14H16V10ZM16 18H14V20H16V18ZM18 20H20V18H18V20ZM18 4H20V0H18V4ZM4 18V20H12V18H4ZM18 10H20V14H18V10Z" />
            </G>
          </Svg>
        </View>
      ),
    },
    {
      name: 'Notifications',
      icon: (focused: boolean) => (
        <Svg width="24" height="24" viewBox="0 0 24 24">
          <Path
            d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z"
            fill={focused ? Colors.primary : Colors.textSecondary}
          />
        </Svg>
      ),
    },
    {
      name: 'Profile',
      icon: (focused: boolean) => (
        <Svg width="24" height="24" viewBox="0 0 24 24">
          <Path
            d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
            fill={focused ? Colors.primary : Colors.textSecondary}
          />
        </Svg>
      ),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const tab = tabs[index];

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={styles.tabButton}
            >
              {tab.icon(isFocused)}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.surface + 'CC',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.lg,
    backdropFilter: 'blur(20px)',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
  },
  scanButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -24,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default BottomTabBar;