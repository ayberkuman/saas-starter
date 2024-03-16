import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  events: defineTable({
    date: v.string(),
    title: v.string(),
    description: v.string(),
    userId: v.string(),
    image: v.string(),
  }),
  users: defineTable({
    name: v.string(),
    email : v.string(),
    profileImage: v.string(),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),
});
