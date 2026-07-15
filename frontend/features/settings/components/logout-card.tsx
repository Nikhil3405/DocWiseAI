"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { authService } from "@/features/auth/services/auth-service";

export function LogoutCard() {
  const router = useRouter();

  async function logout() {
    await authService.signOut();
    router.replace("/login");
  }

  return (
    <section className="rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
      <h2 className="mb-2 text-xl font-semibold">
        Session
      </h2>

      <p className="mb-6 text-sm text-muted-foreground">
        Sign out from your current device.
      </p>

      <Button
        variant="destructive"
        className="w-full"
        onClick={logout}
      >
        <LogOut className="mr-2 size-4" />
        Sign Out
      </Button>
    </section>
  );
}