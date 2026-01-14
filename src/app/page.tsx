import { createClient } from "@/utils/supabase/server";
import SnippetCard from "@/components/SnippetCard";

export default async function Home() {
  const supabase = await createClient();
  const { data: snippets } = await supabase
    .from("snippets")
    .select("*")
    .eq("is_public", true)
    .order("created_at", { ascending: false });
  return (
    <main className="container mx-auto p-8">
      <h1 className="mb-8 text-4xl font-bold"> Public Snippets </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {snippets?.length === 0 && <p className="text-muted-foreground">No public snippets :(</p>}
        {snippets?.map((snippet) => (
          <SnippetCard key={snippet.id} snippet={snippet} />
        ))}
      </div>
    </main>
  );
}
