import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Svg, Circle, G, Line, Text as SvgText } from 'react-native-svg';
import { Colors, Spacing, Typography } from '../theme/colors';

const { width } = Dimensions.get('window');
const SIZE = width - 60;
const RADIUS = SIZE / 2 - 40;

interface QueueVisualizationProps {
  currentNumber: string;
  yourNumber: string;
  totalPeople: number;
  position: number;
}

const QueueVisualization: React.FC<QueueVisualizationProps> = ({
  currentNumber,
  yourNumber,
  totalPeople = 12,
  position = 3,
}) => {
  const [queueData, setQueueData] = useState<any[]>([]);

  useEffect(() => {
    const data = Array.from({ length: totalPeople }, (_, i) => ({
      id: i + 1,
      number: `P${(100 + i).toString().slice(1)}`,
      isCurrent: i === 0,
      isYou: i === position,
      isPassed: i < position,
    }));
    setQueueData(data);
  }, [totalPeople, position]);

  const renderQueueItem = (item: any, index: number) => {
    const angle = (index / totalPeople) * 2 * Math.PI - Math.PI / 2;
    const cx = SIZE / 2 + RADIUS * Math.cos(angle);
    const cy = SIZE / 2 + RADIUS * Math.sin(angle);
    const radius = 20;

    return (
      <G key={item.id}>
        {/* Connection line */}
        {index > 0 && (
          <Line
            x1={cx}
            y1={cy}
            x2={SIZE / 2 + RADIUS * Math.cos((index - 1) / totalPeople * 2 * Math.PI - Math.PI / 2)}
            y2={SIZE / 2 + RADIUS * Math.sin((index - 1) / totalPeople * 2 * Math.PI - Math.PI / 2)}
            stroke={Colors.border}
            strokeWidth={1}
            strokeDasharray={item.isPassed ? "0" : "4,4"}
          />
        )}

        {/* Queue circle */}
        <Circle
          cx={cx}
          cy={cy}
          r={radius}
          fill={
            item.isCurrent
              ? Colors.primary
              : item.isYou
              ? Colors.accent
              : item.isPassed
              ? Colors.success + '20'
              : Colors.surface
          }
          stroke={
            item.isCurrent
              ? Colors.primary
              : item.isYou
              ? Colors.accent
              : Colors.border
          }
          strokeWidth={item.isCurrent || item.isYou ? 2 : 1}
        />
        
        {/* Number */}
        <SvgText
          x={cx}
          y={cy + 5}
          textAnchor="middle"
          fill={
            item.isCurrent || item.isYou
              ? Colors.text
              : Colors.textSecondary
          }
          fontSize="12"
          fontWeight="600"
        >
          {item.number}
        </SvgText>

        {/* Status indicator */}
        {item.isCurrent && (
          <Circle cx={cx} cy={cy - radius - 6} r="3" fill={Colors.primary} />
        )}
        {item.isYou && (
          <Circle cx={cx} cy={cy + radius + 6} r="3" fill={Colors.accent} />
        )}
      </G>
    );
  };

  return (
    <View style={styles.container}>
      <Svg width={SIZE} height={SIZE} style={styles.svg}>
        {/* Outer circle */}
        <Circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS + 25}
          fill="none"
          stroke={Colors.border + '30'}
          strokeWidth={1}
        />
        
        {/* Queue items */}
        {queueData.map(renderQueueItem)}
        
        {/* Center circle */}
        <Circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={40}
          fill={Colors.surface}
          stroke={Colors.border}
          strokeWidth={1}
        />
        
        {/* Center text */}
        <G>
          <SvgText
            x={SIZE / 2}
            y={SIZE / 2 - 8}
            textAnchor="middle"
            fill={Colors.textSecondary}
            fontSize="11"
            fontWeight="500"
          >
            NOW SERVING
          </SvgText>
          <SvgText
            x={SIZE / 2}
            y={SIZE / 2 + 14}
            textAnchor="middle"
            fill={Colors.primary}
            fontSize="20"
            fontWeight="600"
          >
            {currentNumber}
          </SvgText>
        </G>
      </Svg>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.currentDot]} />
          <Text style={styles.legendText}>Current</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.yourDot]} />
          <Text style={styles.legendText}>You</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.passedDot]} />
          <Text style={styles.legendText}>Passed</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  svg: {
    marginVertical: Spacing.lg,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.lg,
    marginTop: Spacing.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: Spacing.xs,
  },
  currentDot: {
    backgroundColor: Colors.primary,
  },
  yourDot: {
    backgroundColor: Colors.accent,
  },
  passedDot: {
    backgroundColor: Colors.success,
  },
  legendText: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
});

export default QueueVisualization;