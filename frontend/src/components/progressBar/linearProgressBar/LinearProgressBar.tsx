type LinearProgressBarProps = {
    startDate: string;
    todayDate: string;
    endDate: string;
};

const LinearProgressBar: React.FC<LinearProgressBarProps> = ({
    startDate,
    todayDate,
    endDate,
}) => {
    const getProgress = () => {
        const start = new Date(startDate).getTime();
        const today = new Date(todayDate).getTime();
        const end = new Date(endDate).getTime();

        if (end <= start) return { bar: 0, marker: 0 };
        if (today <= start) return { bar: 0, marker: 0 };
        if (today >= end) return { bar: 100, marker: 100 };

        const progress = ((today - start) / (end - start)) * 100;
        return { bar: progress, marker: progress };
    };

    const { bar, marker } = getProgress();

    const formatDate = (date: string, type: string = "normal") => {
        return type == "locale"
            ? new Date(date).toLocaleDateString()
            : new Date(date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
              });
    };

    return (
        <div className="w-full px-4 py-5 text-white">
            {/* Top labels */}
            <div className="relative h-16">
                <div className="absolute top-8 w-full h-3 rounded-full bg-gray-700">
                    <div
                        className="h-full rounded-full bg-green-400"
                        style={{ width: `${bar}%` }}
                    ></div>
                </div>
                <div
                    className="absolute flex flex-col items-center"
                    style={{
                        left: `${marker}%`,
                        transform: "translate(-50%, -8px)",
                    }}
                >
                    <div className="text-md mb-1 whitespace-nowrap">
                        Today: {formatDate(todayDate)}
                    </div>
                    <div className="w-1.5 h-8 bg-white rounded-sm"></div>
                </div>
            </div>
            <div className="flex justify-between text-sm mb-2">
                <span className="text-lg">Start: {formatDate(startDate)}</span>
                <span className="text-lg">End: {formatDate(endDate)}</span>
            </div>
        </div>
    );
};

export default LinearProgressBar;
