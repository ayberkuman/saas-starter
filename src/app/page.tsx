"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const events = useQuery(api.events.getEventsForUser);
  return (
    <div>
    landing
    </div>
  );
}
