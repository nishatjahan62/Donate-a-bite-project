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
import Payment from "../Pages/Payment/Payment";
import ManageUsers from "../Pages/Dashboard/AdminDashboard/ManageUsers.jsx/ManageUsers";
import ForbiddenPage from "../Pages/Error/ForbiddenPage";
import AdminRoute from "./AdminRoute";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import Favorites from "../Pages/Dashboard/UserDashboard/Favorites/Favorites";
import MyReviews from "../Pages/Dashboard/UserDashboard/MyReviews/MyReviews";
import RequestCharityRole from "../Pages/Dashboard/UserDashboard/RequestCharityRole/RequestCharityRole";
import FeatureDonations from "../Pages/Dashboard/AdminDashboard/FeatureDonations/FeatureDonations";
import ManageRoleRequests from "../Pages/Dashboard/AdminDashboard/ManageRoleRequests/ManageRoleRequests";
import ManageRequests from "../Pages/Dashboard/AdminDashboard/ManageRequests/ManageRequests";
import ManageDonations from "../Pages/Dashboard/AdminDashboard/ManageDonations/ManageDonations";
import MyPickups from "../Pages/Dashboard/CharityDashboard/MyPickups/MyPickups";
import MyRequests from "../Pages/Dashboard/CharityDashboard/MyRequests/MyRequests";
import ReceivedDonations from "../Pages/Dashboard/CharityDashboard/ReceivedDonations/ReceivedDonations";
import AddDonations from "../Pages/Dashboard/RestaurantDashboard/AddDonations/AddDonations";
import MyDonations from "../Pages/Dashboard/RestaurantDashboard/MyDonations/MyDonations";
import RequestedDonations from "../Pages/Dashboard/RestaurantDashboard/RequestedDonations/RequestedDonations";
import CharityTransactionHistory from "../Pages/Dashboard/CharityDashboard/CharityTransactionHistory/CharityTransactionHistory";
import UserTransactionHistory from "../Pages/Dashboard/UserDashboard/UserTransactionHistory/UserTransactionHistory";
import RequestDetails from "../Components/LatestCharityRequests/RequestDetails";
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
        element: (
          <PrivateRoute>
            <AllDonations></AllDonations>
          </PrivateRoute>
        ),
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
      {
        path: "forbidden",
        Component: ForbiddenPage,
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
      // User's Routes..
      {
        path: "profile",
        element: <MyProfile></MyProfile>,
      },

      { path: "favorites", element: <Favorites></Favorites> },
      {
        path: "reviews",
        element: <MyReviews></MyReviews>,
      },
      {
        path: "user-transaction-history",
        element: <UserTransactionHistory></UserTransactionHistory>,
      },
      {
        path: "request-charity-role",
        element: <RequestCharityRole></RequestCharityRole>,
      },
      {
        path: "payment-form",
        element: <Payment></Payment>,
      },

      // Admin's routes

      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },

      {
        path: "feature-donations",
        element: (
          <AdminRoute>
            <FeatureDonations></FeatureDonations>
          </AdminRoute>
        ),
      },
      {
        path: "Manage-role-requests",
        element: (
          <AdminRoute>
            <ManageRoleRequests></ManageRoleRequests>
          </AdminRoute>
        ),
      },
      {
        path: "manage-requests",
        element: (
          <AdminRoute>
            {" "}
            <ManageRequests></ManageRequests>
          </AdminRoute>
        ),
      },
      {
        path: "manage-donations",
        element: (
          <AdminRoute>
            <ManageDonations></ManageDonations>
          </AdminRoute>
        ),
      },

      // Charity's Routes
      {
        path: "My-pickups",
        element: <MyPickups></MyPickups>,
      },
      {
        path: "My-requests",
        element: <MyRequests></MyRequests>,
      },
      {
        path: "Received-donations",
        element: <ReceivedDonations></ReceivedDonations>,
      },
      {
        path: "charity-transaction-history",
        element: <CharityTransactionHistory></CharityTransactionHistory>,
      },

      // Restaurant's Routes
      {
        path: "add-donations",
        element: <AddDonations></AddDonations>,
      },
      {
        path: "my-donations",
        element: <MyDonations></MyDonations>,
      },
      {
        path: "requested-donations",
        element: <RequestedDonations></RequestedDonations>,
      },
       {
  path: "request-details/:id",
  element: <RequestDetails />,
},

      

    ],
  },
]);
