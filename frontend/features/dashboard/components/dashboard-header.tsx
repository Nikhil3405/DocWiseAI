"use client";

import { LogOut, Menu, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useSidebar } from "@/components/providers/sidebar-provider";
import { authService } from "@/features/auth/services/auth-service";
import { useUser } from "@/hooks/use-user";

export function DashboardHeader() {
  const router = useRouter();
  const user = useUser();

  const { setMobileOpen } = useSidebar();

  const email = user?.email ?? "";

  const name =
    user?.user_metadata?.full_name ??
    user?.user_metadata?.name ??
    email.split("@")[0];

  async function handleLogout() {
    await authService.signOut();
    router.replace("/");
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-md sm:px-6">
      {/* Mobile Sidebar Button */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-muted lg:hidden"
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex-1" />

      {/* User Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-3 rounded-full p-1 transition-colors hover:bg-accent focus:outline-none">
          <div className="hidden text-right md:block">
            <p className="max-w-40 truncate text-sm font-medium">
              {name}
            </p>

            <p className="max-w-40 truncate text-xs text-muted-foreground">
              {email}
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <User className="h-5 w-5" />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-64"
        >
          <div className="px-3 py-2">
            <p className="truncate font-medium">{name}</p>

            <p className="truncate text-xs text-muted-foreground">
              {email}
            </p>
          </div>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => router.push("/settings")}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={handleLogout}
            className="text-destructive focus:text-destructive"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}