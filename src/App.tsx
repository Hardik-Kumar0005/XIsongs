import { useEffect } from 'react';
import { MusicPlayer } from "@/components/MusicPlayer/MusicPlayer";
import "./index.css"; 

function App() {
  useEffect(() => { document.title = 'XI Songs'; }, []);
  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white">
      <div
      className="absolute inset-0 bg-[url('/tvbg.jpg')] bg-cover bg-center bg-no-repeat"
      aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" aria-hidden="true" />
      <div className="relative flex min-h-screen items-center justify-center p-4">
      <MusicPlayer />
      </div>
    </div>
  );
}

export default App;
