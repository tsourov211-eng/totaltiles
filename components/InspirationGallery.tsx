'use client';

import { useState } from 'react';
import { Heart, Eye, ArrowRight, X } from 'lucide-react';

interface InspirationItem {
  id: number;
  author: string;
  room: string;
  tileUsed: string;
  image: string;
  likes: number;
  reviewQuote: string;
}

const inspirationItems: InspirationItem[] = [
  {
    id: 1,
    author: '@chelsea_renovation',
    room: 'Luxury Ensuite Bathroom',
    tileUsed: 'Calacatta Gold Polished 600x600',
    image: 'https://images.pexels.com/photos/7214163/pexels-photo-7214163.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    likes: 184,
    reviewQuote: 'The gold veining is stunning in real life. Tiler said the rectified edges made fitting super easy!',
  },
  {
    id: 2,
    author: '@the_suffolk_home',
    room: 'Modern Kitchen & Diner',
    tileUsed: 'Devonshire Oak Plank 200x1200',
    image: 'https://images.pexels.com/photos/8089079/pexels-photo-8089079.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    likes: 246,
    reviewQuote: 'Warm natural timber feeling with zero maintenance. Works perfectly with our wet underfloor heating.',
  },
  {
    id: 3,
    author: '@garden_living_uk',
    room: 'Porcelain Patio & Outdoor BBQ',
    tileUsed: 'Modena Anthracite 20mm Outdoor',
    image: 'https://images.pexels.com/photos/11866592/pexels-photo-11866592.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    likes: 312,
    reviewQuote: 'Massive upgrade to our garden patio. Completely non-slip even when soaking wet after rain.',
  },
  {
    id: 4,
    author: '@nordic_minimalism',
    room: 'Walk-In Shower Wet Room',
    tileUsed: 'Metro White Gloss & Black Grout',
    image: 'https://images.pexels.com/photos/7195883/pexels-photo-7195883.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    likes: 198,
    reviewQuote: 'Classic subway tile look on a budget. Delivered next day carefully boxed on a pallet.',
  },
];

export default function InspirationGallery() {
  const [activeItem, setActiveItem] = useState<InspirationItem | null>(null);

  return (
    <section className="py-10 md:py-16 bg-white border-b border-gray-100">
      <div className="container-tt">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-gray-100 gap-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#193d6b] tracking-tight">
              Inspiration from real homes
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Tag @exampletiles on Instagram to be featured in our gallery.
            </p>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {inspirationItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.room}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                loading="lazy"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-between p-4 text-white">
                <div className="flex justify-between items-center">
                  <span className="bg-white/25 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-semibold">
                    {item.author}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-rose-300 font-bold bg-black/40 px-2 py-0.5 rounded-full">
                    <Heart size={12} fill="currentColor" />
                    <span>{item.likes}</span>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-medium text-gray-200">{item.room}</div>
                  <h4 className="font-bold text-sm text-white mt-0.5 leading-snug">
                    {item.tileUsed}
                  </h4>
                  <div className="mt-2.5 flex items-center gap-1 text-xs font-bold text-[#01acf1] group-hover:text-white transition-colors">
                    <span>Shop this look</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Look Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl max-w-2xl w-full overflow-hidden shadow-2xl relative text-[#262626] flex flex-col md:flex-row">
            <button
              onClick={() => setActiveItem(null)}
              className="absolute right-3 top-3 z-10 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="md:w-1/2 aspect-square md:aspect-auto relative bg-black">
              <img
                src={activeItem.image}
                alt={activeItem.room}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="md:w-1/2 p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#01acf1] uppercase">
                  {activeItem.author}
                </span>
                <h3 className="text-lg font-extrabold text-[#193d6b] mt-1">
                  {activeItem.room}
                </h3>
                <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-100 text-xs italic text-gray-700">
                  “{activeItem.reviewQuote}”
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100">
                  <span className="text-[11px] uppercase tracking-wider text-gray-400 font-bold block mb-1">
                    Tile Used in this Project
                  </span>
                  <div className="font-bold text-sm text-[#193d6b]">
                    {activeItem.tileUsed}
                  </div>
                  <span className="text-xs text-emerald-600 font-semibold">
                    ✓ Samples in stock for next-day dispatch
                  </span>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <a
                  href="#samples"
                  onClick={() => setActiveItem(null)}
                  className="flex-1 bg-[#01acf1] hover:bg-[#0093cf] text-white py-2.5 rounded-lg text-center font-bold text-xs shadow transition-colors"
                >
                  Order Free Sample
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
