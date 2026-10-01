"use client";

import { useActionState, useEffect, useRef } from "react";
import { createAdminUserAction } from "@/lib/actions";
import { Button } from "@/components/ui/Button";

export function CreateAdminForm() {
  const [state, action, pending] = useActionState(createAdminUserAction, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) formRef.current?.reset();
  }, [state]);

  const fieldClass =
    "mt-1 w-full rounded-md border border-coast-sage/30 bg-white px-3 py-2 text-sm outline-none transition focus:border-coast-deep focus:ring-2 focus:ring-coast-sage/20";

  return (
    <form ref={formRef} action={action} className="mt-8 grid gap-5 rounded-lg bg-white p-6 shadow-soft">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block text-sm font-medium text-coast-ink">
          Ad soyad
          <input name="name" required autoComplete="name" className={fieldClass} />
        </label>
        <label className="block text-sm font-medium text-coast-ink">
          E-posta
          <input name="email" type="email" required autoComplete="email" className={fieldClass} />
        </label>
        <label className="block text-sm font-medium text-coast-ink">
          Şifre
          <input
            name="password"
            type="password"
            required
            minLength={12}
            autoComplete="new-password"
            className={fieldClass}
          />
        </label>
        <label className="block text-sm font-medium text-coast-ink">
          Şifre tekrar
          <input
            name="passwordConfirm"
            type="password"
            required
            minLength={12}
            autoComplete="new-password"
            className={fieldClass}
          />
        </label>
      </div>
      <p className="text-sm text-coast-ink/60">
        En az 12 karakter; büyük harf, küçük harf ve rakam içeren bir şifre kullanın.
      </p>
      {state?.error && <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{state.error}</p>}
      {state?.success && (
        <p className="rounded-md bg-emerald-50 p-3 text-sm text-emerald-700">{state.success}</p>
      )}
      <Button type="submit" disabled={pending}>
        {pending ? "Hesap oluşturuluyor..." : "Yönetici Hesabı Oluştur"}
      </Button>
    </form>
  );
}
