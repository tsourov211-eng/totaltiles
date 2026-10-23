'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Autumn Sale',
    desktopImg:
      'https://totaltiles.co.uk/media/wysiwyg/totaltiles/banners/03-2026/Autumn_Sale_-_Total_Tiles_Website_-_Desktop_1901x401px__1.jpg',
    mobileImg:
      'https://totaltiles.co.uk/media/wysiwyg/totaltiles/banners/03-2026/Autumn_Sale_-_Total_Tiles_Website_-_Mobile_501x501px__1.jpg',
    href: '#products',
  },
  {
    id: 2,
    title: 'New Products - Petra and Venero',
    desktopImg:
      'https://totaltiles.co.uk/media/wysiwyg/totaltiles/banners/03-2026/New_Products_-_Petra_and_Venero_-_Total_Tiles_Website_-_Desktop_1901x401px_.jpg',
    mobileImg:
      'https://totaltiles.co.uk/media/wysiwyg/totaltiles/banners/03-2026/New_Products_-_Petra_and_Venero_-_Total_Tiles_Website_-_Mobile_501x501px_.jpg',
    href: '#products',
  },
  {
    id: 3,
    title: '20mm Outdoor Tiles',
    desktopImg:
      'https://totaltiles.co.uk/media/wysiwyg/totaltiles/banners/03-2026/20mm_Outdoor_Tiles_-_Total_Tiles_Website_-_Desktop_1901x401px_.jpg',
    mobileImg:
      'https://totaltiles.co.uk/media/wysiwyg/totaltiles/banners/03-2026/20mm_Outdoor_Tiles_-_Total_Tiles_Website_-_Mobile_501x501px_.jpg',
    href: '#categories',
  },
  {
    id: 4,
    title: 'Marble Effect Tiles',
    desktopImg:
      'https://totaltiles.co.uk/media/wysiwyg/totaltiles/banners/03-2026/Marble_Effect_Tiles_-_Total_Tiles_Website_-_Desktop_1901x401px_.jpg',
    mobileImg:
      'https://totaltiles.co.uk/media/wysiwyg/totaltiles/banners/03-2026/Marble_Effect_Tiles_-_Total_Tiles_Website_-_Mobile_501x501px_.jpg',
    href: '#products',
  },
  {
    id: 5,
    title: 'PayPal Pay in 3 - Spread the cost',
    desktopImg:
      'https://totaltiles.co.uk/media/wysiwyg/totaltiles/banners/03-2026/PayPal_Pay_in_3_-_Total_Tiles_-_Homepage_Banner_-_Desktop_1901x401px_.jpg',
    mobileImg:
      'https://totaltiles.co.uk/media/wysiwyg/totaltiles/banners/03-2026/PayPal_Pay_in_3_-_Total_Tiles_-_Homepage_Banner_-_Mobile_501x501px_.jpg',
    href: '#products',
  },
  {
    id: 6,
    title: 'Wood Effect Tiles',
    desktopImg:
      'https://totaltiles.co.uk/media/wysiwyg/totaltiles/banners/03-2026/Wood_Effect_Tiles_-_Total_Tiles_Website_-_Desktop_1901x401px_.jpg',
    mobileImg:
      'https://totaltiles.co.uk/media/wysiwyg/totaltiles/banners/03-2026/Wood_Effect_Tiles_-_Total_Tiles_Website_-_Mobile_501x501px_.jpg',
    href: '#categories',
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-[#102e54] select-none group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Main Promotions Carousel"
    >
      {/* Slides Container */}
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className="w-full shrink-0 relative h-[480px] min-h-[440px] sm:h-auto sm:aspect-[16/7] md:aspect-[1901/401] sm:min-h-[290px] md:min-h-[330px] lg:min-h-[380px]"
          >
            <a href={slide.href} className="block w-full h-full">
              <picture>
                <source media="(min-width: 640px)" srcSet={slide.desktopImg} />
                <img
                  src={slide.mobileImg}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center block"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
              </picture>
            </a>
          </div>
        ))}
      </div>

      {/* Prev / Next Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/75 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg backdrop-blur-sm focus:outline-none"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/75 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg backdrop-blur-sm focus:outline-none"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/35 backdrop-blur-md px-3.5 py-1.5 rounded-full z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === index
                ? 'w-6 h-2 bg-white'
                : 'w-2 h-2 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
