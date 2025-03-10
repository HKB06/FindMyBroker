import React from 'react';

interface Triangle {
  size: number; 
  left: number; 
  top: number; 
  rotate: number; 
}

interface TriangleBackgroundProps {
  triangles: Triangle[]; 
  opacity?: number; 
}

const TriangleBackground: React.FC<TriangleBackgroundProps> = ({
  triangles,
  opacity = 0.1,
}) => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {triangles.map((triangle, index) => {
        const height = (Math.sqrt(3) / 2) * triangle.size; 

        return (
          <div
            key={`triangle-${index}`}
            className="absolute"
            style={{
              width: `${triangle.size}px`,
              height: `${height}px`,
              left: `${triangle.left}%`,
              top: `${triangle.top}%`,
              transform: `translate(-50%, -50%) rotate(${triangle.rotate}deg)`, 
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', 
              backgroundColor: `rgba(156, 163, 175, ${opacity})`,
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default TriangleBackground;