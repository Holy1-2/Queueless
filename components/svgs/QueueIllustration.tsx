import React from 'react';
import { Svg, Path, Circle, G, Rect } from 'react-native-svg';

export const QueueIllustration = ({ size = 200, active = 3, total = 8 }) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    {/* Background */}
    <Circle cx="100" cy="100" r="95" fill="#1A1A1A" stroke="#333333" strokeWidth="2" />
    
    {/* Queue circles */}
    {[...Array(total)].map((_, i) => {
      const angle = (i / total) * 2 * Math.PI;
      const cx = 100 + 70 * Math.cos(angle);
      const cy = 100 + 70 * Math.sin(angle);
      const isActive = i < active;
      
      return (
        <G key={i}>
          <Circle cx={cx} cy={cy} r="15" fill={isActive ? "#0066FF" : "#333333"} />
          <Circle cx={cx} cy={cy} r="12" fill={isActive ? "#3399FF" : "#444444"} />
          <Circle cx={cx} cy={cy} r="8" fill={isActive ? "white" : "#666666"} />
          <Path
            d={`M${cx - 5} ${cy - 5} L${cx + 5} ${cy + 5} M${cx + 5} ${cy - 5} L${cx - 5} ${cy + 5}`}
            stroke={isActive ? "#0066FF" : "#444444"}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </G>
      );
    })}
    
    {/* Center indicator */}
    <Circle cx="100" cy="100" r="20" fill="#0066FF" opacity="0.2" />
    <Circle cx="100" cy="100" r="15" fill="#0066FF" opacity="0.4" />
    <Circle cx="100" cy="100" r="10" fill="#0066FF" />
    <Path
      d="M95 100 L100 105 L105 100"
      stroke="white"
      strokeWidth="2"
      fill="none"
    />
  </Svg>
);