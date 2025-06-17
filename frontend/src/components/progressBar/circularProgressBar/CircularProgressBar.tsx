type CircularProgressBarProps = {
    value?: number;
};

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
    value = 0,
}) => {
    return (
        <div className="relative size-full scale-90">
            <svg
                className="size-full -rotate-90"
                viewBox="0 0 36 36"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient
                        id="gradient-stroke"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                    >
                        <stop offset="0%" stopColor="blue" />
                        <stop offset="100%" stopColor="red" />
                    </linearGradient>
                </defs>
                <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    className="stroke-current text-gray-200 dark:text-neutral-700"
                    strokeWidth="3"
                ></circle>
                {value > 0 && (
                    <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        stroke="url(#gradient-stroke)"
                        strokeWidth="3"
                        strokeDasharray="100"
                        strokeDashoffset={100 - value}
                        strokeLinecap="round"
                    ></circle>
                )}
            </svg>

            <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <span className="text-center text-2xl font-bold text-white">
                    {value}%
                </span>
            </div>
        </div>
    );
};

export default CircularProgressBar;
