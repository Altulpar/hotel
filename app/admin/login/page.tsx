import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata = { title: "Admin Giriş" };

export default async function AdminLoginPage() {
  const admin = await getAdmin();
  if (admin) redirect("/admin");
  return (
    <main className="flex min-h-screen items-center justify-center bg-coast-mist px-4">
      <section className="w-full max-w-md rounded-lg bg-white p-8 shadow-soft">
        <p className="font-serif text-3xl font-semibold text-coast-deep">Otel Paneli</p>
        <p className="mt-2 text-sm text-coast-ink/60">İçerik yönetimi için giriş yapın.</p>
        <div className="mt-8">
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
