"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";
import { useDebouncedCallback } from "use-debounce";

export function SnippetSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-sm">
      <Input
        placeholder="Search snippets"
        defaultValue={searchParams.get("q")?.toString()}
        onChange={useDebouncedCallback((e) => {
          handleSearch(e.target.value);
        }, 300)}
      />
    </div>
  );
}
