import React, { useState, useEffect } from "react";
import { fetchPosts } from "../Api/api";

const FetchOld = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPostData();
  }, []);

  const getPostData = async () => {
    try {
      setLoading(true);
      const res = await fetchPosts();
      if (res.status === 200) {
        setPosts(res.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Simple Header */}
        <div className="mb-8 border-b border-slate-200 pb-4">
          <h1 className="text-2xl font-bold text-slate-800">Traditional Fetching</h1>
          <p className="text-slate-500 text-sm italic">
            Using useEffect & useState (Manual State Management)
          </p>
        </div>

        {loading ? (
          <div className="text-center py-10 text-slate-400 font-medium">
            Fetching data the old way...
          </div>
        ) : (
          <ul className="space-y-4">
            {posts?.map((post) => {
              const { id, title, body } = post;
              return (
                <li 
                  key={id} 
                  className="bg-white border border-slate-200 p-5 rounded-lg shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-slate-100 text-slate-500 text-[10px] px-2 py-1 rounded font-mono">
                      ID: {id}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-900 text-lg mb-2">
                    {title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {body}
                  </p>
                </li>
              );
            })}
          </ul>
        )}

        {posts.length === 0 && !loading && (
          <div className="text-center py-10 bg-white rounded-lg border border-dashed border-slate-300">
            <p className="text-slate-400">No posts found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FetchOld;