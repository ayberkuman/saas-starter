import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  events: defineTable({
    date: v.string(),
    title: v.string(),
    userId: v.string(),
  }),
});