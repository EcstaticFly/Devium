import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";

const http = httpRouter();

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error("Missing CLERK_WEBHOOK_SECRET environment variable");
    }
    const svix_id = request.headers.get("svix_id");
    const svix_signature = request.headers.get("svix_signature");
    const svix_timestamp = request.headers.get("svix_timestamp");

    if (!svix_id || !svix_signature || !svix_timestamp) {
      return new Response("Error occured -- no svix headers", {
        status: 400,
      });
    }

    const payload = await request.json();
    const body = JSON.stringify(payload);
    const wh = new Webhook(webhookSecret);
    let evt: WebhookEvent;

    try {
      evt = (await wh.verify(body, {
        svix_id: svix_id,
        svix_signature: svix_signature,
        svix_timestamp: svix_timestamp,
      })) as WebhookEvent;
    } catch (err) {
      console.error("Error verifying webhook:", err);
      return new Response("Error occured", { status: 400 });
    }

    const eventType = evt.type;

    if (eventType === "user.created") {
      const { id, email_addresses, first_name, last_name } = evt.data;
      const email = email_addresses[0].email_address;
      const name = `${first_name || ""} ${last_name || ""}`.trim();

      try {
        
      } catch (err) {
        console.error("Error creating user:", err);
        return new Response("Error occured while creating user", {
          status: 400,
        });
      }
    }

    return new Response("Webhook processed successfully", { status: 200 });
  }),
});

export default http;