import { useState } from "react";
import { CiPlay1 } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";

type CardProps = {
    title: string;
    description: string;
    duration: string;
    status: string;
    trainer?: string;
    totalSessions?: number;
    progress?: number;
};
type EventListProps = {
    heading: string;
    showCreateButton?: boolean;
    onCreateClick?: () => void;
    data?: CardProps[];
};

const EventListItem = ({ item }: { item: CardProps }) => {
    return (
        <div className="border border-gray-700 p-4 rounded-lg bg-[#121212]">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <span className="text-sm text-green-400 flex items-center gap-1">
                    <CiPlay1 />
                    <p>{item.status}</p>
                </span>
            </div>
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
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                        <div
                            className="bg-white h-2 rounded-full"
                            style={{ width: `${item.progress}%` }}
                        ></div>
                    </div>
                </div>
            )}
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
            (item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (statusFilter.toLowerCase() == "all" || item.status === statusFilter))
    );
    return (
        <div className=" text-white w-full">
            <div className="flex flex-col items-center border border-borderColor p-4 rounded-lg bg-cardColor">
                <div className="flex justify-between items-center mb-4  p-4 rounded-lg bg-cardColor w-full">
                    <h2 className="text-2xl font-bold">{heading}</h2>
                    <div className="flex items-center space-x-2">
                        {showCreateButton && (
                            <button
                                className="bg-white text-black px-4 py-1 rounded hover:bg-gray-200"
                                onClick={onCreateClick}
                            >
                                Create {heading.slice(0, -1)} +
                            </button>
                        )}

                        <select
                            className="bg-itemColor border border-borderColor px-3 py-1 rounded"
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
                                className="px-2 py-1 outline-none text-white"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <FaSearch className="text-gray-500" />
                        </div>
                    </div>
                </div>

                <div className="space-y-4 w-full">
                    {filteredData.map((item, index) => (
                        <EventListItem key={index} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EventList;
