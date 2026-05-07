import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { deleteMessageAction, toggleMessageReadAction } from "@/lib/actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";

export default async function AdminMessagesPage() {
  const admin = await requireAdmin();
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <AdminShell adminName={admin.name}>
      <h1 className="font-serif text-4xl font-semibold">İletişim Mesajları</h1>
      <div className="mt-8 grid gap-5">
        {messages.map((message) => (
          <article key={message.id} className="rounded-lg bg-white p-6 shadow-soft">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm text-coast-clay">{formatDate(message.createdAt)}</p>
                <h2 className="mt-1 font-serif text-2xl font-semibold">{message.subject}</h2>
                <p className="mt-1 text-sm text-coast-ink/60">
                  {message.name} · {message.email} {message.phone ? `· ${message.phone}` : ""}
                </p>
              </div>
              <span className="rounded-full bg-coast-mist px-3 py-1 text-xs">
                {message.isRead ? "Okundu" : "Yeni"}
              </span>
            </div>
            <p className="mt-5 whitespace-pre-wrap leading-7 text-coast-ink/70">{message.message}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <form action={toggleMessageReadAction}>
                <input type="hidden" name="id" value={message.id} />
                <input type="hidden" name="isRead" value={String(message.isRead)} />
                <Button type="submit" variant="secondary">
                  {message.isRead ? "Okunmadı Yap" : "Okundu Yap"}
                </Button>
              </form>
              <form action={deleteMessageAction}>
                <input type="hidden" name="id" value={message.id} />
                <Button type="submit" variant="danger">Sil</Button>
              </form>
            </div>
          </article>
        ))}
      </div>
    </AdminShell>
  );
}
