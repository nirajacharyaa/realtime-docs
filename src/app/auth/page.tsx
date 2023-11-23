import SignInForm from "@/components/auth/sign-in-form";
import SignUpForm from "@/components/auth/sign-up-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getPageSession } from "@/lib/auth/lucia";
import { redirect } from "next/navigation";

export default async function AuthPage() {
  const session = await getPageSession();
  if (session) redirect("/");
  return (
    <main className="flex sm:items-center justify-center min-h-screen">
      <Card className="w-full sm:w-[500px]">
        <CardHeader className="text-center font-bold text-xl">
          Realtime Docs
          <CardDescription className="text-sm font-normal">
            Edit documents in realtime with your friends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="sign-up" className="">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="sign-up">Sign up</TabsTrigger>
              <TabsTrigger value="sign-in">Sign in</TabsTrigger>
            </TabsList>
            <TabsContent value="sign-up">
              <SignUpForm />
            </TabsContent>
            <TabsContent value="sign-in">
              <SignInForm />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </main>
  );
}
