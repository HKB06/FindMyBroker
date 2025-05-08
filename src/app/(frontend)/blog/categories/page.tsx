import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { categories } from '@/lib/categories'
import { ArrowRight } from 'lucide-react'

const CategoriesPage = () => {
    return (
        <>
            <div className="w-screen h-full flex flex-col justify-center gap-8 bg-gray-100 px-24 py-30">
                <h2 className="text-4xl font-bold text-black pb-3">Nos catégories</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {categories.map((category) => (
                        <div key={category.slug} className="flex flex-col gap-4 bg-white p-6 rounded-lg">
                            <div className='flex items-center gap-4'>
                                <span className={`text-4xl ${category.color} rounded-full h-12 w-12 flex items-center justify-center text-xl`}>
                                    {category.emoji}
                                </span>
                                <h3 className="text-xl font-bold">{category.name}</h3>
                            </div>
                            <Link
                                key={category.slug}
                                href={`/blog/category/${category.slug}`}
                                className={`text-white ${category.color} rounded-lg px-4 py-2 w-fit flex items-center gap-1 text-sm`}>
                                Voir les articles sur {category.pres}
                                <ArrowRight className='h-4 w-4'/>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default CategoriesPage