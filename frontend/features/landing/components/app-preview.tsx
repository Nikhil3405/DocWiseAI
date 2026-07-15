"use client";

import { motion } from "framer-motion";
import {
  FileText,
  MessageSquare,
  Folder,
  Search,
} from "lucide-react";

export function AppPreview() {
  return (
    <section className="px-6 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.01 }}
        className="mx-auto max-w-6xl overflow-hidden rounded-3xl border bg-background shadow-2xl"
      >
        {/* Window Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            <div className="h-3 w-3 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            <div className="h-3 w-3 rounded-full bg-zinc-300 dark:bg-zinc-600" />
          </div>

          <div className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm text-muted-foreground">
            <Search className="h-4 w-4" />
            Ask your documents...
          </div>
        </div>

        <div className="grid gap-8 p-8 lg:grid-cols-[280px_1fr]">
          {/* Sidebar */}
          <aside className="space-y-2">
            <div className="flex items-center gap-3 rounded-xl bg-muted p-3">
              <FileText className="h-5 w-5" />
              <span>Documents</span>
            </div>

            <div className="flex items-center gap-3 rounded-xl p-3">
              <MessageSquare className="h-5 w-5" />
              <span>AI Chat</span>
            </div>

            <div className="flex items-center gap-3 rounded-xl p-3">
              <Folder className="h-5 w-5" />
              <span>Collections</span>
            </div>
          </aside>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold">
                Dashboard
              </h3>

              <p className="mt-1 text-muted-foreground">
                Your AI-powered document workspace.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border p-5">
                <p className="text-sm text-muted-foreground">
                  Documents
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  42
                </h2>
              </div>

              <div className="rounded-2xl border p-5">
                <p className="text-sm text-muted-foreground">
                  AI Chats
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  138
                </h2>
              </div>

              <div className="rounded-2xl border p-5">
                <p className="text-sm text-muted-foreground">
                  Collections
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  8
                </h2>
              </div>
            </div>

            <div className="rounded-2xl border p-6">
              <p className="font-medium">
                AI Chat
              </p>

              <div className="mt-5 space-y-4">
                <div className="ml-auto w-fit rounded-2xl bg-primary px-4 py-2 text-sm text-primary-foreground">
                  When does my passport expire?
                </div>

                <div className="w-fit rounded-2xl border px-4 py-2 text-sm">
                  Your passport expires on{" "}
                  <strong>14 Aug 2031</strong>.
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}