// In src/app/dashboard/page.tsx
"use client";

import { ProtectedRoute } from "@/components/protected-route";
import { useAuth } from "@/context/auth-context";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        {user && (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl mb-2">Profile</h2>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Provider:</strong> {user.provider}
            </p>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
