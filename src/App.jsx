import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import FetchOld from "./pages/FetchOld";
import FetchRQ from "./pages/FetchRQ";
import Home from "./pages/Home";
import { createBrowserRouter } from "react-router-dom";
import FetchIndv from "./pages/FetchIndv";
import Infi from "./pages/Infi";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/trad",
        element: <FetchOld />,
      },
      {
        path: "/req",
        element: <FetchRQ />,
      },
      {
        path: "/req/:id",
        element: <FetchIndv />,
      },
      {
        path: "/inf",
        element: <Infi />,
      },
    ],
  },
]);

const App = () => {
  const queryClient = new QueryClient();
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  );
};

export default App;
