"use client";
import { PersonIcon } from "@radix-ui/react-icons";
import { useQuery } from "convex/react";
import Image from "next/image";
import { api } from "../../convex/_generated/api";
import { Doc } from "../../convex/_generated/dataModel";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useRouter } from "next/navigation";

export default function EventCard({
  _id,
  date,
  title,
  userId,
  description,
  image,
}: Doc<"events">) {
  const router = useRouter();
  const user = useQuery(api.users.getUser, { body: userId });

  return (
    <Card
      onClick={() => router.push(`/events/${_id}`)}
      className="flex flex-col items-start justify-between cursor-pointer"
    >
      <CardHeader className="relative w-full border-none">
        <Image
          width={400}
          height={400}
          src={`${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${image}`}
          alt="Event cover photo"
          className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
        />
        <div className="absolute inset-0 rounded-2xl" />
      </CardHeader>
      <CardContent className="max-w-xl">
        <div className="mt-8 flex items-center gap-x-4 text-xs">
          <time>{date}</time>
          <a className="relative z-10 rounded-full bg-gray-50 dark:bg-gray-700 px-3 py-1.5 font-medium hover:bg-gray-100 dark:hover:bg-gray-800">
            category
          </a>
        </div>
        <div className="group relative">
          <CardTitle className="mt-3 text-lg font-semibold leading-6">
            <a>
              <span className="absolute inset-0" />
              {title}
            </a>
          </CardTitle>
          <p className="mt-5 line-clamp-3 text-sm leading-6">{description}</p>
        </div>
      </CardContent>
      <CardFooter className="relative mt-8 flex items-center gap-x-4">
        {user && user.profileImage ? (
          <Image
            height={40}
            width={40}
            src={user?.profileImage}
            alt="User profile image"
            className="h-10 w-10 rounded-full bg-gray-100"
          />
        ) : (
          <PersonIcon className="h-10 w-10 rounded-full bg-gray-100" />
        )}
        <div className="text-sm leading-6">
          <p className="font-semibold">
            <a>
              <span className="absolute inset-0" />
              {user?.name}
            </a>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
