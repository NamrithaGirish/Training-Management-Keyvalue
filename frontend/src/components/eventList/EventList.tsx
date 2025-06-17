import { useState } from "react";
import { CiPlay1 } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type EventProps = {
    title: string;
    description: string;
    duration: string;
    status: string;
    trainer?: string;
    totalSessions?: number;
    progress?: number;
};

type EventItem = {
    item: EventProps;
};

type EventListProps = {
    heading: string;
    showCreateButton?: boolean;
    onCreateClick?: () => void;
    data?: EventProps[];
};

const EventListItem: React.FC<EventItem> = ({ item }) => {
    const navigate = useNavigate();
    return (
        <div
            className="border border-gray-700 p-4 rounded-lg bg-cardColor cursor-pointer"
            onClick={() => navigate("/program")}
        >
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <span className="text-sm text-green-400 flex items-center gap-1">
                    <CiPlay1 />
                    <p>{item.status}</p>
                </span>
            </div>
            <div className="flex flex-col gap-1 mt-2">
                <p className="text-sm mt-1 text-gray-400">{item.description}</p>
                <p className="text-sm mt-1">Time duration : {item.duration}</p>
                {item.trainer && (
                    <p className="text-sm mt-1">Trainer : {item.trainer}</p>
                )}
                {item.totalSessions !== undefined && (
                    <p className="text-sm mt-1">
                        Total sessions : {item.totalSessions}
                    </p>
                )}
                {item.progress !== undefined && (
                    <div className="mt-2">
                        <p className="text-sm">Progress : {item.progress}%</p>
                        <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                            <div
                                className="bg-white h-2 rounded-full"
                                style={{ width: `${item.progress}%` }}
                            ></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const EventList: React.FC<EventListProps> = ({
    heading,
    showCreateButton = false,
    onCreateClick,
    data,
}) => {
    const [statusFilter, setStatusFilter] = useState("Active");
    const [searchTerm, setSearchTerm] = useState("");
    const filteredData = (data || []).filter(
        (item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (statusFilter.toLowerCase() == "all" ||
                item.status === statusFilter)
    );
    return (
        <div className=" text-white w-full">
            <div className="flex flex-col items-center border border-borderColor px-2 py-4 rounded-lg bg-cardColor">
                <div className="flex justify-between items-center mb-4 p-4 rounded-lg bg-cardColor w-full">
                    <h2 className="text-3xl font-bold">{heading}</h2>
                    <div className="flex items-center space-x-3">
                        {showCreateButton && (
                            <button
                                className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
                                onClick={onCreateClick}
                            >
                                Create {heading.slice(0, -1)} +
                            </button>
                        )}

                        <select
                            className="bg-itemColor border border-borderColor px-3 py-2 rounded"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option className="bg-itemColor" value="Active">
                                Active
                            </option>
                            <option className="bg-itemColor" value="Scheduled">
                                Scheduled
                            </option>
                            <option className="bg-itemColor" value="Completed">
                                Completed
                            </option>
                            <option className="bg-itemColor" value="All">
                                All
                            </option>
                        </select>

                        <div className="flex items-center border border-borderColor rounded px-2 bg-itemColor shadow-2xl">
                            <input
                                type="text"
                                placeholder="Search"
                                className="px-2 py-2 outline-none text-white"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <FaSearch className="text-gray-500" />
                        </div>
                    </div>
                </div>

                <div className="space-y-4 w-full px-2">
                    {filteredData.length === 0 ? (
                        <p className="text-center text-gray-500 w-full border-2 border-borderColor py-10">
                            No programs found
                        </p>
                    ) : (
                        filteredData.map((item, index) => (
                            <EventListItem key={index} item={item} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventList;
