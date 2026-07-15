import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="relative overflow-hidden px-6 py-28">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border bg-background p-10 shadow-xl md:p-16">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex items-center gap-2 rounded-full border bg-muted/40 px-4 py-2 text-sm font-medium">
            <Sparkles className="h-4 w-4 text-primary" />
            AI-powered Document Intelligence
          </div>

          <h2 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
            Stop searching folders.
            <br />
            <span className="text-primary">
              Start asking your documents.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Upload PDFs, certificates, contracts, and personal documents.
            Instantly search, summarize, and chat with them using AI—all
            inside one secure workspace.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/signup">
              <Button
                size="lg"
                className="h-12 rounded-xl px-8"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link
              href="https://github.com"
              target="_blank"
            >
              <Button
                variant="outline"
                size="lg"
                className="h-12 rounded-xl px-8"
              >
                View on GitHub
              </Button>
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Secure Authentication
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Private AI Conversations
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              OCR + Semantic Search
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}