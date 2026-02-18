import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getIndvPostData } from "../Api/api";
import { useParams, Link } from "react-router-dom";

const FetchIndv = () => {
  const { id } = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["post", id], // Dynamic ID ensures unique caching per post
    queryFn: () => getIndvPostData(id),
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        {/* Navigation Back */}
        <Link 
          to="/req" 
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 mb-6 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Posts
        </Link>

        {/* State Handling */}
        {isError ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
            <p className="font-bold">Something went wrong</p>
            <p className="text-sm">{error.message}</p>
          </div>
        ) : isPending ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-slate-500 font-medium">Fetching post details...</p>
          </div>
        ) : (
          /* Main Card Content */
          <article className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-blue-600 px-8 py-2">
              <span className="text-blue-100 text-xs font-bold uppercase tracking-widest">
                Post Detail #{data.id}
              </span>
            </div>
            
            <div className="p-8">
              <h1 className="text-3xl font-extrabold text-slate-900 leading-tight mb-4">
                {data.title}
              </h1>
              
              <div className="w-12 h-1 bg-blue-500 mb-6 rounded-full"></div>
              
              <p className="text-slate-600 text-lg leading-relaxed first-letter:text-4xl first-letter:font-bold first-letter:text-slate-900 first-letter:mr-1">
                {data.body}
              </p>
              
              <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between text-sm text-slate-400">
                <span>Estimated read: 2 mins</span>
                <button className="text-blue-600 font-semibold hover:underline">
                  Share Post
                </button>
              </div>
            </div>
          </article>
        )}
      </div>
    </div>
  );
};

export default FetchIndv;