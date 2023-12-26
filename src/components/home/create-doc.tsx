"use client";
import { ReactNode, useEffect } from "react";
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { cn } from "@/lib/utils";
import { z } from "zod";

enum Visibility {
  Public = "public",
  Private = "private",
}
type Schema = {
  visibility: Visibility;
};

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
    watch,
    formState: { errors },
    setValue,
  } = useForm<InsertDocumentType & Schema>({
    resolver: zodResolver(
      insertDocumentSchema.merge(
        z.object({
          visibility: z.enum(["public", "private"]),
        })
      )
    ),
    defaultValues: {
      visibility: Visibility.Private,
    },
  });
  const { execute, status, result } = useAction(createDoc);
  const router = useRouter();
  useEffect(() => {
    if (status == "hasSucceeded") {
      toast({
        title: "Document created",
      });
      router.push(`/doc/${result.data?.doc.id}`);
    }
    if (status == "hasErrored") {
      toast({
        title: result.fetchError || result.serverError || "Unknown error",
      });
    }
  }, [status, result, router]);
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new document</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(async (data) => {
            console.log(data);
            execute({
              userId,
              isPublic: data.visibility === Visibility.Public ? true : false,
              title: data.title,
            });
          })}
        >
          <div className="mb-4 space-y-4">
            <div>
              <Label>Document name</Label>
              <Input
                placeholder="Document name"
                {...register("title")}
                className={cn(
                  errors.title?.message &&
                    "border-rose-600 focus-visible:ring-rose-600 focus-within:ring-rose-600 focus:ring-rose-600 ring-rose-600"
                )}
              />

              {errors.title?.message && (
                <span className="text-sm text-rose-600 px-2">
                  {errors.title?.message}
                </span>
              )}
            </div>
            <div>
              {/* // TODO: create set the  */}
              <Label>Visibility</Label>
              <Select
                defaultValue={watch("visibility")}
                {...register("visibility")}
                onValueChange={(value) => {
                  setValue(
                    "visibility",
                    value == "public" ? Visibility.Public : Visibility.Private
                  );
                }}
              >
                <SelectTrigger
                  className={cn(
                    errors.visibility?.message &&
                      "border-rose-600 focus-visible:ring-rose-600 focus-within:ring-rose-600 focus:ring-rose-600 ring-rose-600"
                  )}
                >
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
              {errors.visibility?.message && (
                <span className="text-sm text-rose-600 px-2">
                  {errors.visibility?.message}
                </span>
              )}
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
