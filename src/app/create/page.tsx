/* "use client";


export default function Create() {
  const [uploadedImage, setUploadedImage] = useState("");
  const [date, setDate] = useState<Date | undefined>();

  const { toast } = useToast();
  const router = useRouter();
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const createEvent = useMutation(api.events.createEvent);
  return (
    <div>
      <h1>Create Event</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const formData = new FormData(form);
          const title = formData.get("title") as string;
          const description = formData.get("description") as string;
          if (!date || !title || !uploadedImage || !description) {
            toast({
              title: "Error",
              description: "Please fill out all fields",
              variant: "destructive",
            });
            return;
          }
          const eventId = await createEvent({
            title,
            description,
            date: format(date, "yyyy-MM-dd"),
            image: uploadedImage,
          });
          router.push(`/events/${eventId}`);
        }}
      >
        <DatePicker date={date} setDate={setDate} />
        <Input placeholder="Event Title" name="title" />
        <Input placeholder="Description" name="description" />

        {uploadedImage && (
          <Image
            width={200}
            height={200}
            src={`${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${uploadedImage}`}
            alt="Uploaded Image"
          />
        )}
        <UploadButton
          uploadUrl={generateUploadUrl}
          fileTypes={["image/*"]}
          onUploadComplete={async (uploaded: UploadFileResponse[]) => {
            setUploadedImage((uploaded[0].response as any).storageId);
          }}
          onUploadError={(error: unknown) => {
            alert(`ERROR! ${error}`);
          }}
        />

        <Button type="submit">Create</Button>
      </form>
    </div>
  );
} */

//TODO: Add react-hook-form and error handling
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, ImageIcon, PersonIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "convex/react";
import { UploadButton, UploadFileResponse } from "@xixixao/uploadstuff/react";
import "@xixixao/uploadstuff/react/styles.css";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

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

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
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
                              date > new Date() || date < new Date("1900-01-01")
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
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Event Cover Photo
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center space-y-2">
                      <ImageIcon
                        className="mx-auto h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                      <div className="mt-4 flex text-sm items-center leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
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
                        </label>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Button className="mx-auto" type="submit">
              Create Event
            </Button>
          </div>
        </form>
      </Form>
    </MaxWidthWrapper>
  );
}
