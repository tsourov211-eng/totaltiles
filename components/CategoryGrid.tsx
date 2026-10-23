'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CategoryGridProps {
  onSelectCategory: (category: string) => void;
}

const categories = [
  {
    name: 'Bathroom Tiles',
    filterKey: 'Bathroom',
    price: '£9.98/m²',
    image:
      'https://images.pexels.com/photos/7214163/pexels-photo-7214163.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    headerBg: 'bg-[#193d6b]',
    fromColor: 'text-gray-300',
    priceColor: 'text-white',
  },
  {
    name: 'Floor Tiles',
    filterKey: 'Floor',
    price: '£9.98/m²',
    image:
      'https://images.pexels.com/photos/7587861/pexels-photo-7587861.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    headerBg: 'bg-[#f1c5db]',
    fromColor: 'text-gray-700',
    priceColor: 'text-[#193d6b]',
  },
  {
    name: 'Wood Effect Tiles',
    filterKey: 'Wood Effect',
    price: '£14.97/m²',
    image:
      'https://images.pexels.com/photos/8089079/pexels-photo-8089079.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    headerBg: 'bg-[#48a9e6]',
    fromColor: 'text-sky-100',
    priceColor: 'text-[#193d6b]',
  },
  {
    name: 'Wall Tiles',
    filterKey: 'Wall',
    price: '£11.96/m²',
    image:
      'https://images.pexels.com/photos/7195883/pexels-photo-7195883.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    headerBg: 'bg-[#48a9e6]',
    fromColor: 'text-sky-100',
    priceColor: 'text-[#193d6b]',
  },
  {
    name: 'Outdoor Tiles',
    filterKey: 'Outdoor',
    price: '£22.91/m²',
    image:
      'https://images.pexels.com/photos/11866592/pexels-photo-11866592.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    headerBg: 'bg-[#193d6b]',
    fromColor: 'text-gray-300',
    priceColor: 'text-white',
  },
  {
    name: 'Pallet Deals',
    filterKey: 'Pallet Deals',
    price: '£9.48/m²',
    image:
      'https://images.pexels.com/photos/17086150/pexels-photo-17086150.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    headerBg: 'bg-[#f1c5db]',
    fromColor: 'text-gray-700',
    priceColor: 'text-[#193d6b]',
  },
];

export default function CategoryGrid({ onSelectCategory }: CategoryGridProps) {
  return (
    <section className="py-8 md:py-12 bg-white" id="categories">
      <div className="container-tt">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-gray-100 gap-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#193d6b] tracking-tight">
              Find your perfect tile
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs sm:text-sm font-bold text-[#01acf1] hover:text-[#193d6b] flex items-center gap-1 transition-colors self-start sm:self-auto"
          >
            <span>View all collections</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* 6 Category Cards matching user screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              href={`/products?category=${encodeURIComponent(cat.filterKey)}`}
              onClick={() => onSelectCategory && onSelectCategory(cat.filterKey)}
              className="group cursor-pointer flex flex-col items-center w-full block"
            >
              {/* Category Title Above Card */}
              <h3 className="text-[#01acf1] font-bold text-base md:text-[17px] mb-2 text-center group-hover:text-[#193d6b] transition-colors">
                {cat.name}
              </h3>

              {/* Card Container with Rounded Corners */}
              <div className="w-full rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100/90 transition-all duration-300 bg-white group-hover:-translate-y-1.5">
                {/* Top Price Header Bar */}
                <div
                  className={`py-2 px-4 flex items-center justify-center gap-1.5 ${cat.headerBg}`}
                >
                  <span className={`text-xs ${cat.fromColor}`}>from</span>
                  <span
                    className={`text-base font-extrabold tracking-tight ${cat.priceColor}`}
                  >
                    {cat.price}
                  </span>
                </div>

                {/* Tile Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    width={650}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
