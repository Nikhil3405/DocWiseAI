type Props = {
  tags: string[] | null;
};

export function TagsCard({
  tags = [],
}: Props) {
  if (!tags?.length) {
    return null;
  }

  return (
    <section className="rounded-2xl border p-6">
      <h2 className="mb-5 text-xl font-semibold">
        Tags
      </h2>

      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <div
            key={tag}
            className="rounded-full border px-4 py-2 text-sm"
          >
            {tag}
          </div>
        ))}
      </div>
    </section>
  );
}