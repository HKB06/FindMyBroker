import CategoryFilter from '@/components/blog/CategoryFilter';
import ListArticles from '@/app/(frontend)/blog/ListArticles';
export default function ArticlesByCategories({ searchParams }: { searchParams: { category?: string } }) {
    const category = searchParams?.category || null;
    return (
        <div className="w-screen h-full flex flex-col justify-center items-center gap-8 pb-30 px-24 bg-[#8B5CF6]">
            <h1 className="text-4xl font-bold text-white py-12">Par catégorie</h1>

            <CategoryFilter />

            <ListArticles category={category} />
        </div>
    );
}