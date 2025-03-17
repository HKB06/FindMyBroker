import React from 'react'
import TriangleBackground from '../graphics/TriangleBackground';
import { Handshake, Settings2, UserPlus, WandSparkles } from 'lucide-react';

const HowItWorks = () => {
    const triangles = [
        { size: 100, left: 5, top: 60, rotate: 15 },
        { size: 30, left: 1, top: 10, rotate: 45 },
        { size: 80, left: 95, top: 80, rotate: 75 },
        { size:40, left: 95, top: 10, rotate: 105 },
        { size: 150, left: 50, top: 80, rotate: 135 },
    ];
    return (
        <>
            <div className='flex relative justify-center h-max w-screen mt-60 md:py-44 md:mt-30'>
                <TriangleBackground triangles={triangles} opacity={.5} />
                <div className="flex flex-col items-center justify-center w-full md:w-10/12 px-12 py-24 gap-24 z-20">
                    <div className="flex flex-col items-center justify-center gap-6 md:w-1/2 w-full">
                        <h2 className="md:text-3xl text-2xl dark:text-white font-bold underline underline-offset-4 decoration-[#8B5CF6]">
                            Comment ça marche ?
                        </h2>
                        <p className="text-base dark:text-gray-400">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                    <div className="grid lg:grid-cols-4 gap-8 w-full ">
                        <div className='flex flex-col justify-center items-center gap-4 bg-white dark:bg-[#1F2937] p-8 rounded-lg border border-gray-300 dark:border-gray-700'>
                            <div className='bg-[#8B5CF6]/20 rounded-full w-max flex items-center justify-center p-4'>
                                <UserPlus size={24} className='text-[#8B5CF6]' />
                            </div>
                            <h3 className='font-semibold dark:text-white'>
                                Create profile
                            </h3>
                            <span className='dark:text-gray-200 text-center'>
                                Sign up and tell us about your investment needs
                            </span>
                        </div>

                        <div className='flex flex-col justify-center items-center gap-4 bg-white dark:bg-[#1F2937] p-8 rounded-lg border border-gray-300 dark:border-gray-700'>
                            <div className='bg-[#D946EF]/20 rounded-full w-max flex items-center justify-center p-4'>
                                <Settings2 size={24} className='text-[#D946EF]' />
                            </div>
                            <h3 className='font-semibold dark:text-white'>
                                Set preferences
                            </h3>
                            <span className='dark:text-gray-200 text-center'>
                                Specify your investment goals and preferences
                            </span>
                        </div>

                        <div className='flex flex-col justify-center items-center gap-4 bg-white dark:bg-[#1F2937] p-8 rounded-lg border border-gray-300 dark:border-gray-700'>
                            <div className='bg-[#8B5CF6]/20 rounded-full w-max flex items-center justify-center p-4'>
                                <WandSparkles size={24} className='text-[#8B5CF6]' />
                            </div>
                            <h3 className='font-semibold dark:text-white'>
                                Get Matches
                            </h3>
                            <span className='dark:text-gray-200 text-center'>
                                Receive customized broker recommendations
                            </span>
                        </div>

                        <div className='flex flex-col justify-center items-center gap-4 bg-white dark:bg-[#1F2937] p-8 rounded-lg border border-gray-300 dark:border-gray-700'>
                            <div className='bg-[#D946EF]/20 rounded-full w-max flex items-center justify-center p-4'>
                                <Handshake size={24} className='text-[#D946EF]' />
                            </div>
                            <h3 className='font-semibold dark:text-white'>
                                Connect
                            </h3>
                            <span className='dark:text-gray-200 text-center'>
                                Start working with your chosen broker
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HowItWorks