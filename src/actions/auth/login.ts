"use server";
import { signIn } from "@/auth.config";
import { AuthError } from "next-auth";

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    // sleep(2);
    const values: { [x: string]: FormDataEntryValue } = {};
    formData.forEach((value, key) => {
      values[key] = value;
    });
    await signIn("credentials", { ...values, redirect: false });
    return "Success";
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "CredentialsSignin";
        default:
          return "UnknownError";
      }
    }
    // throw error;
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn("credentials", { email, password });
    return { ok: true };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo iniciar sesion",
    };
  }
};
