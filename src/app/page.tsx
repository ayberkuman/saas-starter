"use client";
import { SignInButton, SignOutButton, useSession } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Link from "next/link";

export default function Home() {
  const { isSignedIn } = useSession();
  const createEvent = useMutation(api.events.createEvent);
  const events = useQuery(api.events.getEventsForUser);
  return (
    <div>
      {events?.map((event) => (
        <Link href={
          `/events/${event._id}`
       
        } key={event._id}>
          <h1>{event.title}</h1>
          <p>{event.date}</p>
        </Link>
      ))}
    </div>
  );
}
