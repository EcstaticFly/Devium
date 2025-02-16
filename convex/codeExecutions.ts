import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";

export const saveCodeExecutions = mutation({
  args: {
    language: v.string(),
    code: v.string(),
    output: v.optional(v.string()),
    error: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .first();

    if (!user?.isPro && args.language !== "javascript") {
      throw new ConvexError("Only JavaScript is supported for non-pro users");
    }

    await ctx.db.insert("codeExecutions", {
      userId: identity.subject,
      ...args,
    });
  },
});
