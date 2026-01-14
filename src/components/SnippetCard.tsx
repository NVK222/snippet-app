import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Snippet } from "@/types/types";

interface SnippetCardProps {
  snippet: Snippet;
}

export default function SnippetCard({ snippet }: SnippetCardProps) {
  return (
    <Card className="bg-card hover:bg-accent/50 transition-colors">
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
  );
}
