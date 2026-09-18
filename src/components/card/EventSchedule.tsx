import React from 'react';
import type { ItineraryItem } from '../../types/invitation';
import { Clock } from 'lucide-react';

interface EventScheduleProps {
  items: ItineraryItem[];
}

export const EventSchedule: React.FC<EventScheduleProps> = ({ items }) => {
  return (
    <div className="w-full max-w-md mx-auto my-8 px-2">
      <div className="text-center mb-6">
        <h4 className="font-serif text-base sm:text-lg text-gold-300 tracking-widest uppercase">
          Programme of Events
        </h4>
        <div className="h-[1px] w-16 mx-auto bg-gradient-to-r from-transparent via-gold-500/50 to-transparent mt-1" />
      </div>

      <div className="relative border-l-2 border-gold-500/30 ml-4 sm:ml-6 space-y-6">
        {items.map((item) => (
          <div key={item.id} className="relative pl-6 sm:pl-8">
            {/* Gilded Timeline Dot */}
            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-emerald-950 border-2 border-gold-400 shadow-[0_0_8px_rgba(212,175,55,0.6)] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-gold-300" />
            </div>

            <div className="p-3 sm:p-4 rounded-lg bg-emerald-900/30 border border-gold-500/20 backdrop-blur-sm shadow-sm">
              <div className="flex items-center gap-1.5 text-gold-400 text-xs sm:text-sm font-semibold tracking-wider">
                <Clock className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span>{item.time}</span>
              </div>
              <h5 className="font-serif text-sm sm:text-base text-gold-200 font-semibold mt-1">
                {item.title}
              </h5>
              {item.description && (
                <p className="text-xs sm:text-sm text-parchment-100/70 font-sans mt-1 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
