import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login.jsx";
import Landing from "../components/Landing.jsx";
import Register from "../components/Register.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import RootLayout from "../layouts/RootLayout.jsx";
import NavbarLayout from "../layouts/NavbarLayout.jsx";

const router = createBrowserRouter([
  {
    element: <RootLayout />, // Global layout: Toaster + outlet
    children: [
      {
        element: <NavbarLayout />, // Pages with navbar
        children: [
          {
            path: "/dashboard",
            element: (
              <ProtectedRoute>
                <Dashboard />
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
