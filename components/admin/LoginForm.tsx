"use client";

import { useActionState } from "react";
import { adminLoginAction } from "@/lib/actions";
import { Button } from "@/components/ui/Button";

export function LoginForm() {
  const [state, action, pending] = useActionState(adminLoginAction, null);
  return (
    <form action={action} className="grid gap-4">
      <label className="text-sm font-medium">
        E-posta
        <input
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-md border border-coast-sage/30 px-3 py-2"
        />
      </label>
      <label className="text-sm font-medium">
        Şifre
        <input
          name="password"
          type="password"
          required
          className="mt-1 w-full rounded-md border border-coast-sage/30 px-3 py-2"
        />
      </label>
      {state?.error && <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{state.error}</p>}
      <Button type="submit" className="w-full">
        {pending ? "Giriş yapılıyor..." : "Giriş Yap"}
      </Button>
    </form>
  );
}
