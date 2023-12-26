"use client";
import { ReactNode } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { GlobeIcon, LockClosedIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { InsertDocumentType, insertDocumentSchema } from "@/lib/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createDoc } from "@/actions/create-doc";
import { useAction } from "next-safe-action/hook";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";

export default function CreateDoc({
  children,
  userId,
}: {
  children: ReactNode;
  userId: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InsertDocumentType>({
    resolver: zodResolver(insertDocumentSchema),
  });
  const { execute, status, result } = useAction(createDoc);
  const router = useRouter();
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new document</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(async (data) => {
            execute({
              userId,
              isPublic: data.isPublic,
              title: data.title,
            });
            if (status == "hasSucceeded") {
              router.push(`/doc/${result.data?.doc.id}`);
            }
            if (status == "hasErrored") {
              toast({
                title:
                  result.fetchError || result.serverError || "Unknown error",
              });
            }
          })}
        >
          <div className="mb-4 space-y-4">
            <div>
              <Label>Document name</Label>
              <Input placeholder="Document name" {...register("title")} />
            </div>
            <div>
              <Label>Visibility</Label>
              <Select defaultValue="private">
                <SelectTrigger>
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">
                    <GlobeIcon className="inline mr-2" />
                    Public
                  </SelectItem>
                  <SelectItem value="private">
                    <LockClosedIcon className="inline mr-2" />
                    Private
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="destructive">Cancel</Button>
            </DialogClose>
            <Button>
              {status == "executing" && (
                <ReloadIcon className="inline mr-2 animate-spin" />
              )}
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
