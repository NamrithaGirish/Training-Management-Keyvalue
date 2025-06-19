// import { useDrop } from "react-dnd";

// const DroppablePool = ({
//     onDrop,
//     children,
// }: {
//     onDrop: (item: any) => void;
//     children: React.ReactNode;
// }) => {
//     const [, drop] = useDrop(() => ({
//         accept: "SESSION",
//         drop: (item: any) => {
//             if (item.fromCalendar) onDrop(item);
//         },
//     }));

//     return (
//         <div
//             ref={drop}
//             className="p-2 bg-cardColor rounded h-full overflow-auto border border-borderColor"
//         >
//             {children}
//         </div>
//     );
// };

// export default DroppablePool;