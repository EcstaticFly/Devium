"use client";

import { useUser } from "@clerk/nextjs";
import { usePaginatedQuery, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"executions" | "starred">(
    "executions"
  );
  const userStats = useQuery(api.codeExecutions.getUserStats, {
    userId: user?.id ?? "",
  });

  const starredSNippets = useQuery(api.snippets.getStarredSnippets);

  const {
    results: executions, //results as executions
    status: executionStatus, //status as executionStatus
    loadMore,
    isLoading: isLoadingExecutions,
  } = usePaginatedQuery(
    api.codeExecutions.getUserCodeExecutions,
    {
      userId: user?.id ?? "",
    },
    { initialNumItems: 5 }
  );

  const userData = useQuery(api.users.getUser, {
    userId: user?.id ?? "",
  });

  const handleLoadMore = () => {
    if (executionStatus === "CanLoadMore") {
      loadMore(5);
    }
  };

  if (!user && isLoaded) return router.push("/");

  return <div>profile</div>;
}
