"use client";

import { Button } from "@/components/ui/button";

type GoogleButtonProps = {
  onClick: () => void;
  loading?: boolean;
};

export function GoogleButton({
  onClick,
  loading = false,
}: GoogleButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      disabled={loading}
      onClick={onClick}
    >
      Continue with Google
    </Button>
  );
}