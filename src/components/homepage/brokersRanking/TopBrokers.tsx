import podiumData from './data'
import Podium from './Podium'
export default function TopBrokers() {
  return (
    <div className='flex relative justify-center h-max w-scree'>
      <div className="flex flex-col items-center justify-center w-full md:w-10/12 px-12 gap-24 z-20">
        <div className="flex flex-col items-center justify-center gap-6 md:w-1/2 w-full">
          <h2 className="md:text-3xl text-2xl dark:text-white font-bold">
            Nos meilleurs <span className='font-black bg-gradient-to-r from-green-dark to-green-light text-transparent bg-clip-text '>brokers</span>
          </h2>
        </div>
        <div>
          <Podium winners={podiumData} />
        </div>
      </div>
    </div>
  )
}