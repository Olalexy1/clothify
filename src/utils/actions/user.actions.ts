"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { decryptId, parseStringify } from "..";
import { AuthError } from "@supabase/supabase-js";

export async function login({ email, password, remember }: loginProps) {
  let loginData;
  let loginError: AuthError | null;

  const supabase = createClient();

  const signInData = {
    email: email as string,
    password: password as string,
  };

  const { data, error } = await supabase.auth.signInWithPassword(signInData);

  if (error) {
    // redirect("/error");
    loginError = parseStringify(error.message);
    return { loginData: null, loginError };
  }

  if (remember) {
    cookies().set("clothify", data.session.access_token, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
  }

  loginData = parseStringify(data);
  return { loginData, error: null };

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signUp(formData: signUpProps) {
  const { email, password, firstName, lastName, gender, dateOfBirth } =
    formData;

  let registrationData;
  let signUpError: AuthError | null;

  const decryptPassword = decryptId(password);

  const supabase = createClient();

  const signUpData = {
    email: email as string,
    password: decryptPassword as string,
  };

  const { data, error } = await supabase.auth.signUp(signUpData);

  if (error) {
    // redirect("/error");
    signUpError = parseStringify(error.message);
    return { registrationData: null, signUpError };
  }

  console.log(data, "see registration data in action");

  console.log(error, "see sign-up error data in action");

  const signInCredentials = {
    email: email as string,
    password: password as string,
  };

  const { data: signInResponse, error: signInError } =
    await supabase.auth.signInWithPassword(signInCredentials);

  console.log(signInResponse, "see sign in response in registration in action");

  if (signInResponse.session) {
    cookies().set("clothify", signInResponse.session.access_token, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    const { data: updateData, error: updateError } =
      await supabase.auth.updateUser({
        data: {
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          dateOfBirth: dateOfBirth,
        },
      });

    console.log(updateData, "see updateData in action");

    console.log(updateError, "see updateError in action");
  }

  registrationData = parseStringify(data);
  return { registrationData, error: null };

  revalidatePath("/", "layout");
  redirect("/account");
}

export async function updateUser({
  email,
  password,
  updateDetails,
}: updateProps) {
  let updateData;
  let updateError: AuthError | null;

  const supabase = createClient();

  const { data, error } = await supabase.auth.updateUser({
    email: email as string,
    password: password as string,
    data: {
      firstName: updateDetails?.firstName,
      lastName: updateDetails?.lastName,
      gender: updateDetails?.gender,
      dateOfBirth: updateDetails?.dateOfBirth,
      phone: updateDetails?.phone,
    },
  });

  console.log(data, "see data in action");

  if (error) {
    // redirect("/error");
    updateError = parseStringify(error.message);
    return { loginData: null, updateError };
  }

  updateData = parseStringify(data);
  return { updateData, error: null };
}
