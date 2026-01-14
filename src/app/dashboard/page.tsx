import SnippetCardDashboard from "@/components/SnippetCardDashboard";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { deleteSnippet } from "./actions";

export default async function Dashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: snippets } = await supabase
    .from("snippets")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  return (
    <main className="container mx-auto p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">My Dashboard</h1>
        <Link href="/dashboard/new">Create Snippet</Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {snippets?.length === 0 && (
          <div className="text-muted-foreground col-span-full text-center">
            You haven't created any snippets yet
          </div>
        )}

        {snippets?.map((snippet) => (
          <SnippetCardDashboard key={snippet.id} snippet={snippet} deleteAction={deleteSnippet} />
        ))}
      </div>
    </main>
  );
}
