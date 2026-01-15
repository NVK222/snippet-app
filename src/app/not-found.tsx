import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex h-[80vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="flex flex-col items-center gap-2">
        <FileQuestion className="text-muted-foreground h-24 w-24 opacity-50" />
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">404</h1>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Page not found</h2>
        <p className="text-muted-foreground max-w-[500px]">
          Sorry, we couldn't find the snippet or page you're looking for. It might have been deleted
          or moved.
        </p>
      </div>

      <div className="flex gap-4">
        <Link href="/dashboard">
          <Button>Go to Dashboard</Button>
        </Link>
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
