import { MessageSquare } from "lucide-react";

export function ChatEmpty() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border bg-muted">
        <MessageSquare className="h-8 w-8 text-muted-foreground" />
      </div>

      <h2 className="mt-6 text-2xl font-semibold">
        Start a conversation
      </h2>

      <p className="mt-3 max-w-md text-muted-foreground">
        Ask anything about your uploaded documents. DocWiseAI
        will search, analyze, and answer using your files.
      </p>
    </div>
  );
}