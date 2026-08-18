import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "styles/global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BooksPage from "pages/books";
import AboutPage from "pages/about";
import LoginPage from "pages/login";
import RegisterPage from "pages/register";
import Layout from "@/layout";
import Homepage from "pages/homepage";
import ErrorPage from "pages/error";
import { App } from "antd";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Homepage /> },
      {
        path: "books",
        element: <BooksPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
    ],
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App>
      <RouterProvider router={router} />
    </App>
  </StrictMode>,
);
