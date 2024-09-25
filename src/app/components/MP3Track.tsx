import React, { useState } from 'react';

interface MP3TrackProps {
  id: number;
  audioBuffer: AudioBuffer | null;
  updateTrack: (id: number, audioBuffer: AudioBuffer) => void;
}

const MP3Track: React.FC<MP3TrackProps> = ({ id, audioBuffer, updateTrack }) => {
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  const trimAudio = () => {
    if (audioBuffer) {
      const newBuffer = audioBuffer.slice(startTime, endTime);
      updateTrack(id, newBuffer);
    }
  };

  return (
    <div className="w-full border border-gray-300 rounded-lg p-4 mb-4">
      <h3 className="text-xl font-semibold mb-2">Track {id + 1}</h3>
      <div className="flex space-x-2 mb-4">
        <input 
          type="number" 
          value={startTime} 
          onChange={e => setStartTime(parseFloat(e.target.value))}
          placeholder="Start Time"
          className="border border-gray-300 rounded px-2 py-1 w-24"
        />
        <input 
          type="number" 
          value={endTime} 
          onChange={e => setEndTime(parseFloat(e.target.value))}
          placeholder="End Time"
          className="border border-gray-300 rounded px-2 py-1 w-24"
        />
        <button 
          onClick={trimAudio}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
        >
          Trim Audio
        </button>
      </div>
    </div>
  );
};

export default MP3Track;
