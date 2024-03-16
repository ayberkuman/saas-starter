"use client";
import EventCard from "@/components/EventCard";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function Home() {
  const events = useQuery(api.events.getAllEvents);
  return (
    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-12">
      {events?.map((event) => (
        <EventCard key={event._id} {...event} />
      ))}
    </div>
  );
}
