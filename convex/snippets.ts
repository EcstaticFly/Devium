import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createSnippet = mutation({
  args: {
    title: v.string(),
    language: v.string(),
    code: v.string(),
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

    if (!user) {
      throw new ConvexError("User not found");
    }

    const snippetId = await ctx.db.insert("snippets", {
      userId: identity.subject,
      userName: user.name,
      ...args,
    });

    return snippetId;
  },
});

export const getSnippets = query({
  handler: async (ctx) => {
    const allSnippets = await ctx.db.query("snippets").order("desc").collect();

    return allSnippets;
  },
});

export const checkStarsOnSnippet = query({
  args: {
    snippetId: v.id("snippets"),
  },

  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      return false;
    }
    const star = await ctx.db
      .query("stars")
      .withIndex("by_user_id_and_snippet_id")
      .filter(
        (q) =>
          q.eq(q.field("userId"), user.subject) &&
          q.eq(q.field("snippetId"), args.snippetId)
      )
      .first();

    return !!star; //star itself is an object, !!star is boolean
  },
});

export const getStarCountOnSnippet = query({
  args: {
    snippetId: v.id("snippets"),
  },
  handler: async (ctx, args) => {
    const starCount = await ctx.db
      .query("stars")
      .withIndex("by_snippet_id")
      .filter((q) => q.eq(q.field("snippetId"), args.snippetId))
      .collect();

    return starCount.length;
  },
});
