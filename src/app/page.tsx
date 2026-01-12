import { createClient } from "@/utils/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
      <div className="grid grid-cols-1 gap-60 md:grid-cols-2 lg:grid-cols-3">
        {snippets?.length === 0 && <p className="text-muted-foreground">No public snippets :(</p>}
        {snippets?.map((snippet) => (
          <Card key={snippet.id} className="bg-card hover:bg-accent/50 transition-colors">
            <CardHeader>
              <CardTitle>{snippet.title}</CardTitle>
              <CardDescription className="font-mono text-xs uppercase">
                {snippet.language}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted overflow-x-auto rounded-md p-4 font-mono text-sm">
                {snippet.code}
              </pre>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
