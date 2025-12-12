import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login.jsx";
import Landing from "../components/Landing.jsx";
import Register from "../components/Register.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import RootLayout from "../layouts/RootLayout.jsx";
import NavbarLayout from "../layouts/NavbarLayout.jsx";

// Settings Pages
import UpdateAccountForm from "../components/UpdateAccountForm.jsx";
import ChangePasswordForm from "../components/ChangePasswordForm.jsx";
import AvatarUpdate from "../components/AvatarUpdate.jsx";
import CoverImage from "../components/CoverImage.jsx";

// Alerts Page
import AlertsPage from "../pages/AlertsPage.jsx";

const router = createBrowserRouter([
  {
    element: <RootLayout />, // Global layout: Toaster + outlet
    children: [
      {
        element: <NavbarLayout />, // All pages that show navbar
        children: [
          {
            path: "/dashboard",
            element: (
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            ),
          },

          // ⭐ NEW ALERTS ROUTE
          {
            path: "/alerts",
            element: (
              <ProtectedRoute>
                <AlertsPage />
              </ProtectedRoute>
            ),
          },

          // ⭐ SETTINGS ROUTES
          {
            path: "/settings/profile",
            element: (
              <ProtectedRoute>
                <UpdateAccountForm />
              </ProtectedRoute>
            ),
          },
          {
            path: "/settings/password",
            element: (
              <ProtectedRoute>
                <ChangePasswordForm />
              </ProtectedRoute>
            ),
          },
          {
            path: "/settings/avatar",
            element: (
              <ProtectedRoute>
                <AvatarUpdate />
              </ProtectedRoute>
            ),
          },
          {
            path: "/settings/cover",
            element: (
              <ProtectedRoute>
                <CoverImage />
              </ProtectedRoute>
            ),
          },
        ],
      },

      // Pages WITHOUT navbar
      { path: "/", element: <Landing /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);

export default router;
