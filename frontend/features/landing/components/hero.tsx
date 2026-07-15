"use client";

import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Search,
  BrainCircuit,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-40 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

        <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.08),transparent_60%)]" />
      </div>

      <div className="mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
        {/* Badge */}

        <div className="mb-8 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm font-medium shadow-sm backdrop-blur">
          <Sparkles className="h-4 w-4 text-primary" />
          AI-Powered Document Intelligence
        </div>

        {/* Heading */}

        <h1 className="max-w-5xl text-5xl font-extrabold tracking-tight md:text-7xl">
          Your Personal
          <br />
          <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            AI Document Assistant
          </span>
        </h1>

        {/* Subtitle */}

        <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
          Upload, organize, search, summarize, and chat with your documents—
          all powered by AI in one secure workspace.
        </p>

        {/* Buttons */}

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link href="/login">
          <Button
            
            size="lg"
            className="h-12 rounded-xl px-8 shadow-lg"
          >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
            </Link>

          <Link href="#features">
          <Button
            
            variant="outline"
            size="lg"
            className="h-12 rounded-xl px-8"
          >
              Explore Features
          </Button>
            </Link>
        </div>

        {/* Feature Chips */}

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-4 w-4 text-primary" />
            AI Analysis
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Secure Storage
          </div>

          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-primary" />
            Semantic Search
          </div>
        </div>
      </div>
    </section>
  );
}