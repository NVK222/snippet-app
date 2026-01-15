import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";
import { updateSnippet } from "../../actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPage({ params }: EditPageProps) {
  const supabase = await createClient();
  const { id } = await params;
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: snippet } = await supabase
    .from("snippets")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();
  if (!snippet) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-2xl p-8">
      <Card>
        <CardHeader>
          <CardTitle>Edit Snippet</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={updateSnippet} className="grid gap-6">
            <input type="hidden" name="id" value={snippet.id} />
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue={snippet.title} required></Input>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="language">Language</Label>
              <Input id="language" name="language" defaultValue={snippet.language} required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="code">Code</Label>
              <textarea
                id="code"
                name="code"
                className="border-input bg-background flex min-h-[200px] w-full rounded-md border px-3 py-2 font-mono text-sm"
                defaultValue={snippet.code}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="is_public"
                name="is_public"
                defaultChecked={snippet.is_public}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="is_public">Make this snippet public</Label>
            </div>
            <Button type="submit">Save Changes</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
