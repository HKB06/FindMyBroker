import React from 'react';

interface Circle {
  size: number; // Taille du cercle en pixels
  left: number; // Position horizontale en pourcentage
  top: number; // Position verticale en pourcentage
}

interface CircleBackgroundProps {
  circles: Circle[]; // Tableau de cercles avec leurs propriétés
  opacity?: number; // Opacité des cercles
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
            transform: `translate(-50%, -50%)`, // Centre le cercle
          }}
        ></div>
      ))}
    </div>
  );
};

export default CircleBackground;