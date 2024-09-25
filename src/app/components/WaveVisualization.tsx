import React, { useRef, useEffect, useState } from 'react';
import * as Tone from 'tone';

interface WaveVisualizationProps {
  audioFile: File | null;
}

const WaveVisualization: React.FC<WaveVisualizationProps> = ({ audioFile }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const playerRef = useRef<Tone.Player | null>(null);

  useEffect(() => {
    if (!audioFile) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      const audioContext = new (window.AudioContext || window.AudioContext)();
      const decodedBuffer = await audioContext.decodeAudioData(arrayBuffer);
      setAudioBuffer(decodedBuffer);

      // Create a new Tone.Player
      playerRef.current = new Tone.Player({
        url: URL.createObjectURL(audioFile),
        onload: () => console.log("Audio file loaded"),
      }).toDestination();
    };
    reader.readAsArrayBuffer(audioFile);

    return () => {
      if (playerRef.current) {
        playerRef.current.stop();
        playerRef.current.dispose();
      }
    };
  }, [audioFile]);

  useEffect(() => {
    if (!audioBuffer || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawWaveform = (currentTime: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const data = audioBuffer.getChannelData(0);
      const step = Math.ceil(data.length / canvas.width);
      const amp = canvas.height / 2;

      ctx.beginPath();
      ctx.moveTo(0, amp);

      for (let i = 0; i < canvas.width; i++) {
        let min = 1.0;
        let max = -1.0;
        for (let j = 0; j < step; j++) {
          const datum = data[(i * step) + j];
          if (datum < min) min = datum;
          if (datum > max) max = datum;
        }
        ctx.lineTo(i, (1 + min) * amp);
        ctx.lineTo(i, (1 + max) * amp);
      }

      ctx.strokeStyle = '#2196F3';
      ctx.stroke();

      // Draw playback line
      const lineX = (currentTime / audioBuffer.duration) * canvas.width;
      ctx.beginPath();
      ctx.moveTo(lineX, 0);
      ctx.lineTo(lineX, canvas.height);
      ctx.strokeStyle = 'red';
      ctx.stroke();
    };

    const updatePlayback = () => {
      if (!isPlaying || !playerRef.current) return;
      setCurrentTime(playerRef.current.blockTime);
      drawWaveform(playerRef.current.blockTime);
      requestAnimationFrame(updatePlayback);
    };

    drawWaveform(currentTime);

    if (isPlaying) {
      updatePlayback();
    }
  }, [audioBuffer, isPlaying, currentTime]);

  const handlePlayPause = () => {
    if (!playerRef.current) return;

    if (!isPlaying) {
      playerRef.current.start();
      setIsPlaying(true);
    } else {
      playerRef.current.stop();
      setIsPlaying(false);
    }
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={800}
        height={200}
        className="w-full border border-gray-300 rounded-lg"
      />
      <div className="mt-4 flex justify-center">
        <button
          onClick={handlePlayPause}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          disabled={!audioBuffer}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  );
};

export default WaveVisualization;