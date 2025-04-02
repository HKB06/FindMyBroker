
import ArticlesByCategories from "@/components/blog/ArticlesByCategories";
import LastArticle from "@/components/blog/LastArticle";

export default function Home({ searchParams }: { searchParams: { category?: string } }) {

    return (
        <>
            <main className="flex flex-col">
                <LastArticle />
                <ArticlesByCategories searchParams={searchParams} />
            </main>
        </>
    );
}
