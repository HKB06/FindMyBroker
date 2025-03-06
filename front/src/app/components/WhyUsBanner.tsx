import { Bot, CircleHelp, Clock } from 'lucide-react'
import React from 'react'

const WhyUsBanner = () => {
    return (
        <>
            <div className='flex justify-center h-screen w-screen'>
                <div className="flex flex-col items-center justify-center w-10/12 px-12 py-24 gap-12">
                    <div className="flex flex-col items-center justify-center gap-6 w-1/2">
                        <h2 className="text-3xl dark:text-white">Why choose FindMyBroker.io ?</h2>
                        <p className="text-base dark:text-gray-400">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-8 ">
                        <div
                            className="bg-gray-200 dark:bg-[#1F2937]/50 border border-gray-300 dark:border-[#374151] rounded-xl p-6
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
                            className="bg-gray-200 dark:bg-[#1F2937]/50 border border-gray-300 dark:border-[#374151] rounded-xl p-6
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
                            className="bg-gray-200 dark:bg-[#1F2937]/50 border border-gray-300 dark:border-[#374151] rounded-xl p-6
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