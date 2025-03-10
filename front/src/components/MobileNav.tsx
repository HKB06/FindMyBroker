"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, Menu, ScanSearch, X } from "lucide-react";
import { ThemeSelect } from "./ThemeSelect";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MobileNav = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false); // État pour le dropdown

  const toggleOpen = () => setOpen((prev) => !prev);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev); // Fonction pour basculer le dropdown

  const pathname = usePathname();

  // Bloquer le défilement lorsque le menu est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Nettoyer l'effet lorsque le composant est démonté
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  useEffect(() => {
    setIsMounted(true); // Set isMounted to true after the component mounts
  }, []);

  useEffect(() => {
    if (isOpen) toggleOpen();
  }, [pathname]);

  if (!isMounted) {
    return null; // Render nothing on the server
  }

  return (
    <nav className="fixed flex md:hidden justify-between items-center px-6 h-16 w-full z-12 border-b bg-white dark:bg-[#111827] dark:border-gray-700">
      <div className="w-1/3 flex items-center z-100">
        <Link href="/" className="flex items-center gap-2 w-max text-black dark:text-white" passHref>
          <ScanSearch className="text-[#8B5CF6]" />
          <span className="bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] text-transparent bg-clip-text">
            FindMyBroker
            <span className="font-bold">.io</span>
          </span>
        </Link>
      </div>

      <div
        onClick={toggleOpen}
        className="z-100 cursor-pointer transition-transform duration-1000 dark:text-white"
      >
        {isOpen ? (
          <X className="rotate-90 transition-transform duration-1000" />
        ) : (
          <Menu className="rotate-0 transition-transform duration-1000" />
        )}
        <div>
          {isOpen ? (
            <div className={`fixed animate-in slide-in-from-top-5 fade-in-20 inset-0 z-90 w-full h-screen`}>
              <ul className="z-90 h-full absolute dark:bg-banger-blue bg-white dark:bg-[#111827] dark:text-white flex flex-col items-start w-full gap-8 px-8 mt-14 py-12">
                <li>
                  <Link
                    className="flex items-center w-full font-regular text-pBrown font-title text-2xl font-semibold"
                    href="/"
                  >
                    Accueil
                  </Link>
                </li>
                <li onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  toggleDropdown();
                }}>
                  <div
                    className="flex gap-3 items-center w-full font-regular text-pBrown font-title text-2xl font-semibold
                    bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] text-transparent bg-clip-text theme-select-container"
                  >
                    Trouver des brokers
                    <ChevronDown
                      size={18}
                      className={`text-black dark:text-white transition-transform ${isDropdownOpen ? "rotate-0" : "rotate-180"
                        }`}
                    />
                  </div>
                  <div
                    className={`transition-opacity delay-700 ${isDropdownOpen ? "hidden opacity-0" : "flex opacity-100"}`}
                  >
                    <ul className="pl-4 mt-2 space-y-2">
                      <li>
                        <Link
                          href="/broker-1"
                          className="text-xl text-gray-700 dark:text-gray-300 hover:text-[#8B5CF6] dark:hover:text-[#D946EF]"
                        >
                          Broker 1
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/broker-2"
                          className="text-xl text-gray-700 dark:text-gray-300 hover:text-[#8B5CF6] dark:hover:text-[#D946EF]"
                        >
                          Broker 2
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/broker-3"
                          className="text-xl text-gray-700 dark:text-gray-300 hover:text-[#8B5CF6] dark:hover:text-[#D946EF]"
                        >
                          Broker 3
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <Link
                    className="flex items-center w-full font-regular text-pBrown font-title text-2xl font-semibold"
                    href="/"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center w-full font-regular text-pBrown font-title text-2xl font-semibold"
                    href="/"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center w-full font-regular text-pBrown font-title text-2xl font-semibold"
                    href="/"
                  >
                    À propos
                  </Link>
                </li>
                <li
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                  className="theme-select-container mt-8"
                >
                  <ThemeSelect />
                </li>
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default MobileNav;