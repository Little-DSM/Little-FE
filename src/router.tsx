import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./layouts";
import TestPage from "./pages/TestPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/test",
        element: <TestPage />,
      },
    ],
  },
]);
