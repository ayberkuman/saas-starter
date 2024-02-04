import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createEvent = mutation({
  args: {
    title: v.string(),
    date: v.string(),
    image: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) throw new Error("Not logged in");

    return await ctx.db.insert("events", {
      title: args.title,
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
