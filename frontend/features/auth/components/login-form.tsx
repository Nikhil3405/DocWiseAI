"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AuthDivider } from "./auth-divider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { AuthCard } from "./auth-card";
import { GoogleButton } from "./google-button";

import { authService } from "../services/auth-service";
import { loginSchema, LoginFormData } from "../schemas/auth-schema";
import { PasswordInput } from "./password-input";

export function LoginForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: LoginFormData) {
    try {
      setLoading(true);

      const { error } = await authService.signIn(values.email, values.password);

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Welcome back!");

      router.replace("/dashboard");
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    try {
      await authService.signInWithGoogle();
    } catch {
      toast.error("Google Sign-In failed.");
    }
  }

  return (
    <AuthCard
      title="Welcome Back"
      description="Sign in to continue to DocWiseAI."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label>Email</Label>

          <Input
            type="email"
            placeholder="you@example.com"
            {...register("email")}
          />

          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <PasswordInput
          label="Password"
          registration={register("password")}
          error={errors.password?.message}
        />

        {/* <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Forgot password?
          </Link>
        </div> */}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </Button>

        <AuthDivider/>

        <GoogleButton onClick={handleGoogleLogin} loading={loading} />

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-foreground hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
