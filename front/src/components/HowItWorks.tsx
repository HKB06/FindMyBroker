import React from 'react'
import TriangleBackground from './TriangleBackground';

const HowItWorks = () => {
    const triangles = [
        { size: 100, left: 10, top: 20, rotate: 15 },
        { size: 150, left: 30, top: 50, rotate: 45 },
        { size: 80, left: 70, top: 40, rotate: 75 },
        { size: 120, left: 80, top: 70, rotate: 105 },
        { size: 200, left: 50, top: 90, rotate: 135 },
    ];
    return (
        <>
            <div className='flex relative justify-center h-screen w-screen md:py-40'>
                <TriangleBackground triangles={triangles} opacity={0.1} />
            </div>
        </>
    )
}

export default HowItWorks