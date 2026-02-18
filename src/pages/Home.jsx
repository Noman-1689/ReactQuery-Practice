import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-indigo-50 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6">
            Master Data Fetching with <br />
            <span className="text-blue-600">TanStack Query</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
            Experience the evolution of React state management. Compare our
            traditional fetching methods with the high-performance power of
            React Query.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/req"
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:-translate-y-1"
            >
              Explore New Version
            </Link>
            <Link
              to="/trad"
              className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all hover:-translate-y-1"
            >
              View Old Version
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Comparison Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">
              Why the New Version?
            </h2>
            <p className="text-slate-500 mt-2">
              The differences are more than just code.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Instant Performance
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Caching ensures that data is served instantly to users, reducing
                loading spinners and server load.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Auto-Sync
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Background refetching keeps your UI synchronized with the server
                without the user ever clicking "refresh."
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Error Handling
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Declarative error and loading states make your code cleaner and
                your user experience more robust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-slate-900 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to see it in action?
              </h2>
              <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
                Jump into the "New Version" to see how we handle live data,
                caching, and background updates.
              </p>
              <Link
                to="/req"
                className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors"
              >
                Get Started Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
