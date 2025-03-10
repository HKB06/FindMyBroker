"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { ScanSearch } from "lucide-react"
import { ThemeSelect } from "./ThemeSelect"



export default function Navbar() {
    return (
        <>
            <nav className="hidden lg:flex items-center px-6 h-16 w-full *:h-full border-b bg-white dark:bg-[#111827] dark:border-gray-700 z-200 fixed">
                {/* <div className="flex items-center px-6 h-16 bg-gray-200 dark:bg-[#111827]! fixed top-0 w-full *:h-full z-12"> */}
                <div className="w-1/3 flex items-center">
                    <Link href="/" className="flex items-center gap-2 w-max text-black dark:text-white" passHref>
                        <ScanSearch className="text-[#8B5CF6]" />
                        <span className="bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] text-transparent bg-clip-text">
                            FindMyBroker
                            <span className="font-bold">.io</span>
                        </span>
                    </Link>
                </div>
                <div className="flex justify-center items-center ">
                    <NavigationMenu className="**:dark:border-gray-700">
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link href="/" legacyBehavior passHref>
                                    <NavigationMenuLink className={`${navigationMenuTriggerStyle()} text-black dark:text-white dark:hover:text-white bg-transparent hover:bg-gray-200 focus:bg-gray-200 dark:hover:bg-[#1F2937] dark:focus:bg-[#1F2937] dark:focus:text-white`}>
                                        Accueil
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>

                            <NavigationMenuItem className="ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0">
                                <NavigationMenuTrigger className={`text-black dark:text-white bg-transparent hover:bg-gray-200 focus:bg-gray-200 dark:focus:bg-[#1F2937] dark:focus:text-white dark:hover:bg-[#1F2937] dark:hover:text-white cursor-pointer dark:data-[state=open]:focus:bg-[#1F2937]! dark:data-[state=open]:bg-[#1F2937]! dark:data-[state=open]:text-white!`}>
                                    <span className="bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] text-transparent bg-clip-text">Trouver des brokers</span>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="dark:bg-[#1F2937]! border-0! ring-0!">
                                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                        <li className="row-span-3">
                                            <NavigationMenuLink asChild className="">
                                                <a
                                                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-[#8B5CF6] to-[#D946EF] p-6 no-underline outline-none focus:shadow-md"
                                                    href="/"
                                                >
                                                    <span className="text-4xl">🧪</span>
                                                    <div className="mb-2 mt-4 text-lg font-bold text-white">
                                                        Votre liste personnalisée
                                                    </div>
                                                    <p className="text-sm leading-tight text-gray-100">
                                                        Répondez à notre quiz et trouvez dès aujourd&apos;hui des brokers qui correspondent à vos besoins
                                                    </p>
                                                </a>
                                            </NavigationMenuLink>
                                        </li>
                                        <ListItem href="/" title="Guide 2025 📋">
                                            Re-usable components built using Radix UI and Tailwind CSS. 
                                        </ListItem>
                                        <ListItem href="/" title="Notre sélection 👍">
                                            How to install dependencies and structure your app.
                                        </ListItem>
                                        <ListItem href="/" title="Vos favoris ⭐️">
                                            Styles for headings, paragraphs, lists...etc
                                        </ListItem>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <Link href="/" legacyBehavior passHref>
                                    <NavigationMenuLink className={`${navigationMenuTriggerStyle()} text-black dark:text-white bg-transparent hover:bg-gray-200 focus:bg-gray-200 dark:hover:bg-[#1F2937] dark:hover:text-white dark:focus:bg-[#1F2937] dark:focus:text-white`}>
                                        Services
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>


                            <NavigationMenuItem>
                                <Link href="/" legacyBehavior passHref>
                                    <NavigationMenuLink className={`${navigationMenuTriggerStyle()} text-black dark:text-white bg-transparent hover:bg-gray-200 focus:bg-gray-200 dark:hover:bg-[#1F2937] dark:hover:text-white dark:focus:bg-[#1F2937] dark:focus:text-white`}>
                                        Blog
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <Link href="/" legacyBehavior passHref>
                                    <NavigationMenuLink className={`${navigationMenuTriggerStyle()} text-black dark:text-white bg-transparent hover:bg-gray-200 focus:bg-gray-200 dark:hover:bg-[#1F2937] dark:hover:text-white dark:focus:bg-[#1F2937] dark:focus:text-white`}>
                                        À propos
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <Link href="/" legacyBehavior passHref>
                                    <NavigationMenuLink className={`${navigationMenuTriggerStyle()} text-black dark:text-white bg-transparent hover:bg-gray-200 focus:bg-gray-200 dark:hover:bg-[#1F2937] dark:hover:text-white dark:focus:bg-[#1F2937] dark:focus:text-white`}>
                                        Contact
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>

                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <ThemeSelect />
            </nav>

        </>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent dark:hover:bg-[#111827] hover:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-semibold leading-none dark:text-white">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground dark:text-gray-100">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
