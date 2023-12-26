import { getPageSession } from "@/lib/auth/lucia";
import { redirect } from "next/navigation";
import {
  PlusIcon,
  Pencil1Icon,
  GlobeIcon,
  LockClosedIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateDoc from "@/components/home/create-doc";

export default async function Home() {
  const session = await getPageSession();
  if (!session) redirect("/auth");

  return (
    <main>
      <section className="container mx-auto px-6 py-8 grid gap-4 sm:grid-cols-1 md:grid-cols-3">
        <CreateDoc userId={session.user.id}>
          <div className="w-full flex items-center justify-center border-2 rounded-lg hover:shadow-lg cursor-pointer border-green-500">
            <PlusIcon className="h-24 w-24 text-gray-300" />
          </div>
        </CreateDoc>
        <Card>
          <CardHeader>
            <CardTitle>Document name</CardTitle>
          </CardHeader>
          <CardFooter className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                <Pencil1Icon className="inline mr-1" />3 days ago
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm flex items-center">
                <PersonIcon className="inline" />
                <span>Niraj Acharya</span>
              </p>
            </div>
            <div className="flex gap-2">
              <LockClosedIcon className="text-gray-500" />
              <GlobeIcon className="text-gray-500" />
            </div>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Document name</CardTitle>
          </CardHeader>
          <CardFooter>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                <Pencil1Icon className="inline mr-1" />3 days ago
              </p>
            </div>
            <div>
              <LockClosedIcon className="text-gray-500" />
              <GlobeIcon className="text-gray-500" />
            </div>
          </CardFooter>
        </Card>{" "}
        <Card>
          <CardHeader>
            <CardTitle>Document name</CardTitle>
          </CardHeader>
          <CardFooter>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                <Pencil1Icon className="inline mr-1" />3 days ago
              </p>
            </div>
            <div>
              <LockClosedIcon className="text-gray-500" />
              <GlobeIcon className="text-gray-500" />
            </div>
          </CardFooter>
        </Card>{" "}
        <Card>
          <CardHeader>
            <CardTitle>Document name</CardTitle>
          </CardHeader>
          <CardFooter>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                <Pencil1Icon className="inline mr-1" />3 days ago
              </p>
            </div>
            <div>
              <LockClosedIcon className="text-gray-500" />
              <GlobeIcon className="text-gray-500" />
            </div>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}
