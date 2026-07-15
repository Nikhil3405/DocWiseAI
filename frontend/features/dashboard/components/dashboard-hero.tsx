"use client";

import Link from "next/link";
import { Upload } from "lucide-react";

import { Button } from "@/components/ui/button";

export function DashboardHero() {
  return (
    <section className="flex flex-col gap-6 rounded-3xl border bg-gradient-to-r from-primary/5 via-background to-primary/5 p-8 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome back 👋
        </h1>

        <p className="mt-3 max-w-2xl text-muted-foreground">
          Your AI-powered document workspace. Upload, organize,
          and ask questions about your documents in one place.
        </p>
      </div>

      <Button size="lg">
        <Link href="/upload">
          <Upload className="mr-2 h-5 w-5" />
          Upload Document
        </Link>
      </Button>
    </section>
  );
}