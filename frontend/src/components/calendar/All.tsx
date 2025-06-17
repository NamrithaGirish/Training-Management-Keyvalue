import { useEffect, useState } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import dayjs from "dayjs";

const sessionData = [
    {
        id: 1,
        title: "Product team meeting",
        duration: "1.5 hours",
        color: "bg-red-500",
    },
    {
        id: 2,
        title: "General orientation",
        duration: "2 hours",
        color: "bg-orange-400",
    },
    {
        id: 3,
        title: "Client Training",
        duration: "4 hours",
        color: "bg-purple-600",
    },
    {
        id: 4,
        title: "CEO Conference",
        duration: "6 hours",
        color: "bg-green-600",
    },
];

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

const DroppableDate = ({ date, onDrop, items, onItemRemove }: any) => {
    const [, drop] = useDrop(() => ({
        accept: "SESSION",
        drop: (item: any) => {
            onDrop(date, item);
        },
    }));

    const isToday = date.isSame(dayjs(), "day");
    const isCurrentMonth = date.month() == date.startOf("month").month();
    return (
        <div
            ref={drop}
            className={`border border-borderColor ${
                isToday ? "bg-itemColor" : "bg-cardColor"
            } h-40 p-2 rounded overflow-auto`}
        >
            <div
                className={`text-md mb-1 ${
                    isCurrentMonth ? "text-white" : "text-green-500"
                }`}
            >
                {date.date()}
            </div>
            {items.map((item: any, idx: number) => (
                <DraggableSession
                    key={idx}
                    session={item}
                    fromCalendar={true}
                    dateKey={date.format("YYYY-MM-DD")}
                    index={idx}
                    onRemove={() => {
                        onItemRemove(date.format("YYYY-MM-DD"), idx);
                        console.log(date);
                    }}
                    className="max-h-8"
                />
            ))}
        </div>
    );
};

const DroppablePool = ({
    onDrop,
    children,
}: {
    onDrop: (item: any) => void;
    children: React.ReactNode;
}) => {
    const [, drop] = useDrop(() => ({
        accept: "SESSION",
        drop: (item: any) => {
            if (item.fromCalendar) onDrop(item);
        },
    }));

    return (
        <div
            ref={drop}
            className="p-2 bg-cardColor rounded h-full overflow-auto border border-borderColor"
        >
            {children}
        </div>
    );
};

const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(dayjs("2025-06-01"));
    const [calendarItems, setCalendarItems] = useState<{
        [key: string]: any[];
    }>(() => {
        const saved = localStorage.getItem("calendarItems");
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        localStorage.setItem("calendarItems", JSON.stringify(calendarItems));
    }, [calendarItems]);

    const handleDropToCalendar = (date: any, session: any) => {
        const key = date.format("YYYY-MM-DD");
        setCalendarItems((prev) => {
            const existing = prev[key] || [];
            return { ...prev, [key]: [...existing, { ...session }] };
        });
    };

    const handleRemoveFromCalendar = (dateKey: string, index: number) => {
        setCalendarItems((prev) => {
            const updated = [...(prev[dateKey] || [])];
            updated.splice(index, 1);
            return { ...prev, [dateKey]: updated };
        });
    };

    const handleDropToPool = (sessionToRemove: any) => {
        setCalendarItems((prev) => {
            const updated = { ...prev };
            const dateKey = sessionToRemove.dateKey;
            const index = sessionToRemove.calendarIndex;
            if (updated[dateKey]) {
                updated[dateKey] = updated[dateKey].filter(
                    (_, i) => i !== index
                );
            }
            return updated;
        });
    };

    const startDay = currentMonth.startOf("month").startOf("week");
    const endDay = currentMonth.endOf("month").endOf("week");

    const calendar = [];
    let day = startDay.clone();
    while (day.isBefore(endDay, "day")) {
        const week = [];
        for (let i = 0; i < 7; i++) {
            const dateKey = day.format("YYYY-MM-DD");
            week.push(
                <DroppableDate
                    key={dateKey}
                    date={day.clone()}
                    items={calendarItems[dateKey] || []}
                    onDrop={handleDropToCalendar}
                    onItemRemove={handleRemoveFromCalendar}
                />
            );
            day = day.add(1, "day");
        }
        calendar.push(
            <div key={day.toString()} className="grid grid-cols-7 gap-1">
                {week}
            </div>
        );
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex h-screen p-4 bg-bgColor font-sans">
                {/* Calendar Section */}
                <div className="w-3/4">
                    <div className="flex items-center justify-between mb-6">
                        <button
                            className="bg-itemColor text-white px-3 py-1 rounded"
                            onClick={() =>
                                setCurrentMonth((prev) =>
                                    prev.subtract(1, "month")
                                )
                            }
                        >
                            ◀
                        </button>
                        <div className="text-3xl text-white font-semibold">
                            {currentMonth.format("MMMM YYYY")}
                        </div>
                        <button
                            className="bg-itemColor text-white px-3 py-1 rounded"
                            onClick={() =>
                                setCurrentMonth((prev) => prev.add(1, "month"))
                            }
                        >
                            ▶
                        </button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center font-semibold mb-2 text-white">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                            (d) => (
                                <div key={d}>{d}</div>
                            )
                        )}
                    </div>
                    <div className="space-y-1">{calendar}</div>
                </div>

                {/* Available Sessions Section */}
                <div className="w-1/4 pl-4">
                    <div className="text-xl text-white font-semibold mb-4">
                        Available Sessions
                    </div>
                    <DroppablePool onDrop={handleDropToPool}>
                        {sessionData.map((session) => (
                            <DraggableSession
                                key={session.id}
                                session={session}
                            />
                        ))}
                    </DroppablePool>
                </div>
            </div>
        </DndProvider>
    );
};

export default Calendar;
