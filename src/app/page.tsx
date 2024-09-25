"use client"

// pages/index.tsx (updated)
import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import MIDITrack from './components/MIDITrack';
import WaveVisualization from './components/WaveVisualization';
import { Midi } from '@tonejs/midi';

const Home: React.FC = () => {
  const [tracks, setTracks] = useState<any[]>([]);
  const [midiFile, setMidiFile] = useState<Midi | null>(null);

  useEffect(() => {
    // Initialize with an empty track
    setTracks([{ id: 0, notes: [] }]);
  }, []);

  const addTrack = () => {
    setTracks([...tracks, { id: tracks.length, notes: [] }]);
  };

  const updateTrack = (id: number, notes: any[]) => {
    const updatedTracks = tracks.map(track => 
      track.id === id ? { ...track, notes } : track
    );
    setTracks(updatedTracks);
  };

  const exportMIDI = () => {
    const midi = new Midi();
    tracks.forEach(track => {
      const midiTrack = midi.addTrack();
      track.notes.forEach((note: any) => {
        midiTrack.addNote({
          midi: note.midi,
          time: note.time,
          duration: note.duration,
        });
      });
    });
    setMidiFile(midi); // Update midiFile state for visualization
    const midiBlob = new Blob([midi.toArray()], { type: 'audio/midi' });
    const url = URL.createObjectURL(midiBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'export.mid';
    a.click();
  };

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const midi = new Midi(e.target?.result as ArrayBuffer);
        setMidiFile(midi);
        // Update tracks based on the MIDI file
        const newTracks = midi.tracks.map((track, index) => ({
          id: index,
          notes: track.notes
        }));
        setTracks(newTracks);
      };
      reader.readAsArrayBuffer(file);
    }
  }, []);

  return (
    <div className="min-h-screen p-4 flex flex-col items-center">
      <Head>
        <title>MIDI Editor</title>
        <meta name="description" content="Basic MIDI Editor" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-1 flex flex-col items-center w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">MIDI Editor</h1>
        <div className="mb-4 space-x-4">
          <button 
            onClick={addTrack}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Track
          </button>
          <button 
            onClick={exportMIDI}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Export MIDI
          </button>
          <input
            type="file"
            accept=".mid,.midi"
            onChange={handleFileUpload}
            className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          />
        </div>
        <WaveVisualization midiFile={midiFile} />
        {tracks.map(track => (
          <MIDITrack 
            key={track.id} 
            id={track.id} 
            notes={track.notes} 
            updateTrack={updateTrack} 
          />
        ))}
      </main>
    </div>
  );
};

export default Home;