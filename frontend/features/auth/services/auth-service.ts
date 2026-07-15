import { supabase } from "@/lib/supabase";

class AuthService {
  async signIn(
    email: string,
    password: string
  ) {
    return supabase.auth.signInWithPassword({
      email,
      password,
    });
  }

  async signUp(
    email: string,
    password: string
  ) {
    return supabase.auth.signUp({
      email,
      password,
    });
  }

  async signInWithGoogle() {
    return supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/callback`,
      },
    });
  }

  async signOut() {
    return supabase.auth.signOut();
  }

  async getSession() {
    return supabase.auth.getSession();
  }

  async getUser() {
    return supabase.auth.getUser();
  }
}

export const authService = new AuthService();