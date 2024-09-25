"use client"
import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import MP3Track from './components/MP3Track';
import WaveVisualization from './components/WaveVisualization';
import { AudioContext } from 'standardized-audio-context';

const Home: React.FC = () => {
  const [tracks, setTracks] = useState<any[]>([]);
  const [audioContext] = useState(new AudioContext());
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    setTracks([{ id: 0, audioBuffer: null }]);
  }, []);

  const addTrack = () => {
    setTracks([...tracks, { id: tracks.length, audioBuffer: null }]);
  };

  const updateTrack = (id: number, audioBuffer: AudioBuffer) => {
    const updatedTracks = tracks.map(track =>
      track.id === id ? { ...track, audioBuffer } : track
    );
    setTracks(updatedTracks);
  };

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const arrayBuffer = await file.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      setTracks([{ id: 0, audioBuffer }]);
    }
  }, [audioContext]);

  const exportMP3 = () => {
    // Implement logic to export the modified MP3 (e.g., using ffmpeg.js or Web Audio API)
  };

  return (
    <div className="min-h-screen p-4 flex flex-col items-center">
      <Head>
        <title>MP3 Editor</title>
        <meta name="description" content="Basic MP3 Editor" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-1 flex flex-col items-center w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">MP3 Editor</h1>
        
        <div className="mb-4 space-x-4">
          <button
            onClick={addTrack}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Track
          </button>
          <button
            onClick={exportMP3}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Export MP3
          </button>
          <input
            type="file"
            accept=".mp3"
            onChange={handleFileUpload}
            className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          />
        </div>

        {selectedFile && (
          <div className="w-full mb-8">
            <h2 className="text-2xl font-semibold mb-4">Waveform Visualization</h2>
            <WaveVisualization audioFile={selectedFile} />
          </div>
        )}

        {tracks.map(track => (
          <MP3Track
            key={track.id}
            id={track.id}
            audioBuffer={track.audioBuffer}
            updateTrack={updateTrack}
          />
        ))}
      </main>
    </div>
  );
};

export default Home;