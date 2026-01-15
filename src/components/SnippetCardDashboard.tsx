import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Snippet } from "@/types/types";
import { Button } from "./ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { CodeBlock } from "./code-block";
import Link from "next/link";

interface SnippetCardDashboardProps {
  snippet: Snippet;
  deleteAction: (formData: FormData) => Promise<void>;
}

export default function SnippetCardDashboard({ snippet, deleteAction }: SnippetCardDashboardProps) {
  return (
    <Card className="bg-card hover:bg-accent/50 transition-colors">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle>{snippet.title}</CardTitle>
          <CardDescription className="mt-1 font-mono text-xs uppercase">
            {snippet.language}
          </CardDescription>
        </div>
        <div
          className={`rounded-full border px-2 py-1 text-xs ${
            snippet.is_public
              ? "border-green-500/50 bg-green-500/10 text-green-600"
              : "border-yellow-500/50 bg-yellow-500/10 text-yellow-600"
          }`}
        >
          {snippet.is_public ? "Public" : "Private"}
        </div>
        <Link href={`/dashboard/${snippet.id}/edit`}>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground h-8 w-8 hover:text-blue-500"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </Link>
        <form action={deleteAction}>
          <input type="hidden" name="id" value={snippet.id} />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="text-muted-foreground h-8 w-8 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </form>
      </CardHeader>
      <CardContent className="p-0">
        <CodeBlock code={snippet.code} language={snippet.language} />
      </CardContent>
    </Card>
  );
}
