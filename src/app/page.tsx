import { createClient } from "@/utils/supabase/server";
import SnippetCard from "@/components/SnippetCard";
import { SnippetSearch } from "@/components/SnippetSearch";
import { PaginationControls } from "@/components/PaginationControls";

interface HomeProps {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const supabase = await createClient();

  const params = await searchParams;
  const search = params.q || "";
  const page = Number(params.page) || 1;
  const ITEMS_PER_PAGE = 6;

  const from = (page - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;

  let query = supabase
    .from("snippets")
    .select("*", { count: "exact" })
    .eq("is_public", true)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (search) {
    query = query.ilike("title", `%${search}%`);
  }

  const { data: snippets, count } = await query;

  const hasNextPage = count ? from + ITEMS_PER_PAGE < count : false;

  return (
    <main className="container mx-auto p-8">
      <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-center md:text-left">
          <h1 className="mb-2 text-4xl font-bold">SnippetBox</h1>
          <p className="text-muted-foreground">Discover code snippets from the community.</p>
        </div>
        <SnippetSearch />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {snippets?.length === 0 && (
          <div className="text-muted-foreground col-span-full py-12 text-center">
            {search ? `No public snippets found for ${search}` : "No public snippet :("}
          </div>
        )}
        {snippets?.map((snippet) => (
          <SnippetCard key={snippet.id} snippet={snippet} />
        ))}
      </div>
      <PaginationControls hasNextPage={hasNextPage} />
    </main>
  );
}
