import PodiumStep from './PodiumStep'
import { Winner } from './types'

export default function Podium({ winners }: { winners: Winner[] }) {
  const podium = [8, 6, 4, 2, 0, 1, 3, 5, 7, 9]
    .reduce<Winner[]>((podiumOrder, position) => {
      if (winners[position]) {
        return [...podiumOrder, { ...winners[position], position }]
      }
      return podiumOrder
    }, [])
    .filter(Boolean)

  return (
    <div
      className='flex items-end justify-center border-b border-[#e5e7eb] h-60 mt-24 gap-2 lg:gap-8'
    >
      {podium.map((winner) => (
        <PodiumStep key={winner.id} podium={podium} winner={winner} />
      ))}
    </div>
  )
}