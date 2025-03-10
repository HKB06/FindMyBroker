"use client"
import { ChevronsDown, LoaderCircle } from 'lucide-react';
import Image from 'next/image';
import React, {useEffect , useState} from 'react';
import { Button } from './ui/button';
import GridLines from './GridLines';
import { useMediaQuery } from 'react-responsive';

const ResponsiveGridLines = () => {
    const [isClient, setIsClient] = useState(false);
  
    useEffect(() => {
      setIsClient(true);
    }, []);
  
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
    const isDesktop = useMediaQuery({ minWidth: 1024 });
  
    if (!isClient) return null;
  
    if (isMobile) {
      return <GridLines cols={5} rows={7} />;
    } else if (isTablet) {
      return <GridLines cols={8} rows={7} />;
    } else {
      return <GridLines cols={12} rows={7} />;
    }
  };
const HeroBanner = () => {
  return (
    <div className="h-max w-screen flex flex-col justify-center items-center gap-12 pt-36 md:pt-44">
      <ResponsiveGridLines />
      <div className="flex justify-center h-max w-10/12 items-center z-10 bg-white dark:bg-[#111827] py-12 md:py-24 border rounded-lg border-gray-300 dark:border-gray-700">
        <div className="flex flex-col gap-8 md:gap-16 w-10/12 h-full justify-center items-center">
          <div className="flex flex-col gap-8 items-center w-full">
            <h1 className="md:text-4xl text-2xl font-semibold textcenter dark:text-white">
              Les <span className='font-black bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] text-transparent bg-clip-text'>meilleurs brokers</span> de 2025 à portée de clic.
            </h1>
            {/* <span className="md:text-2xl text-lg bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] text-transparent bg-clip-text italic font-medium text-center">
              Votre succès en trading commence ici.
            </span> */}
          </div>
          <div className="flex flex-col gap-8 md:w-9/12">
            <span className="md:text-center md:text-xl dark:text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
              <b> modi animi consequuntur</b> nulla, ducimus fugit incidunt nam voluptate
              harum veniam.
            </span>
          </div>
          <div className="flex md:flex-row flex-col justify-center gap-4 md:w-9/12 w-full">
            <Button
              variant="outline"
              className="py-6 px-8! cursor-pointer text-md md:text-lg border-2 border-[#D946EF] text-[#D946EF] hover:text-[#5b0078] hover:border-[#5b0078] bg-transparent"
            >
              En savoir plus
            </Button>
            <Button className="py-6 px-8 cursor-pointer text-md md:text-lg text-white bg-[#D946EF] hover:bg-[#5b0078]">
              Trouver mon broker
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;