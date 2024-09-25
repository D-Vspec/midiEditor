import React, { useState } from 'react';

interface MIDITrackProps {
  id: number;
  notes: any[];
  updateTrack: (id: number, notes: any[]) => void;
}

const MIDITrack: React.FC<MIDITrackProps> = ({ id, notes, updateTrack }) => {
  const [newNote, setNewNote] = useState({ midi: 60, time: 0, duration: 1 });

  const addNote = () => {
    const updatedNotes = [...notes, newNote];
    updateTrack(id, updatedNotes);
    setNewNote({ midi: 60, time: 0, duration: 1 });
  };

  return (
    <div className="w-full border border-gray-300 rounded-lg p-4 mb-4">
      <h3 className="text-xl font-semibold mb-2">Track {id + 1}</h3>
      <div className="flex space-x-2 mb-4">
        <input 
          type="number" 
          value={newNote.midi} 
          onChange={e => setNewNote({...newNote, midi: parseInt(e.target.value)})}
          placeholder="MIDI note"
          className="border border-gray-300 rounded px-2 py-1 w-24"
        />
        <input 
          type="number" 
          value={newNote.time} 
          onChange={e => setNewNote({...newNote, time: parseFloat(e.target.value)})}
          placeholder="Start time"
          className="border border-gray-300 rounded px-2 py-1 w-24"
        />
        <input 
          type="number" 
          value={newNote.duration} 
          onChange={e => setNewNote({...newNote, duration: parseFloat(e.target.value)})}
          placeholder="Duration"
          className="border border-gray-300 rounded px-2 py-1 w-24"
        />
        <button 
          onClick={addNote}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
        >
          Add Note
        </button>
      </div>
      <ul className="space-y-1">
        {notes.map((note, index) => (
          <li key={index} className="text-sm">
            Note: {note.midi}, Time: {note.time}, Duration: {note.duration}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MIDITrack;
