"use client";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { SiGithub } from "react-icons/si";
import { FaGoogle } from "react-icons/fa";

export const GithubSignInButton = () => {
  return (
    <Button
      className="w-full"
      variant="outline"
      type="button"
      onClick={() =>
        signIn(
          "github", 
        { callbackUrl: "/dashboard" }
        )
      }
    >
      <SiGithub className="mr-2 h-4 w-4" />
      Continue with Github
    </Button>
  );
}

export const GoogleSignInButton = () => {
  return (
    <Button
      className="w-full"
      variant="outline"
      type="button"
      onClick={() =>
        signIn("google")
      }
    >
      <FaGoogle className="mr-2 h-4 w-4" />
      Continue with Google
    </Button>
  );
}