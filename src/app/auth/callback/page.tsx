// In src/app/auth/callback/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

export default function AuthCallback() {
  const router = useRouter();
  const { refetchUser } = useAuth();

  useEffect(() => {
    async function handleCallback() {
      // After Google redirects back to your backend, and your backend redirects here,
      // the cookies should already be set, so we just need to fetch the user data
      await refetchUser();

      // Redirect to dashboard or home
      router.push("/dashboard");
    }

    handleCallback();
  }, [router, refetchUser]);

  return <div>Completing authentication...</div>;
}
