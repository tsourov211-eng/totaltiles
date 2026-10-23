'use client';

import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck } from 'lucide-react';

const reviewsData = [
  {
    id: 1,
    name: 'Mrs. Angelina K.',
    location: 'Surrey',
    rating: 5,
    date: '3 days ago',
    title: 'Fantastic service and beautiful tiles',
    text: 'Ordered the Calacatta Gold polished porcelain tiles for our bathroom renovation. Arrived on a pallet very well protected with not a single tile broken. Quality is exceptional!',
  },
  {
    id: 2,
    name: 'David H.',
    location: 'Manchester',
    rating: 5,
    date: '1 week ago',
    title: 'Helpful staff & prompt next day delivery',
    text: 'Very helpful on the phone when I called about adhesive coverage calculations. The order was dispatched the same day and arrived on time. Highly recommended!',
  },
  {
    id: 3,
    name: 'Sarah & Mark T.',
    location: 'Essex',
    rating: 5,
    date: '2 weeks ago',
    title: 'Beat our local tile shop by over £400',
    text: 'Identical 20mm outdoor porcelain patio tiles were £48/m² locally. Total Tiles had them for £26.95/m². The sample service gave us complete confidence before ordering.',
  },
  {
    id: 4,
    name: 'Robert P. (Tiling Contractor)',
    location: 'Bristol',
    rating: 5,
    date: '3 weeks ago',
    title: 'Top quality porcelain with precise edges',
    text: 'As a tradesperson, I fit tiles every week. Total Tiles porcelain is flat, calibrated accurately, and cuts cleanly without chipping. Great company to deal with.',
  },
  {
    id: 5,
    name: 'Gemma W.',
    location: 'Birmingham',
    rating: 5,
    date: '1 month ago',
    title: 'Underfloor heating kit was easy to install',
    text: 'Bought 150W mats along with wood effect floor tiles for the kitchen. Super easy to lay, warm floors every morning, and the digital thermostat is very sleek.',
  },
];

export default function ReviewsSection() {
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % reviewsData.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + reviewsData.length) % reviewsData.length);
  };

  const visibleReviews = [
    reviewsData[startIndex],
    reviewsData[(startIndex + 1) % reviewsData.length],
    reviewsData[(startIndex + 2) % reviewsData.length],
  ];

  return (
    <section className="py-10 md:py-14 bg-[#fafbfc] border-y border-gray-200" id="reviews">
      <div className="container-tt">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
          {/* Summary Column */}
          <div className="lg:border-r border-gray-200 lg:pr-8 flex flex-col justify-center">
            <div className="text-3xl font-black text-[#193d6b]">EXCELLENT</div>

            {/* Stars */}
            <div className="flex items-center gap-1 text-[#11c667] my-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={22} fill="currentColor" />
              ))}
            </div>

            <p className="text-sm font-semibold text-gray-700">
              <strong className="text-[#193d6b]">4.87</strong> average rating based on{' '}
              <strong className="text-[#193d6b]">5,697+</strong> Reviews
            </p>

            <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-500 font-medium">
              <span className="text-[#11c667] font-extrabold text-sm">★</span>
              <span>Verified customer reviews via <strong>Reviews.io</strong></span>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 mt-5">
              <button
                onClick={handlePrev}
                className="w-9 h-9 rounded-full border border-gray-300 hover:border-[#01acf1] bg-white flex items-center justify-center text-gray-700 hover:text-[#01acf1] transition-all shadow-sm"
                aria-label="Previous review"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                className="w-9 h-9 rounded-full border border-gray-300 hover:border-[#01acf1] bg-white flex items-center justify-center text-gray-700 hover:text-[#01acf1] transition-all shadow-sm"
                aria-label="Next review"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* 3 Reviews Carousel Column */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            {visibleReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white p-5 rounded-lg border border-gray-200/90 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                    <div className="flex items-center gap-0.5 text-[#11c667]">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                    <span>{review.date}</span>
                  </div>

                  <h4 className="font-bold text-sm text-[#193d6b] leading-tight mb-2">
                    {review.title}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-4">
                    “{review.text}”
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="font-extrabold text-gray-800">{review.name}</span>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
                    <CheckCircle2 size={13} />
                    <span>Verified Buyer</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
