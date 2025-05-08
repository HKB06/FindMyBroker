import React from 'react'
import { Send } from 'lucide-react';

const Contact = () => {

    return (
        <div className="h-max w-screen flex flex-col items-center pt-24 md:pt-0 pb-24">
            <div className="flex justify-center w-10/12 z-10 bg-white dark:bg-[#1F2937] py-24 md:my-40 border rounded-lg border-gray-300 dark:border-gray-700">
                <div className="flex flex-col gap-8 w-10/12">
                    <form className="md:space-y-8 space-y-4">
                        <div className="flex md:flex-row flex-col md:gap-8 gap-4">
                            <input
                                type="text"
                                placeholder="Nom"
                                autoComplete="name"
                                autoCorrect="off"
                                autoCapitalize="off"
                                spellCheck="false"
                                required
                                className="bg-green-light/30 dark:bg-green-dark w-full px-5 py-4 rounded-xl dark:text-white text-black focus-visible:ring-0 focus-visible:ring-offest-0"
                                
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                autoComplete="email"
                                autoCorrect="off"
                                autoCapitalize="off"
                                spellCheck="false"
                                title="Please enter a valid email address"
                                required
                                inputMode="email"
                                className="bg-green-light/30 dark:bg-green-dark w-full px-5 py-4 rounded-xl dark:text-white text-black focus-visible:ring-0 focus-visible:ring-offest-0"
                               
                            />
                        </div>

                        <textarea
                            placeholder="Message"
                            className="bg-green-light/30 dark:bg-green-dark w-full px-5 py-4 rounded-xl dark:text-white text-black focus-visible:ring-0 focus-visible:ring-offest-0"
                            rows={10}
                           
                        />
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-green-light dark:bg-green-dark text-white px-5 py-4 before:content-[''] before:absolute before:[border-radius:inherit] rounded-xl flex gap-4 items-center font-semibold"
                            >
                                <Send height={18} width={18} />
                                Envoyer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact