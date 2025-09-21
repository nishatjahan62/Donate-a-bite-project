import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/Error/ErrorPage";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import ErrorLayout from "../Layouts/ErrorLayout";
import AboutUs from "../Pages/AboutUs/AboutUs";
import AllDonations from "../Pages/AllDonations/AllDonations";
import ForgetPassword from "../Pages/Authentication/ForgetPassword/ForgetPassword";
import DonationDetails from "../Pages/DonationDetails/DonationDetails";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layouts/DashbordLayout";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/about-us",
        Component: AboutUs,
      },
      {
        path: "all-donations",
        Component: AllDonations,
      },
      {
        path: "donation-details/:id",
        element: (
          <PrivateRoute>
            <DonationDetails></DonationDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/donation/${params.id}`),
      },
    ],
  },
  {
    path: "auth",
    Component: AuthLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "forget-password",
        Component: ForgetPassword,
      },
    ],
  },
  {
    path: "/",
    Component: ErrorLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "*",
        Component: ErrorPage,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <h2>Welcome to your dashboard</h2>,
      },
    ],
  },
]);
