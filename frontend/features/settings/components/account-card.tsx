"use client";

import { Mail, Shield, User } from "lucide-react";

import { useUser } from "@/hooks/use-user";

export function AccountCard() {
  const user = useUser();

  return (
    <section className="rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
      <h2 className="mb-6 text-xl font-semibold">
        Account
      </h2>

      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <User className="size-7 text-primary" />
        </div>

        <div>
          <h3 className="font-semibold">
            {user?.user_metadata.full_name ?? "Anonymous"}
          </h3>
          <h3 className="font-semibold">
            {user?.email?.split("@")[0]}
          </h3>
        </div>
      </div>

      <div className="space-y-4">
        <Info
          icon={<Shield className="size-5" />}
          label="Provider"
          value={user?.app_metadata.provider ?? "Email"}
        />

        <Info
          icon={<Mail className="size-5" />}
          label="Email"
          value={user?.email ?? "-"}
        />
      </div>
    </section>
  );
}

function Info({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border p-3 transition-colors hover:bg-muted/40">
      <div className="rounded-lg bg-primary/10 p-2 text-primary">
        {icon}
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {label}
        </p>

        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}