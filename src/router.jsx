import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Surveys from "./views/Surveys";
import GuestLayout from "./Layouts/GuestLayout";
import DefaultLayout from "./Layouts/DefaultLayout";
import SurveyView from "./views/SurveyView";
import SurveyPublicView from "./views/SurveyPublicView";
const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/surveys",
        element: <Surveys />,
      },
      {
        path: "/surveys/create",
        element: <SurveyView />,
      },
      {
        path: "/surveys/:id",
        element: <SurveyView />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/surveys/public/:slug",
    element: <SurveyPublicView />,
  },
]);

export default router;
