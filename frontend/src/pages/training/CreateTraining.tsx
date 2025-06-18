import ActionButton from "../../components/actionButton/ActionButton";
import Button, { ButtonType } from "../../components/button/Button";
import Layout from "../../components/layout/Layout";
import FormInput from "../../components/formInput/FormInput";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateTrainingMutation } from "../../api-service/training/training.api";

const CreateTraining = () => {
    const [trainingDetails, setTrainingDetails] =
        useState({
            title: "",
            description: "",
            startDate: "",
            endDate: "",
        });

    const navigate = useNavigate();
    const [createTraining, { isLoading }] = useCreateTrainingMutation();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        createTraining(trainingDetails)
            .unwrap()
            .then(() => {
                navigate("/adminDashboard");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Layout title="Create Training" isLoading={isLoading}>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col w-full gap-6 mb-6 bg-cardColor border border-borderColor p-4 rounded"
            >
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
                    {/* <ActionButton
                        label="Create New Session"
                        onClick={() => navigate("/session/create")}
                    />
                    <ActionButton
                        label="Add Sessions to Schedule"
                        onClick={() => {}}
                    /> */}
                </div>

                <div className="flex justify-end gap-4">
                    <Button variant={ButtonType.PRIMARY} type="submit">
                        Submit
                    </Button>
                    <Button variant={ButtonType.SECONDARY}>Cancel</Button>
                </div>
            </form>
        </Layout>
    );
};

export default CreateTraining;
