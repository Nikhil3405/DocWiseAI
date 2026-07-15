"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  FileSearch,
  ScanText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "AI Chat",
    description:
      "Ask questions about your documents in natural language and receive instant answers with context.",
    className: "md:col-span-2",
  },
  {
    icon: FileSearch,
    title: "Smart Search",
    description:
      "Find files, keywords, and information in seconds using semantic search.",
  },
  {
    icon: ScanText,
    title: "OCR Support",
    description:
      "Extract text from scanned PDFs and images automatically.",
  },
  {
    icon: ShieldCheck,
    title: "Private & Secure",
    description:
      "Your documents remain protected with secure authentication and encrypted storage.",
    className: "md:col-span-2",
  },
  {
    icon: Sparkles,
    title: "AI Summaries",
    description:
      "Generate concise summaries of lengthy documents in a single click.",
    className: "md:col-span-3",
  },
];

export function FeaturesGrid() {
  return (
    <section className="py-24" id="features">
      <div className="container mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <span className="rounded-full border px-4 py-2 text-sm font-medium">
            Powerful Features
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight">
            Everything you need to manage documents intelligently
          </h2>

          <p className="mt-4 text-lg text-muted-foreground">
            Upload, organize, search, summarize, and chat with your
            documents—all powered by AI.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -6,
                }}
                className={`group rounded-3xl border bg-card p-8 transition-all hover:shadow-xl ${feature.className ?? ""}`}
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="mb-3 text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="leading-7 text-muted-foreground">
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