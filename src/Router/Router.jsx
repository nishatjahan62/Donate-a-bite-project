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
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import Favorites from "../Pages/Dashboard/Favorites/Favorites";
import RequestCharityRole from "../Pages/Dashboard/RequestCharityRole/RequestCharityRole";
import TransactionHistory from "../Pages/Dashboard/TransactionHistory/TransactionHistory";
import MyReviews from "../Pages/Dashboard/MyReviews/MyReviews";
import Payment from "../Pages/Payment/Payment";
import ManageUsers from "../Pages/Dashboard/ManageUsers.jsx/ManageUsers";
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
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "profile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "favorites",
        element: <Favorites></Favorites>,
      },
      {
        path: "reviews",
        element: <MyReviews></MyReviews>,
      },
      {
        path: "transaction-history",
        element: <TransactionHistory></TransactionHistory>,
      },
      {
        path: "request-charity-role",
        element: <RequestCharityRole></RequestCharityRole>,
      },
      {
        path: "payment-form",
        element: <Payment></Payment>,
      },
      {
        path: "manage-users",
        element: <ManageUsers></ManageUsers>,
      },
    ],
  },
]);
