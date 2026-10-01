"use client";

import { deleteAdminUserAction, promoteAdminUserAction } from "@/lib/actions";
import { Button } from "@/components/ui/Button";

export function AdminUserActions({ id, name }: { id: string; name: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      <form
        action={promoteAdminUserAction}
        onSubmit={(event) => {
          if (!window.confirm(`${name} adlı kullanıcı ana yönetici yapılsın mı?`)) {
            event.preventDefault();
          }
        }}
      >
        <input type="hidden" name="id" value={id} />
        <Button type="submit" variant="secondary">
          Ana Yönetici Yap
        </Button>
      </form>
      <form
        action={deleteAdminUserAction}
        onSubmit={(event) => {
          if (!window.confirm(`${name} adlı içerik yöneticisi kalıcı olarak silinsin mi?`)) {
            event.preventDefault();
          }
        }}
      >
        <input type="hidden" name="id" value={id} />
        <Button type="submit" variant="danger">
          Hesabı Sil
        </Button>
      </form>
    </div>
  );
}
