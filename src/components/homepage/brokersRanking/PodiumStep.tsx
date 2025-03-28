import { Winner } from './types'

interface PodiumStepProps {
  podium: Winner[]
  winner: Winner
}

export default function PodiumStep({ podium, winner }: PodiumStepProps) {
  const offset = podium.length - winner.position
  const height = `${200 * (offset / podium.length)}px` // Hauteur dynamique
  // const opacity = 0.1 + offset / podium.length // Opacité dynamique
  const opacity = 1;

  return (
    <div className="flex flex-col items-center">
      {/* Image du gagnant */}
      <div className="self-center mb-1">
        <img
          src="https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109" // URL personnalisée pour l'image
          alt={winner.name} // Texte alternatif avec le nom du gagnant
          className="rounded-full h-11 w-11 overflow-hidden"
        />
      </div>

      {/* Nom du gagnant */}
      <div className="text-sm font-medium text-center mb-1 dark:text-white">
        {winner.name}
      </div>

      {/* Barre du podium */}
      <div
        className="flex place-content-center bg-gradient-to-t from-[#8B5CF6] to-[#D946EF] rounded-t-lg mb-[-1px] w-16"
        style={{
          height, // Hauteur dynamique
          opacity, // Opacité dynamique
        }}
      >
        <span className="self-end text-white">{winner.position + 1}</span>
      </div>
    </div>
  )
}