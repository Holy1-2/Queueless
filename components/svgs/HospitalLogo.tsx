import React from 'react';
import { Svg, Path, Circle, G, Rect } from 'react-native-svg';

export const HospitalLogo = ({ size = 40, color = '#0066FF' }) => (
  <Svg width={size} height={size} viewBox="0 0 40 40">
    <Circle cx="20" cy="20" r="18" fill={color} opacity="0.1" />
    <G transform="translate(8, 8)">
      <Rect x="2" y="2" width="20" height="20" rx="3" fill={color} />
      <Path d="M12 2V22" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <Path d="M2 12H22" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <Path d="M8 2V6" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <Path d="M16 2V6" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </G>
  </Svg>
);