import { getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { getPageSession } from "@/lib/auth/lucia";
import { ExitIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import SignOut from "../auth/sign-out";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default async function Navbar() {
  const session = await getPageSession();
  return (
    <header className="w-full shadow-lg">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Realtime Docs</h1>
        </div>
        {session && (
          <>
            <div className="flex-1 relative flex items-center justify-center">
              <Input placeholder="Search documents" className="max-w-md" />
            </div>
            <div className="select-none">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="cursor-pointer">
                    <Avatar>
                      <AvatarFallback>
                        {getInitials(session?.user.name)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <SignOut>
                      <Button variant="destructive">
                        <ExitIcon className="mr-2" />
                        Sign out
                      </Button>
                    </SignOut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
