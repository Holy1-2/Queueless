import React from 'react';
import Svg, { Path, Circle, G, Line } from 'react-native-svg';
import { Colors } from '../theme/colors';

interface IconProps {
  size?: number;
  color?: string;
}

export const NotificationIcon: React.FC<IconProps> = ({ size = 24, color = Colors.text }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.37 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z"
      fill={color}
    />
    <Circle cx="18" cy="5" r="3" fill={Colors.error} />
  </Svg>
);

export const SettingsIcon: React.FC<IconProps> = ({ size = 24, color = Colors.text }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M19.14 12.94C19.18 12.64 19.2 12.33 19.2 12C19.2 11.67 19.18 11.36 19.14 11.06L21.16 9.35C21.36 9.16 21.4 8.87 21.26 8.63L19.29 5.58C19.15 5.34 18.86 5.26 18.6 5.33L16.17 6.06C15.68 5.69 15.13 5.39 14.54 5.17L14.24 2.66C14.21 2.39 14 2.18 13.73 2.15H10.28C10.01 2.18 9.8 2.39 9.77 2.66L9.47 5.17C8.88 5.39 8.33 5.69 7.84 6.06L5.41 5.33C5.15 5.26 4.86 5.34 4.72 5.58L2.75 8.63C2.61 8.87 2.65 9.16 2.85 9.35L4.87 11.06C4.83 11.36 4.8 11.67 4.8 12C4.8 12.33 4.83 12.64 4.87 12.94L2.85 14.65C2.65 14.84 2.61 15.13 2.75 15.37L4.72 18.42C4.86 18.66 5.15 18.74 5.41 18.67L7.84 17.94C8.33 18.31 8.88 18.61 9.47 18.83L9.77 21.34C9.8 21.61 10.01 21.82 10.28 21.85H13.73C14 21.82 14.21 21.61 14.24 21.34L14.54 18.83C15.13 18.61 15.68 18.31 16.17 17.94L18.6 18.67C18.86 18.74 19.15 18.66 19.29 18.42L21.26 15.37C21.4 15.13 21.36 14.84 21.16 14.65L19.14 12.94ZM12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9C13.66 9 15 10.34 15 12C15 13.66 13.66 15 12 15Z"
      fill={color}
    />
  </Svg>
);
export const HomeIcon = ({ size = 24, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" fill={color} />
  </Svg>
);

export const QueueIcon = ({ size = 24, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M4 5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5V7C20 7.55228 19.5523 8 19 8H5C4.44772 8 4 7.55228 4 7V5Z" fill={color} />
    <Path d="M4 11C4 10.4477 4.44772 10 5 10H19C19.5523 10 20 10.4477 20 11V13C20 13.5523 19.5523 14 19 14H5C4.44772 14 4 13.5523 4 13V11Z" fill={color} />
    <Path d="M5 16C4.44772 16 4 16.4477 4 17V19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V17C20 16.4477 19.5523 16 19 16H5Z" fill={color} />
  </Svg>
);

export const HistoryIcon = ({ size = 24, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 13H11V7H13V13ZM13 17H11V15H13V17Z" fill={color} />
  </Svg>
);

export const ProfileIcon = ({ size = 24, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill={color} />
  </Svg>
);

export const StarIcon: React.FC<IconProps> = ({ size = 24, color = Colors.text }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
      fill={color}
    />
  </Svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ size = 24, color = Colors.text }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z" fill={color} />
  </Svg>
);
export const CalendarIcon = ({ size = 24, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M19 3H18V1H16V3H8V1H6V3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19Z" fill={color} />
    <Path d="M9 10H7V12H9V10Z" fill={color} />
    <Path d="M13 10H11V12H13V10Z" fill={color} />
    <Path d="M17 10H15V12H17V10Z" fill={color} />
    <Path d="M9 14H7V16H9V14Z" fill={color} />
    <Path d="M13 14H11V16H13V14Z" fill={color} />
    <Path d="M17 14H15V16H17V14Z" fill={color} />
  </Svg>
);

export const ClockIcon = ({ size = 24, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 20 12 20ZM12.5 7H11V13L16.2 16.2L17 14.9L12.5 12.2V7Z" fill={color} />
  </Svg>
);

export const CheckIcon = ({ size = 24, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill={color} />
  </Svg>
);

export const ArrowRightIcon = ({ size = 24, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill={color} />
  </Svg>
);


export const LocationIcon: React.FC<IconProps> = ({ size = 24, color = Colors.text }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
      fill={color}
    />
  </Svg>
);

export const DoctorIcon: React.FC<IconProps> = ({ size = 24, color = Colors.text }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
      fill={color}
    />
  </Svg>
);

export const EmergencyIcon: React.FC<IconProps> = ({ size = 24, color = Colors.text }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M21 9L15 15V12H9V18H12L6 24L3 21L9 15V18H15V12L21 6V9Z"
      fill={color}
    />
  </Svg>
);

export const PharmacyIcon: React.FC<IconProps> = ({ size = 24, color = Colors.text }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M21 5H18.82L17 2H7L5.18 5H3C1.9 5 1 5.9 1 7V19C1 20.1 1.9 21 3 21H21C22.1 21 23 20.1 23 19V7C23 5.9 22.1 5 21 5ZM12 18C9.24 18 7 15.76 7 13C7 10.24 9.24 8 12 8C14.76 8 17 10.24 17 13C17 15.76 14.76 18 12 18ZM12 10C10.35 10 9 11.35 9 13C9 14.65 10.35 16 12 16C13.65 16 15 14.65 15 13C15 11.35 13.65 10 12 10Z"
      fill={color}
    />
  </Svg>
);

export const LabIcon: React.FC<IconProps> = ({ size = 24, color = Colors.text }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M19 3H14.82C14.4 1.84 13.3 1 12 1C10.7 1 9.6 1.84 9.18 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM12 3C12.55 3 13 3.45 13 4C13 4.55 12.55 5 12 5C11.45 5 11 4.55 11 4C11 3.45 11.45 3 12 3ZM18 19H6V5H7V8H17V5H18V19Z"
      fill={color}
    />
  </Svg>
);