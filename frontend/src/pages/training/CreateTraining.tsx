import { useNavigate } from "react-router-dom";
import ActionButton from "../../components/actionButton/ActionButton";
import FormInput from "../../components/formInput/FormInput";
import Layout from "../../components/layout/Layout";
import { useState } from "react";
import type { TrainingDetailsPayload } from "../../api-service/training/training.types";
import { useCreateTrainingMutation } from "../../api-service/training/training.api";

const CreateTraining = () => {
    const [trainingDetails, setTrainingDetails] =
        useState<TrainingDetailsPayload>({
            title: "fejr",
            description: "Desc",
            startDate: "2001-10-03",
            endDate: "2002-08-03",
        });

    const navigate = useNavigate();
    const [createTraining] = useCreateTrainingMutation();

    const handleSubmit = () => {
        console.log(trainingDetails);
        createTraining(trainingDetails)
            .unwrap()
            .then((data) => {})
            .catch((error) => {});
    };

    return (
        <Layout title="Create Training">
            <div className="flex flex-col w-full gap-6 mb-6 bg-cardColor border border-borderColor p-4 rounded">
                <FormInput
                    name="training-title"
                    label="Training Title"
                    value={trainingDetails.title}
                    onChange={(event) =>
                        setTrainingDetails({
                            ...trainingDetails,
                            title: event.target.value,
                        })
                    }
                />
                <FormInput
                    name="training-description"
                    label="Training Description"
                    type="textarea"
                    value={trainingDetails.description}
                    onChange={(event) =>
                        setTrainingDetails({
                            ...trainingDetails,
                            description: event.target.value,
                        })
                    }
                />
                <FormInput
                    name="training-start-date"
                    label="Training Start Date"
                    type="date"
                    value={trainingDetails.startDate}
                    onChange={(event) =>
                        setTrainingDetails({
                            ...trainingDetails,
                            startDate: event.target.value,
                        })
                    }
                />
                <FormInput
                    name="training-end-date"
                    label="Training End Date"
                    type="date"
                    value={trainingDetails.endDate}
                    onChange={(event) =>
                        setTrainingDetails({
                            ...trainingDetails,
                            endDate: event.target.value,
                        })
                    }
                />
                <div className="flex flex-col gap-3">
                    <ActionButton
                        label="Add Trainer to Pool"
                        onClick={() => navigate("/createPool/trainer")}
                    />
                    <ActionButton
                        label="Add Moderators to Pool"
                        onClick={() => navigate("/createPool/moderator")}
                    />
                    <ActionButton
                        label="Add Candidates to Pool"
                        onClick={() => navigate("/createPool/candidate")}
                    />
                    <ActionButton
                        label="Create New Session"
                        onClick={() => navigate("/session/create")}
                    />
                    <ActionButton
                        label="Add Sessions to Schedule"
                        onClick={() => {}}
                    />
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        onClick={handleSubmit}
                        className="bg-black border text-white border-white px-4 py-2 rounded hover:bg-white hover:text-black transition"
                    >
                        Submit
                    </button>
                    <button
                        // onClick={}
                        className="bg-white text-black px-4 py-2 rounded hover:opacity-90"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default CreateTraining;
