import React from "react";
import { useDrop } from "react-dnd";

interface DroppableAreaProps {
    droppedSongs: string[];
    onDrop: (name: string) => void;
}

const DroppableArea: React.FC<DroppableAreaProps> = ({ droppedSongs, onDrop }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "BOX", // Accept only items of type "BOX"
        drop: (item: { name: string }) => {
            onDrop(item.name); // Call the onDrop handler
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop} // Attach the drop ref
            className={`flex flex-col w-[85%] bg-blue-300 overflow-y-scroll p-4 ${
                isOver ? "bg-blue-400" : ""
            }`}
        >
            <h2 className="text-white mb-4">Dropped Songs</h2>
            <div className="space-y-2">
                {droppedSongs.map((song, index) => (
                    <div
                        key={index}
                        className="w-full p-4 bg-gray-700 text-white rounded-lg"
                    >
                        {song}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DroppableArea;
