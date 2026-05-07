import "server-only";

import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function saveUploadedImage(file: File) {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Sadece JPG, PNG, WEBP veya GIF yüklenebilir.");
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Görsel boyutu 5 MB sınırını aşamaz.");
  }

  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const filename = `${randomUUID()}.${extension}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadDir, filename), bytes);
  return `/uploads/${filename}`;
}
