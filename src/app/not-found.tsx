"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { Compass, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import "./globals.css"

export default function NotFound() {
    const router = useRouter();

    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-16 bg-gray-100">
                <div className="max-w-md w-full bg-white border border-[#e9d5ff] rounded-xl shadow-lg overflow-hidden p-8 text-center">
                    <div className="mb-6">
                        <div className='flex gap-1 text-lg items-center justify-center text-green-light'>
                            <span className='text-4xl'>4</span>
                            <Compass className="w-14 h-14 text-green-light" />
                            <span className='text-4xl'>4</span>
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-800 mb-3">Page introuvable</h1>

                    <p className="text-gray-600 mb-6">
                        Oups ! Il semble que vous ayez suivi un lien incorrect ou que la page ait été déplacée.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => router.back()}
                            className="flex items-center justify-center gap-2 px-6 py-2 bg-green-light text-white hover:border-green-light hover:border hover:bg-transparent hover:text-green-light rounded-lg transition duration-200 cursor-pointer"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Retour
                        </button>

                        <Link
                            href="/"
                            className="flex items-center justify-center gap-2 px-6 py-2 border border-green-light hover:bg-green-light hover:text-white text-green-light rounded-lg transition duration-200 cursor-pointer"
                        >
                            <Home className="w-4 h-4" />
                            Accueil
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}