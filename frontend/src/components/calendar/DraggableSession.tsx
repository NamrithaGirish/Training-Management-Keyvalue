import { useDrag } from "react-dnd";

const DraggableSession = ({
    session,
    fromCalendar,
    onRemove,
    dateKey,
    index,
    className,
}: {
    session: any;
    fromCalendar?: boolean;
    onRemove?: () => void;
    dateKey?: string;
    index?: number;
    className?: string;
}) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "SESSION",
        item: { ...session, fromCalendar, calendarIndex: index, dateKey },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));


    return (
        <div
            ref={drag}
            className={`${session.color} text-white px-2 py-1 rounded mb-2 cursor-move shadow overflow-hidden ${className}`}
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            {session.title} <br />
            <span className="text-sm">{session.duration}</span>
        </div>
    );
};

export default DraggableSession;