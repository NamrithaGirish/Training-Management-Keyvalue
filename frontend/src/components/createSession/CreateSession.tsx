import { useState } from "react";
import { Plus, X } from "lucide-react";
import Layout from "../layout/Layout";
import FormInput from "../formInput/FormInput";
import ActionButton from "../actionButton/ActionButton";

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
                setLocalSelection(
                    localSelection.filter((item) => item !== option)
                );
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
                    <h2 className="text-lg font-semibold text-white">
                        {title}
                    </h2>
                    <button onClick={onClose}>
                        <X className="text-gray-300 hover:text-white" />
                    </button>
                </div>
                <div className="space-y-2">
                    {options.map((option) => (
                        <label
                            key={option}
                            className="flex items-center gap-2 text-white"
                        >
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
                    <button
                        onClick={onClose}
                        className="bg-white text-black px-4 py-1 rounded hover:opacity-90"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onSelect(localSelection);
                            onClose();
                        }}
                        className="bg-black border text-white border-white px-4 py-1 rounded hover:bg-white hover:text-black transition"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

const CreateSession = () => {
    const [sessionName, setSessionName] = useState("");
    const [sessionDescription, setSessionDescription] = useState("");
    const [showTrainerModal, setShowTrainerModal] = useState(false);
    const [showModeratorModal, setShowModeratorModal] = useState(false);
    const [selectedTrainer, setSelectedTrainer] = useState<string[]>([]);
    const [selectedModerators, setSelectedModerators] = useState<string[]>([]);
    const dummyTrainers = Array.from(
        { length: 50 },
        (_, i) => `Trainer ${i + 1}`
    );
    const dummyModerators = Array.from(
        { length: 100 },
        (_, i) => `Moderator ${i + 1}`
    );
    const handleCancel = () => {
        setSessionName("");
        setSessionDescription("");
        setSelectedTrainer([]);
        setSelectedModerators([]);
    };

    const handleSubmit = () => {
        console.log({
            sessionName,
            sessionDescription,
            selectedTrainer,
            selectedModerators,
        });
    };

    return (
        <Layout title="Session Details Form">
            <div className="flex flex-col w-full gap-6 mb-6 bg-cardColor border border-borderColor p-4 rounded">
                {/* Session Name */}
                <FormInput
                    name="session-name"
                    label="Session Name"
                    value={sessionName}
                    onChange={(e) => setSessionName(e.target.value)}
                />

                <FormInput
                    name="session-duration"
                    label="Session Duration"
                    type="integer"
                    value={sessionName}
                    onChange={() => {}}
                />

                <FormInput
                    name="session-description"
                    label="Session Description"
                    type="textarea"
                    value={sessionDescription}
                    onChange={(e) => setSessionDescription(e.target.value)}
                />

                <ActionButton
                    label="Add trainer"
                    onClick={() => setShowTrainerModal(true)}
                />

                <ActionButton
                    label="Add moderators"
                    onClick={() => setShowModeratorModal(true)}
                />

                {/* Buttons */}
                <div className="flex justify-end gap-4">
                    <button
                        onClick={handleSubmit}
                        className="bg-itemColor border text-white border-white px-4 py-2 rounded hover:bg-white hover:text-black transition"
                    >
                        Submit
                    </button>
                    <button
                        onClick={handleCancel}
                        className="bg-white text-black px-4 py-2 rounded hover:opacity-90"
                    >
                        Cancel
                    </button>
                </div>

                {/* Trainer Modal */}
                {showTrainerModal && (
                    <SelectModal
                        title="Select Trainer"
                        options={dummyTrainers}
                        selected={selectedTrainer}
                        multiSelect={false}
                        onClose={() => setShowTrainerModal(false)}
                        onSelect={setSelectedTrainer}
                    />
                )}

                {/* Moderator Modal */}
                {showModeratorModal && (
                    <SelectModal
                        title="Select Moderators"
                        options={dummyModerators}
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
