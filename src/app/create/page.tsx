"use client";
import { useMutation } from "convex/react";
import { UploadButton, UploadFileResponse } from "@xixixao/uploadstuff/react";
import "@xixixao/uploadstuff/react/styles.css";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { DatePicker } from "@/components/ui/date-picker";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

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
          const participantLimit = Number(formData.get("participantLimit"));
          if (!date || !title || !uploadedImage || !participantLimit) {
            toast({
              title: "Error",
              description: "Please fill out all fields",
              variant: "destructive",
            });
            return;
          }
          const eventId = await createEvent({
            title,
            date: format(date, "yyyy-MM-dd"),
            image: uploadedImage,
            participantLimit,
          });
          router.push(`/events/${eventId}`);
        }}
      >
        <DatePicker date={date} setDate={setDate} />
        <Input placeholder="Event Title" name="title" />
        <Input
          placeholder="Participant Limit"
          name="participantLimit"
          type="number"
        />

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
}

//TODO: Add react-hook-form and error handling
/* "use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
})

export function DatePickerForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
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
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
 */
