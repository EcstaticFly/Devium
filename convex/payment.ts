"use node";
import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import { createHmac } from "crypto";

const webhookSecret = process.env.PAYMENT_WEBHOOK_SIGNING_SECRET!

function verifySignature(payload: string, signature: string): boolean {
  const hmac = createHmac(
    "sha256",
    webhookSecret
  );
  const computedSignature = hmac.update(payload).digest("hex");
  return computedSignature === signature;
}

export const verifyWebhook = internalAction({
  args: {
    payload: v.string(),
    signature: v.string(),
  },
  handler: async (ctx, args) => {
    const isValid = verifySignature(args.payload, args.signature);

    if (!isValid) {
      throw new Error("Invalid signature");
    }

    return JSON.parse(args.payload);
  },
});
