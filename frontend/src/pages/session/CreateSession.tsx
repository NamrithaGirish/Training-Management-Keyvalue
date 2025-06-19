import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Layout from "../../components/layout/Layout";
import FormInput from "../../components/formInput/FormInput";
import ActionButton from "../../components/actionButton/ActionButton";
import Button, { ButtonType } from "../../components/button/Button";
import { useCreateSessionMutation } from "../../api-service/session/session.api";
import { useNavigate, useParams } from "react-router-dom";

type SelectModalProps = {
    title: string;
    options: string[];
    selected: string[];
    multiSelect?: boolean;
    onClose: () => void;
    onSelect: (selected: string[]) => void;
};

const SelectModal: React.FC<SelectModalProps> = ({
    title,
    options,
    selected,
    multiSelect = true,
    onClose,
    onSelect,
}) => {
    const [localSelection, setLocalSelection] = useState<string[]>(selected);

    const toggleOption = (option: string) => {
        if (multiSelect) {
            if (localSelection.includes(option)) {
                setLocalSelection(localSelection.filter((item) => item !== option));
            } else {
                setLocalSelection([...localSelection, option]);
            }
        } else {
            setLocalSelection([option]);
        }
    };

    return (
        <div className="fixed inset-0 w-full h-full bg-modalBgColor flex items-center justify-center z-50">
            <div className="bg-cardColor border border-borderColor rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-white">{title}</h2>
                    <Button onClick={onClose}>
                        <X className="text-gray-300 hover:text-white" />
                    </Button>
                </div>
                <div className="space-y-2">
                    {options.map((option) => (
                        <label key={option} className="flex items-center gap-2 text-white">
                            <input
                                type={multiSelect ? "checkbox" : "radio"}
                                checked={localSelection.includes(option)}
                                onChange={() => toggleOption(option)}
                                name={multiSelect ? option : "single-select"}
                            />
                            {option}
                        </label>
                    ))}
                </div>
                <div className="flex justify-end gap-4 mt-6">
                    <Button
                        variant={ButtonType.PRIMARY}
                        onClick={() => {
                            onSelect(localSelection);
                            onClose();
                        }}
                    >
                        Save
                    </Button>
                    <Button onClick={onClose} variant={ButtonType.SECONDARY}>
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
};

const CreateSession = () => {
    const [sessionDetails, setSessionDetails] = useState({
        programId: 4,
        title: "",
        description: "",
        date: "",
        duration: 0,
    });

    const { trainingId } = useParams();
    const navigate = useNavigate();

    const [showTrainerModal, setShowTrainerModal] = useState(false);
    const [showModeratorModal, setShowModeratorModal] = useState(false);
    const [selectedTrainer, setSelectedTrainer] = useState<string[]>([]);
    const [selectedModerators, setSelectedModerators] = useState<string[]>([]);

    const [createSession, { isLoading }] = useCreateSessionMutation();

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!sessionDetails.title.trim()) {
            newErrors.title = "Title is required.";
        } else if (sessionDetails.title.trim().length < 3) {
            newErrors.title = "Title must be at least 3 characters.";
        }

        if (!sessionDetails.description.trim()) {
            newErrors.description = "Description is required.";
        } else if (sessionDetails.description.trim().length < 10) {
            newErrors.description = "Description must be at least 10 characters.";
        }

        if (sessionDetails.duration <= 0) {
            newErrors.duration = "Duration is required.";
        }

        if (selectedTrainer.length !== 1) {
            newErrors.trainer = "Please select one trainer.";
        }

        return newErrors;
    };


    const handleSubmit = () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        createSession(sessionDetails)
            .unwrap()
            .then((data) => {
                console.log(data);
                navigate(`/training/${trainingId}`);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleCancel = () => {
        setSelectedTrainer([]);
        setSelectedModerators([]);
        setSessionDetails({
            programId: 4,
            title: "",
            description: "",
            date: "",
            duration: 0,
        });
        setErrors({});
        navigate(-1);
    };

    return (
        <Layout title="Session Details Form" isLoading={isLoading}>
            <div className="flex flex-col w-full gap-6 mb-6 bg-cardColor border border-borderColor p-4 rounded">
                <div>
                    <FormInput
                        name="session-name"
                        label="Session Name"
                        value={sessionDetails.title}
                        onChange={(event) =>
                            setSessionDetails({
                                ...sessionDetails,
                                title: event.target.value,
                            })
                        }
                    />
                    {errors.title && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.title}
                        </div>
                    )}
                </div>

                <div>
                    <FormInput
                        name="session-duration"
                        label="Session Duration"
                        type="number"
                        value={String(sessionDetails.duration)}
                        onChange={(event) =>
                            setSessionDetails({
                                ...sessionDetails,
                                duration: Number(event.target.value),
                            })
                        }
                    />
                    {errors.duration && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.duration}
                        </div>
                    )}
                </div>


                <div>
                    <FormInput
                        name="session-description"
                        label="Session Description"
                        type="textarea"
                        value={sessionDetails.description}
                        onChange={(event) =>
                            setSessionDetails({
                                ...sessionDetails,
                                description: event.target.value,
                            })
                        }
                    />
                    {errors.description && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.description}
                        </div>
                    )}
                </div>

                <div>
                    <ActionButton
                        label={
                            selectedTrainer.length
                                ? `Trainer: ${selectedTrainer[0]}`
                                : "Add trainer"
                        }
                        onClick={() => setShowTrainerModal(true)}
                    />
                    {errors.trainer && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.trainer}
                        </div>
                    )}
                </div>

                <ActionButton
                    label={
                        selectedModerators.length
                            ? `Moderators: ${selectedModerators.join(", ")}`
                            : "Add moderators"
                    }
                    onClick={() => setShowModeratorModal(true)}
                />

                <div className="flex justify-end gap-4">
                    <Button variant={ButtonType.PRIMARY} onClick={handleSubmit}>
                        Submit
                    </Button>
                    <Button variant={ButtonType.SECONDARY} onClick={handleCancel}>
                        Cancel
                    </Button>
                </div>

                {showTrainerModal && (
                    <SelectModal
                        title="Select Trainer"
                        options={["Trainer A", "Trainer B"]} // Replace with real options
                        selected={selectedTrainer}
                        multiSelect={false}
                        onClose={() => setShowTrainerModal(false)}
                        onSelect={setSelectedTrainer}
                    />
                )}

                {showModeratorModal && (
                    <SelectModal
                        title="Select Moderators"
                        options={["Moderator X", "Moderator Y", "Moderator Z"]} // Replace with real options
                        selected={selectedModerators}
                        multiSelect={true}
                        onClose={() => setShowModeratorModal(false)}
                        onSelect={setSelectedModerators}
                    />
                )}
            </div>
        </Layout>
    );
};

export default CreateSession;
