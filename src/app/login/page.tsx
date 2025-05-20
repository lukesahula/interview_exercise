"use client";
import { useSession } from "next-auth/react";

import LoginForm from "@/components/LoginForm";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const { data: session } = useSession();

  if (session?.accessToken) {
    redirect("/");
  }
  return (
    <div className="flex mt-40 mx-auto max-w-lg gap-4 flex-col p-12 rounded-[8px] shadow-2xl shadow-foreground">
      <h1 className="font-bold text-2xl">Log In</h1>
      <LoginForm />
    </div>
  );
}
