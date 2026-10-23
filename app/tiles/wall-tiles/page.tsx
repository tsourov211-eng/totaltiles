'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import AnnouncementBanner from '@/components/AnnouncementBanner';
import Header from '@/components/Header';
import UspBar from '@/components/UspBar';
import Footer from '@/components/Footer';
import CartDrawer, { CartItem } from '@/components/CartDrawer';
import SampleDrawer from '@/components/SampleDrawer';
import AuthModal from '@/components/AuthModal';
import ContactModal from '@/components/ContactModal';
import { Product } from '@/components/ProductShowcase';
import {
  ChevronRight,
  Filter,
  SlidersHorizontal,
  X,
  Star,
  ShoppingBag,
  Package,
  Check,
  Eye,
  Grid3X3,
  LayoutGrid,
  List,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Calculator,
  Layers,
} from 'lucide-react';

export interface WallTileProduct extends Product {
  material: 'Ceramic' | 'Porcelain';
  color: 'White' | 'Grey' | 'Beige' | 'Green' | 'Charcoal' | 'Rust' | 'Gold' | 'Black';
  style: 'Marble Effect' | 'Stone Effect' | 'Metro Brick' | 'Wood Effect' | 'Plain White';
  suitability: ('Bathroom' | 'Kitchen' | 'Shower' | 'Feature Wall')[];
  tilePrice: number;
  hoverImage: string;
  badge?: string;
  inStock: boolean;
}

