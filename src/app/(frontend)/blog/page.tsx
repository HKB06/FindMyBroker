
import CategoriesBand from "@/components/blog/CategoriesBand";
import CategoryFilter from "@/components/blog/CategoryFilter";
import LastArticle from "@/components/blog/LastArticle";
import ListArticles from './ListArticles';

export default function Home({ searchParams }: { searchParams: { category?: string } }) {

    return (
        <>
            <main className="flex flex-col">
                <LastArticle />
                <CategoriesBand searchParams={searchParams} />
            </main>
        </>
    );
}
