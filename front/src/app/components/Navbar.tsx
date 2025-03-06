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



export default function NavigationMenuDemo() {
    return (
        <>
            <div className="flex items-center px-6 h-16 bg-transparent  w-full *:h-full z-12">
            {/* <div className="flex items-center px-6 h-16 bg-gray-200 dark:bg-[#111827]! fixed top-0 w-full *:h-full z-12"> */}
                <div className="w-1/3 flex items-center">
                    <Link href="/" className="flex items-center gap-2 w-max text-black dark:text-white" passHref>
                        <ScanSearch />
                        <span>
                            FindMyBroker
                            <span className="font-bold">.io</span>
                        </span>
                    </Link>
                </div>
                <div className="flex justify-center items-center ">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link href="/" legacyBehavior passHref>
                                    <NavigationMenuLink className={`${navigationMenuTriggerStyle()} text-black dark:text-white dark:hover:text-white bg-transparent hover:bg-gray-200 focus:bg-gray-200 dark:hover:bg-[#1F2937] dark:focus:bg-[#1F2937] dark:focus:text-white`}>
                                        Accueil
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuTrigger className={`text-black dark:text-white bg-transparent hover:bg-gray-200 focus:bg-gray-200 dark:focus:bg-[#1F2937] dark:focus:text-white dark:hover:bg-[#1F2937] dark:hover:text-white cursor-pointer dark:data-[state=open]:focus:bg-[#1F2937]! dark:data-[state=open]:bg-[#1F2937]! dark:data-[state=open]:text-white!`}>Trouver des brokers</NavigationMenuTrigger>
                                <NavigationMenuContent className="dark:bg-[#1F2937]! *:aria-hidden:border *:aria-hidden:border-red-500! ">
                                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                        <li className="row-span-3">
                                            <NavigationMenuLink asChild>
                                                <a
                                                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                                    href="/"
                                                >
                                                    <div className="mb-2 mt-4 text-lg font-medium">
                                                        shadcn/ui
                                                    </div>
                                                    <p className="text-sm leading-tight text-muted-foreground">
                                                        Beautifully designed components built with Radix UI and
                                                        Tailwind CSS.
                                                    </p>
                                                </a>
                                            </NavigationMenuLink>
                                        </li>
                                        <ListItem href="/" title="Introduction">
                                            Re-usable components built using Radix UI and Tailwind CSS.
                                        </ListItem>
                                        <ListItem href="/" title="Installation">
                                            How to install dependencies and structure your app.
                                        </ListItem>
                                        <ListItem href="/" title="Typography">
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
                                À propos
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>

                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                
                <ThemeSelect/>
            </div>

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
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
