type Props = {
  metadata?: Record<string, unknown> | null;
};

function renderValue(value: unknown) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "-";
  }

  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return String(value);
  }

  if (Array.isArray(value)) {
    return (
      <div className="space-y-3">
        {value.map((item, index) => (
          <div
            key={index}
            className="rounded-lg border bg-muted/40 p-3"
          >
            {typeof item === "object" && item !== null ? (
              Object.entries(item).map(([k, v]) => (
                <div
                  key={k}
                  className="mb-1"
                >
                  <span className="font-medium capitalize">
                    {k.replaceAll("_", " ")}:
                  </span>{" "}
                  {String(v)}
                </div>
              ))
            ) : (
              <span>{String(item)}</span>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (typeof value === "object") {
    return (
      <div className="space-y-2 rounded-lg border bg-muted/40 p-3">
        {Object.entries(value).map(([k, v]) => (
          <div key={k}>
            <span className="font-medium capitalize">
              {k.replaceAll("_", " ")}:
            </span>{" "}
            {String(v)}
          </div>
        ))}
      </div>
    );
  }

  return String(value);
}

export function MetadataCard({
  metadata,
}: Props) {
  if (
    !metadata ||
    Object.keys(metadata).length === 0
  ) {
    return null;
  }

  return (
    <section className="rounded-2xl border p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Extracted Information
      </h2>

      <div className="space-y-6">
        {Object.entries(metadata).map(([key, value]) => (
          <div key={key}>
            <p className="mb-2 text-sm capitalize text-muted-foreground">
              {key.replaceAll("_", " ")}
            </p>

            {renderValue(value)}
          </div>
        ))}
      </div>
    </section>
  );
}