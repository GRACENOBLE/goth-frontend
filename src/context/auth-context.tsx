"use client"

// In src/context/auth-context.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  provider: string;
  // Add other properties as needed
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: Error | null;
  logout: () => Promise<void>;
  refetchUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUser = async () => {
    try {
      const res = await fetch(
        "https://goth-theraddude7343-kctznmwp.leapcell.dev/api/me",
        {
          credentials: "include", // Critical for sending cookies
        }
      );

      if (!res.ok) {
        setUser(null);
        return;
      }

      const userData = await res.json();
      setUser(userData);
    } catch (err) {
      console.error("Failed to fetch user:", err);
      setUser(null);
      setError(err instanceof Error ? err : new Error("Failed to fetch user"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await fetch(
        "https://goth-theraddude7343-kctznmwp.leapcell.dev/auth/logout",
        {
          credentials: "include",
        }
      );
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        logout,
        refetchUser: fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
