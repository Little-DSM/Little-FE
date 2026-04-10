import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./layouts";
import { EditPage, Mypage, ViewAllPage, ViewDetailPage } from "./pages";
import { CreatePage } from "./pages/CreatePage";
import { LandingPage } from "./pages/LandingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/main",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <ViewAllPage />,
      },
      {
        path: "view/:id",
        element: <ViewDetailPage />,
      },
      {
        path: "create",
        element: <CreatePage />,
      },
      {
        path: "edit/:id",
        element: <EditPage />,
      },
      {
        path: "my",
        element: <Mypage />,
      },
    ],
  },
]);
