"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </Link>

          <Link
            href="#how-it-works"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            How It Works
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login">
            <Button variant="ghost">
              Sign In
            </Button>
          </Link>

          <Link href="/signup">
            <Button>
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-accent focus:outline-none md:hidden"
          >
            <Menu className="size-5" />
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-72"
          >
            <div className="mt-8 flex flex-col gap-6">
              <Logo />

              <nav className="flex flex-col gap-4">
                <Link
                  href="#features"
                  className="rounded-lg px-2 py-2 text-sm font-medium transition-colors hover:bg-muted"
                >
                  Features
                </Link>

                <Link
                  href="#how-it-works"
                  className="rounded-lg px-2 py-2 text-sm font-medium transition-colors hover:bg-muted"
                >
                  How It Works
                </Link>
              </nav>

              <div className="mt-6 flex flex-col gap-3">
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="w-full"
                  >
                    Sign In
                  </Button>
                </Link>

                <Link href="/signup">
                  <Button className="w-full">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}