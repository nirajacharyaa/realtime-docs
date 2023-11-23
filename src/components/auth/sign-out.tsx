"use client";
import { useRouter } from "next/navigation";

export default function SignOut({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const response = await fetch("/api/sign-out", {
          method: "POST",
          redirect: "manual",
        });
        if (response.status === 0) {
          router.refresh();
        }
      }}
    >
      {children}
    </form>
  );
}
