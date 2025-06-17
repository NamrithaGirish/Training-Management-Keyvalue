import { useDrop } from "react-dnd";
import dayjs from "dayjs";
import DraggableSession from "./DraggableSession";

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
                        onItemRemove(date.format("YYYY-MM-DD"), idx)
                        console.log(date)
                    }
                    }
                    className="max-h-8"
                />
            ))}
        </div>
    );
};

export default DroppableDate;
