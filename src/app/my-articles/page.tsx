"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useFetchArticlesQuery } from "@/lib/store/api";

interface Article {
  title: string;
  content: string;
}

const MyArticles = () => {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });

  const { data, error, isLoading } = useFetchArticlesQuery();

  if (isLoading) return <p>Loading articles…</p>;
  if (error) return <p>Error loading articles</p>;

  const articles = data?.items;

  return (
    <div className="flex mt-40 justify-center items-center flex-col gap-4">
      <h1 className="font-bold text-2xl">My Articles</h1>
      <ul>
        {articles?.map((article: Article) => (
          <li key={article.title}>{article.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyArticles;