const wallTilesData: WallTileProduct[] = [
  {
    id: 'wt-1',
    name: 'Skyline Quebec White Marble Effect Gloss Ceramic Wall Tile - 600mm x 300mm',
    category: 'Wall Tiles',
    material: 'Ceramic',
    finish: 'High Gloss',
    size: '600x300mm',
    color: 'White',
    style: 'Marble Effect',
    suitability: ['Bathroom', 'Kitchen', 'Shower'],
    m2Price: 24.0,
    boxPrice: 34.56,
    tilePrice: 4.32,
    coveragePerBox: 1.44,
    image:
      'https://totaltiles.co.uk/media/catalog/product/cache/40dc17e4b9007b7818b5b2580947f318/s/k/skyline_quebec_white_marble_effect_gloss_ceramic_wall_tile_-_600mm_x_300mm_lifestyle.png',
    hoverImage:
      'https://totaltiles.co.uk/media/catalog/product/cache/40dc17e4b9007b7818b5b2580947f318/s/k/skyline_quebec_white_marble_effect_gloss_ceramic_wall_tile_-_600mm_x_300mm.png',
    rating: 5.0,
    reviewCount: 42,
    badge: 'Super Deal',
    inStock: true,
  },
  {
    id: 'wt-2',
    name: 'Skyline Paris Silver Travertine Effect Matt Ceramic Wall Tile - 600mm x 300mm',
    category: 'Wall Tiles',
    material: 'Ceramic',
    finish: 'Matt',
    size: '600x300mm',
    color: 'Grey',
    style: 'Stone Effect',
    suitability: ['Bathroom', 'Shower', 'Feature Wall'],
    m2Price: 24.0,
    boxPrice: 34.56,
    tilePrice: 4.32,
    coveragePerBox: 1.44,
    image:
      'https://totaltiles.co.uk/media/catalog/product/cache/40dc17e4b9007b7818b5b2580947f318/s/k/skyline_paris_silver_travertine_effect_matt_ceramic_wall_tile_-_600mm_x_300mm_lifestyle_3_.png',
    hoverImage:
      'https://totaltiles.co.uk/media/catalog/product/cache/40dc17e4b9007b7818b5b2580947f318/s/k/skyline_paris_silver_travertine_effect_matt_ceramic_wall_tile_-_600mm_x_300mm.png',
    rating: 5.0,
    reviewCount: 29,
    badge: 'Trending',
    inStock: true,
  },
  {
    id: 'wt-3',
    name: 'Skyline Miami Chalk White Stone Effect Satin Ceramic Wall Tile - 600mm x 300mm',
    category: 'Wall Tiles',
    material: 'Ceramic',
    finish: 'Satin',
    size: '600x300mm',
    color: 'White',
    style: 'Stone Effect',
    suitability: ['Bathroom', 'Kitchen', 'Shower'],
    m2Price: 24.0,
    boxPrice: 34.56,
    tilePrice: 4.32,
    coveragePerBox: 1.44,
    image:
      'https://totaltiles.co.uk/media/catalog/product/cache/40dc17e4b9007b7818b5b2580947f318/s/k/skyline_miami_chalk_white_stone_effect_satin_ceramic_wall_tile_-_600mm_x_300mm_lifestyle_4_.png',
    hoverImage:
      'https://totaltiles.co.uk/media/catalog/product/cache/40dc17e4b9007b7818b5b2580947f318/s/k/skyline_miami_chalk_white_stone_effect_satin_ceramic_wall_tile_-_600mm_x_300mm.png',
    rating: 4.9,
    reviewCount: 34,
    badge: 'Popular',
    inStock: true,
  },
  {
    id: 'wt-4',
    name: 'Cabana White Wall Tile - 51mm x 161mm',
    category: 'Wall Tiles',
    material: 'Ceramic',
    finish: 'Gloss',
    size: '51x161mm',
    color: 'White',
    style: 'Metro Brick',
    suitability: ['Kitchen', 'Bathroom', 'Feature Wall'],
    m2Price: 48.72,
    boxPrice: 24.36,
    tilePrice: 0.4,
    coveragePerBox: 0.5,
    image:
      'https://totaltiles.co.uk/media/catalog/product/cache/40dc17e4b9007b7818b5b2580947f318/c/a/cabana_white_wall_tile_lifestyle_image_2.gif',
    hoverImage:
      'https://totaltiles.co.uk/media/catalog/product/cache/40dc17e4b9007b7818b5b2580947f318/8/4/8435081402801_4_.jpg',
    rating: 5.0,
    reviewCount: 19,
    badge: 'Artisan',
    inStock: true,
  },
  {
    id: 'wt-5',
    name: 'Luna Green Gloss Ceramic Wall Tile - 100mm x 300mm',
    category: 'Wall Tiles',
    material: 'Ceramic',
    finish: 'Gloss',
    size: '100x300mm',
    color: 'Green',
    style: 'Metro Brick',
    suitability: ['Bathroom', 'Kitchen', 'Shower', 'Feature Wall'],
    m2Price: 19.67,
    boxPrice: 19.67,
    tilePrice: 0.59,
    coveragePerBox: 1.0,
    image:
      'https://totaltiles.co.uk/media/catalog/product/cache/40dc17e4b9007b7818b5b2580947f318/l/u/luna_green_wall_tile_lifestyle_bathroom2_sq.gif',
    hoverImage:
      'https://totaltiles.co.uk/media/catalog/product/cache/40dc17e4b9007b7818b5b2580947f318/l/u/luna_green_wall_tile.gif',
    rating: 5.0,
    reviewCount: 56,
    badge: 'Best Seller',
    inStock: true,
  },
  {
    id: 'wt-6',
    name: 'Cabana Rust Wall Tile - 51mm x 161mm',
    category: 'Wall Tiles',
    material: 'Ceramic',
    finish: 'Gloss',
    size: '51x161mm',
    color: 'Rust',
    style: 'Metro Brick',
    suitability: ['Kitchen', 'Feature Wall'],
    m2Price: 48.72,
    boxPrice: 24.36,
    tilePrice: 0.4,
    coveragePerBox: 0.5,
    image:
      'https://totaltiles.co.uk/media/catalog/product/cache/40dc17e4b9007b7818b5b2580947f318/c/a/cabana_rust_wall_tile_room_image_1_.gif',
    hoverImage:
      'https://totaltiles.co.uk/media/catalog/product/cache/40dc17e4b9007b7818b5b2580947f318/8/4/8435081402825_1_.jpg',
    rating: 4.8,
    reviewCount: 15,
    badge: 'Warm Hue',
    inStock: true,
  },
  {
    id: 'wt-7',
    name: 'Laura Ashley Mason Charcoal Gloss Glazed Ceramic Wall Tile - 75mm x 245mm',
    category: 'Wall Tiles',
    material: 'Ceramic',
    finish: 'Gloss',
    size: '75x245mm',
    color: 'Charcoal',
    style: 'Metro Brick',
    suitability: ['Kitchen', 'Bathroom', 'Feature Wall'],
    m2Price: 10.88,
    boxPrice: 10.88,
    tilePrice: 0.2,
    coveragePerBox: 1.0,
    image:
      'https://totaltiles.co.uk/media/catalog/product/cache/40dc17e4b9007b7818b5b2580947f318/l/a/laura_ashley_mason_charcoal_gloss_glazed_ceramic_wall_tile_75x245mm_lifestyle.jpg',
    hoverImage:
      'https://totaltiles.co.uk/media/catalog/product/cache/40dc17e4b9007b7818b5b2580947f318/l/a/laura_ashley_mason_charcoal_gloss_glazed_ceramic_wall_tile_75x245mm.jpg',
    rating: 5.0,
    reviewCount: 78,
    badge: 'Laura Ashley',
    inStock: true,
  },
  {
    id: 'wt-8',
    name: 'Laura Ashley Mason Steel Gloss Glazed Ceramic Wall Tile - 75mm x 245mm',
    category: 'Wall Tiles',
    material: 'Ceramic',
    finish: 'Gloss',
    size: '75x245mm',
    color: 'Grey',
    style: 'Metro Brick',
    suitability: ['Kitchen', 'Bathroom', 'Shower'],
    m2Price: 10.88,
    boxPrice: 10.88,
    tilePrice: 0.2,
    coveragePerBox: 1.0,
    image:
      'https://totaltiles.co.uk/media/catalog/product/cache/40dc17e4b9007b7818b5b2580947f318/l/a/laura_ashley_mason_steel_gloss_glazed_ceramic_wall_tile_75x245mm_lifestyle_3.jpg',
    hoverImage:
      'https://totaltiles.co.uk/media/catalog/product/cache/40dc17e4b9007b7818b5b2580947f318/l/a/laura_ashley_mason_steel_gloss_glazed_ceramic_wall_tile_75x245mm.jpg',
    rating: 4.9,
    reviewCount: 61,
    badge: 'Laura Ashley',
    inStock: true,
  },
  {
    id: 'wt-9',
    name: 'Laura Ashley Mason Dark Dove Gloss Glazed Ceramic Wall Tile - 75mm x 245mm',
    category: 'Wall Tiles',
    material: 'Ceramic',
    finish: 'Gloss',
    size: '75x245mm',
    color: 'Grey',
    style: 'Metro Brick',
    suitability: ['Kitchen', 'Bathroom'],
    m2Price: 10.88,
    boxPrice: 10.88,
    tilePrice: 0.2,
    coveragePerBox: 1.0,
    image:
      'https://totaltiles.co.uk/media/catalog/product/cache/40dc17e4b9007b7818b5b2580947f318/l/a/laura_ashley_mason_dark_dove_gloss_glazed_ceramic_wall_tile_75x245mm_lifestyle.png',
    hoverImage:
      'https://totaltiles.co.uk/media/catalog/product/cache/40dc17e4b9007b7818b5b2580947f318/l/a/laura_ashley_mason_dark_dove_gloss_glazed_ceramic_wall_tile_75x245mm.jpg',
    rating: 5.0,
    reviewCount: 45,
    badge: 'Laura Ashley',
    inStock: true,
  },
  {
    id: 'wt-10',
    name: 'Johnson Tiles Contempo Statuario White Marble Effect Polished Porcelain Wall & Floor Tile - 600mm x 300mm',
    category: 'Wall Tiles',
    material: 'Porcelain',
    finish: 'Polished',
    size: '600x300mm',
    color: 'White',
    style: 'Marble Effect',
    suitability: ['Bathroom', 'Kitchen', 'Shower', 'Feature Wall'],
    m2Price: 20.39,
    boxPrice: 29.36,
    tilePrice: 3.67,
    coveragePerBox: 1.44,
    image:
      'https://totaltiles.co.uk/media/catalog/product/cache/40dc17e4b9007b7818b5b2580947f318/j/o/johnson_tiles_contempo_statuario_white_marble_effect_polished_porcelain_wall_floor_tile_-_600mm_x_300mm_lifestyle.png',
    hoverImage:
      'https://totaltiles.co.uk/media/catalog/product/cache/40dc17e4b9007b7818b5b2580947f318/j/o/johnson_tiles_contempo_statuario_white_marble_effect_polished_porcelain_wall_floor_tile_-_600mm_x_300mm.png',
    rating: 5.0,
    reviewCount: 93,
    badge: 'Johnson Tiles',
    inStock: true,
  },
  {
    id: 'wt-11',
    name: 'Johnson Tiles Contempo Statuario Gold Marble Effect Natural Porcelain Wall & Floor Tile - 600mm x 300mm',
    category: 'Wall Tiles',
    material: 'Porcelain',
    finish: 'Matt',
    size: '600x300mm',
    color: 'Gold',
    style: 'Marble Effect',
    suitability: ['Bathroom', 'Kitchen', 'Shower'],
    m2Price: 20.39,
    boxPrice: 29.36,
    tilePrice: 3.67,
    coveragePerBox: 1.44,
    image:
      'https://totaltiles.co.uk/media/catalog/product/cache/40dc17e4b9007b7818b5b2580947f318/j/o/johnson_tiles_contempo_statuario_gold_marble_effect_natural_porcelain_wall_floor_tile_-_600mm_x_300mm_lifestyle.png',
    hoverImage:
      'https://totaltiles.co.uk/media/catalog/product/cache/40dc17e4b9007b7818b5b2580947f318/j/o/johnson_tiles_contempo_statuario_gold_marble_effect_natural_porcelain_wall_floor_tile_-_600mm_x_300mm.png',
    rating: 4.9,
    reviewCount: 52,
    badge: 'Johnson Tiles',
    inStock: true,
  },
  {
    id: 'wt-12',
    name: 'Johnson Tiles Bevel Brick White Gloss Ceramic Wall Tile - 100mm x 200mm',
    category: 'Wall Tiles',
    material: 'Ceramic',
    finish: 'Gloss',
    size: '100x200mm',
    color: 'White',
    style: 'Metro Brick',
    suitability: ['Bathroom', 'Kitchen', 'Shower'],
    m2Price: 11.5,
    boxPrice: 11.5,
    tilePrice: 0.23,
    coveragePerBox: 1.0,
    image:
      'https://totaltiles.co.uk/media/catalog/product/cache/40dc17e4b9007b7818b5b2580947f318/j/o/johnson_tiles_bevel_brick_white_gloss_ceramic_wall_tile_-_200mm_x_100mm_lifestyle.png',
    hoverImage:
      'https://totaltiles.co.uk/media/catalog/product/cache/40dc17e4b9007b7818b5b2580947f318/j/o/johnson_tiles_bevel_brick_white_gloss_ceramic_wall_tile_-_200mm_x_100mm.png',
    rating: 5.0,
    reviewCount: 147,
    badge: 'Best Value',
    inStock: true,
  },
];

