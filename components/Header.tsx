'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  ShoppingBag,
  Phone,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Star,
  ExternalLink,
  Tag,
  ShieldCheck,
  CheckCircle2,
  User,
  Mail,
} from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenAuth: (mode: 'signin' | 'register') => void;
  onOpenContact: () => void;
}

const searchSuggestions = [
  { title: 'All Tile Products', category: 'Catalog', tag: 'View All', href: '/products' },
  { title: 'Bathroom Wall Tiles', category: 'Bathroom', tag: 'Sale', href: '/products?category=Bathroom' },
  { title: 'Floor Tiles', category: 'Floor Tiles', tag: 'Trending', href: '/products?category=Floor' },
  { title: 'Wood Effect Planks', category: 'Wood Effect', tag: 'Popular', href: '/products?category=Wood+Effect' },
  { title: 'Marble Effect Tiles', category: 'Marble Effect', tag: 'Luxury', href: '/products?category=Marble+Effect' },
  { title: '20mm Outdoor Porcelain', category: 'Outdoor', tag: 'Best Seller', href: '/products?category=Outdoor' },
  { title: 'Pallet Deals', category: 'Bulk Buy', tag: 'Huge Savings', href: '/products?category=Pallet+Deals' },
];

export default function Header({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenAuth,
  onOpenContact,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  // Search Typewriter animation
  const [searchPlaceholder, setSearchPlaceholder] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const searchTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const text1 = 'What can we help with?';
    const text2 = 'Search by tile range, colour, or area...';
    let currentText = text1;
    let charIndex = 0;
    let isDeleting = false;

    const interval = setInterval(() => {
      if (!isDeleting) {
        charIndex++;
        setSearchPlaceholder(currentText.substring(0, charIndex));
        if (charIndex === currentText.length) {
          isDeleting = true;
          // Pause before deleting
          setTimeout(() => {}, 2000);
        }
      } else {
        charIndex--;
        setSearchPlaceholder(currentText.substring(0, charIndex));
        if (charIndex === 0) {
          isDeleting = false;
          currentText = currentText === text1 ? text2 : text1;
        }
      }
    }, 90);

    return () => clearInterval(interval);
  }, []);

  const filteredSuggestions = searchQuery.trim()
    ? searchSuggestions.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : searchSuggestions.slice(0, 4);

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
      {/* 1. TOP UTILITY BAR (Desktop Only - Hidden on Mobile) */}
      <div className="hidden md:block bg-[#f7f5f0] border-b border-gray-200 text-xs text-[#526375] py-1.5">
        <div className="container-tt flex items-center justify-between">
          {/* Reviews.co.uk Badge */}
          <div className="flex items-center gap-2">
            <a
              href="https://total-tiles.reviews.co.uk/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:opacity-85 transition-opacity"
            >
              <img
                src="https://totaltiles.co.uk/media/wysiwyg/totaltiles/5-star-rating-green.png"
                alt="5 Star Reviews"
                width={94}
                height={18}
                className="inline-block object-contain"
              />
              <span className="font-semibold text-[#1a3b68] hover:underline hidden sm:inline">
                5 Star Reviews at Reviews.co.uk
              </span>
            </a>
            <span className="hidden md:inline text-gray-300">|</span>
            <span className="hidden md:inline text-xs text-gray-500 font-medium">
              Over 5,600+ verified customer reviews
            </span>
          </div>

          {/* Right Action Links */}
          <div className="flex items-center gap-4 text-xs font-medium text-[#4a5568]">
            <button
              onClick={onOpenContact}
              className="hover:text-[#01acf1] transition-colors"
            >
              Contact Us
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={() => onOpenAuth('signin')}
              className="hover:text-[#01acf1] transition-colors"
            >
              Sign In
            </button>
            <span className="text-gray-300 hidden sm:inline">|</span>
            <button
              onClick={() => onOpenAuth('register')}
              className="hover:text-[#01acf1] transition-colors hidden sm:inline font-semibold text-[#193d6b]"
            >
              Create an Account
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN BRAND & SEARCH ROW */}
      <div className="bg-[#193d6b] text-white py-3 md:py-4">
        <div className="container-tt flex items-center justify-between gap-3 md:gap-6">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white p-1 hover:text-[#01acf1] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

          {/* Official Logo */}
          <Link href="/" className="shrink-0 flex items-center">
            <div className="bg-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg shadow-sm hover:shadow transition-all flex items-center">
              <img
                src="/webnivo.png"
                alt="Webnibo"
                width={170}
                height={55}
                className="h-7 sm:h-9 md:h-10 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Search Bar with Dropdown */}
          <div className="relative flex-1 max-w-xl mx-2 hidden md:block">
            <div className="relative flex items-center bg-white rounded-md overflow-hidden shadow-inner focus-within:ring-2 focus-within:ring-[#01acf1]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 250)}
                placeholder={searchPlaceholder || 'What can we help with?'}
                className="w-full px-4 py-2.5 text-sm text-[#262626] outline-none placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="bg-[#01acf1] hover:bg-[#0093cf] text-white px-5 py-2.5 transition-colors flex items-center justify-center shrink-0"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
            </div>

            {/* Live Autocomplete Dropdown */}
            {searchFocused && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-md shadow-2xl border border-gray-200 overflow-hidden z-50 text-[#262626]">
                <div className="p-2.5 bg-gray-50 border-b border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
                  <span>Suggested Collections &amp; Ranges</span>
                  <span className="text-[11px] text-[#01acf1]">Press Enter to view all</span>
                </div>
                <div className="py-1">
                  {filteredSuggestions.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="px-4 py-2.5 hover:bg-sky-50 flex items-center justify-between text-sm transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <Search size={14} className="text-gray-400 group-hover:text-[#01acf1]" />
                        <span className="font-semibold text-gray-800 group-hover:text-[#193d6b]">
                          {item.title}
                        </span>
                        <span className="text-xs text-gray-400">in {item.category}</span>
                      </div>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-600 group-hover:bg-[#01acf1] group-hover:text-white transition-colors">
                        {item.tag}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Header Actions: Phone & Trolley */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            {/* Phone Support */}
            <div className="hidden sm:flex flex-col text-right leading-tight">
              <div className="flex items-center gap-1.5 justify-end text-[11px] font-bold tracking-wider text-green-400">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-subtle inline-block" />
                <span>LINES OPEN NOW</span>
              </div>
              <a
                href="tel:0000000000"
                className="font-extrabold text-base md:text-lg text-white hover:text-[#01acf1] tracking-tight transition-colors"
              >
                00000 000000
              </a>
            </div>

            {/* Search Icon Button (Right side of navbar beside Cart / Trolley icon) */}
            <button
              onClick={() => {
                setMobileSearchOpen((prev) => !prev);
                if (!mobileSearchOpen) {
                  setTimeout(() => mobileSearchInputRef.current?.focus(), 120);
                }
              }}
              className="p-2 text-white hover:text-[#01acf1] hover:bg-[#122e50] border border-transparent hover:border-[#2b5387] rounded-md transition-colors flex items-center justify-center md:hidden"
              aria-label="Search"
              title="Search tiles"
            >
              <Search size={22} className="text-white hover:text-[#01acf1] transition-colors" />
            </button>

            {/* Trolley / Basket */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 sm:gap-2.5 bg-[#122e50] hover:bg-[#0f2744] border border-[#2b5387] px-3 sm:px-3.5 py-2 rounded-md transition-all group"
              aria-label="View Trolley"
            >
              <div className="relative">
                <ShoppingBag size={22} className="text-[#01acf1] group-hover:scale-105 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-[#11c667] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="text-left hidden xs:block">
                <div className="text-[11px] uppercase tracking-wider text-gray-300 font-semibold leading-none">
                  Trolley
                </div>
                <div className="text-xs font-bold text-white leading-tight mt-0.5">
                  £{cartTotal.toFixed(2)}
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Input Bar (Toggled by Search icon beside Cart) */}
        {mobileSearchOpen && (
          <div className="container-tt mt-2.5 md:hidden animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="relative flex items-center bg-white rounded-md overflow-hidden shadow-lg border border-sky-300 focus-within:ring-2 focus-within:ring-[#01acf1]">
              <input
                ref={mobileSearchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 250)}
                placeholder={searchPlaceholder || 'Search tiles, ranges, colours...'}
                className="w-full px-3.5 py-2 text-xs text-[#262626] outline-none placeholder:text-gray-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="px-2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
              <button
                type="submit"
                className="bg-[#01acf1] hover:bg-[#0093cf] text-white px-4 py-2 transition-colors flex items-center justify-center shrink-0"
                aria-label="Search"
              >
                <Search size={16} />
              </button>
            </div>

            {/* Mobile Autocomplete Suggestions */}
            {searchFocused && (
              <div className="mt-1.5 bg-white rounded-md shadow-2xl border border-gray-200 overflow-hidden text-[#262626] z-50 relative">
                <div className="p-2 bg-gray-50 border-b border-gray-100 flex items-center justify-between text-[11px] text-gray-500 font-medium">
                  <span>Suggested Collections</span>
                  <span className="text-[10px] text-[#01acf1]">Tap to view</span>
                </div>
                <div className="py-1 max-h-48 overflow-y-auto">
                  {filteredSuggestions.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      onClick={() => {
                        setMobileSearchOpen(false);
                        setSearchFocused(false);
                      }}
                      className="px-3 py-2 hover:bg-sky-50 flex items-center justify-between text-xs transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Search size={13} className="text-gray-400" />
                        <span className="font-semibold text-gray-800">{item.title}</span>
                      </div>
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
                        {item.tag}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. MAIN NAVIGATION BAR & MEGA MENU (ALL ON ONE LINE) */}
      <nav className="bg-[#01acf1] text-white hidden lg:block border-t border-sky-400/60 shadow-sm select-none">
        <div className="container-tt">
          <ul className="flex items-center justify-between xl:justify-center xl:gap-5 2xl:gap-7 w-full flex-nowrap whitespace-nowrap text-[13px] font-semibold text-white py-0.5">
            {/* 1. New In */}
            <li className="relative shrink-0 whitespace-nowrap">
              <Link
                href="/products"
                className="py-2.5 px-1 inline-flex items-center hover:text-sky-100 transition-colors whitespace-nowrap"
              >
                <span>New In</span>
              </Link>
            </li>

            {/* 2. Tiles ▾ (Mega Menu) */}
            <li
              className="relative shrink-0 whitespace-nowrap"
              onMouseEnter={() => setActiveMegaMenu('tiles')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <Link
                href="/products"
                className="py-2.5 px-1 inline-flex items-center gap-1 hover:text-sky-100 transition-colors whitespace-nowrap"
              >
                <span>Tiles</span>
                <ChevronDown size={12} className="opacity-80 shrink-0" />
              </Link>

              {activeMegaMenu === 'tiles' && (
                <div className="absolute left-0 top-full w-[850px] bg-white text-[#262626] shadow-2xl border border-gray-200 rounded-b-lg p-6 grid grid-cols-4 gap-6 normal-case z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div>
                    <h4 className="text-xs font-extrabold text-[#193d6b] uppercase tracking-wider pb-2 border-b-2 border-[#01acf1] mb-3">
                      Bathroom Tiles
                    </h4>
                    <ul className="space-y-2 text-xs font-medium text-gray-700">
                      <li><Link href="/products?category=Bathroom" className="hover:text-[#01acf1]">All Bathroom Tiles</Link></li>
                      <li><Link href="/products?category=Bathroom" className="hover:text-[#01acf1]">Ceramic Bathroom Tiles</Link></li>
                      <li><Link href="/products?category=Bathroom" className="hover:text-[#01acf1]">Porcelain Bathroom Tiles</Link></li>
                      <li><Link href="/products?category=Bathroom" className="hover:text-[#01acf1]">White Bathroom Tiles</Link></li>
                      <li><Link href="/products?category=Bathroom" className="hover:text-[#01acf1]">Gloss &amp; Matt Tiles</Link></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-extrabold text-[#193d6b] uppercase tracking-wider pb-2 border-b-2 border-[#01acf1] mb-3">
                      Kitchen Tiles
                    </h4>
                    <ul className="space-y-2 text-xs font-medium text-gray-700">
                      <li><Link href="/products?category=Kitchen" className="hover:text-[#01acf1]">All Kitchen Tiles</Link></li>
                      <li><Link href="/products?category=Wall" className="hover:text-[#01acf1]">Kitchen Splashbacks</Link></li>
                      <li><Link href="/products?category=Floor" className="hover:text-[#01acf1]">Porcelain Kitchen Floors</Link></li>
                      <li><Link href="/products?category=Wall" className="hover:text-[#01acf1]">Subway Metro Tiles</Link></li>
                      <li><Link href="/products?category=Wood+Effect" className="hover:text-[#01acf1]">Wood Effect Kitchen</Link></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-extrabold text-[#193d6b] uppercase tracking-wider pb-2 border-b-2 border-[#01acf1] mb-3">
                      Popular Styles
                    </h4>
                    <ul className="space-y-2 text-xs font-medium text-gray-700">
                      <li><Link href="/products?category=Marble+Effect" className="hover:text-[#01acf1] font-bold text-[#193d6b]">Marble Effect Tiles</Link></li>
                      <li><Link href="/products?category=Wood+Effect" className="hover:text-[#01acf1]">Wood Effect Planks</Link></li>
                      <li><Link href="/products?category=Floor" className="hover:text-[#01acf1]">Stone Effect Tiles</Link></li>
                      <li><Link href="/products?category=Outdoor" className="hover:text-[#01acf1]">20mm Outdoor Pavers</Link></li>
                      <li><Link href="/products?category=Pallet+Deals" className="hover:text-[#01acf1]">Pallet Bulk Buy Deals</Link></li>
                    </ul>
                  </div>

                  <div className="bg-[#f5f8fa] p-4 rounded-md border border-gray-200 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold bg-[#11c667] text-white px-2 py-0.5 rounded uppercase">
                        Free Service
                      </span>
                      <h5 className="font-extrabold text-sm text-[#193d6b] mt-2 leading-tight">
                        Order Free Cut Samples
                      </h5>
                      <p className="text-xs text-gray-600 mt-1">
                        Order up to 3 cut samples completely free with fast next-day postage!
                      </p>
                    </div>
                    <Link
                      href="/products"
                      className="mt-3 text-xs font-bold text-[#01acf1] hover:text-[#193d6b] flex items-center gap-1"
                    >
                      Browse All Tiles <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              )}
            </li>

            {/* 3. Wall Tiles ▾ */}
            <li
              className="relative shrink-0 whitespace-nowrap"
              onMouseEnter={() => setActiveMegaMenu('wall')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <Link
                href="/products?category=Wall"
                className="py-2.5 px-1 inline-flex items-center gap-1 hover:text-sky-100 transition-colors whitespace-nowrap"
              >
                <span>Wall Tiles</span>
                <ChevronDown size={12} className="opacity-80 shrink-0" />
              </Link>

              {activeMegaMenu === 'wall' && (
                <div className="absolute left-0 top-full w-56 bg-white text-[#262626] shadow-xl border border-gray-200 rounded-b-lg p-3 normal-case z-50 animate-in fade-in duration-150">
                  <ul className="space-y-1.5 text-xs text-gray-700">
                    <li><Link href="/products?category=Wall" className="block px-2.5 py-1.5 hover:bg-sky-50 rounded hover:text-[#01acf1]">All Wall Tiles</Link></li>
                    <li><Link href="/products?category=Bathroom" className="block px-2.5 py-1.5 hover:bg-sky-50 rounded hover:text-[#01acf1]">Bathroom Wall Tiles</Link></li>
                    <li><Link href="/products?category=Kitchen" className="block px-2.5 py-1.5 hover:bg-sky-50 rounded hover:text-[#01acf1]">Kitchen Wall Tiles</Link></li>
                    <li><Link href="/products?category=Wall" className="block px-2.5 py-1.5 hover:bg-sky-50 rounded hover:text-[#01acf1]">Metro &amp; Subway Tiles</Link></li>
                    <li><Link href="/products?category=Marble+Effect" className="block px-2.5 py-1.5 hover:bg-sky-50 rounded hover:text-[#01acf1]">Marble Effect Wall</Link></li>
                    <li><Link href="/tiles/wall-tiles" className="block px-2.5 py-1.5 hover:bg-sky-50 rounded hover:text-[#01acf1] text-[#193d6b] font-bold">Dedicated Wall Catalog</Link></li>
                  </ul>
                </div>
              )}
            </li>

            {/* 4. Floor Tiles ▾ */}
            <li
              className="relative shrink-0 whitespace-nowrap"
              onMouseEnter={() => setActiveMegaMenu('floor')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <Link
                href="/products?category=Floor"
                className="py-2.5 px-1 inline-flex items-center gap-1 hover:text-sky-100 transition-colors whitespace-nowrap"
              >
                <span>Floor Tiles</span>
                <ChevronDown size={12} className="opacity-80 shrink-0" />
              </Link>

              {activeMegaMenu === 'floor' && (
                <div className="absolute left-0 top-full w-56 bg-white text-[#262626] shadow-xl border border-gray-200 rounded-b-lg p-3 normal-case z-50 animate-in fade-in duration-150">
                  <ul className="space-y-1.5 text-xs text-gray-700">
                    <li><Link href="/products?category=Floor" className="block px-2.5 py-1.5 hover:bg-sky-50 rounded hover:text-[#01acf1]">Porcelain Floor Tiles</Link></li>
                    <li><Link href="/products?category=Wood+Effect" className="block px-2.5 py-1.5 hover:bg-sky-50 rounded hover:text-[#01acf1]">Wood Effect Floor Tiles</Link></li>
                    <li><Link href="/products?category=Bathroom" className="block px-2.5 py-1.5 hover:bg-sky-50 rounded hover:text-[#01acf1]">Bathroom Floor Tiles</Link></li>
                    <li><Link href="/products?category=Kitchen" className="block px-2.5 py-1.5 hover:bg-sky-50 rounded hover:text-[#01acf1]">Kitchen Floor Tiles</Link></li>
                    <li><Link href="/products?category=Floor" className="block px-2.5 py-1.5 hover:bg-sky-50 rounded hover:text-[#01acf1]">Large Format Porcelain</Link></li>
                  </ul>
                </div>
              )}
            </li>

            {/* 5. Marble Effect */}
            <li className="relative shrink-0 whitespace-nowrap">
              <Link
                href="/products?category=Marble+Effect"
                className="py-2.5 px-1 inline-flex items-center hover:text-sky-100 transition-colors whitespace-nowrap"
              >
                <span>Marble Effect</span>
              </Link>
            </li>

            {/* 6. Outdoor */}
            <li className="relative shrink-0 whitespace-nowrap">
              <Link
                href="/products?category=Outdoor"
                className="py-2.5 px-1 inline-flex items-center hover:text-sky-100 transition-colors whitespace-nowrap"
              >
                <span>Outdoor</span>
              </Link>
            </li>

            {/* 7. Underfloor Heating ▾ */}
            <li
              className="relative shrink-0 whitespace-nowrap"
              onMouseEnter={() => setActiveMegaMenu('heating')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <a
                href="#seo-guide"
                className="py-2.5 px-1 inline-flex items-center gap-1 hover:text-sky-100 transition-colors whitespace-nowrap"
              >
                <span>Underfloor Heating</span>
                <ChevronDown size={12} className="opacity-80 shrink-0" />
              </a>

              {activeMegaMenu === 'heating' && (
                <div className="absolute left-0 top-full w-60 bg-white text-[#262626] shadow-xl border border-gray-200 rounded-b-lg p-3 normal-case z-50 animate-in fade-in duration-150">
                  <ul className="space-y-1.5 text-xs text-gray-700">
                    <li><a href="#seo-guide" className="block px-2.5 py-1.5 hover:bg-sky-50 rounded hover:text-[#01acf1]">150 W/M² Heating Mats</a></li>
                    <li><a href="#seo-guide" className="block px-2.5 py-1.5 hover:bg-sky-50 rounded hover:text-[#01acf1]">200 W/M² Heating Mats</a></li>
                    <li><a href="#seo-guide" className="block px-2.5 py-1.5 hover:bg-sky-50 rounded hover:text-[#01acf1]">Laminate &amp; Wood Heating</a></li>
                    <li><a href="#seo-guide" className="block px-2.5 py-1.5 hover:bg-sky-50 rounded hover:text-[#01acf1]">Under Tile Loose Cable</a></li>
                    <li><a href="#seo-guide" className="block px-2.5 py-1.5 hover:bg-sky-50 rounded hover:text-[#01acf1]">Smart Thermostat Controls</a></li>
                    <li><a href="#seo-guide" className="block px-2.5 py-1.5 hover:bg-sky-50 rounded hover:text-[#01acf1]">Thermal Insulation Boards</a></li>
                  </ul>
                </div>
              )}
            </li>

            {/* 8. Adhesive & Grout ▾ */}
            <li
              className="relative shrink-0 whitespace-nowrap"
              onMouseEnter={() => setActiveMegaMenu('adhesive')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <a
                href="#seo-guide"
                className="py-2.5 px-1 inline-flex items-center gap-1 hover:text-sky-100 transition-colors whitespace-nowrap"
              >
                <span>Adhesive &amp; Grout</span>
                <ChevronDown size={12} className="opacity-80 shrink-0" />
              </a>

              {activeMegaMenu === 'adhesive' && (
                <div className="absolute left-0 top-full w-56 bg-white text-[#262626] shadow-xl border border-gray-200 rounded-b-lg p-3 normal-case z-50 animate-in fade-in duration-150">
                  <ul className="space-y-1.5 text-xs text-gray-700">
                    <li><a href="#seo-guide" className="block px-2.5 py-1.5 hover:bg-sky-50 rounded hover:text-[#01acf1]">Tile Adhesive (Rapid &amp; Standard)</a></li>
                    <li><a href="#seo-guide" className="block px-2.5 py-1.5 hover:bg-sky-50 rounded hover:text-[#01acf1]">Flexible Tile Grout</a></li>
                    <li><a href="#seo-guide" className="block px-2.5 py-1.5 hover:bg-sky-50 rounded hover:text-[#01acf1]">Self Levelling Compounds</a></li>
                    <li><a href="#seo-guide" className="block px-2.5 py-1.5 hover:bg-sky-50 rounded hover:text-[#01acf1]">Tile Silicone Sealant</a></li>
                    <li><a href="#seo-guide" className="block px-2.5 py-1.5 hover:bg-sky-50 rounded hover:text-[#01acf1]">Primers &amp; Preparation</a></li>
                    <li><Link href="/products?category=Pallet+Deals" className="block px-2.5 py-1.5 hover:bg-sky-50 rounded hover:text-[#01acf1]">Adhesive Pallet Deals</Link></li>
                  </ul>
                </div>
              )}
            </li>

            {/* 9. Accessories ▾ */}
            <li
              className="relative shrink-0 whitespace-nowrap"
              onMouseEnter={() => setActiveMegaMenu('accessories')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <Link
                href="/products"
                className="py-2.5 px-1 inline-flex items-center gap-1 hover:text-sky-100 transition-colors whitespace-nowrap"
              >
                <span>Accessories</span>
                <ChevronDown size={12} className="opacity-80 shrink-0" />
              </Link>

              {activeMegaMenu === 'accessories' && (
                <div className="absolute left-0 top-full w-52 bg-white text-[#262626] shadow-xl border border-gray-200 rounded-b-lg p-3 normal-case z-50 animate-in fade-in duration-150">
                  <ul className="space-y-1.5 text-xs text-gray-700">
                    <li><Link href="/products" className="block px-2.5 py-1.5 hover:bg-sky-50 rounded hover:text-[#01acf1]">Tile Trims &amp; Edging</Link></li>
                    <li><Link href="/products" className="block px-2.5 py-1.5 hover:bg-sky-50 rounded hover:text-[#01acf1]">Tile Cutters &amp; Blades</Link></li>
                    <li><Link href="/products" className="block px-2.5 py-1.5 hover:bg-sky-50 rounded hover:text-[#01acf1]">Spacers &amp; Levelling Clips</Link></li>
                    <li><Link href="/products" className="block px-2.5 py-1.5 hover:bg-sky-50 rounded hover:text-[#01acf1]">Trowels &amp; Buckets</Link></li>
                    <li><Link href="/products" className="block px-2.5 py-1.5 hover:bg-sky-50 rounded hover:text-[#01acf1]">Cleaners &amp; Sealers</Link></li>
                  </ul>
                </div>
              )}
            </li>

            {/* 10. Sale ▾ */}
            <li
              className="relative shrink-0 whitespace-nowrap"
              onMouseEnter={() => setActiveMegaMenu('sale')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <Link
                href="/products?category=Pallet+Deals"
                className="py-2.5 px-1 inline-flex items-center gap-1 hover:text-sky-100 transition-colors whitespace-nowrap"
              >
                <span>Sale</span>
                <ChevronDown size={12} className="opacity-80 shrink-0" />
              </Link>

              {activeMegaMenu === 'sale' && (
                <div className="absolute right-0 top-full w-56 bg-white text-[#262626] shadow-xl border border-gray-200 rounded-b-lg p-3 normal-case z-50 animate-in fade-in duration-150">
                  <ul className="space-y-1.5 text-xs text-gray-700">
                    <li><Link href="/products?category=Pallet+Deals" className="block px-2.5 py-1.5 hover:bg-rose-50 rounded text-rose-600 font-bold">Clearance Pallet Deals</Link></li>
                    <li><Link href="/products" className="block px-2.5 py-1.5 hover:bg-rose-50 rounded hover:text-rose-600">Special Offers</Link></li>
                    <li><Link href="/products?category=Wall" className="block px-2.5 py-1.5 hover:bg-rose-50 rounded hover:text-rose-600">Discounted Wall Tiles</Link></li>
                    <li><Link href="/products?category=Outdoor" className="block px-2.5 py-1.5 hover:bg-rose-50 rounded hover:text-rose-600">Outdoor Paver Overstock</Link></li>
                  </ul>
                </div>
              )}
            </li>

            {/* 11. Pallet Deals */}
            <li className="relative shrink-0 whitespace-nowrap">
              <Link
                href="/products?category=Pallet+Deals"
                className="py-2.5 px-1 inline-flex items-center hover:text-sky-100 transition-colors whitespace-nowrap font-bold"
              >
                <span>Pallet Deals</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* 4. MOBILE DRAWER NAVIGATION */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <div className="relative w-[85%] max-w-sm h-full bg-white text-[#262626] shadow-2xl flex flex-col justify-between z-10 overflow-y-auto animate-in slide-in-from-left duration-200">
            <div>
              {/* Drawer Brand & User Action Header */}
              <div className="bg-[#193d6b] text-white p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-white px-2.5 py-1 rounded-md shadow-sm flex items-center">
                    <img
                      src="/webnivo.png"
                      alt="Webnibo"
                      className="h-7 w-auto object-contain"
                    />
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 hover:bg-white/10 rounded-full text-white transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={22} />
                  </button>
                </div>

                {/* Prominent Mobile Sign In & Contact Us Action Buttons */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth('signin');
                    }}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white text-[#193d6b] rounded-md font-bold shadow-sm hover:bg-sky-50 transition-colors"
                  >
                    <User size={15} className="text-[#01acf1]" />
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenContact();
                    }}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#01acf1] text-white rounded-md font-bold shadow-sm hover:bg-[#0093cf] transition-colors"
                  >
                    <Mail size={15} />
                    Contact Us
                  </button>
                </div>
                <div className="mt-2.5 text-center">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth('register');
                    }}
                    className="text-[11px] text-sky-200 hover:text-white transition-colors"
                  >
                    Don&apos;t have an account? <span className="font-semibold underline">Register here</span>
                  </button>
                </div>
              </div>

              {/* Category Navigation Header */}
              <div className="px-4 pt-3.5 pb-1 text-[11px] uppercase tracking-wider font-bold text-gray-500">
                Browse Categories
              </div>

              {/* Category Links */}
              <div className="px-2 space-y-0.5">
                {[
                  { title: 'All Products (Catalog)', href: '/products' },
                  { title: 'Bathroom Tiles', href: '/products?category=Bathroom' },
                  { title: 'Floor Tiles', href: '/products?category=Floor' },
                  { title: 'Wood Effect Tiles', href: '/products?category=Wood+Effect' },
                  { title: 'Wall Tiles', href: '/products?category=Wall' },
                  { title: 'Marble Effect Tiles', href: '/products?category=Marble+Effect' },
                  { title: 'Outdoor 20mm Pavers', href: '/products?category=Outdoor' },
                  { title: 'Pallet Deals', href: '/products?category=Pallet+Deals' },
                  { title: 'Underfloor Heating', href: '#seo-guide' },
                  { title: 'Adhesive & Grout', href: '#seo-guide' },
                ].map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2.5 px-3 rounded-md hover:bg-sky-50 text-sm font-semibold text-gray-800 transition-colors"
                  >
                    <span>{item.title}</span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Support & Quick Contact Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 space-y-3 text-xs">
              <a
                href="tel:0000000000"
                className="flex items-center gap-2.5 py-2.5 px-3 bg-[#193d6b] text-white rounded-md font-bold justify-center shadow-sm hover:bg-[#122e50] transition-colors"
              >
                <Phone size={15} />
                Call 00000 000000
              </a>
              <div className="flex justify-around text-gray-600 font-medium pt-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenContact();
                  }}
                  className="hover:text-[#01acf1] font-semibold text-[#193d6b]"
                >
                  Contact Form
                </button>
                <span>•</span>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('signin');
                  }}
                  className="hover:text-[#01acf1]"
                >
                  My Account
                </button>
                <span>•</span>
                <a
                  href="#samples"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-[#01acf1]"
                >
                  Free Samples
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
