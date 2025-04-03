'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { categories } from '@/lib/categories';

export default function CategoryFilter() {
    const router = useRouter();
    
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    useEffect(() => {
        const storedCategory = localStorage.getItem('selectedCategory') || 'assurance-vie';
        setSelectedCategory(storedCategory);
    }, []);

    const handleCategoryClick = (category: string | null) => {
        setSelectedCategory(category);
        localStorage.setItem('selectedCategory', category || 'assurance-vie'); 

        const queryParam = category ? `?category=${category}` : '';
        router.push(`/blog${queryParam}`, { scroll: false });
    };

    return (
        <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
                <button
                    key={category.slug}
                    className={`px-4 py-2 cursor-pointer hover:opacity-100 rounded-xl text-white font-medium transition-colors ${
                        selectedCategory === category.slug ? category.color : `${category.color} opacity-20`
                    }`}
                    onClick={() => handleCategoryClick(category.slug)}
                >
                    {category.name}
                </button>
            ))}
        </div>
    );
}