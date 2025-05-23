import { useFetchArticlesQuery } from "@/lib/store/api";
import { Article } from "@/app/types/article";
import { useSession } from "next-auth/react";

const MyArticlesTable = () => {
  const { data, error, isLoading } = useFetchArticlesQuery();
  const { data: sessionData } = useSession();

  if (isLoading) return <p>Loading articles…</p>;
  if (error) return <p>Error loading articles</p>;

  const articles = data?.items;

  return (
    <table className="min-w-xl">
      <thead className="border-b">
        <tr>
          <th className="px-6 py-4 text-left">Title</th>
          <th className="px-6 py-4 text-left">Perex</th>
          <th className="px-6 py-4 text-left">Author</th>
        </tr>
      </thead>
      <tbody>
        {articles?.map((article: Article) => (
          <tr key={article.articleId}>
            <td className="px-6 py-4 text-left">{article.title}</td>
            <td className="px-6 py-4 text-left">{article.perex}</td>
            <td className="px-6 py-4 text-left">{sessionData?.user?.id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default MyArticlesTable;
