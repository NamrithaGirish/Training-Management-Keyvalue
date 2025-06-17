import { useState } from "react";
import { SessionContent } from "./components/SessionContent";
import { SessionActionButtons } from "./components/SessionActionButtons";

import { UploadAssignmentsModal } from "./components/modals/UploadAssignmentsModal";
import { FeedbackModal } from "./components/modals/FeedbackModal";
import { CandidateListModal } from "./components/modals/CandidateListModal";
import type { UserRole, SessionData } from "./components/sessionTypes";
import Layout from "../../components/layout/Layout";
import { useParams } from "react-router-dom";

interface SessionDetailsProps {
    userRole: UserRole;
    sessionData: SessionData;
}

const SessionDetails = () => {
    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
    const [candidateListModalOpen, setCandidateListModalOpen] = useState(false);

    const { sessionId } = useParams();
    // const sessionData={
    //     trainerName: "",
    //     moderators: [""],
    //     sessionDescription: ""
    // }


    const handleUploadAssignment = () => {
        setUploadModalOpen(true);
    };

    const handleGiveFeedback = () => {
        if (userRole === "candidate") {
            setFeedbackModalOpen(true);
        } else {
            setCandidateListModalOpen(true);
        }
    };

    const handleUploadMaterials = () => {
        setUploadModalOpen(true);
    };

    return (
        <Layout>
            <div className="min-h-screen w-full relative text-white">
                <div>
                    <div className="border border-borderColor bg-cardColor w-full rounded-lg p-6 space-y-6">
                        <SessionContent sessionData={sessionData} />

                        {/* Action Buttons */}
                        <div className="pt-4">
                            <SessionActionButtons
                                userRole={userRole}
                                onUploadAssignment={handleUploadAssignment}
                                onGiveFeedback={handleGiveFeedback}
                                onUploadMaterials={handleUploadMaterials}
                            />
                        </div>
                    </div>
                </div>

                <UploadAssignmentsModal
                    isOpen={uploadModalOpen}
                    onClose={() => setUploadModalOpen(false)}
                />

                <FeedbackModal
                    isOpen={feedbackModalOpen}
                    onClose={() => setFeedbackModalOpen(false)}
                />

                <CandidateListModal
                    isOpen={candidateListModalOpen}
                    onClose={() => setCandidateListModalOpen(false)}
                />
            </div>
        </Layout>
    );
};


export default SessionDetails;