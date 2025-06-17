import { useNavigate } from "react-router-dom";
import DashboardCardList from "../../components/dashboardCardList/DashboardCardList";
import EventList from "../../components/eventList/EventList";
import Layout from "../../components/layout/Layout";
import { useGetTrainingListQuery } from "../../api-service/training/training.api";
import type { EventProps } from "react-big-calendar";

const formatTrainingList = (trainingDetailsList: Array<EventProps>) => {
    if (!trainingDetailsList) return;
    const formattedTrainingList = trainingDetailsList.map(
        (trainingDetails: any) => {
            return {
                id: trainingDetails.id,
                title: trainingDetails.title,
                description: trainingDetails.description,
                startDate: trainingDetails.startDate,
                endDate: trainingDetails.endDate,
                status: "Active",
                // totalSessions: 7,
                // progress: 30,
            };
        }
    );
    return formattedTrainingList;
};

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { data: trainingDetailsList } = useGetTrainingListQuery({});

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
                    data={formatTrainingList(trainingDetailsList)}
                />
            </div>
        </Layout>
    );
};

export default AdminDashboard;
