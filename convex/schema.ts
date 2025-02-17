import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    userId: v.string(), //clerkId
    name: v.string(),
    email: v.string(),
    isPro: v.boolean(),
    proSince: v.optional(v.number()),
    proSubscriptionCustomerId: v.optional(v.string()), //lemonsqueezyId
    proSubscriptionOrderId: v.optional(v.string()), //lemonsqueezy OrderId
  }).index("by_user_id", ["userId"]),


  codeExecutions: defineTable({
    userId: v.string(),
    language: v.string(),
    code: v.string(),
    output: v.optional(v.string()),
    error: v.optional(v.string()),
  }).index("by_user_id", ["userId"]),


  snippets: defineTable({
    userId: v.string(),
    userName: v.string(),
    title: v.string(),
    language: v.string(),
    code: v.string(),
  }).index("by_user_id", ["userId"]),


  snippetComments: defineTable({
    snippetId: v.id("snippets"),
    userId: v.string(),
    userName: v.string(),
    content: v.string(), //storing the html content
  }).index("by_snippet_id", ["snippetId"]),
  

  stars: defineTable({
    userId: v.string(),
    snippetId: v.id("snippets"),
  })
    .index("by_snippet_id", ["snippetId"])
    .index("by_user_id", ["userId"])
    .index("by_user_id_and_snippet_id", ["userId", "snippetId"]),
});
