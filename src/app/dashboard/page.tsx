import SnippetCardDashboard from "@/components/SnippetCardDashboard";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { deleteSnippet } from "./actions";
import { SnippetSearch } from "@/components/SnippetSearch";
import { Button } from "@/components/ui/button";
import { PaginationControls } from "@/components/PaginationControls";

interface DashboardProps {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
}

export default async function Dashboard({ searchParams }: DashboardProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const params = await searchParams;
  const search = params.q || "";
  const page = Number(params.page) || 1;
  const ITEMS_PER_PAGE = 6;

  const from = (page - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;

  let query = supabase
    .from("snippets")
    .select("*", { count: "exact" })
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (search) {
    query = query.ilike("title", `%${search}%`);
  }

  const { data: snippets, count } = await query;

  const hasNextPage = count ? from + ITEMS_PER_PAGE < count : false;

  return (
    <main className="container mx-auto p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">My Dashboard</h1>
        <div className="flex w-full items-center gap-4 md:w-auto">
          <SnippetSearch />
          <Link href="/dashboard/new">
            <Button variant="outline">Create Snippet</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {snippets?.length === 0 && (
          <div className="text-muted-foreground col-span-full py-12 text-center">
            {search
              ? "No snippets found matching your search"
              : "You haven't created any snippets yet"}
          </div>
        )}

        {snippets?.map((snippet) => (
          <SnippetCardDashboard key={snippet.id} snippet={snippet} deleteAction={deleteSnippet} />
        ))}
      </div>
      <PaginationControls hasNextPage={hasNextPage} />
    </main>
  );
}
