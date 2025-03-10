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
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const toggleOpen = () => setOpen((prev) => !prev);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      toggleOpen()
    }
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) toggleOpen();
  }, [pathname]);

  useEffect(() => {
    setDropdownOpen(false); // Fermer le dropdown lorsque la page change
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdownElement = document.querySelector(".dropdown-container");
      if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <nav
      className="fixed flex md:hidden justify-between items-center px-6 h-16 w-full border-b bg-white dark:bg-[#111827] dark:border-gray-700 z-100">
      <div className="w-1/3 flex items-center z-200">
        <Link
          onClick={() =>
            closeOnCurrent('/')
          }
          href="/" className="flex items-center gap-2 w-max text-black dark:text-white z-200" passHref>
          <ScanSearch className="text-[#8B5CF6]" />
          <span className="bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] text-transparent bg-clip-text">
            FindMyBroker
            <span className="font-bold">.io</span>
          </span>
        </Link>
      </div>

      <div
        onClick={() =>
          closeOnCurrent('/')
        }
        className="z-100 cursor-pointer transition-transform duration-1000 dark:text-white"
      >
        {isOpen ? (
          <X className="rotate-90 transition-transform duration-1000 z-500" onClick={() =>
            closeOnCurrent('/')
          } />
        ) : (
          <Menu className="rotate-0 transition-transform duration-1000" />
        )}
        <div>
          {isOpen ? (
            <div className={`fixed animate-in slide-in-from-top-5 fade-in-20 inset-0 z-90 w-full h-screen`}>
              <ul className="z-90 h-full absolute dark:bg-banger-blue bg-white dark:bg-[#111827] dark:text-white flex flex-col items-start w-full gap-8 px-8 mt-14 py-12" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                <li>
                  <Link
                    className="flex items-center w-full font-regular text-pBrown font-title text-2xl font-semibold"
                    href="/"
                    onClick={() =>
                      closeOnCurrent('/')
                    }
                  >
                    Accueil
                  </Link>
                </li>
                <li
                  className="dropdown-container"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    toggleDropdown();
                  }}
                >
                  <div
                    className="flex gap-3 items-center w-full font-regular text-pBrown font-title text-2xl font-semibold
                    bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] text-transparent bg-clip-text theme-select-container"
                  >
                    Trouver des brokers
                    <ChevronDown
                      size={18}
                      className={`text-black dark:text-white transition-transform ${isDropdownOpen ? "rotate-180" : "rotate-0"
                        }`}
                    />
                  </div>
                  <div
                    className={`transition-opacity delay-700 ${isDropdownOpen ? "flex opacity-100" : "hidden opacity-0"}`}
                  >
                    <ul className="mt-2 space-y-2">
                      <li>
                        <Link
                          href="/"
                          className="text-xl text-gray-700 dark:text-gray-300 hover:text-[#8B5CF6] dark:hover:text-[#D946EF]"
                          onClick={() =>
                            closeOnCurrent('/')
                          }
                        >
                          Lien 1
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/"
                          className="text-xl text-gray-700 dark:text-gray-300 hover:text-[#8B5CF6] dark:hover:text-[#D946EF]"
                          onClick={() =>
                            closeOnCurrent('/')
                          }
                        >
                          Lien 2
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/"
                          className="text-xl text-gray-700 dark:text-gray-300 hover:text-[#8B5CF6] dark:hover:text-[#D946EF]"
                          onClick={() =>
                            closeOnCurrent('/')
                          }
                        >
                          Lien 3
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <Link
                    className="flex items-center w-full font-regular text-pBrown font-title text-2xl font-semibold"
                    href="/"
                    onClick={() =>
                      closeOnCurrent('/')
                    }
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center w-full font-regular text-pBrown font-title text-2xl font-semibold"
                    href="/"
                    onClick={() =>
                      closeOnCurrent('/')
                    }
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center w-full font-regular text-pBrown font-title text-2xl font-semibold"
                    href="/"
                    onClick={() =>
                      closeOnCurrent('/')
                    }
                  >
                    À propos
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center w-full font-regular text-pBrown font-title text-2xl font-semibold"
                    href="/"
                    onClick={() =>
                      closeOnCurrent('/')
                    }
                  >
                    Contact
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