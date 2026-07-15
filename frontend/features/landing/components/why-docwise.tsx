"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Search,
  Sparkles,
  ShieldCheck,
  ScanText,
  FolderKanban,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Chat",
    description:
      "Ask questions about your documents in natural language and receive accurate answers with source references.",
  },
  {
    icon: Search,
    title: "Semantic Search",
    description:
      "Find information instantly without remembering filenames or exact keywords.",
  },
  {
    icon: ScanText,
    title: "OCR Support",
    description:
      "Extract text from scanned PDFs and images automatically before AI processing.",
  },
  {
    icon: Sparkles,
    title: "Smart Summaries",
    description:
      "Generate concise summaries and highlight the most important information.",
  },
  {
    icon: FolderKanban,
    title: "Auto Organization",
    description:
      "Automatically categorize documents and keep your workspace organized.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by Design",
    description:
      "Your documents remain private with secure authentication and protected storage.",
  },
];

export function WhyDocWise() {
  return (
    <section
      id="features"
      className="relative overflow-hidden py-24"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="rounded-full border px-4 py-2 text-sm font-medium">
            Why DocWiseAI
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
            Everything you need for intelligent document management
          </h2>

          <p className="mt-5 text-lg text-muted-foreground">
            Upload, organize, search, summarize, and chat with your documents—
            all powered by AI in one secure workspace.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.4,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -6,
                }}
                className="group rounded-3xl border bg-card p-8 transition-all hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="mt-6 text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}