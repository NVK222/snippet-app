import { codeToHtml } from "shiki";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export async function CodeBlock({ code, language = "javascript" }: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang: language,
    theme: "github-light",
  });
  return (
    <div
      className="bg-accent/30 overflow-hidden overflow-x-auto rounded-md p-4 text-sm"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
