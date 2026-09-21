import { createRoot } from "react-dom/client";
import "styles/global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AboutPage from "pages/about";
import LoginPage from "pages/login";
import RegisterPage from "pages/register";
import LayoutClient from "@/layout/layoutClient";
import Homepage from "pages/homepage";
import ErrorPage from "pages/error";
import { App } from "antd";
import AppContext from "./components/context/app.context";
import CheckoutPage from "./pages/checkout";
import AuthenticationRoute from "./components/auth/authentication";
import AuthorizationRoute from "./components/auth/authorization";
import LayoutAdmin from "./layout/layoutAdmin";
import BooksPageAdmin from "./pages/admin/bookManaging/books";
import UsersPageAdmin from "./pages/admin/userManaging/users";
import HomepageAdmin from "./pages/admin/homepage";
import BookDetails from "pages/books";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutClient />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Homepage /> },

      {
        path: "book/:id",
        element: <BookDetails />,
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
    ],
  },

  {
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      {
        index: true,
        element: (
          <AuthenticationRoute>
            <AuthorizationRoute>
              <HomepageAdmin />
            </AuthorizationRoute>
          </AuthenticationRoute>
        ),
      },

      {
        path: "books",
        element: (
          <AuthenticationRoute>
            <AuthorizationRoute>
              <BooksPageAdmin />
            </AuthorizationRoute>
          </AuthenticationRoute>
        ),
      },

      {
        path: "users",
        element: (
          <AuthenticationRoute>
            <AuthorizationRoute>
              <UsersPageAdmin />
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
