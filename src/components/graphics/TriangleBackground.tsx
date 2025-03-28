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

        // Points du triangle équilatéral
        const points = `
          ${triangle.size / 2},0 
          0,${height} 
          ${triangle.size},${height}
        `;

        return (
          <svg
            key={`triangle-${index}`}
            className="absolute animate-[spin_15000ms_linear_infinite]"
            style={{
              left: `${triangle.left}%`,
              top: `${triangle.top}%`,
              // transform: `rotate(${triangle.rotate}deg)`,
              width: `${triangle.size}px`,
              height: `${height}px`,
            }}
            viewBox={`-1 -1 ${triangle.size + 2} ${height + 2}`} // Agrandir le viewBox
            preserveAspectRatio="xMidYMid meet"
          >
            <polygon
              points={points}
              fill="transparent" // Fond transparent
              // stroke={`rgba(209, 213, 220, ${opacity})`} // Couleur du contour
              className='stroke-gray-300 dark:stroke-gray-700'
              strokeWidth="2" // Épaisseur du contour
              strokeDasharray="3" // Contour en pointillé
              strokeLinejoin="round" // Lisser les jointures
            />
          </svg>
        );
      })}
    </div>
  );
};

export default TriangleBackground;