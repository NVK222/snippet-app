import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Snippet } from "@/types/types";
import { CodeBlock } from "./code-block";

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
      <CardContent className="p-0">
        <CodeBlock code={snippet.code} language={snippet.language} />
      </CardContent>
    </Card>
  );
}
