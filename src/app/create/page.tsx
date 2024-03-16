"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, ImageIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { UploadButton, UploadFileResponse } from "@xixixao/uploadstuff/react";
import "@xixixao/uploadstuff/react/styles.css";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";

const FormSchema = z.object({
  title: z.string({
    required_error: "A title is required.",
  }),
  description: z.string({
    required_error: "A description is required.",
  }),
  date: z.date({
    required_error: "A date of birth is required.",
  }),
  image: z.string({
    required_error: "An image is required.",
  }),
});

export default function DatePickerForm() {
  const [uploadedImage, setUploadedImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const createEvent = useMutation(api.events.createEvent);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      date: new Date(),
      image: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsSubmitting(true);
      const eventId = await createEvent({
        title: data.title,
        description: data.description,
        date: format(data.date, "yyyy-MM-dd"),
        image: uploadedImage,
      });
      router.push(`/events/${eventId}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <MaxWidthWrapper>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-12 m-8">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Create Event
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-4">
                      <FormLabel htmlFor="title">Event Title</FormLabel>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm sm:max-w-md">
                          <Input
                            type="text"
                            id="title"
                            autoComplete="title"
                            placeholder="janesmith"
                            {...field}
                          />
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col col-span-full">
                      <FormLabel>Date of the event</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date <
                              new Date(
                                new Date().getTime() - 24 * 60 * 60 * 1000
                              )
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="col-span-full">
                      <FormLabel htmlFor="description">Description</FormLabel>
                      <div className="mt-2">
                        <Textarea
                          id="description"
                          rows={3}
                          className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                          {...field}
                        />
                      </div>
                      <p className="mt-3 text-sm leading-6 text-gray-600">
                        Brief description of the event.
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>

                <div className="col-span-full">
                  <div className="block text-sm font-medium leading-6 text-gray-900">
                    Event Cover Photo
                  </div>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center space-y-2">
                      {uploadedImage ? (
                        <Image
                          width={200}
                          height={200}
                          src={`${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${uploadedImage}`}
                          alt="Uploaded Image"
                        />
                      ) : (
                        <ImageIcon
                          className="mx-auto h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        />
                      )}
                      <div className="mt-4 flex text-sm items-center leading-6 text-gray-600">
                        <div className="relative cursor-pointer mx-auto rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                          <span>
                            <UploadButton
                              uploadUrl={generateUploadUrl}
                              fileTypes={["image/*"]}
                              onUploadComplete={async (
                                uploaded: UploadFileResponse[]
                              ) => {
                                setUploadedImage(
                                  (uploaded[0].response as any).storageId
                                );
                              }}
                              onUploadError={(error: unknown) => {
                                alert(`ERROR! ${error}`);
                              }}
                            />
                          </span>
                        </div>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Button
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
              className="mx-auto"
              type="submit"
            >
              Create Event
            </Button>
          </div>
        </form>
      </Form>
    </MaxWidthWrapper>
  );
}
