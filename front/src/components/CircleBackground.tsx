import React from 'react';

interface Circle {
  size: number; 
  left: number; 
  top: number; 
}

interface CircleBackgroundProps {
  circles: Circle[]; 
  opacity?: number; 
}

const CircleBackground: React.FC<CircleBackgroundProps> = ({
  circles,
  opacity = 0.1,
}) => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {circles.map((circle, index) => (
        <div
          key={`circle-${index}`}
          className="absolute rounded-full border-1 border-dashed border-gray-300 dark:border-gray-700"
          style={{
            width: `${circle.size}px`,
            height: `${circle.size}px`,
            left: `${circle.left}%`,
            top: `${circle.top}%`,
            opacity: opacity,
            transform: `translate(-50%, -50%)`, 
          }}
        ></div>
      ))}
    </div>
  );
};

export default CircleBackground;