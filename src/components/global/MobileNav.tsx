"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Menu, ScanSearch, X } from "lucide-react";
import { ThemeSelect } from "./ThemeSelect";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const MobileNav = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [isBlogDropdownOpen, setBlogDropdownOpen] = useState<boolean>(false); // État pour le dropdown "Blog"

  const toggleOpen = () => setOpen((prev) => !prev);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleBlogDropdown = () => setBlogDropdownOpen((prev) => !prev); // Toggle pour le dropdown "Blog"

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
      toggleOpen();
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) toggleOpen();
  }, [pathname]);

  useEffect(() => {
    setDropdownOpen(false); // Fermer le premier dropdown lorsque la page change
    setBlogDropdownOpen(false); // Fermer le dropdown "Blog" lorsque la page change
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdownElement = document.querySelector(".dropdown-container");
      const blogDropdownElement = document.querySelector(".blog-dropdown-container");
      if (
        dropdownElement &&
        !dropdownElement.contains(event.target as Node) &&
        blogDropdownElement &&
        !blogDropdownElement.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
        setBlogDropdownOpen(false);
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

<>
    <nav className="fixed flex lg:hidden justify-between items-center px-6 h-16 w-full border-b bg-white dark:bg-[#1F2937] dark:border-gray-700 z-100">
        <div className="w-1/3 flex items-center z-50">
          <Link
            onClick={() => closeOnCurrent("/")}
            href="/"
            className="flex items-center gap-2 w-max text-black dark:text-white z-200"
            passHref
          >
            <ScanSearch className="text-green-dark" />
            <span className="bg-gradient-to-r from-green-dark to-green-light text-transparent bg-clip-text">
              FindMyBroker
              <span className="font-bold">.io</span>
            </span>
          </Link>
        </div>
        
        <div
          onClick={() => toggleOpen()}
          className="z-100 cursor-pointer transition-transform duration-1000 dark:text-white"
        >
          {isOpen ? (
            <X
              className="rotate-90 transition-transform duration-1000 z-500 text-green-light"
            />
          ) : (
            <Menu className="rotate-0 transition-transform duration-1000 text-green-light" />
          )}
        </div>
      </nav>


    <div className={`w-full h-full bg-white dark:bg-[#1F2937] z-90 fixed scroll-pb-60 ${isOpen ? "flex" : "hidden"}` }>
          <div>
            {isOpen ? (
              <div className={`fixed animate-in slide-in-from-top-5 fade-in-20 inset-0 z-90 w-full h-screen overflow-y-auto`}>
                <ul
                  className="z-90 h-full absolute dark:bg-banger-blue bg-white dark:bg-[#111827] dark:text-white flex flex-col items-start w-full gap-8 px-8 mt-14 py-12"
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                >
                  <li>
                    <Link
                      className="flex items-center w-full font-regular text-pBrown font-title text-2xl font-semibold"
                      href="/"
                      onClick={() => closeOnCurrent("/")}
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
                    <div className="flex gap-3 items-center w-full font-regular text-pBrown font-title text-2xl font-semibold bg-gradient-to-r from-green-dark to-green-light text-transparent bg-clip-text theme-select-container">
                      Trouver des brokers
                      <ChevronDown
                        size={18}
                        className={`text-black dark:text-white transition-transform ${isDropdownOpen ? "rotate-180" : "rotate-0"
                          }`}
                      />
                    </div>
                    <div
                      className={`transition-opacity delay-700 ${isDropdownOpen ? "flex opacity-100" : "hidden opacity-0"
                        }`}
                    >
                      <ul className="mt-2 space-y-2">

                        <li>
                          <Link
                            href="/"
                            className="text-xl text-gray-700 dark:text-gray-300 hover:text-green-dark dark:hover:text-green-light"
                            onClick={() => closeOnCurrent("/")}
                          >
                            Guide 2025 📋
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/"
                            className="text-xl text-gray-700 dark:text-gray-300 hover:text-green-dark dark:hover:text-green-light"
                            onClick={() => closeOnCurrent("/")}
                          >
                            Notre sélection 👍
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/"
                            className="text-xl text-gray-700 dark:text-gray-300 hover:text-green-dark dark:hover:text-green-light"
                            onClick={() => closeOnCurrent("/")}
                          >
                            Vos favoris ⭐️
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/quiz"
                            className="text-xl font-bold bg-gradient-to-r from-green-dark to-green-light text-transparent bg-clip-text"
                            onClick={() => closeOnCurrent("/")}
                          >
                            Répondre au quiz
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li
                    className="blog-dropdown-container"
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      toggleBlogDropdown();
                    }}
                  >
                    <div className="flex gap-3 items-center w-full font-regular text-pBrown font-title text-2xl font-semibold bg-gradient-to-r from-green-dark to-green-light text-transparent bg-clip-text theme-select-container">
                      Blog
                      <ChevronDown
                        size={18}
                        className={`text-black dark:text-white transition-transform ${isBlogDropdownOpen ? "rotate-180" : "rotate-0"
                          }`}
                      />
                    </div>
                    <div
                      className={`transition-opacity delay-700 ${isBlogDropdownOpen ? "flex opacity-100" : "hidden opacity-0"
                        }`}
                    >
                      <ul className="mt-2 space-y-2">
                        <li>
                          <Link
                            href="/blog/category/assurance-vie"
                            className="text-xl text-gray-700 dark:text-gray-300 hover:text-green-dark dark:hover:text-green-light"
                            onClick={() => closeOnCurrent("/blog/category/assurance-vie")}
                          >
                            Assurance vie 🧑‍🧑‍🧒
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/blog/category/immobilier"
                            className="text-xl text-gray-700 dark:text-gray-300 hover:text-green-dark dark:hover:text-green-light"
                            onClick={() => closeOnCurrent("/blog/category/immobilier")}
                          >
                            Immobilier 🏢
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/blog/category/retraite"
                            className="text-xl text-gray-700 dark:text-gray-300 hover:text-green-dark dark:hover:text-green-light"
                            onClick={() => closeOnCurrent("/blog/category/retraite")}
                          >
                            Retraite 👴
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/quiz"
                            className="text-xl font-bold bg-gradient-to-r from-green-dark to-green-light text-transparent bg-clip-text"
                            onClick={() => closeOnCurrent("/")}
                          >
                            Voir toutes les catégories
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  
                  <li>
                    <Link
                      className="flex items-center w-full font-regular text-pBrown font-title text-2xl font-semibold"
                      href="/"
                      onClick={() => closeOnCurrent("/")}
                    >
                      À propos
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center w-full font-regular text-pBrown font-title text-2xl font-semibold"
                      href="/"
                      onClick={() => closeOnCurrent("/")}
                    >
                      Contact
                    </Link>
                  </li>
                  <li
                    onClick={(e: React.MouseEvent) => e.stopPropagation()}
                    className="theme-select-container mt-8 pb-40"
                  >
                    <ThemeSelect />
                  </li>
                </ul>
              </div>
            ) : null}
          </div>
        </div>
    </>
  );
};

export default MobileNav;