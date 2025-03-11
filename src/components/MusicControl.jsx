import React from "react";

export default function MusicControl({ isPlaying, togglePlayPause, audioRef }) {
  return (
    <div
      className="fixed bottom-4 right-4 z-50"
      title={isPlaying ? "Pause Music" : "Play Music"}
    >
      {/* Tombol Play/Pause */}
      <button
        onClick={togglePlayPause}
        className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-200 transition relative group"
      >
        {isPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
        <span className="absolute opacity-0 group-hover:opacity-100 bg-black text-white text-sm px-2 py-1 rounded bottom-full mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          {isPlaying ? "Pause Music" : "Play Music"}
        </span>
      </button>

      {/* Elemen Audio */}
      <audio ref={audioRef} src="/backsound.mp3" autoPlay loop />
    </div>
  );
}
