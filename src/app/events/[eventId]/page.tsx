"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { Calendar } from "@/components/ui/calendar";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function Page() {
  const params = useParams<{ eventId: Id<"events"> }>();
  const session = useSession();

  const event = useQuery(api.events.getEvent, { eventId: params.eventId });

  if (!event || !session.session) {
    return <div>Loading...</div>;
  }

  return (
  <MaxWidthWrapper>
    <div>
      
    </div>
  </MaxWidthWrapper>
  );
}
