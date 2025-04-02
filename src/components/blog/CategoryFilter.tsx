'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { categories } from '@/lib/categories';

export default function CategoryFilter() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>('assurance-vie');
    const router = useRouter();

    const handleCategoryClick = (category: string | null) => {
        setSelectedCategory(category);
        const queryParam = category ? `?category=${category}` : '';
        router.push(`/blog${queryParam}`, { scroll: false }); 
    };

    return (
        <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
                <button
                    key={category.slug}
                    className={`px-4 py-2 cursor-pointer hover:opacity-100 rounded-xl text-white font-medium transition-colors ${selectedCategory === category.slug ? category.color : `${category.color} opacity-20`}`}
                    onClick={() => handleCategoryClick(category.slug)}
                >
                    {category.name}
                </button>
            ))}
        </div>
    );
}