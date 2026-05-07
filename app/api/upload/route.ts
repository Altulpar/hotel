import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { saveUploadedImage } from "@/lib/upload";

export async function POST(request: Request) {
  await requireAdmin();
  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Görsel bulunamadı." }, { status: 400 });
  }

  try {
    const url = await saveUploadedImage(file);
    return NextResponse.json({ url });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Yükleme başarısız." },
      { status: 400 }
    );
  }
}
