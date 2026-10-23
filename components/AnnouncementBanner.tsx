'use client';

import { useState } from 'react';
import { X, Calendar } from 'lucide-react';

export default function AnnouncementBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="hidden md:block bg-[#1dcd98] text-white py-2 px-4 text-xs font-semibold relative transition-all">
      <div className="container-tt flex items-center justify-center text-center gap-2 pr-6">
        <Calendar size={14} className="shrink-0 hidden sm:inline" />
        <span>
          <strong>Please Note:</strong> We Will Be Closed for Easter on Friday 3rd &amp; Monday 6th April – There Will Be No Despatches or Customer Support Until Tuesday 7th April.
        </span>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-black/10 rounded-full transition-colors text-white"
        aria-label="Close notification"
      >
        <X size={14} />
      </button>
    </div>
  );
}
