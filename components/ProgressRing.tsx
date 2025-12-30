import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Svg, Path, Circle, G, Text as SvgText } from 'react-native-svg';
import { Colors, Typography } from '../theme/colors';

interface ProgressRingProps {
  size?: number;
  progress?: number;
  strokeWidth?: number;
  text?: string;
  subtitle?: string;
  color?: string;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  size = 200,
  progress = 75,
  strokeWidth = 12,
  text,
  subtitle,
  color = Colors.primary,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={Colors.surfaceLight}
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {/* Progress Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          fill="none"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        
        {/* Center Text */}
        <G>
          <SvgText
            x={size / 2}
            y={size / 2 - 10}
            textAnchor="middle"
            fill={Colors.text}
            fontSize="32"
            fontWeight="bold"
          >
            {text || `${progress}%`}
          </SvgText>
          {subtitle && (
            <SvgText
              x={size / 2}
              y={size / 2 + 20}
              textAnchor="middle"
              fill={Colors.textSecondary}
              fontSize="14"
            >
              {subtitle}
            </SvgText>
          )}
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProgressRing;