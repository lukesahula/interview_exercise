"use client";
import dynamic from "next/dynamic";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import ImagePreview from "./ImagePreview";
import { useCreateArticleMutation } from "@/lib/store/api";
import { useRouter } from "next/navigation";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const MarkdownInput = dynamic(() => import("@/app/components/MDXEditor"), {
  ssr: false,
});

const FormSchema = z.object({
  title: z.string().min(4, {
    message: "Title must be at least 4 characters.",
  }),
  perex: z.string().min(4, { message: "Perex must be at least 4 characters." }),
  image: z
    // https://github.com/orgs/react-hook-form/discussions/11096
    .instanceof(globalThis.FileList)
    .refine((files) => files?.length > 0, {
      message: "An image must be selected.",
    })
    .refine((files) => files[0]?.size <= MAX_FILE_SIZE, {
      message:
        "The image is too large. Please choose an image smaller than 5MB.",
    })
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files[0]?.type), {
      message: "Please upload a valid image file (JPEG, PNG, or WebP).",
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
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: { content: "" },
  });
  const router = useRouter();
  const [createArticle, { isLoading, error }] = useCreateArticleMutation();

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      await createArticle(data).unwrap();
      router.push("/my-articles");
    } catch (err) {
      console.error("Failed to create article:", err);
    }
  };

  const imageFile = watch("image");

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
      <label htmlFor="perex" className="font-bold">
        Perex
      </label>
      <input
        placeholder="Perex"
        {...register("perex")}
        className="py-2 px-4 text-foreground bg-background rounded-[8px] border-[1px] border-foreground"
      />
      {errors.perex && <span>{errors.perex.message}</span>}
      <label htmlFor="image" className="font-bold">
        Image
      </label>
      <input
        type="file"
        {...register("image")}
        className="py-2 px-4 text-foreground bg-background rounded-[8px] border-[1px] border-foreground"
      />
      {errors.image && <span>{errors.image.message}</span>}
      {imageFile && <ImagePreview file={imageFile[0]} />}
      <label htmlFor="content" className="font-bold">
        Content
      </label>
      <Controller
        name="content"
        control={control}
        render={({ field, fieldState }) => (
          <>
            <MarkdownInput markdown={field.value} onChange={field.onChange} />
            {fieldState.error && <span>{fieldState.error.message}</span>}
          </>
        )}
      />
      <button
        type="submit"
        className="text-background font-bold color-foreground self-end bg-blue-500 rounded-[8px] py-2 px-4"
        disabled={isLoading}
      >
        Publish
      </button>
      {error && <span>Error publishing article</span>}
    </form>
  );
};

export default CreateForm;
