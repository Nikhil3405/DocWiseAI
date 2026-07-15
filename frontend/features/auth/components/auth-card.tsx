import { ReactNode } from "react";

import { Logo } from "@/components/layout/logo";

type AuthCardProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function AuthCard({
  title,
  description,
  children,
}: AuthCardProps) {
  return (
    <div className="w-full max-w-md rounded-3xl border bg-background p-8 shadow-sm">
      <div className="mb-8 flex justify-center">
        <Logo />
      </div>

      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          {title}
        </h1>

        <p className="text-muted-foreground">
          {description}
        </p>
      </div>

      <div className="mt-8">
        {children}
      </div>
    </div>
  );
}