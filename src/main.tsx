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
import AppContext from "./components/context/app.context";
import CheckoutPage from "./pages/checkout";
import AdminPage from "./pages/admin";
import AuthenticationRoute from "./components/auth/authentication";
import AuthorizationRoute from "./components/auth/authorization";

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

      {
        path: "checkout",
        element: (
          <AuthenticationRoute>
            <CheckoutPage />
          </AuthenticationRoute>
        ),
      },

      {
        path: "admin",
        element: (
          <AuthenticationRoute>
            <AuthorizationRoute>
              <AdminPage />
            </AuthorizationRoute>
          </AuthenticationRoute>
        ),
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
  <App>
    <AppContext>
      <RouterProvider router={router} />
    </AppContext>
  </App>,
);
