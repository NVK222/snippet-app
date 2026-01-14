"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function createSnippet(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const title = formData.get("title") as string;
  const code = formData.get("code") as string;
  const language = formData.get("language") as string;
  const is_public = formData.get("is_public") === "on";

  const { error } = await supabase
    .from("snippets")
    .insert({ code, language, title, is_public, user_id: user.id });

  if (error) {
    return redirect("/dashboard/new?error=true");
  }

  redirect("/dashboard");
}
