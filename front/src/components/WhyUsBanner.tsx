import { Bot, CircleHelp, Clock } from 'lucide-react'
import React from 'react'
import CircleBackground from './CircleBackground'
import TriangleBackground from './TriangleBackground';

const WhyUsBanner = () => {
        const circles = [
            { size: 200, left: 10, top: 30 },
            { size: 150, left: 30, top: 50 },
            { size: 100, left: 80, top: 25 },
            { size: 250, left: 80, top: 70 },
            { size: 120, left: 35, top: 85 },
        ];
        

        return (
            <>
                <div className='flex relative justify-center h-max w-screen md:py-40'>
                    <CircleBackground circles={circles} opacity={0.9} />
                    <div className="flex flex-col items-center justify-center w-full md:w-10/12 px-12 py-24 gap-12 z-20">
                        <div className="flex flex-col items-center justify-center gap-6 md:w-1/2 w-full">
                            <h2 className="md:text-3xl text-2xl dark:text-white font-bold">
                                Pourquoi choisir&nbsp;
                                <span className='font-black bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] text-transparent bg-clip-text'>
                                    FindMyBroker.io&nbsp;
                                </span>
                                ?
                            </h2>
                            <p className="text-base dark:text-gray-400">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                        </div>
                        <div className="grid lg:grid-cols-3 gap-8 w-full ">
                            <div
                                className="bg-white dark:bg-[#1F2937]/50 border border-gray-300 dark:border-[#374151] rounded-xl p-6
                        flex flex-col justify-start items-start gap-5"
                            >
                                <div className='bg-[#8B5CF6]/20 rounded-lg flex items-center justify-center p-4'>
                                    <Bot size={24} className='text-[#8B5CF6]' />
                                </div>
                                <h3 className='text-lg dark:text-white'>AI-Powered Matching</h3>
                                <span className='dark:text-gray-400 text-md'>
                                    Advanced algorithms ensure perfect broker matches based on your specific needs and preferences.
                                </span>
                            </div>
                            <div
                                className="bg-white dark:bg-[#1F2937]/50 border border-gray-300 dark:border-[#374151] rounded-xl p-6
                        flex flex-col justify-start items-start gap-5"
                            >
                                <div className='bg-[#D946EF]/20 rounded-lg flex items-center justify-center p-4'>
                                    <CircleHelp size={24} className='text-[#D946EF]' />
                                </div>
                                <h3 className='text-lg dark:text-white'>Verified Professionals</h3>
                                <span className='dark:text-gray-400 text-md'>
                                    All brokers are thoroughly vetted and verified to ensure the highest quality service.
                                </span>
                            </div><div
                                className="bg-white dark:bg-[#1F2937]/50 border border-gray-300 dark:border-[#374151] rounded-xl p-6
                        flex flex-col justify-start items-start gap-5"
                            >
                                <div className='bg-[#8B5CF6]/20 rounded-lg flex items-center justify-center p-4'>
                                    <Clock size={24} className='text-[#8B5CF6]' />
                                </div>
                                <h3 className='text-lg dark:text-white'>Quick Matching</h3>
                                <span className='dark:text-gray-400 text-md'>
                                    Get matched with suitable brokers within minutes and start your investment journey.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    export default WhyUsBanner