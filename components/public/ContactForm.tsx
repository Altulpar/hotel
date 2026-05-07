"use client";

import { useActionState } from "react";
import { contactAction } from "@/lib/actions";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [state, action, pending] = useActionState(contactAction, null);
  return (
    <form action={action} className="grid gap-4 rounded-lg border border-coast-sage/20 bg-white p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium">
          Ad Soyad
          <input name="name" required className="mt-1 w-full rounded-md border border-coast-sage/30 px-3 py-2" />
        </label>
        <label className="text-sm font-medium">
          E-posta
          <input name="email" type="email" required className="mt-1 w-full rounded-md border border-coast-sage/30 px-3 py-2" />
        </label>
      </div>
      <label className="text-sm font-medium">
        Telefon
        <input name="phone" className="mt-1 w-full rounded-md border border-coast-sage/30 px-3 py-2" />
      </label>
      <label className="text-sm font-medium">
        Konu
        <input name="subject" required className="mt-1 w-full rounded-md border border-coast-sage/30 px-3 py-2" />
      </label>
      <label className="text-sm font-medium">
        Mesaj
        <textarea name="message" rows={5} required className="mt-1 w-full rounded-md border border-coast-sage/30 px-3 py-2" />
      </label>
      {state?.error && <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{state.error}</p>}
      {state?.success && <p className="rounded-md bg-green-50 p-3 text-sm text-green-700">{state.success}</p>}
      <Button type="submit">{pending ? "Gönderiliyor..." : "Bilgi Talebi Gönder"}</Button>
    </form>
  );
}
