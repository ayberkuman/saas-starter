import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createEvent = mutation({
  args: {
    title: v.string(),
    date: v.string(),
    image: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) throw new Error("Not logged in");

    return await ctx.db.insert("events", {
      title: args.title,
      description: args.description,
      date: args.date,
      userId: user.subject,
      image: args.image,
    });
  },
});

export const getEventsForUser = query({
  args: {},
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      return [];
    }

    return await ctx.db
      .query("events")
      .filter((q) => q.eq(q.field("userId"), user.subject))
      .collect();
  },
});

export const getEvent = query({
  args: { eventId: v.id("events") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.eventId);
  },
});

/* export const goToEvent = mutation({
  args: {
    eventId: v.id("events"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) throw new Error("Not logged in");

    const event = await ctx.db.get(args.eventId);
    if (!event) throw new Error("Event not found");

    if (event.participants.includes(user.subject)) {
      throw new Error("Already going");
    }

    await ctx.db.patch(event._id, {
      goingCount: event.goingCount + 1,
      participants: [...event.participants, user.subject],
    });
  },
}); */
