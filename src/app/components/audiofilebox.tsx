import React from "react";

interface BoxProps {
    name: string;  
}

const Box: React.FC<BoxProps> = ({ name }) => {
    return (
        <div className="w-full p-4 bg-gray-700 text-white rounded-lg my-2">
            {name}
        </div>
    );
};

export default Box;


