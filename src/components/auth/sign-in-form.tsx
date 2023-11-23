"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ReloadIcon } from "@radix-ui/react-icons";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  return (
    <form
      action="/api/sign-in"
      className="space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);
        const response = await fetch("/api/sign-in", {
          method: "POST",
          body: formData,
          redirect: "manual",
        });

        if (response.status === 0) {
          router.refresh();
        } else {
          setError((await response.json()).error);
          setIsLoading(false);
          toast({
            title: "Sign In Failed",
            description: error ?? "Please try again",
            variant: "destructive",
          });
        }
      }}
    >
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          placeholder="example@email.com"
          name="email"
          alt="email"
          required
        />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          placeholder="***********"
          alt="password"
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <ReloadIcon className="w-5 h-5 mr-2 animate-spin" />}
        Sign in
      </Button>
    </form>
  );
}
