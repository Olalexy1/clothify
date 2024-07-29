"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { decryptId, parseStringify } from "..";
import { AuthError } from "@supabase/supabase-js";

export async function login({ email, password }: loginProps) {
  let loginData;
  let loginError: AuthError | null;

  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const decryptPassword = decryptId(password);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: decryptPassword,
  });

  console.log(error, "see error");

  if (error) {
    // redirect("/error");
    loginError = parseStringify(error.message);
    return { loginData: null, loginError };
  }

  cookies().set("clothify", data.session.access_token, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  //   loginData = parseStringify(user);
  //   return { loginData, error: null };

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signUp(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const signUpData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data, error } = await supabase.auth.signUp(signUpData);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/account");
}
