"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import MyArticlesTable from "../components/MyArticlesTable";

const MyArticles = () => {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });

  if (status === "loading") return <p>Loading authentication status…</p>;

  return (
    <div className="flex mt-40 justify-center items-center flex-col gap-4">
      <h1 className="font-bold text-2xl">My Articles</h1>
      <MyArticlesTable />
    </div>
  );
};

export default MyArticles;
