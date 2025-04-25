// In src/context/auth-context.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode"; // You'll need to install this package

type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  provider: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: Error | null;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Load user from token
    const token = localStorage.getItem("auth_token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      // Decode the JWT token
      const decoded = jwtDecode<User>(token);

      // Check if token is expired
      const tokenExpiration = (decoded as any).exp;
      const currentTime = Date.now() / 1000;

      if (tokenExpiration && tokenExpiration < currentTime) {
        // Token expired
        localStorage.removeItem("auth_token");
        setUser(null);
      } else {
        setUser(decoded);
      }
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem("auth_token");
      setUser(null);
      setError(err instanceof Error ? err : new Error("Invalid token"));
    }

    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("auth_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, logout }}>
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
