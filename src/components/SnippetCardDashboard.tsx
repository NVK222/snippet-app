import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Snippet } from "@/types/types";

interface SnippetCardDashboardProps {
  snippet: Snippet;
}

export default function SnippetCardDashboard({ snippet }: SnippetCardDashboardProps) {
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
      </CardHeader>
      <CardContent>
        <pre className="bg-muted mt-4 overflow-x-auto rounded-md p-4 font-mono text-sm">
          {snippet.code}
        </pre>
      </CardContent>
    </Card>
  );
}
