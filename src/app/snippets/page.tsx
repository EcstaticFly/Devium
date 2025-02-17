"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import NavigationHeader from "./_components/NavigationHeader";
import SnippetsPageSkeleton from "./_components/_skeletons/SnippetsPageSkeleton";

export default function SnippetsPage() {
  const allSnippets = useQuery(api.snippets.getSnippets);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");

  if (allSnippets === undefined) {
    //means data is being fetched from convex
    return (
      <div className="min-h-screen">
        <NavigationHeader />
        <SnippetsPageSkeleton />
      </div>
    );
  }
  return <div className=""></div>;
}
