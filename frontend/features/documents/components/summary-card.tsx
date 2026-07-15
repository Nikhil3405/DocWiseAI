type Props = {
  summary?: string | null;
};

export function SummaryCard({
  summary,
}: Props) {
  return (
    <section className="rounded-2xl border p-6">
      <h2 className="mb-4 text-xl font-semibold">
        AI Summary
      </h2>

      <p className="leading-7 text-muted-foreground">
        {summary ??
          "No summary available."}
      </p>
    </section>
  );
}