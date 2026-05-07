"use client";

import { useState } from "react";

export function ImageUploadField({
  name = "imageUrl",
  label = "Görsel URL",
  defaultValue
}: {
  name?: string;
  label?: string;
  defaultValue?: string | null;
}) {
  const [url, setUrl] = useState(defaultValue || "");
  const [status, setStatus] = useState("");

  async function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setStatus("Yükleniyor...");
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/upload", { method: "POST", body: formData });
    const data = (await response.json()) as { url?: string; error?: string };
    if (!response.ok || !data.url) {
      setStatus(data.error || "Yükleme başarısız.");
      return;
    }
    setUrl(data.url);
    setStatus("Görsel yüklendi.");
  }

  return (
    <div>
      <label className="block text-sm font-medium text-coast-ink">{label}</label>
      <input
        name={name}
        value={url}
        onChange={(event) => setUrl(event.target.value)}
        className="mt-1 w-full rounded-md border border-coast-sage/30 bg-white px-3 py-2 text-sm outline-none transition focus:border-coast-deep focus:ring-2 focus:ring-coast-sage/20"
      />
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className="mt-2 block w-full text-sm text-coast-ink/70"
      />
      {status && <p className="mt-1 text-xs text-coast-ink/60">{status}</p>}
      {url && (
        <img
          src={url}
          alt=""
          className="mt-3 h-28 w-full rounded-md object-cover"
        />
      )}
    </div>
  );
}
