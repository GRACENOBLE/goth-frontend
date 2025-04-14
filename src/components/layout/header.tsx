import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import Container from "../common/containner";

const Header = () => {
  return (
    <header className="absolute top-0 w-full py-4 border-b">
      <Container>
        <div className="flex justify-between items-center">
          <div className="text-2xl font-semibold text-foreground">Goth</div>
          <Link
            className={cn(buttonVariants({ variant: "default" }))}
            href={
              "https://goth-gracenoble4212-jla4fh1c.leapcell.dev/auth/google"
            }
          >
            Login with google
          </Link>
        </div>
      </Container>
    </header>
  );
};

export default Header;
