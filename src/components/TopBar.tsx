// src/components/TopBar.tsx
import React, { useEffect, useState } from 'react';
import { MapPin, Wifi } from 'lucide-react';

const TopBar: React.FC = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Africa/Lagos',
      });
      setTime(formatted);
    };
    update();
    const id = setInterval(update, 1000 * 30);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hidden md:block bg-zinc-950 text-zinc-400 border-b border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-9 font-mono text-[11px] tracking-wider uppercase">
          {/* Left: Status */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              <span className="text-zinc-300">Available for work</span>
            </div>

            <span className="h-3 w-px bg-white/10" />

            <div className="flex items-center gap-1.5 text-zinc-500">
              <MapPin className="w-3 h-3" />
              <span>Kano, Nigeria</span>
            </div>
          </div>

          {/* Right: System */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-zinc-500">
              <Wifi className="w-3 h-3" />
              <span>v4.2.1</span>
            </div>

            <span className="h-3 w-px bg-white/10" />

            <div className="flex items-center gap-2 text-zinc-500">
              <span>WAT</span>
              <span className="text-zinc-300 tabular-nums">{time || '00:00'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;