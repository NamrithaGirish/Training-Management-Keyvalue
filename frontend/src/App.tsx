import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import CreateUserPool, {
    PoolUserRole,
} from "./pages/createUserPool/CreateUserPool";

import AdminDashboard from "./pages/adminDashboard/AdminDashboard";
import CreateTraining from "./pages/training/CreateTraining";
import UpdateTraining from "./pages/training/UpdateTraining";
import Login from "./pages/login/Login";
import TrainingDetails from "./pages/training/TrainingDetails";
import NotFound from "./components/error/notFound/NoutFound";

import CreateSession from "./pages/session/CreateSession";

import SessionDetails from "./pages/session/SessionDetails";
import { Provider } from "react-redux";
import store from "./store/store";

import UpdateSession from "./pages/session/UpdateSession";
import CommonDashboard from "./pages/commonDashboard/CommonDashboard";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
        errorElement: <NotFound />,
    },
    {
        path: "/adminDashboard",
        element: <AdminDashboard />,
        errorElement: <NotFound />,
    },
    {
        path: "/dashboard/:userId",
        element: <Outlet />,
        children: [
            {
                index: true,
                element: <CommonDashboard />
            },
            {
                path: "training/:trainingId",
                element: <TrainingDetails />
            }
        ],
        errorElement: <NotFound />
    },
    {
        path: "/training",
        element: <Outlet />,
        children: [
            {
                index: true,
                element: <NotFound />,
            },
            {
                path: "create",
                element: <CreateTraining />,
            },
            {
                path: ":trainingId",
                element: <TrainingDetails />,
            },
            {
                path: ":trainingId/update",
                element: <UpdateTraining />,
            },
            {
                path: ":trainingId/session",
                element: <Outlet />,
                children: [
                    {
                        index: true,
                        element: <NotFound />,
                    },
                    {
                        path: "create",
                        element: <CreateSession />,
                    },
                    {
                        path: ":sessionId",
                        element: <SessionDetails />,
                    },
                    {
                        path: ":sessionId/update",
                        element: <UpdateSession />,
                    },
                ],
                errorElement: <NotFound />,
            },
        ],
        errorElement: <NotFound />,
    },

    {
        path: "/createPool",
        element: <Outlet />,
        children: [
            {
                path: "trainer",
                element: <CreateUserPool role={PoolUserRole.TRAINER} />,
            },
            {
                path: "moderator",
                element: <CreateUserPool role={PoolUserRole.MODERATOR} />,
            },
            {
                path: "candidate",
                element: <CreateUserPool role={PoolUserRole.CANDIDATE} />,
            },
        ],
        errorElement: <NotFound />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

function App() {
    return (
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    );
}

export default App;
