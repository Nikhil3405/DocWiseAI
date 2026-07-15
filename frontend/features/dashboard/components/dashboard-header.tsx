"use client";

import { LogOut, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


import { useUser } from "@/hooks/use-user";
import { authService } from "@/features/auth/services/auth-service";

export function DashboardHeader() {
  const router = useRouter();

  const user = useUser();

  const email = user?.email ?? "";

  const name =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    email.split("@")[0];


  async function handleLogout() {
    await authService.signOut();

    router.replace("/");
  }
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-end border-b bg-background/80 px-6 backdrop-blur-md">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-3 rounded-full px-2 py-1 transition hover:bg-accent">
          <div className="hidden text-right md:block">
            <p className="text-sm font-medium">{name}</p>

            <p className="text-xs text-muted-foreground">{email}</p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <User className="h-5 w-5" />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-64">
          <div className="px-3 py-2">
            <p className="font-medium">{name}</p>

            <p className="text-xs text-muted-foreground truncate">{email}</p>
          </div>
          <DropdownMenuSeparator />


          <DropdownMenuItem onClick={() => router.push("/settings")}>
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
