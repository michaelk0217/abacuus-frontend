import * as React from "react";
import type { AuthProvider } from "@toolpad/core";
import { SignInPage } from "@toolpad/core/SignInPage";
import { AuthError } from "next-auth";
import { providerMap, signIn } from "../../../auth";

export default function SignIn() {
  return (
    <SignInPage
      providers={providerMap as AuthProvider[]}
      signIn={async (
        provider: AuthProvider,
        formData: FormData,
        callbackUrl?: string
      ) => {
        "use server";
        try {
          return await signIn(provider.id, {
            redirectTo: callbackUrl ?? "/",
          });
        } catch (error) {
          if (error instanceof Error && error.message === "NEXT_REDIRECT") {
            throw error;
          }
          // Handle Auth.js errors
          if (error instanceof AuthError) {
            return {
              error: "An error with Auth.js occurred.",
              type: error.type,
            };
          }
          // An error boundary must exist to handle unknown errors
          return {
            error: "Something went wrong.",
            type: "UnknownError",
          };
        }
      }}
    />
  );
}
