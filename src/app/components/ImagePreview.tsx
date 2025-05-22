"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const ImagePreview = ({ file }: { file: File }) => {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  useEffect(() => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    return () => {
      if (preview) {
        URL.revokeObjectURL(preview.toString());
      }
    };
  }, [file, preview]);

  return preview ? (
    <Image src={preview.toString()} alt="Preview" width={100} height={100} />
  ) : null;
};

export default ImagePreview;
