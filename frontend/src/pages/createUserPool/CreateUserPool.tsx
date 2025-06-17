import { useState, type Dispatch, type SetStateAction } from "react";
import Layout from "../../components/layout/Layout";
const dummyUsers = [
    "User 1",
    "User 2",
    "User 3",
    "User 4",
    "User 5",
    "User 6",
    "User 7",
    "User 8",
    "User 9",
    "User 10",
];

export const PoolUserRole = {
    TRAINER: "Trainer",
    MODERATOR: "Moderator",
    CANDIDATE: "Candidate"
} as const;

interface CreateUserPoolProps {
    role: typeof PoolUserRole[keyof typeof PoolUserRole];
}

interface AddUserModalProps {
    role: string;
    onSelect: Dispatch<SetStateAction<string[]>>;
    showModal: Dispatch<SetStateAction<boolean>>;
}

interface UserDetailProps {
    user: string;
    onDelete: (user: string) => void;
}

const AddUserModal = ({ role, onSelect, showModal }: AddUserModalProps) => {
    const [tempSelection, setTempSelection] = useState<string[]>([]);

    const toggleUser = (user: string) => {
        setTempSelection((prev) =>
            prev.includes(user)
                ? prev.filter((t) => t !== user)
                : [...prev, user]
        );
    };

    const handleAddUsers = () => {
        onSelect((prev) => Array.from(new Set([...prev, ...tempSelection])));
        setTempSelection([]);
        showModal(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#2C2C2C] text-white p-6 rounded-lg w-96 max-h-[70vh] overflow-y-auto border border-borderColor">
                <h2 className="text-lg font-semibold mb-4">Select {role}s</h2>
                <div className="space-y-2">
                    {dummyUsers.map((user) => (
                        <label key={user} className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                checked={tempSelection.includes(user)}
                                onChange={() => toggleUser(user)}
                                className="form-checkbox h-4 w-4 text-blue-500"
                            />
                            <span>{user}</span>
                        </label>
                    ))}
                </div>
                <div className="mt-4 flex justify-end gap-3">
                    <button
                        onClick={() => showModal(false)}
                        className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAddUsers}
                        className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

const UserDetail = ({ user, onDelete }: UserDetailProps) => {
    return (
        <div className="flex items-center justify-between px-6 py-5">
            <div className="flex items-center gap-4">
                <div className="w-15 h-15 border border-borderColor rounded-full flex items-center justify-center">
                    <svg
                        className="w-10 h-10 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        ></path>
                    </svg>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="text-white text-xl font-medium">{user}</div>
                    <div className="text-md text-gray-400">
                        Description and details
                    </div>
                </div>
            </div>
            <button
                onClick={() => onDelete(user)}
                className="text-2xl text-red-500 hover:text-red-700"
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    ></path>
                </svg>
            </button>
        </div>
    );
};

const CreateUserPool: React.FC<CreateUserPoolProps> = ({ role }) => {
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [showModal, setShowModal] = useState(false);

    const handleDelete = (user: string) => {
        setSelectedUsers((prev) => prev.filter((t) => t !== user));
    };

    return (
        <Layout title={`Create ${role} Pool`}>
            <div className="p-4 bg-cardColor text-white rounded-md border border-borderColor">
                <button
                    onClick={() => setShowModal(true)}
                    className="w-full flex justify-between items-center px-5 py-6 border border-borderColor rounded-md hover:bg-gray-700"
                >
                    <span className="text-2xl font-semibold">Add New {role}</span>
                    <span className="text-3xl">+</span>
                </button>

                <div className="mt-4 border border-borderColor rounded-md">
                    <div className="px-4 py-4 border-b border-borderColor text-white text-2xl">
                        {role}s
                    </div>
                    <div className="divide-y divide-gray-700">
                        {selectedUsers.length === 0 ? (
                            <div className="px-4 py-8 text-center text-gray-400">
                                No {role}s added to pool
                            </div>
                        ) : (
                            selectedUsers.map((user, index) => (
                                <UserDetail
                                    key={index}
                                    user={user}
                                    onDelete={handleDelete}
                                />
                            ))
                        )}
                    </div>
                </div>

                {showModal && (
                    <AddUserModal
                        role={role}
                        onSelect={setSelectedUsers}
                        showModal={setShowModal}
                    />
                )}
            </div>
        </Layout>
    );
};

export default CreateUserPool;
