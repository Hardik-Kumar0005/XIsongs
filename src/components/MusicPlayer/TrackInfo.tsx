import React from 'react';
import danceImg from '/dancing-tbh.gif';

interface Props {
  trackName: string;
  trackNumber: number;
  totalTracks: number;
}

export const TrackInfo: React.FC<Props> = ({ trackName, trackNumber, totalTracks }) => {
  return (
    <div className="text-center space-y-2">
      <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-pink-500/40 via-fuchsia-500/30 to-indigo-600/40 flex items-center justify-center shadow-inner overflow-hidden backdrop-blur-sm">
        <img
          src={danceImg}
            alt="Dance"
            className="w-full h-full object-cover mix-blend-screen"
        />
      </div>
      <h2 className="text-lg font-semibold text-pink-100 truncate tracking-tight">
        {trackName}
      </h2>
      <p className="text-xs text-pink-300/70 uppercase tracking-wider">
        Track {trackNumber} / {totalTracks}
      </p>
    </div>
  );
};
