import React from 'react';

interface Triangle {
  size: number; // Taille du triangle (longueur d'un côté)
  left: number; // Position horizontale en pourcentage
  top: number; // Position verticale en pourcentage
  rotate: number; // Rotation du triangle en degrés (toujours incliné)
}

interface TriangleBackgroundProps {
  triangles: Triangle[]; // Tableau de triangles avec leurs propriétés
  opacity?: number; // Opacité des triangles
}

const TriangleBackground: React.FC<TriangleBackgroundProps> = ({
  triangles,
  opacity = 0.1,
}) => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {triangles.map((triangle, index) => {
        const height = (Math.sqrt(3) / 2) * triangle.size; // Hauteur d'un triangle équilatéral

        return (
          <div
            key={`triangle-${index}`}
            className="absolute"
            style={{
              width: `${triangle.size}px`,
              height: `${height}px`,
              left: `${triangle.left}%`,
              top: `${triangle.top}%`,
              transform: `translate(-50%, -50%) rotate(${triangle.rotate}deg)`, // Centre et fait pivoter le triangle
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', // Crée un triangle équilatéral
              backgroundColor: `rgba(156, 163, 175, ${opacity})`, // Couleur du triangle
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default TriangleBackground;