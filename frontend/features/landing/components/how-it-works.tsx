"use client";

import { motion } from "framer-motion";
import {
  Upload,
  Cpu,
  MessageSquare,
} from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Your Documents",
    description:
      "Securely upload PDFs, images, certificates, IDs, invoices, and other important documents.",
  },
  {
    icon: Cpu,
    title: "AI Processes Everything",
    description:
      "DocWiseAI extracts text, performs OCR, understands content, generates embeddings, and builds a semantic search index.",
  },
  {
    icon: MessageSquare,
    title: "Search & Chat Naturally",
    description:
      "Ask questions in plain language and instantly retrieve accurate answers from your documents.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden py-24"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-6xl px-6">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="rounded-full border px-4 py-2 text-sm font-medium">
            Simple Process
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
            How DocWiseAI Works
          </h2>

          <p className="mt-5 text-lg text-muted-foreground">
            From upload to intelligent answers in just three simple steps.
          </p>
        </motion.div>

        {/* Timeline */}

        <div className="relative mx-auto mt-20 max-w-4xl">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.15,
                }}
                viewport={{ once: true }}
                className="relative flex gap-8 pb-12 last:pb-0"
              >
                {/* Timeline */}

                <div className="flex flex-col items-center">
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full border bg-background shadow-md">
                    <Icon className="h-7 w-7 text-primary" />

                    <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {index + 1}
                    </span>
                  </div>

                  {index !== steps.length - 1 && (
                    <div className="mt-4 h-full w-1 rounded-full bg-gradient-to-b from-primary/70 to-border" />
                  )}
                </div>

                {/* Card */}

                <div className="flex-1 rounded-2xl border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
                  <h3 className="text-2xl font-semibold">
                    {step.title}
                  </h3>

                  <p className="mt-4 leading-7 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}