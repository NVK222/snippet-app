"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteSnippet(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const { error } = await supabase.from("snippets").delete().eq("id", id);
  if (error) {
    return;
  }

  revalidatePath("/dashboard");
}
