import { useNavigate } from "react-router-dom";
import DashboardCard from "../../components/dashboardCard/DashboardCard";
import DashboardCardList from "../../components/dashboardCardList/DashboardCardList";
import EventList from "../../components/eventList/EventList";
import Layout from "../../components/layout/Layout";
import { useGetTrainingByIdQuery, useGetTrainingListQuery } from "../../api-service/training/training.api";
import { useEffect } from "react";

const dummyDashboardData = [
    {
        title: "Althaf",
        description: "A short one line description about the program",
        duration: "3 days",
        status: "Active",
        totalSessions: 7,
        progress: 30,
    },
    {
        title: "Bhagya",
        description: "A short one line description about the program",
        duration: "3 days",
        status: "Active",
        totalSessions: 7,
        progress: 90,
    },
    {
        title: "Nithish",
        description: "A short one line description about the program",
        duration: "3 days",
        status: "Scheduled",
        totalSessions: 7,
        progress: 90,
    },
];

const AdminDashboard = () => {
    const navigate = useNavigate();

    // const trainingDetailsList = useGetTrainingListQuery({});
    // const trainingDetailsList = useGetTrainingByIdQuery({ id: 1 });
    const trainingDetailsList = useGetTrainingListQuery({});

    useEffect(() => {
        console.log(trainingDetailsList)
    }, [trainingDetailsList])

    return (

        <Layout title="Admin Dashboard">
            <div className="flex flex-col items-center justify-center gap-10 p-5">
                <DashboardCardList
                    data={[
                        { label: "Text", value: "1" },
                        { label: "Text", value: "2" },
                        { label: "Text", value: "3" },
                        { label: "Text", value: "4" },
                        { label: "Text", value: "5" },
                    ]}
                />
                <EventList
                    heading="Programs"
                    showCreateButton={true}
                    onCreateClick={() => navigate("/program/create")}
                    data={dummyDashboardData}
                />
            </div>
        </Layout>
    );
};

export default AdminDashboard;
