"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationControlsProps {
  hasNextPage: boolean;
}

export function PaginationControls({ hasNextPage }: PaginationControlsProps) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const page = Number(searchParams.get("page")) || 1;

  const handlePageChange = (direction: "prev" | "next") => {
    const params = new URLSearchParams();
    const newPage = direction === "next" ? page + 1 : page - 1;
    params.set("page", newPage.toString());
    replace(`${pathName}?${params.toString()}`);
  };

  return (
    <div className="mt-8 flex justify-center gap-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange("prev")}
        disabled={page <= 1}
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> Previous
      </Button>

      <span className="text-muted-foreground flex items-center text-sm">Page {page}</span>

      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange("next")}
        disabled={!hasNextPage}
      >
        Next
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
