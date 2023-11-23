import SignOut from "@/components/auth/sign-out";
import { Button } from "@/components/ui/button";
import { getPageSession } from "@/lib/auth/lucia";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getPageSession();
  if (!session) redirect("/auth");

  return (
    <main>
      <SignOut>
        <Button variant="destructive" size="sm" type="submit">
          Sign Out
        </Button>
      </SignOut>
    </main>
  );
}
