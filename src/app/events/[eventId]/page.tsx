"use client";

import { useMutation, useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useSession } from "@clerk/nextjs";
import { Progress } from "@/components/ui/progress";

export default function Page() {
  const params = useParams<{ eventId: Id<"events"> }>();
  const session = useSession();

  const event = useQuery(api.events.getEvent, { eventId: params.eventId });
  const goToEvent = useMutation(api.events.goToEvent);

  if (!event || !session.session) {
    return <div>Loading...</div>;
  }

  const eventProgress =
    (event.participants.length / event.participantLimit) * 100;

  const isGoing = event?.participants.includes(session.session.user.id);
  return (
    <div>
      <div>{event.title}</div>
      <Progress value={eventProgress} className="w-1/2" />
      { <Image
        width={200}
        height={200}
        src={`${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${event?.image}`}
        alt="Uploaded Image"
      />}
      <div>{event?.date}</div>
      {isGoing ? (
        <div>alread going</div>
      ) : (
        <Button
          onClick={() => {
            goToEvent({ eventId: params.eventId });
          }}
        >
          I&apos;m going
        </Button>
      )}
    </div>
  );
}
