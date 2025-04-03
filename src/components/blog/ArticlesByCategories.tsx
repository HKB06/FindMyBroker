import CategoryFilter from '@/components/blog/CategoryFilter';
import ListArticles from '@/app/(frontend)/blog/ListArticles';
export default function ArticlesByCategories({ searchParams }: { searchParams: { category?: string } }) {
    const category = searchParams?.category || null;
    return (
        <div className="w-screen h-full flex flex-col justify-center gap-8 pb-30 px-24 bg-[#8B5CF6]">
            <h2 className="text-4xl font-bold text-white pt-12 pb-3">Nos articles sur</h2>

            <CategoryFilter />

            <ListArticles category={category} />
        </div>
    );
}