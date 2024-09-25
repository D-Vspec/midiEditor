'use client'
import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Box from "../components/audiofilebox";
import DroppableArea from "../components/DroppableArea";

const songList = [
    { id: 1, name: "Song 1" },
    { id: 2, name: "Song 2" },
    { id: 3, name: "Song 3" },
    { id: 4, name: "Song 4" },
    { id: 5, name: "Song 5" },
    { id: 6, name: "Song 6" },
];

const MainPage = () => {
    const [droppedSongs, setDroppedSongs] = useState<string[]>([]);

    const handleDrop = (songName: string) => {
        setDroppedSongs((prev) => [...prev, songName]); 
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex flex-col min-h-screen bg-gray-900">
                
                <div className="flex flex-row h-[5vh] bg-gray-900"></div>

            
                <div className="flex flex-row h-[60vh] bg-gray-900">
                  
                    <div className="flex flex-col w-[15%] bg-blue-500">
                    <div className="flex flex-row h-[10%] bg-gray-400"></div>
                        <div className="flex flex-col h-[90%] bg-blue-500 overflow-y-scroll">
                            <div className="p-2">
                                {songList.map((song) => (
                                    <Box key={song.id} name={song.name} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <DroppableArea droppedSongs={droppedSongs} onDrop={handleDrop} />
                </div>
            </div>
        </DndProvider>
    );
};

export default MainPage;