const subcategories = [
  { name: 'All Wall Tiles', filter: 'all' },
  { name: 'Bathroom Wall Tiles', filter: 'Bathroom' },
  { name: 'Kitchen Wall Tiles', filter: 'Kitchen' },
  { name: 'Metro Brick Tiles', filter: 'Metro Brick' },
  { name: 'Marble Effect', filter: 'Marble Effect' },
  { name: 'Stone Effect', filter: 'Stone Effect' },
  { name: 'Porcelain Wall Tiles', filter: 'Porcelain' },
];

export default function WallTilesPage() {
  // Shopping Cart & Samples State
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: wallTilesData[0],
      quantityBoxes: 2,
    },
  ]);
  const [samples, setSamples] = useState<Product[]>([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [sampleDrawerOpen, setSampleDrawerOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'register'>('signin');
  const [contactModalOpen, setContactModalOpen] = useState(false);

  // Filters State
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedFinishes, setSelectedFinishes] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('position');
  const [viewMode, setViewMode] = useState<'grid3' | 'grid4' | 'list'>('grid3');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Quick View Modal
  const [quickViewProduct, setQuickViewProduct] = useState<WallTileProduct | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // SEO Accordion
  const [seoExpanded, setSeoExpanded] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantityBoxes: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantityBoxes: item.quantityBoxes + quantityBoxes }
            : item
        );
      }
      return [...prev, { product, quantityBoxes }];
    });
    showToast(`Added ${quantityBoxes} box(es) of ${product.name} to Trolley`);
  };

  const handleUpdateCartQty = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantityBoxes + delta;
            return newQty > 0 ? { ...item, quantityBoxes: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Sample operations
  const handleAddSample = (product: Product) => {
    if (samples.length >= 3) {
      showToast('Maximum of 3 free samples per order');
      setSampleDrawerOpen(true);
      return;
    }
    if (samples.some((s) => s.id === product.id)) {
      showToast('Sample already added to book');
      setSampleDrawerOpen(true);
      return;
    }
    setSamples((prev) => [...prev, product]);
    showToast(`Added free sample: ${product.name}`);
    setSampleDrawerOpen(true);
  };

  const handleRemoveSample = (productId: string) => {
    setSamples((prev) => prev.filter((s) => s.id !== productId));
  };

  const handleClearSamples = () => {
    setSamples([]);
  };

  // Filter handlers
  const toggleColor = (c: string) => {
    setSelectedColors((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  const toggleFinish = (f: string) => {
    setSelectedFinishes((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
  };

  const toggleMaterial = (m: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
    );
  };

  const clearAllFilters = () => {
    setSelectedStyle('all');
    setSelectedColors([]);
    setSelectedFinishes([]);
    setSelectedMaterials([]);
    setSelectedPriceRange('all');
  };

  const activeFilterCount =
    (selectedStyle !== 'all' ? 1 : 0) +
    selectedColors.length +
    selectedFinishes.length +
    selectedMaterials.length +
    (selectedPriceRange !== 'all' ? 1 : 0);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return wallTilesData
      .filter((product) => {
        // Style / Subcategory filter
        if (selectedStyle !== 'all') {
          const matchStyle = product.style === selectedStyle;
          const matchRoom = product.suitability.includes(selectedStyle as any);
          const matchMat = product.material === selectedStyle;
          if (!matchStyle && !matchRoom && !matchMat) return false;
        }

        // Color
        if (selectedColors.length > 0 && !selectedColors.includes(product.color)) {
          return false;
        }

        // Finish
        if (selectedFinishes.length > 0 && !selectedFinishes.includes(product.finish)) {
          return false;
        }

        // Material
        if (selectedMaterials.length > 0 && !selectedMaterials.includes(product.material)) {
          return false;
        }

        // Price range
        if (selectedPriceRange === 'under-15' && product.m2Price >= 15) return false;
        if (
          selectedPriceRange === '15-25' &&
          (product.m2Price < 15 || product.m2Price > 25)
        )
          return false;
        if (selectedPriceRange === '25-plus' && product.m2Price <= 25) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.m2Price - b.m2Price;
        if (sortBy === 'price-high') return b.m2Price - a.m2Price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // default position
      });
  }, [
    selectedStyle,
    selectedColors,
    selectedFinishes,
    selectedMaterials,
    selectedPriceRange,
    sortBy,
  ]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantityBoxes, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.boxPrice * item.quantityBoxes,
    0
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfdfd]">
      {/* 1. Header & Utility */}
      <AnnouncementBanner />
      <Header
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setCartDrawerOpen(true)}
        onOpenAuth={(mode) => {
          setAuthMode(mode);
          setAuthModalOpen(true);
        }}
        onOpenContact={() => setContactModalOpen(true)}
      />

      {/* 2. Breadcrumbs Bar */}
      <nav aria-label="Breadcrumb" className="bg-[#f7f5f0] border-b border-gray-200 py-2.5 text-xs">
        <div className="container-tt flex items-center gap-2 text-gray-500">
          <Link href="/" className="hover:text-[#01acf1] transition-colors">
            Home
          </Link>
          <ChevronRight size={12} className="text-gray-400" />
          <Link href="/" className="hover:text-[#01acf1] transition-colors">
            Tiles
          </Link>
          <ChevronRight size={12} className="text-gray-400" />
          <span className="font-bold text-[#193d6b]">Wall Tiles</span>
        </div>
      </nav>

      {/* 3. USP Bar (Hidden on Mobile) */}
      <UspBar />

      {/* 4. Page Header Banner & Subcategories */}
      <section className="bg-white border-b border-gray-200 pt-5 pb-6">
        <div className="container-tt">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#193d6b] tracking-tight">
                Wall Tiles
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mt-1 leading-relaxed">
                Explore stylish wall tiles at unbeatable prices from Total Tiles. Our premium collection includes marble effect, porcelain, ceramic, subway metro, and more. Fast delivery plus full-size and cut tile samples available.
              </p>
            </div>
            <div className="text-xs text-gray-500 font-semibold shrink-0">
              Showing <span className="text-[#193d6b] font-bold">{filteredProducts.length}</span> of {wallTilesData.length} products
            </div>
          </div>

          {/* Subcategories Quick Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs font-semibold">
            {subcategories.map((sub, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedStyle(sub.filter)}
                className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all border ${
                  selectedStyle === sub.filter
                    ? 'bg-[#193d6b] text-white border-[#193d6b] shadow-sm'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-[#01acf1] hover:text-[#01acf1]'
                }`}
              >
                {sub.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Main Content: Filter Sidebar + Product Grid */}
      <main className="container-tt py-6 flex-1">
        {/* Mobile Filter & Sort Bar */}
        <div className="md:hidden flex items-center justify-between gap-3 mb-4 bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-[#193d6b] text-white rounded-md text-xs font-bold"
          >
            <SlidersHorizontal size={14} />
            <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
          </button>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-500">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs border border-gray-300 rounded px-2 py-1.5 bg-white text-gray-700 outline-none"
            >
              <option value="position">Position</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
          {/* DESKTOP FILTER SIDEBAR */}
          <aside className="hidden md:block col-span-1 bg-white rounded-lg border border-gray-200 p-4 shadow-sm sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-4">
              <div className="flex items-center gap-2 font-bold text-sm text-[#193d6b]">
                <Filter size={16} className="text-[#01acf1]" />
                <span>Filter By</span>
              </div>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-rose-600 hover:underline flex items-center gap-1 font-semibold"
                >
                  <RotateCcw size={12} />
                  Clear All
                </button>
              )}
            </div>

            {/* Filter Section: Style */}
            <div className="mb-5">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-700 mb-2.5">
                Style / Pattern
              </h3>
              <div className="space-y-1.5 text-xs text-gray-600">
                {['Marble Effect', 'Stone Effect', 'Metro Brick'].map((st) => (
                  <label
                    key={st}
                    className="flex items-center gap-2 cursor-pointer hover:text-[#01acf1] transition-colors"
                  >
                    <input
                      type="radio"
                      name="style"
                      checked={selectedStyle === st}
                      onChange={() => setSelectedStyle(selectedStyle === st ? 'all' : st)}
                      className="rounded text-[#01acf1] focus:ring-[#01acf1]"
                    />
                    <span>{st}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter Section: Colour */}
            <div className="mb-5 pt-3 border-t border-gray-100">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-700 mb-2.5">
                Colour
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                {[
                  { name: 'White', hex: '#ffffff', border: true },
                  { name: 'Grey', hex: '#9ca3af' },
                  { name: 'Green', hex: '#15803d' },
                  { name: 'Charcoal', hex: '#374151' },
                  { name: 'Rust', hex: '#b45309' },
                  { name: 'Gold', hex: '#eab308' },
                ].map((col) => (
                  <button
                    key={col.name}
                    type="button"
                    onClick={() => toggleColor(col.name)}
                    className={`flex items-center gap-2 p-1.5 rounded border text-left transition-all ${
                      selectedColors.includes(col.name)
                        ? 'border-[#01acf1] bg-sky-50 font-bold text-[#193d6b]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span
                      className={`w-3.5 h-3.5 rounded-full shrink-0 ${col.border ? 'border border-gray-300' : ''}`}
                      style={{ backgroundColor: col.hex }}
                    />
                    <span className="truncate">{col.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Section: Finish */}
            <div className="mb-5 pt-3 border-t border-gray-100">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-700 mb-2.5">
                Finish
              </h3>
              <div className="space-y-1.5 text-xs text-gray-600">
                {['High Gloss', 'Gloss', 'Matt', 'Satin', 'Polished'].map((fin) => (
                  <label
                    key={fin}
                    className="flex items-center gap-2 cursor-pointer hover:text-[#01acf1] transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFinishes.includes(fin)}
                      onChange={() => toggleFinish(fin)}
                      className="rounded text-[#01acf1] focus:ring-[#01acf1]"
                    />
                    <span>{fin}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter Section: Material */}
            <div className="mb-5 pt-3 border-t border-gray-100">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-700 mb-2.5">
                Material
              </h3>
              <div className="space-y-1.5 text-xs text-gray-600">
                {['Ceramic', 'Porcelain'].map((mat) => (
                  <label
                    key={mat}
                    className="flex items-center gap-2 cursor-pointer hover:text-[#01acf1] transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedMaterials.includes(mat)}
                      onChange={() => toggleMaterial(mat)}
                      className="rounded text-[#01acf1] focus:ring-[#01acf1]"
                    />
                    <span>{mat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter Section: Price per m² */}
            <div className="pt-3 border-t border-gray-100">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-700 mb-2.5">
                Price Per Meter Squared
              </h3>
              <div className="space-y-1.5 text-xs text-gray-600">
                {[
                  { id: 'all', label: 'All Prices' },
                  { id: 'under-15', label: 'Under £15/m²' },
                  { id: '15-25', label: '£15 - £25/m²' },
                  { id: '25-plus', label: '£25+/m²' },
                ].map((pr) => (
                  <label
                    key={pr.id}
                    className="flex items-center gap-2 cursor-pointer hover:text-[#01acf1] transition-colors"
                  >
                    <input
                      type="radio"
                      name="price"
                      checked={selectedPriceRange === pr.id}
                      onChange={() => setSelectedPriceRange(pr.id)}
                      className="rounded text-[#01acf1] focus:ring-[#01acf1]"
                    />
                    <span>{pr.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* MAIN PRODUCTS CONTENT */}
          <section className="col-span-1 md:col-span-3">
            {/* Desktop Toolbar */}
            <div className="hidden md:flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200 shadow-xs mb-5">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-gray-700">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded px-2.5 py-1.5 text-xs font-medium text-gray-700 bg-white hover:border-[#01acf1] outline-none"
                >
                  <option value="position">Position</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Reviews / Rating</option>
                </select>
              </div>

              {/* View mode toggle */}
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500 mr-1.5">View as:</span>
                <button
                  onClick={() => setViewMode('grid3')}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === 'grid3'
                      ? 'bg-[#193d6b] text-white'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                  aria-label="3 Columns Grid"
                  title="3 Columns Grid"
                >
                  <Grid3X3 size={16} />
                </button>
                <button
                  onClick={() => setViewMode('grid4')}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === 'grid4'
                      ? 'bg-[#193d6b] text-white'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                  aria-label="4 Columns Grid"
                  title="4 Columns Grid"
                >
                  <LayoutGrid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === 'list'
                      ? 'bg-[#193d6b] text-white'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                  aria-label="List View"
                  title="List View"
                >
                  <List size={16} />
                </button>
              </div>
            </div>

            {/* Active Filter Chips */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-xs text-gray-500 font-medium">Active Filters:</span>
                {selectedStyle !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 text-[#01acf1] border border-sky-200">
                    {selectedStyle}
                    <button onClick={() => setSelectedStyle('all')}>
                      <X size={12} />
                    </button>
                  </span>
                )}
                {selectedColors.map((col) => (
                  <span
                    key={col}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 text-[#01acf1] border border-sky-200"
                  >
                    Color: {col}
                    <button onClick={() => toggleColor(col)}>
                      <X size={12} />
                    </button>
                  </span>
                ))}
                {selectedFinishes.map((fin) => (
                  <span
                    key={fin}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 text-[#01acf1] border border-sky-200"
                  >
                    {fin}
                    <button onClick={() => toggleFinish(fin)}>
                      <X size={12} />
                    </button>
                  </span>
                ))}
                {selectedMaterials.map((mat) => (
                  <span
                    key={mat}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 text-[#01acf1] border border-sky-200"
                  >
                    {mat}
                    <button onClick={() => toggleMaterial(mat)}>
                      <X size={12} />
                    </button>
                  </span>
                ))}
                {selectedPriceRange !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 text-[#01acf1] border border-sky-200">
                    {selectedPriceRange}
                    <button onClick={() => setSelectedPriceRange('all')}>
                      <X size={12} />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-rose-600 hover:underline font-bold ml-1"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* PRODUCT GRID / LIST */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <p className="text-gray-500 text-sm mb-4">
                  No wall tiles match your selected filter criteria.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-4 py-2 bg-[#01acf1] text-white rounded font-bold text-xs hover:bg-[#0093cf]"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === 'list' ? (
              /* LIST VIEW */
              <div className="space-y-4">
                {filteredProducts.map((tile) => (
                  <div
                    key={tile.id}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow p-4 flex flex-col sm:flex-row gap-4 items-center"
                  >
                    {/* Image with hover effect */}
                    <div className="relative w-full sm:w-48 aspect-4/3 shrink-0 rounded overflow-hidden group">
                      <img
                        src={tile.image}
                        alt={tile.name}
                        className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                      />
                      <img
                        src={tile.hoverImage}
                        alt={tile.name}
                        className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      {tile.badge && (
                        <span className="absolute top-2 left-2 bg-[#193d6b] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                          {tile.badge}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 w-full">
                      <div className="flex items-center gap-1.5 text-xs text-amber-500 mb-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={13} fill="#1dcd98" className="text-[#1dcd98]" />
                          ))}
                        </div>
                        <span className="text-gray-500 font-medium">({tile.reviewCount} reviews)</span>
                      </div>
                      <h2 className="font-bold text-sm text-[#193d6b] leading-snug hover:text-[#01acf1] cursor-pointer">
                        {tile.name}
                      </h2>
                      <div className="text-xs text-gray-500 mt-1">
                        {tile.size} • {tile.material} • {tile.finish}
                      </div>

                      <div className="mt-3 flex flex-wrap items-baseline gap-2">
                        <span className="text-lg font-extrabold text-[#193d6b]">
                          £{tile.m2Price.toFixed(2)}/m²
                        </span>
                        <span className="text-xs text-gray-500">
                          (£{tile.tilePrice.toFixed(2)}/tile)
                        </span>
                      </div>
                    </div>

                    <div className="flex sm:flex-col gap-2 w-full sm:w-auto shrink-0">
                      <button
                        onClick={() => handleAddSample(tile)}
                        className="flex-1 sm:flex-none px-4 py-2 border-2 border-[#193d6b] text-[#193d6b] hover:bg-[#193d6b] hover:text-white rounded font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Package size={14} />
                        Free Sample
                      </button>
                      <button
                        onClick={() => handleAddToCart(tile, 1)}
                        className="flex-1 sm:flex-none px-4 py-2 bg-[#01acf1] text-white hover:bg-[#0093cf] rounded font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <ShoppingBag size={14} />
                        Add to Trolley
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* GRID VIEW (Matching exact user screenshot design) */
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 ${
                  viewMode === 'grid4' ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
                } gap-5`}
              >
                {filteredProducts.map((tile) => (
                  <div
                    key={tile.id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                  >
                    {/* Image Area with Badge & Top-Right Calculator/View Button */}
                    <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                      {/* Lifestyle Image */}
                      <img
                        src={tile.image}
                        alt={tile.name}
                        className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                        loading="lazy"
                      />
                      {/* Hover Tile Close-up */}
                      <img
                        src={tile.hoverImage}
                        alt={tile.name}
                        className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        loading="lazy"
                      />

                      {/* Top-Left Dark Navy Badge (e.g. Best Seller) */}
                      {tile.badge && (
                        <div className="absolute top-3 left-3 z-10">
                          <span className="bg-[#193d6b] text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
                            {tile.badge}
                          </span>
                        </div>
                      )}

                      {/* Top-Right White Circle Calculator Icon Button */}
                      <div className="absolute top-3 right-3 z-10">
                        <button
                          onClick={() => setQuickViewProduct(tile)}
                          className="w-9 h-9 rounded-full bg-white text-[#193d6b] hover:text-[#01acf1] flex items-center justify-center shadow-md transition-transform hover:scale-105"
                          title="View tile details"
                          aria-label="View tile details"
                        >
                          <Calculator size={17} />
                        </button>
                      </div>
                    </div>

                    {/* Details Body */}
                    <div className="p-4 sm:p-4.5 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Rating & Size Row */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs">
                            <Star size={14} className="text-amber-500 fill-amber-500" />
                            <span className="font-bold text-amber-600 text-xs sm:text-[13px]">
                              {tile.rating.toFixed(1)}
                            </span>
                            <span className="text-gray-400 font-normal text-xs">
                              ({tile.reviewCount})
                            </span>
                          </div>
                          <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-md tracking-tight">
                            {tile.size}
                          </span>
                        </div>

                        {/* Product Title */}
                        <h3
                          onClick={() => setQuickViewProduct(tile)}
                          className="font-extrabold text-[#193d6b] text-[15px] sm:text-[15.5px] leading-snug line-clamp-2 mt-2.5 group-hover:text-[#01acf1] transition-colors cursor-pointer"
                        >
                          {tile.name}
                        </h3>

                        {/* Subtitle / Finish */}
                        <p className="text-xs text-gray-500 font-normal mt-1 line-clamp-1">
                          {tile.finish}
                        </p>
                      </div>

                      {/* Pricing Box */}
                      <div>
                        {/* Thin Subtle Divider Line */}
                        <div className="border-t border-gray-100 my-3.5" />

                        {/* Price & In Stock Row */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-baseline gap-1">
                            <span className="text-xs font-medium text-gray-400">from</span>
                            <span className="text-2xl font-black text-[#193d6b] tracking-tight">
                              £{tile.m2Price.toFixed(2)}
                            </span>
                            <span className="text-xs font-bold text-gray-500">/ m²</span>
                          </div>

                          <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                            <Check size={13} className="text-emerald-600 stroke-[2.5]" />
                            <span>In Stock</span>
                          </div>
                        </div>

                        {/* Box Coverage / Per Tile Info */}
                        <div className="text-xs text-gray-500 mt-1 font-normal">
                          £{tile.boxPrice.toFixed(2)} per box ({tile.coveragePerBox}m²)
                        </div>

                        {/* Action Buttons: Free Sample & Add Box */}
                        <div className="grid grid-cols-2 gap-2.5 mt-4">
                          {/* Free Sample Button (Outline style) */}
                          <button
                            onClick={() => handleAddSample(tile)}
                            className="text-xs font-bold py-2.5 px-2 rounded-lg border border-[#01acf1] text-[#01acf1] bg-white hover:bg-sky-50/50 flex items-center justify-center gap-1.5 transition-all"
                          >
                            <Layers size={15} className="text-[#01acf1]" />
                            <span>Free Sample</span>
                          </button>

                          {/* Add Box Button (Solid cyan) */}
                          <button
                            onClick={() => handleAddToCart(tile, 1)}
                            className="text-xs font-bold py-2.5 px-2 rounded-lg bg-[#01acf1] hover:bg-[#0093cf] text-white flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                          >
                            <ShoppingBag size={15} />
                            <span>Add Box</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            <div className="mt-8 pt-4 border-t border-gray-200 flex items-center justify-between text-xs text-gray-600">
              <span className="font-medium">
                Items 1 - {filteredProducts.length} of {filteredProducts.length}
              </span>
              <div className="flex items-center gap-1">
                <button
                  disabled
                  className="px-3 py-1.5 rounded border border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                >
                  Prev
                </button>
                <button className="px-3 py-1.5 rounded bg-[#193d6b] text-white font-bold">
                  1
                </button>
                <button
                  disabled
                  className="px-3 py-1.5 rounded border border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* 6. Category SEO & Buying Guide Accordion (Bottom) */}
      <section className="bg-white border-t border-gray-200 py-10 mt-6">
        <div className="container-tt max-w-4xl text-xs sm:text-sm text-gray-600 leading-relaxed space-y-4">
          <h2 className="text-lg font-bold text-[#193d6b]">
            Total Tiles Wall Tiles Buying Guide
          </h2>
          <p>
            When it comes to redecorating, choosing the right wall tiles can completely transform your space, whether you are creating a modern kitchen splashback, a relaxing bathroom oasis, or a stunning feature wall in your living room. At Total Tiles, we source high-grade porcelain and ceramic wall tiles directly from leading European factories to give you premium designer looks at direct warehouse prices.
          </p>

          {seoExpanded && (
            <div className="space-y-4 pt-2 border-t border-gray-100 animate-in fade-in duration-200">
              <div>
                <h3 className="font-bold text-[#193d6b] mb-1">Ceramic vs Porcelain Wall Tiles</h3>
                <p>
                  Ceramic tiles are lightweight, budget-friendly, and very easy to cut, making them ideal for standard interior bathroom and kitchen walls. Porcelain tiles are denser and virtually impervious to water, making them the superior choice for wet room walls, heavy splash zones, and continuous floor-to-wall installations.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-[#193d6b] mb-1">Metro Subway &amp; Marble Effect Trends</h3>
                <p>
                  Classic bevelled metro tiles (like our Johnson Tiles 100x200mm) remain a timeless favourite for traditional and modern homes alike. For contemporary luxury, large format 600x300mm marble effect tiles (such as Skyline Quebec and Contempo Statuario) offer seamless grout lines and realistic veining that mimics authentic Italian Carrara.
                </p>
              </div>
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={() => setSeoExpanded(!seoExpanded)}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 border border-[#01acf1] text-[#01acf1] hover:bg-[#01acf1] hover:text-white rounded-md font-bold text-xs transition-colors"
            >
              <span>{seoExpanded ? 'Read less' : 'Read more guide'}</span>
              {seoExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <Footer
        onOpenContact={() => setContactModalOpen(true)}
        onOpenDelivery={() => {
          const el = document.getElementById('seo-guide');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* MOBILE FILTER SLIDE-OUT DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative w-[85%] max-w-sm h-full bg-white p-4 overflow-y-auto shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-4">
                <span className="font-extrabold text-[#193d6b] text-base">Filter Wall Tiles</span>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-gray-500 hover:bg-gray-100 rounded"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Style Filter */}
              <div className="mb-4">
                <span className="text-xs font-bold text-gray-700 block mb-2">Style</span>
                <div className="space-y-1.5 text-xs text-gray-600">
                  {['Marble Effect', 'Stone Effect', 'Metro Brick'].map((st) => (
                    <label key={st} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="mob-style"
                        checked={selectedStyle === st}
                        onChange={() => setSelectedStyle(selectedStyle === st ? 'all' : st)}
                      />
                      <span>{st}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Colour Filter */}
              <div className="mb-4 pt-3 border-t border-gray-100">
                <span className="text-xs font-bold text-gray-700 block mb-2">Colour</span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {['White', 'Grey', 'Green', 'Charcoal', 'Rust', 'Gold'].map((col) => (
                    <button
                      key={col}
                      onClick={() => toggleColor(col)}
                      className={`p-2 rounded border text-left ${
                        selectedColors.includes(col)
                          ? 'border-[#01acf1] bg-sky-50 font-bold'
                          : 'border-gray-200'
                      }`}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material Filter */}
              <div className="mb-4 pt-3 border-t border-gray-100">
                <span className="text-xs font-bold text-gray-700 block mb-2">Material</span>
                <div className="space-y-1.5 text-xs">
                  {['Ceramic', 'Porcelain'].map((mat) => (
                    <label key={mat} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedMaterials.includes(mat)}
                        onChange={() => toggleMaterial(mat)}
                      />
                      <span>{mat}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 flex gap-2">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-2.5 border border-gray-300 rounded font-bold text-xs text-gray-700 hover:bg-gray-50"
              >
                Clear
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2.5 bg-[#01acf1] text-white rounded font-bold text-xs shadow-sm hover:bg-[#0093cf]"
              >
                Apply ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QUICK VIEW PREVIEW MODAL */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 relative overflow-hidden max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <X size={20} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="relative aspect-4/3 rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <span className="text-xs font-bold text-[#01acf1] uppercase tracking-wider">
                  {quickViewProduct.style}
                </span>
                <h3 className="font-extrabold text-lg text-[#193d6b] mt-1 leading-snug">
                  {quickViewProduct.name}
                </h3>

                <div className="text-xs text-gray-500 mt-2 space-y-1">
                  <p><strong>Size:</strong> {quickViewProduct.size}</p>
                  <p><strong>Material:</strong> {quickViewProduct.material}</p>
                  <p><strong>Finish:</strong> {quickViewProduct.finish}</p>
                  <p><strong>Suitability:</strong> {quickViewProduct.suitability.join(', ')}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100">
                  <div className="text-2xl font-black text-[#193d6b]">
                    £{quickViewProduct.m2Price.toFixed(2)}
                    <span className="text-sm font-normal text-gray-500 ml-1">/m²</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    £{quickViewProduct.tilePrice.toFixed(2)} per tile • £{quickViewProduct.boxPrice.toFixed(2)} per box ({quickViewProduct.coveragePerBox}m²)
                  </div>
                </div>

                <div className="mt-5 flex gap-2">
                  <button
                    onClick={() => {
                      handleAddSample(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                    className="flex-1 py-2.5 px-3 border border-[#193d6b] text-[#193d6b] rounded font-bold text-xs hover:bg-[#193d6b] hover:text-white transition-colors"
                  >
                    Order Free Sample
                  </button>
                  <button
                    onClick={() => {
                      handleAddToCart(quickViewProduct, 1);
                      setQuickViewProduct(null);
                    }}
                    className="flex-1 py-2.5 px-3 bg-[#01acf1] text-white rounded font-bold text-xs hover:bg-[#0093cf] transition-colors shadow-sm"
                  >
                    Add to Trolley
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SLIDE-OUT DRAWERS & MODALS */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        items={cart}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      <SampleDrawer
        isOpen={sampleDrawerOpen}
        onClose={() => setSampleDrawerOpen(false)}
        samples={samples}
        onRemoveSample={handleRemoveSample}
        onClearSamples={handleClearSamples}
      />

      <AuthModal
        isOpen={authModalOpen}
        mode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onSwitchMode={(m) => setAuthMode(m)}
      />

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#193d6b] text-white px-4 py-3 rounded-lg shadow-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Check size={16} className="text-[#1dcd98]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
