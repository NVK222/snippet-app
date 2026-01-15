"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteSnippet(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const { error } = await supabase.from("snippets").delete().eq("id", id);
  if (error) {
    return;
  }

  revalidatePath("/dashboard");
}

export async function updateSnippet(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const code = formData.get("code") as string;
  const language = formData.get("language") as string;
  const is_public = formData.get("is_public") === "on";
  const { error } = await supabase
    .from("snippets")
    .update({ code, title, language, is_public })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return redirect("/dashboard?error=true");
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
