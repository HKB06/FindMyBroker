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
      style={{
        alignContent: 'flex-end',
        alignItems: 'flex-end',
        borderBottom: '1px solid #e5e7eb',
        display: 'grid',
        gap: '.5rem',
        gridAutoFlow: 'column dense',
        justifyContent: 'center',
        justifyItems: 'center',
        height: 250,
        marginTop: '2rem',
      }}
    >
      {podium.map((winner) => (
        <PodiumStep key={winner.id} podium={podium} winner={winner} />
      ))}
    </div>
  )
}