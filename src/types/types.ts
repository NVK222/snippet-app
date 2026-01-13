import { Database } from "./supabase";

export type Snippet = Database["public"]["Tables"]["snippets"]["Row"];
