import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';

const ProgressBar = ({ progress = 0, height = 8, color = Colors.primary }) => {
  return (
    <View style={[styles.container, { height }]}>
      <View 
        style={[
          styles.progress, 
          { 
            width: `${progress * 100}%`,
            backgroundColor: color,
            height,
          }
        ]} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surfaceLight,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    borderRadius: 4,
  },
});

export default ProgressBar;