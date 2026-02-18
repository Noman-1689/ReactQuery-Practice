import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { deletePost, getPostData, updatePost } from "../Api/api";
import { Link } from "react-router-dom";
import { useState } from "react";

const FetchRQ = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  // 1. Fetching Data
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => getPostData(page),
    placeholderData: keepPreviousData,
  });

  // 2. Delete Mutation with Optimistic UI / Cache Update
  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: (data, id) => {
      queryClient.setQueryData(["posts", page], (oldData) => {
        return oldData?.filter((post) => post.id !== id);
      });
    },
  });

  // 3. Edit Mutation

  const editMutation = useMutation({
    mutationFn: (id) => updatePost(id),
    onSuccess: (data, id) => {
      // console.log("Updated Post Data:", data);
      queryClient.setQueryData(["posts", page], (oldData) => {
        return oldData?.map((post) => {
          return post.id === id ? { ...post, title: data.title } : post;
        });
      });
    },
  });

  // --- Error State ---
  if (isError) {
    return (
      <div className="max-w-4xl mx-auto m-10 p-6 bg-red-50 border border-red-100 text-red-600 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-100 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className="font-bold text-sm">Error: {error.message}</p>
        </div>
      </div>
    );
  }

  // --- Loading State ---
  if (isPending) {
    return (
      <div className="max-w-4xl mx-auto p-10 space-y-6">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="h-32 bg-slate-100 animate-pulse rounded-3xl"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Community Feed
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              Showing the latest discussions from around the world.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-full border border-slate-200 shadow-sm">
            <span className="text-[10px] font-black text-blue-600 px-3 py-1 bg-blue-50 rounded-full uppercase tracking-tighter">
              Page {page}
            </span>
          </div>
        </div>

        {/* Posts List */}
        <ul className="grid gap-5 mb-12">
          {data?.map((post) => (
            <li
              key={post.id}
              className="group relative bg-white border border-slate-200 p-6 rounded-3xl transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 flex flex-col sm:flex-row justify-between items-start gap-6"
            >
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Post Ref #{post.id}
                  </span>
                </div>

                <Link to={`/req/${post.id}`} className="block group/title">
                  <h3 className="text-xl font-bold text-slate-800 group-hover/title:text-blue-600 transition-colors leading-snug">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                  {post.body}
                </p>
              </div>

              {/* ACTION TOOLBAR */}
              <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center bg-slate-50 p-1.5 rounded-2xl border border-slate-100 shadow-sm">
                {/* Edit Button */}
                <button
                  onClick={() => editMutation.mutate(post.id)}
                  className="group/edit flex items-center justify-center h-10 w-10 rounded-xl bg-white border border-slate-200 text-slate-400 transition-all duration-200 hover:border-blue-200 hover:text-blue-600 hover:shadow-md active:scale-90"
                  title="Edit Post"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 transition-transform group-hover/edit:rotate-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => deleteMutation.mutate(post.id)}
                  disabled={
                    deleteMutation.isPending &&
                    deleteMutation.variables === post.id
                  }
                  className="group/delete flex items-center justify-center h-10 w-10 rounded-xl bg-white border border-slate-200 text-slate-400 transition-all duration-200 hover:border-red-200 hover:text-red-600 hover:shadow-md active:scale-90 disabled:opacity-50"
                  title="Delete Post"
                >
                  {deleteMutation.isPending &&
                  deleteMutation.variables === post.id ? (
                    <div className="h-4 w-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 transition-transform group-hover/delete:scale-110"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between bg-white px-6 py-4 rounded-3xl border border-slate-200 shadow-sm">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-600 disabled:opacity-20 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Prev
          </button>

          <div className="flex gap-1">
            <span className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-black shadow-lg shadow-blue-200">
              {page}
            </span>
          </div>

          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
          >
            Next
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FetchRQ;
