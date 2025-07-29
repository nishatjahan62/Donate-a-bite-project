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
import Profile from "../Pages/userdashbord/Profile.jsx/Profile";
import Favorites from "../Pages/userdashbord/Favorites/Favorites";
import MyReviews from "../Pages/userdashbord/MyReviews/MyReviews";
import Transactions from "../Pages/userdashbord/Transactions/Transactions";
import RequestCharity from "../Pages/userdashbord/RequestCarityRole/RequestCharity";
import Dashboard from "../Pages/userdashbord/Dashboard/Dashboard";

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
          fetch(`http://localhost:3000/donation/${params.id}`),
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
        Component: Dashboard,
      },
      {
        path: "profile",
        Component: Profile,
      },
      {
        path: "favorites",
        Component: Favorites,
      },
      {
        path: "reviews",
        Component: MyReviews,
      },
      {
        path: "transactions",
        Component: Transactions,
      },
      {
        path: "request-charity",
        Component: RequestCharity,
      },
    ],
  },
]);
