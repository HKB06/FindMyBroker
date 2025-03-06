import { ChevronsDown, LoaderCircle } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const HeroBanner = () => {
    return (
        // <div className="h-screen w-screen flex flex-col justify-center items-center gap-12 bg-[url(https://picsum.photos/1920/1080)]">
            <div className="h-screen w-screen flex flex-col justify-center items-center gap-12">
            <span className='dark:text-white text-7xl'>Hero Banner</span>
            {/* <Image src="https://picsum.photos/1920/1080" width={1920} height={1080} alt="Hero Banner"/> */}
            <LoaderCircle size={80} className='animate-spin dark:text-gray-400' />
        </div>
    )
}

export default HeroBanner