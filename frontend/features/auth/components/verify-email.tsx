"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MailCheck, ArrowLeft } from "lucide-react";

import { AuthCard } from "./auth-card";
import { Button } from "@/components/ui/button";

export function VerifyEmail() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <AuthCard
      title="Verify Your Email"
      description="We've sent a verification link to your email address."
    >
      <div className="space-y-6">
        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <MailCheck className="h-10 w-10 text-primary" />
          </div>
        </div>

        <div className="space-y-3 text-center">
          <p className="text-muted-foreground">
            Thanks for signing up! To activate your DocWiseAI account,
            please verify your email before signing in.
          </p>

          {email && (
            <div className="rounded-lg border bg-muted/40 p-3">
              <p className="text-sm text-muted-foreground">
                Verification email sent to
              </p>

              <p className="mt-1 break-all font-medium">
                {email}
              </p>
            </div>
          )}
        </div>

        <div className="rounded-xl border bg-muted/30 p-4">
          <p className="font-medium">
            Didn't receive the email?
          </p>

          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>• Check your spam or junk folder.</li>
            <li>• Make sure you entered the correct email address.</li>
            <li>• Wait a minute or two for the email to arrive.</li>
          </ul>
        </div>

        <Link href="/login">
          <Button className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Sign In
          </Button>
        </Link>
      </div>
    </AuthCard>
  );
}