import React from 'react'
import { Button } from '../ui/button';


const ReadyCTA = () => {
  return (
    <>
      <div className='flex relative justify-center h-max w-screen md:py-20 md:mt-0 bg-gradient-to-b from-green-dark to-green-light'>
        <div className='absolute top-0 lef-0 w-full h-full bg-gradient-to-b from-transparent to-black/50'></div>
        <div className="flex flex-col items-start md:items-center justify-start md:justify-center w-full md:w-10/12 px-12 py-24 gap-12 z-20">
          <div className="flex flex-col items-center justify-center gap-6 md:w-1/2 w-full">
            <h2 className="md:text-3xl text-2xl text-white font-bold">
              Prêts à trouver les brokers qui&nbsp;
              <span className='font-black text-green-light uppercase'>
                vous&nbsp;
              </span>
              sont adaptés ?
            </h2>
            <p className="text-base text-white">Join thousands of satisfied investors who found their ideal broker match through our platform.</p>
          </div>
          <Button className="py-6 px-8 cursor-pointer text-md md:text-lg text-white bg-green-dark hover:bg-green-light/30">
            Let's go ! 🚀
          </Button>
        </div>
      </div>
    </>
  )
}

export default ReadyCTA