// components/WaveVisualization.tsx
import React, { useRef, useEffect } from 'react';
import { Midi } from '@tonejs/midi';
import * as Tone from 'tone';

interface WaveVisualizationProps {
  midiFile: Midi | null;
}

const WaveVisualization: React.FC<WaveVisualizationProps> = ({ midiFile }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!midiFile || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const synth = new Tone.PolySynth().toDestination();
    const now = Tone.now();

    // Clear previous visualization
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    midiFile.tracks.forEach((track, trackIndex) => {
      const hue = (trackIndex * 30) % 360; // Different color for each track
      ctx.strokeStyle = `hsl(${hue}, 70%, 50%)`;
      ctx.lineWidth = 2;
      ctx.beginPath();

      track.notes.forEach(note => {
        const x = (note.time / midiFile.duration) * canvas.width;
        const y = canvas.height - (note.midi / 127) * canvas.height;

        ctx.lineTo(x, y);

        // Play the note
        synth.triggerAttackRelease(note.name, note.duration, now + note.time);
      });

      ctx.stroke();
    });

  }, [midiFile]);

  return (
    <canvas 
      ref={canvasRef} 
      width={800} 
      height={200} 
      className="w-full border border-gray-300 rounded-lg"
    />
  );
};

export default WaveVisualization;
