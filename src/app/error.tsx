"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[80vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="flex flex-col items-center gap-2">
        <AlertTriangle className="h-24 w-24 text-red-500 opacity-80" />
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Oops!</h1>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Something went wrong</h2>
        <p className="text-muted-foreground max-w-[500px]">We encountered an unexpected error.</p>
      </div>

      <div className="flex gap-4">
        <Button onClick={() => reset()}>Try Again</Button>
        <Button variant="outline" onClick={() => (window.location.href = "/dashboard")}>
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
}
