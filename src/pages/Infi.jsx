import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { fetchPage } from "../Api/api";
import { useInView } from "react-intersection-observer";

const Infi = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["infinite"],
      queryFn: fetchPage,
      initialPageParam: 1, // Ensure initialPageParam is defined for TanStack v5
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 10 ? allPages.length + 1 : undefined;
      },
    });

  //   const handleScroll = () => {
  //     const bottom =
  //       window.innerHeight + window.scrollY >=
  //       document.documentElement.scrollHeight - 2; // Offset by 2px for precision
  //     if (bottom && hasNextPage && !isFetchingNextPage) {
  //       fetchNextPage();
  //     }
  //   };

  //or

  const { ref, inView } = useInView({
    threshold: 1,
  });

  //   useEffect(() => {
  //     window.addEventListener("scroll", handleScroll);
  //     return () => window.removeEventListener("scroll", handleScroll);
  //   }, [hasNextPage, isFetchingNextPage]);

  //or

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 py-4 px-6 mb-8">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            Infinite Scroll
          </h1>
          <span className="text-[10px] font-bold bg-blue-100 text-blue-600 px-2 py-1 rounded-md uppercase">
            {data?.pages.flat().length || 0} Items
          </span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6">
        {status === "pending" ? (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-20 bg-slate-200 animate-pulse rounded-2xl"
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {data?.pages.map((page, index) => (
              <React.Fragment key={index}>
                {page.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center p-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 group"
                  >
                    <div className="relative">
                      <img
                        src={item.avatar_url}
                        alt={item.login}
                        className="w-12 h-12 rounded-full border-2 border-slate-100 group-hover:border-blue-200 transition-colors"
                      />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>

                    <div className="ml-4 flex-1">
                      <p className="text-sm font-bold text-slate-800">
                        @{item.login}
                      </p>
                      <p className="text-xs text-slate-500 font-medium">
                        Community Member
                      </p>
                    </div>

                    <button className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                      View Profile
                    </button>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Loading / End of List Indicator */}
        <div className="mt-10 flex justify-center py-4">
          {isFetchingNextPage ? (
            <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
              <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              Loading more...
            </div>
          ) : !hasNextPage && status !== "pending" ? (
            <p className="text-slate-400 text-sm font-medium italic">
              🎉 You've reached the end of the feed!
            </p>
          ) : null}
        </div>
      </div>
      <div ref={ref} className="h-1">
        {isFetchingNextPage && <div>Loading...</div>}
      </div>
    </div>
  );
};

export default Infi;
