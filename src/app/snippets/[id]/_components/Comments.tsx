"use client";

import { SignInButton, useUser } from "@clerk/nextjs";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { toast } from "react-toastify";
import { MessageSquare } from "lucide-react";
import IndividualComment from "./IndividualComment";
import CommentForm from "./CommentForm";

export default function Comments({ snippetId }: { snippetId: Id<"snippets"> }) {
  const { user } = useUser();
  const [isAdding, setIsAdding] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(
    null
  );

  const comments = useQuery(api.snippets.getCommentsOnSnippet, {
    snippetId,
  });

  const addComment = useMutation(api.snippets.addComment);
  const deleteComment = useMutation(api.snippets.deleteComment);

  const handleAddComment = async (content: string) => {
    setIsAdding(true);
    try {
      await addComment({
        snippetId,
        content,
      });
      toast.success("Comment added successfully");
    } catch (e) {
      console.error("Error occured while adding Comment: ", e);
      toast.error("Failed to add comment");
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteComment = async (commentId: Id<"snippetComments">) => {
    setDeletingCommentId(commentId);
    try {
      await deleteComment({ commentId });
      toast.success("Comment deleted successfully");
    } catch (e) {
      console.error("Error occured while deleting Comment: ", e);
      toast.error("Failed to delete comment");
    } finally {
      setDeletingCommentId(null);
    }
  };

  return (
    <div className="bg-[#121218] border border-[#ffffff0a] rounded-2xl overflow-hidden">
      <div className="px-6 sm:px-8 py-6 border-b border-[#ffffff0a]">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <MessageSquare className="size-5" />
          Discussion ({comments?.length})
        </h2>
      </div>
      <div className="p-6 sm:p-8">
        {user ? (
            <CommentForm 
                onSubmit={handleAddComment}
                isAdding={isAdding}
            />
        ) : (
          <div className="bg-[#0a0a0f] rounded-xl p-6 text-center mb-8 border border-[#ffffff0a]">
            <p className="text-[#808086] mb-4">
              Sign in to join the discussion
            </p>
            <SignInButton mode="modal">
              <button className="px-6 py-2 bg-[#3b82f6] text-white rounded-lg hover:bg-[#2563eb] transition-colors">
                Sign In
              </button>
            </SignInButton>
          </div>
        )}

        <div className="space-y-6">
            {
                comments?.map((comment) => (
                    <IndividualComment
                        key={comment._id}
                        comment = {comment}
                        onDelete = {handleDeleteComment}
                        isDeleting = {deletingCommentId === comment._id}
                        currentUserId = {user?.id}
                    />
                ))
            }
        </div>
      </div>
    </div>
  );
}
