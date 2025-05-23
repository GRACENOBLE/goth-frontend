// In src/app/auth/callback/page.tsx
"use client";

import { Suspense } from "react";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function AuthCallbackContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const token = searchParams.get("token");
        if (token) {
            // Save the token to localStorage
            localStorage.setItem("auth_token", token);

            // Redirect to dashboard or home
            router.push("/dashboard");
        } else {
            // Handle error
            router.push("/auth/error");
        }
    }, [searchParams, router]);

    return <div>Completing authentication...</div>;
}

export default function AuthCallback() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AuthCallbackContent />
        </Suspense>
    );
}
