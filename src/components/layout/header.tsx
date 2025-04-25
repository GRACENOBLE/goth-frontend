// In src/components/layout/header.tsx
"use client";

import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import Container from "../common/containner";

const Header = () => {
  const { user, loading, logout } = useAuth();

  return (
    <header className="absolute top-0 w-full py-4 border-b">
      <Container>
        <div className="flex justify-between items-center">
          <div className="text-2xl font-semibold text-foreground">Goth</div>

          {loading ? (
            <div>Loading...</div>
          ) : user ? (
            <div className="flex items-center gap-4">
              {user.avatar && (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <span>Welcome, {user.name}</span>
              <button
                onClick={() => logout()}
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              className={cn(buttonVariants({ variant: "default" }))}
              href="https://goth-theraddude7343-kctznmwp.leapcell.dev/auth/google"
            >
              Login with Google
            </Link>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
