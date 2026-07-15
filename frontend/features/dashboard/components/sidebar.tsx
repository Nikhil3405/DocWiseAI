"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { navigation } from "../navigation";

import { Logo } from "@/components/layout/logo";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/providers/sidebar-provider";

export function Sidebar() {
  const pathname = usePathname();
  const { collapsed, toggleSidebar } = useSidebar();
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-50 hidden h-screen border-r bg-background transition-all duration-300 lg:flex lg:flex-col",
        collapsed ? "w-20" : "w-64",
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "flex h-16 items-center border-b px-4",
          collapsed ? "justify-center" : "justify-between",
        )}
      >
        {!collapsed && <Logo />}

        <button
          onClick={toggleSidebar}
          className="rounded-lg p-2 transition-colors hover:bg-muted"
        >
          {collapsed ? (
            <PanelLeftOpen className="size-5" />
          ) : (
            <PanelLeftClose className="size-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-3">
        {navigation.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.title : undefined}
              className={cn(
                "flex items-center rounded-xl py-3 text-sm font-medium transition-all duration-200",
                collapsed ? "justify-center px-0" : "gap-3 px-4",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="size-5 shrink-0" />

              {!collapsed && <span className="truncate">{item.title}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
