import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import CreateUserPool, {
    PoolUserRole,
} from "./pages/createUserPool/CreateUserPool";

import AdminDashboard from "./pages/adminDashboard/AdminDashboard";
import CreateProgram from "./pages/createProgram/CreateProgram";
import EditProgram from "./pages/editProgram/EditProgram";
import Login from "./pages/login/Login";
import ProgramDetails from "./pages/programDetails/ProgramDetails";
import NotFound from "./components/error/notFound/NoutFound";

import SessionDetailsForm from "./components/sessionDetailsForm/SessionDetailsForm";

import SessionDetails from "./pages/sessionDetails/SessionDetails";
import { Provider } from "react-redux";
import store from "./store/store";

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
                element: <NotFound />,
            },
            {
                path: ":name",
                element: <ProgramDetails />,
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
                index: true,
                element: <NotFound />,
            },
            {
                path: ":sessionId",
                element: <SessionDetails />,
            },
            {
                path: "create",
                element: <SessionDetailsForm />,
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
        element: <NotFound />
    }
]);

function App() {
    return (
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    );
}

export default App;
