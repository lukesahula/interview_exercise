"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ReactElement } from "react";
import CreateForm from "@/app/components/ArticleForm";

const CreatePage = () => {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });

  let PageContent: ReactElement;
  if (status === "loading") {
    PageContent = <p>Loading authentication status</p>;
  } else {
    PageContent = <CreateForm />;
  }

  return (
    <div className="flex mt-40 mx-auto max-w-xl gap-4 flex-col p-12 rounded-[8px] shadow-2xl shadow-foreground">
      {PageContent}
    </div>
  );
};

export default CreatePage;
