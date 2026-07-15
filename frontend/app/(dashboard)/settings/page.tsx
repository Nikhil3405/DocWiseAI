
import { AccountCard } from "@/features/settings/components/account-card";
import { LogoutCard } from "@/features/settings/components/logout-card";
import { UsageCard } from "@/features/settings/components/usage-card";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage your account and application.
        </p>
      </div>

      <AccountCard />

      <UsageCard />

      <LogoutCard />
    </div>
  );
}