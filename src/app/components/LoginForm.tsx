"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

type FormData = z.infer<typeof FormSchema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(FormSchema) });

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    const { username, password } = data;

    try {
      const response = await signIn("credentials", {
        username: username,
        password: password,
        redirect: false,
      });
      if (!response?.error) {
        redirect("/");
      }
      if (!response?.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("Login success", response);
    } catch (error: unknown) {
      console.error("Login Failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <label htmlFor="username" className="font-bold">
        Username
      </label>
      <input
        placeholder="john.doe@example.com"
        {...register("username")}
        className="py-2 px-4 text-foreground bg-background rounded-[8px] border-foreground border-[1px]"
      />
      {errors.username && <span>{errors.username.message}</span>}
      <label htmlFor="password" className="font-bold">
        Password
      </label>
      <input
        placeholder="12345"
        type="password"
        {...register("password")}
        className="py-2 px-4 text-foreground bg-background rounded-[8px] border-foreground border-[1px]"
      />
      {errors.password && <span>{errors.password.message}</span>}
      <button
        type="submit"
        className="font-bold color-foreground self-end bg-blue-500 rounded-[8px] py-2 px-4"
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
