"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { Frown } from 'lucide-react';
import { categories } from '@/lib/categories';
import Link from 'next/link';

export default function ArticleNotFound() {
  const router = useRouter();

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-24">
        <div className="max-w-md w-full bg-white border rounded-xl overflow-hidden p-8 text-center">
          <div className="mb-6">
            <div className='flex gap-1 text-lg items-center justify-center text-[#D946EF]'>
              <span className='text-4xl'>4</span>
              <Frown className="w-16 h-16 text-[#D946EF]" />
              <span className='text-4xl'>4</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-3">Article non trouvé</h1>

          <p className="text-gray-600 mb-6">
            Désolé, nous n'avons pas pu trouver l'article que vous recherchez.<br />
            Il a peut-être été supprimé, déplacé ou n'existe pas encore.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.back()}
              className="px-6 py-2 bg-[#D946EF] text-white hover:border-[#D946EF] hover:border hover:bg-transparent hover:text-[#D946EF] rounded-lg transition duration-200 cursor-pointer"
            >
              Retour
            </button>

            <Link
              href="/blog"
              className="px-6 py-2 border border-[#D946EF] hover:bg-[#D946EF] hover:text-white text-[#D946EF] rounded-lg transition duration-200 cursor-pointer"
            >
              Voir nos derniers articles
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm w-full max-w-2xl">
          <p>Découvrez nos articles par catégorie :</p>
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/blog/category/${category.slug}`}
                className={`px-3 py-1 text-white rounded-full cursor-pointer transition ${category.color}`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}