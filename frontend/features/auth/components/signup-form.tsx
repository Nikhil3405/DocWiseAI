"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { AuthCard } from "./auth-card";
import { PasswordInput } from "./password-input";
import { GoogleButton } from "./google-button";
import { AuthDivider } from "./auth-divider";

import { authService } from "../services/auth-service";
import {
  signupSchema,
  SignupFormData,
} from "../schemas/auth-schema";

export function SignupForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  async function onSubmit(values: SignupFormData) {
    try {
      setLoading(true);

      const { error } = await authService.signUp(
        values.email,
        values.password
      );

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success(
        "Account created! Please verify your email before signing in."
      );

      router.replace("/login");
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignup() {
    try {
      await authService.signInWithGoogle();
    } catch {
      toast.error("Google Sign-Up failed.");
    }
  }

  return (
    <AuthCard
      title="Create your account"
      description="Start using DocWiseAI today."
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <div className="space-y-2">
          <Label>Email</Label>

          <Input
            type="email"
            placeholder="you@example.com"
            {...register("email")}
          />

          {errors.email && (
            <p className="text-sm text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>

        <PasswordInput
          label="Password"
          registration={register("password")}
          error={errors.password?.message}
        />

        <PasswordInput
          label="Confirm Password"
          registration={register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}
        </Button>

        <AuthDivider />

        <GoogleButton
          onClick={handleGoogleSignup}
          loading={loading}
        />

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-foreground hover:underline"
          >
            Sign In
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}