import CategoryFilter from '@/components/blog/CategoryFilter';
import ListArticles from '@/app/(frontend)/blog/ListArticles';
import Link from 'next/link';
import { categories } from '@/lib/categories';
export default function ArticlesByCategories({ searchParams }: { searchParams: { category?: string } }) {
    const category = searchParams?.category || null;
    const categoryData = categories.find(cat => cat.slug === category);
    return (
        <div className="w-screen h-full flex flex-col justify-center gap-8 pb-30 px-24 bg-[#8B5CF6]">
            <h2 className="text-3xl font-bold text-white pt-12 pb-3">Nos derniers articles par catégorie</h2>

            <CategoryFilter />

            {category ? (
                <>
                    <ListArticles category={category} />

                    <div className="flex items-center gap-4">
                        <Link href={`blog/category/${category}`} className={`text-white text-lg ${categoryData?.color} rounded-lg px-4 py-2`}>
                            En voir plus
                        </Link>
                    </div>
                </>
            ) : (
                <>
                    <ListArticles category="assurance-vie" />
                    <div className="flex items-center gap-4">
                        <Link href={`blog/category/assurance-vie`} className={`text-white text-lg bg-violet-900 rounded-lg px-4 py-2`}>
                            En voir plus
                        </Link>
                    </div>
                </>
            )}

        </div>
    );
}