import { createBrowserRouter } from "react-router";

import AppLayout from "../layouts/AppLayout";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import Film from "../pages/Film/Film";
import SearchPage from "../pages/SearchPage/SearchPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/movie/:filmId", element: <Film /> },
      { path: "/search/", element: <SearchPage /> },
    ],
  },
]);
