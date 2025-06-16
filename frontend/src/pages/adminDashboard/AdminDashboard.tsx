import DashboardCard from "../../components/card/Card";
import EventList from "../../components/eventList/EventList";

const Header = () => {
    return (
        <div
            className={`flex items-center justify-between w-full py-4 px-8 bg-cardColor h-headerHeight border-2 border-borderColor fixed top-0 left-0 right-0 text-white shadow-lg z-50`}
        >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500  to-blue-500 text-transparent bg-clip-text">
                Admin Dashboard
            </h1>
        </div>
    );
};

const NavbarItem = ({
    label = "label",
    icon = "icon",
}: {
    label?: string;
    icon?: string;
}) => {
    return (
        <li>
            <a
                href="#"
                className="flex justify-between items-center w-9/10 border-2 border-borderColor border-l-transparent bg-cardColor rounded-r-full p-4 pr-6"
            >
                <p className="text-white text-lg">{label}</p>
                <span className="text-white text-lg">{icon}</span>
            </a>
        </li>
    );
};

const Navbar = () => {
    return (
        <nav
            className={`fixed top-headerHeight -translate-x-2px left-0 bottom-0 w-navbarWidth h-full bg-cardColor text-white shadow-lg py-8 z-40 border-2 border-borderColor`}
        >
            <ul className="space-y-4">
                <NavbarItem label="Dashboard" icon="🏠" />
                <NavbarItem label="Dashboard" icon="🏠" />
            </ul>
        </nav>
    );
};

const LightEffect = () => {
    return (
        <div className="w-bodyWidth h-screen flex items-center justify-center fixed top-0 pointer-events-none">
            <div className="w-full h-full flex items-center justify-center absolute top-0 opacity-80">
                <div className="absolute left-0 -translate-x-1/2 w-70 h-70 bg-red-500 rounded-full blur-[120px] animate-[pulse_4s_ease-in-out_infinite]"></div>
                <div className="absolute right-0 translate-x-1/2 w-70 h-70 bg-blue-500 rounded-full blur-[120px] animate-[pulse_4s_ease-in-out_2s_infinite]"></div>
            </div>
            <h1 className="absolute w-full text-center text-[1000%] uppercase font-bold bg-gradient-to-b from-blue-500  to-red-500 text-transparent bg-clip-text opacity-30 scale-100">
                Keyvalue
            </h1>
        </div>
    );
};


const CardsList = () => {
    return (
        <div className="flex flex-wrap items-center justify-around gap-4 w-full">
            <DashboardCard label="Text here" value="1" />
            <DashboardCard label="Text here" value="1" />
            <DashboardCard label="Text here" value="1" />
            <DashboardCard label="Text here" value="1" />
            <DashboardCard label="Text here" value="1" />
        </div>
    );
};

const Layout = ({ children }: { children?: React.ReactNode }) => {
    return (
        <div className="flex flex-col min-h-screen bg-bgColor">
            <Header />
            <Navbar />
            <div className="flex mt-headerHeight">
                <div className="w-full h-bodyHeight relative ml-navbarWidth">
                    <LightEffect />
                    <main className="p-6 overflow-y-auto w-full h-full relative z-10">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
};

const AdminDashboard = () => {
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center gap-10">
                <CardsList />
                <EventList
                    heading="Programs"
                    showCreateButton={true}
                    onCreateClick={() => console.log("Create program clicked")}
                    data={[
                        {
                            title: "Program Title",
                            description:
                                "A short one line description about the program",
                            duration: "3 days",
                            status: "Active",
                            totalSessions: 7,
                            progress: 90,
                        },
                    ]}
                />

                <EventList
                    heading="Sessions"
                    data={[
                        {
                            title: "Session Title",
                            description:
                                "A short one line description about the session",
                            duration: "8 hours",
                            status: "Active",
                            trainer: "Trainer Name",
                        },
                    ]}
                />
            </div>
        </Layout>
    );
};

export default AdminDashboard;
