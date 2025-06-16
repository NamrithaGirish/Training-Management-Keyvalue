import DashboardCard from "../../components/card/Card";
import EventList from "../../components/eventList/EventList";
import Layout from "../../components/layout/Layout";

const CardsList = () => {
    return (
        <div className="flex flex-wrap items-center justify-between gap-4 w-full">
            <DashboardCard label="Text here" value="1" />
            <DashboardCard label="Text here" value="1" />
            <DashboardCard label="Text here" value="1" />
            <DashboardCard label="Text here" value="1" />
            <DashboardCard label="Text here" value="1" />
        </div>
    );
};

const AdminDashboard = () => {
    return (
        <Layout title="Admin Dashboard">
            <div className="flex flex-col items-center justify-center gap-10 p-5">
                <CardsList />
                <EventList
                    heading="Programs"
                    showCreateButton={true}
                    onCreateClick={() => console.log("Create program clicked")}
                    data={[
                        {
                            title: "Althaf",
                            description:
                                "A short one line description about the program",
                            duration: "3 days",
                            status: "Active",
                            totalSessions: 7,
                            progress: 90,
                        },
                        {
                            title: "Bhagya",
                            description:
                                "A short one line description about the program",
                            duration: "3 days",
                            status: "Completed",
                            totalSessions: 7,
                            progress: 90,
                        },
                        {
                            title: "Nithish",
                            description:
                                "A short one line description about the program",
                            duration: "3 days",
                            status: "Scheduled",
                            totalSessions: 7,
                            progress: 90,
                        }
                    ]}
                />
            </div>
        </Layout>
    );
};

export default AdminDashboard;
