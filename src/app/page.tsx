"use client";
import { SignInButton, SignOutButton, useSession } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const { isSignedIn } = useSession();
  const createEvent = useMutation(api.events.createEvent);
  const events = useQuery(api.events.getEventsForUser);
  return (
    <div>
      {isSignedIn ? <SignOutButton /> : <SignInButton />}
      {isSignedIn && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            const title = formData.get("title") as string;
            const date = formData.get("date") as string;
            await createEvent({
              title,
              date,
            });
            form.reset();
          }}
        >
          <label>Event Title</label>
          <input className="text-black" name="title" />
          <label>Event Date</label>
          <input name="date" type="date" />

          <button type="submit">submit</button>
        </form>
      )}
      {events?.map((event) => (
        <div key={event._id}>
          <h1>{event.title}</h1>
          <p>{event.date}</p>
        </div>
      ))}
    </div>
  );
}
