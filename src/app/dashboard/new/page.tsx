import Link from "next/link";
import { Card, CardContent, CardDescription, CardTitle, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createSnippet } from "./actions";

export default function NewSnippetPage() {
  return (
    <div className="container mx-auto max-w-2xl p-8">
      <div className="mb-8">
        <Link href="/dashboard" className="text-muted-foreground text-sm hover:underline">
          ← Back to Dashboard
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>New Snippet</CardTitle>
          <CardDescription>Share your code (or keep it private).</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createSnippet} className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" placeholder="Hello World" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="language">Language</Label>
              <Input id="language" name="language" placeholder="typescript" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="code">Code</Label>
              <textarea
                id="code"
                name="code"
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[200px] w-full rounded-md border px-3 py-2 font-mono text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="console.log('Hello World')"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="is_public"
                name="is_public"
                className="text-primary focus:ring-primary h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="is_public" className="font-normal">
                Make this snippet public
              </Label>
            </div>

            <Button type="submit" className="w-full">
              Create Snippet
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
