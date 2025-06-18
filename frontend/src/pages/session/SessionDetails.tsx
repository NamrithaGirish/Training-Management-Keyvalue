import { useEffect, useState } from "react";
import { SessionContent } from "./components/SessionContent";
import { SessionActionButtons } from "./components/SessionActionButtons";

import { UploadAssignmentsModal } from "./components/modals/UploadAssignmentsModal";
import { FeedbackModal } from "./components/modals/FeedbackModal";
import { CandidateListModal } from "./components/modals/CandidateListModal";
import { type UserRole, type SessionData, UserRoleType } from "./components/sessionTypes";
import Layout from "../../components/layout/Layout";
import { useParams } from "react-router-dom";
import { useGetSessionByIdQuery } from "../../api-service/session/session.api";
import { UploadMaterialsModal } from "./components/modals/UploadMaterialsModal";

const SessionDetails = () => {
     const [sessionDetails, setSessionDetails] = useState<SessionData>({
        description: "",
        userRoles: []
    });

    

    const { trainingId, sessionId } = useParams();
    const { data: sessionDetailsData } = useGetSessionByIdQuery({ id: sessionId });
    
    useEffect(() => {
        if(!sessionDetailsData)
            return;
        setSessionDetails({
            description: sessionDetailsData.description,
            userRoles: []
        })
    }, [sessionDetailsData])

    const userRole: UserRole = UserRoleType.MODERATOR;   

    if(!sessionDetailsData)
        return (<></>);


    return (
        <Layout title={sessionDetailsData.title}>
            <div className="min-h-screen w-full relative text-white">
                <div>
                    <div className="border border-borderColor bg-cardColor w-full rounded-lg p-6 space-y-6">
                        <SessionContent sessionData={sessionDetails} />

                        {/* Action Buttons */}
                        <div className="pt-4">
                            <SessionActionButtons
                                userRole={userRole}
                                uploadMaterials={userRole === UserRoleType.TRAINER}
                                giveFeedback={true}
                                uploadAssignment={userRole === UserRoleType.CANDIDATE}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};


export default SessionDetails;