import React from "react";
import { useDrag } from "react-dnd";

interface BoxProps {
    name: string;
}

const Box: React.FC<BoxProps> = ({ name }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "BOX",
        item: { name },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className={`w-full p-4 bg-gray-700 text-white rounded-lg my-2 cursor-move ${
                isDragging ? "opacity-50" : "opacity-100"
            }`}
        >
            {name}
        </div>
    );
};

export default Box;


