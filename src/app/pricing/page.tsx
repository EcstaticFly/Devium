import { currentUser } from "@clerk/nextjs/server"
import { ConvexClient, ConvexHttpClient } from "convex/browser";
import { api } from "../../../convex/_generated/api";
import ProPlanView from "./_components/ProPlanView";

export default async function PricingPage() {
    const user = await currentUser();
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

    const convexUser = await convex.query(api.users.getUser,{
        userId: user?.id || "",
    });

    if(convexUser?.isPro){
        return <ProPlanView />
    }
  return (
    <div>page</div>
  )
}
