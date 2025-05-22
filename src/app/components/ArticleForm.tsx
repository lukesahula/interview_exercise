"use client";
import dynamic from "next/dynamic";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as z from "zod";

const MarkdownInput = dynamic(() => import("@/app/components/MDXEditor"), {
  ssr: false,
});

const FormSchema = z.object({
  title: z.string().min(1, {
    message: "Title must be at least 1 characters.",
  }),
  content: z.string().min(1, {
    message: "Content must be at least 1 character.",
  }),
});

type FormData = z.infer<typeof FormSchema>;

const CreateForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(FormSchema) });

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <label htmlFor="title" className="font-bold">
        Title
      </label>
      <input
        placeholder="My First Article"
        {...register("title")}
        className="py-2 px-4 text-foreground bg-background rounded-[8px] border-[1px] border-foreground"
      />
      {errors.title && <span>{errors.title.message}</span>}
      <label htmlFor="content" className="font-bold">
        Content
      </label>
      <Controller
        name="content"
        control={control}
        rules={{ required: "Content is required" }}
        render={({ field, fieldState }) => (
          <div>
            <MarkdownInput markdown={field.value} onChange={field.onChange} />
            {fieldState.error && <p>{fieldState.error.message}</p>}
          </div>
        )}
      />
    </form>
  );
};

export default CreateForm;
