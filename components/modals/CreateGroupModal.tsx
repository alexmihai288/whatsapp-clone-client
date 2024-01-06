"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal";
import { FC, useEffect, useState } from "react";
import { Button } from "../ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import Dropzone from "react-dropzone";
import { FileUpload } from "../FileUploadGroup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useSocket } from "@/hooks/use-socket";
import { Group } from "@prisma/client";

interface CreateGroupModalProps {}

const formSchema = z.object({
  name: z.string().min(1, { message: "Group name is required" }),
  imageUrl: z.string().min(1, { message: "Group image is required" }),
});

export const CreateGroupModal: FC<CreateGroupModalProps> = ({}) => {
  const { isOpen, type, onClose } = useModal();
  const isModalOpen = isOpen && type === "createGroup";
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const { socket } = useSocket();
  const queryClient = useQueryClient();
  const { mutate: createGroup, isPending } = useMutation({
    mutationFn: async ({ name, imageUrl }: z.infer<typeof formSchema>) => {
      const { data } = await axios.post("/api/group", { name, imageUrl });

      return data as Group;
    },
    onSuccess: (data) => {
      toast.success("You have created a group !");
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      socket?.emit("join-group", data.id);
      onClose();
      form.reset();
    },
    onError: () => {
      toast.error("Internal server error");
    },
  });

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black">
        <DialogHeader>
          <DialogTitle>Create a group</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            encType="multipart/form-data"
            onSubmit={form.handleSubmit(() =>
              createGroup({
                name: form.getValues("name"),
                imageUrl: form.getValues("imageUrl"),
              })
            )}
            className="space-y-5"
          >
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FileUpload
                    endpoint="groupImage"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-white border-2 border-tealGreen focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter className="flex justify-end">
              <Button
                disabled={isPending}
                className="bg-tealGreenDark text-white hover:bg-tealGreen transition-colors"
              >
                {isPending && (
                  <Loader2 className="w-4 h-4 mr-2.5 animate-spin" />
                )}
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
