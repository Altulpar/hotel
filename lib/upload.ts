import "server-only";

import { put } from "@vercel/blob";
import { randomUUID } from "crypto";

const MAX_FILE_SIZE = 4 * 1024 * 1024;
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif"
};

export async function saveUploadedImage(file: File) {
  const extension = ALLOWED_TYPES[file.type];
  if (!extension) {
    throw new Error("Sadece JPG, PNG, WEBP veya GIF yüklenebilir.");
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Görsel boyutu 4 MB sınırını aşamaz.");
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("Vercel Blob bağlantısı yapılandırılmamış.");
  }

  const filename = `${randomUUID()}.${extension}`;
  const blob = await put(`hotel/${filename}`, file, {
    access: "public",
    addRandomSuffix: false,
    contentType: file.type
  });

  return blob.url;
}
