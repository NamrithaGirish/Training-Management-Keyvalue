import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import SessionDetailsForm from "./components/sessionDetailsForm/SessionDetailsForm";
import AdminDashboard from "./pages/adminDashboard/AdminDashboard";
import CreateProgram from "./pages/createProgram/CreateProgram";
import CreateUserPool, { PoolUserRole } from "./pages/createUserPool/CreateUserPool";
import EditProgram from "./pages/editProgram/EditProgram";
import Login from "./pages/login/Login";
import Program from "./pages/programs/Programs";
import NotFound from "./components/error/notFound/NoutFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
        errorElement: <NotFound />,
    },
    {
        path: "/dashboard",
        element: <AdminDashboard />,
        errorElement: <NotFound />,
    },
    {
        path: "/program",
        element: <Outlet />,
        children: [
            {
                index: true,
                element: <Program />,
            },
            {
                path: "create",
                element: <CreateProgram />,
            },
            {
                path: "edit",
                element: <EditProgram />,
            },
        ],
        errorElement: <NotFound />,
    },
    {
        path: "/session",
        element: <Outlet />,
        children: [
            {
                path: "create",
                element: <SessionDetailsForm />,
            }
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
            }
        ],
        errorElement: <NotFound />,
    }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
