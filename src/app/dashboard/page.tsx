"use client";
import { buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import { api } from "../../../convex/_generated/api";

export default function Home() {
  const events = useQuery(api.events.getEventsForUser);
  return (
    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-12">
      {events?.map((event) => (
        <Card key={event._id}>
          <CardHeader>
            <Image
              src={`${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${event.image}`}
              width="600"
              height="600"
              alt="event image"
            />
          </CardHeader>
          <CardContent>
            <p>{event.title}</p>
            <p>{event.date}</p>
          </CardContent>
          <CardFooter>
            <Link
              className={buttonVariants({
                variant: "default",
              })}
              href={`/events/${event._id}`}
            >
              View Event Details
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
