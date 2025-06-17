import CircularProgressBar from "../progressBar/circularProgressBar/CircularProgressBar";

export const DashboardCardType = {
    VALUE: "Value",
    PROGRESS: "Progress",
} as const;

export type DashboardCardProps = {
    label?: string;
    value?: number | string;
    type?: typeof DashboardCardType[keyof typeof DashboardCardType];
};

const DashboardCard: React.FC<DashboardCardProps> = ({
    label,
    value,
    type = DashboardCardType.VALUE,
}) => {
    return (
        <div className="flex flex-col items-center justify-center gap-2 bg-cardColor text-white border border-gray-600 rounded-md p-10 size-60 shadow-sm scale-85 hover:scale-95 transition-scale duration-250 ease-in-out">
            <h3 className="text-3xl text-gray-400 text-center">{label}</h3>
            <div className="flex items-center justify-center size-27">
                {type == DashboardCardType.PROGRESS ? (
                    <CircularProgressBar value={Number(value)} />
                ) : (
                    <p className="text-6xl font-semibold mt-2 size-35 text-center flex items-center justify-center">
                        <span>{value}</span>
                    </p>
                )}
            </div>
        </div>
    );
};

export default DashboardCard;
