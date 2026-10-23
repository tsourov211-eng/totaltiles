'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import AnnouncementBanner from '@/components/AnnouncementBanner';
import Header from '@/components/Header';
import UspBar from '@/components/UspBar';
import Footer from '@/components/Footer';
import CartDrawer, { CartItem } from '@/components/CartDrawer';
import SampleDrawer from '@/components/SampleDrawer';
import AuthModal from '@/components/AuthModal';
import ContactModal from '@/components/ContactModal';
import { ALL_PRODUCTS, CATEGORIES_LIST, Product } from '@/lib/products';
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
  RotateCcw,
  Calculator,
  Layers,
  ShieldCheck,
  Truck,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read category from query params
  const initialCategoryQuery = searchParams.get('category') || 'All';

  // Shopping Cart & Samples State
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: ALL_PRODUCTS[0],
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
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategoryQuery);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedFinishes, setSelectedFinishes] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('position');
  const [viewMode, setViewMode] = useState<'grid3' | 'list'>('grid3');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Quick View & Calculator Modals
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [calcModalProduct, setCalcModalProduct] = useState<Product | null>(null);
  const [calcLength, setCalcLength] = useState<string>('4');
  const [calcWidth, setCalcWidth] = useState<string>('3');
  const [includeWastage, setIncludeWastage] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [seoExpanded, setSeoExpanded] = useState<boolean>(false);

  // Sync category query param changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    } else {
      setSelectedCategory('All');
    }
  }, [searchParams]);

  // Handle category pill switch
  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    if (catId === 'All') {
      router.push('/products', { scroll: false });
    } else {
      router.push(`/products?category=${encodeURIComponent(catId)}`, { scroll: false });
    }
  };

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
      showToast('Maximum of 3 free cut samples per order');
      setSampleDrawerOpen(true);
      return;
    }
    if (samples.some((s) => s.id === product.id)) {
      showToast('Tile already in your sample book');
      setSampleDrawerOpen(true);
      return;
    }
    setSamples((prev) => [...prev, product]);
    showToast(`Added free sample: ${product.name} (${samples.length + 1}/3)`);
    setSampleDrawerOpen(true);
  };

  const handleRemoveSample = (productId: string) => {
    setSamples((prev) => prev.filter((s) => s.id !== productId));
  };

  const handleClearSamples = () => {
    setSamples([]);
  };

  // Filter toggles
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
    setSelectedCategory('All');
    setSelectedColors([]);
    setSelectedFinishes([]);
    setSelectedMaterials([]);
    setSelectedPriceRange('all');
    setInStockOnly(false);
    router.push('/products', { scroll: false });
  };

  const activeFilterCount =
    (selectedCategory !== 'All' ? 1 : 0) +
    selectedColors.length +
    selectedFinishes.length +
    selectedMaterials.length +
    (selectedPriceRange !== 'all' ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'All') {
        const query = selectedCategory.toLowerCase();
        const mainCatMatch = product.category.toLowerCase().includes(query);
        const multiCatMatch = product.categories.some((c) =>
          c.toLowerCase().includes(query) || query.includes(c.toLowerCase())
        );
        const styleMatch = product.style.toLowerCase().includes(query);
        const suitabilityMatch = product.suitability.some((s) =>
          s.toLowerCase().includes(query)
        );

        if (!mainCatMatch && !multiCatMatch && !styleMatch && !suitabilityMatch) {
          return false;
        }
      }

      // Color
      if (selectedColors.length > 0 && !selectedColors.includes(product.color)) {
        return false;
      }

      // Finish
      if (
        selectedFinishes.length > 0 &&
        !selectedFinishes.some((f) => product.finish.toLowerCase().includes(f.toLowerCase()))
      ) {
        return false;
      }

      // Material
      if (selectedMaterials.length > 0 && !selectedMaterials.includes(product.material)) {
        return false;
      }

      // In stock
      if (inStockOnly && !product.inStock) {
        return false;
      }

      // Price range per m²
      if (selectedPriceRange === 'under-15' && product.m2Price >= 15) return false;
      if (
        selectedPriceRange === '15-25' &&
        (product.m2Price < 15 || product.m2Price > 25)
      ) {
        return false;
      }
      if (selectedPriceRange === '25-plus' && product.m2Price <= 25) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.m2Price - b.m2Price;
      if (sortBy === 'price-high') return b.m2Price - a.m2Price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'popular') return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
      return 0; // position default
    });
  }, [
    selectedCategory,
    selectedColors,
    selectedFinishes,
    selectedMaterials,
    selectedPriceRange,
    inStockOnly,
    sortBy,
  ]);

  // Current category info
  const currentCategoryInfo = useMemo(() => {
    return (
      CATEGORIES_LIST.find((c) => c.id.toLowerCase() === selectedCategory.toLowerCase()) || {
        id: selectedCategory,
        label: `${selectedCategory} Tiles`,
        description: `Explore our premium range of ${selectedCategory} tiles. In stock with next-day express delivery & up to 3 free cut samples!`,
      }
    );
  }, [selectedCategory]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantityBoxes, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.boxPrice * item.quantityBoxes,
    0
  );

  // Calculator computations
  const lengthNum = parseFloat(calcLength) || 0;
  const widthNum = parseFloat(calcWidth) || 0;
  const rawArea = lengthNum * widthNum;
  const totalArea = includeWastage ? rawArea * 1.1 : rawArea;
  const boxesNeeded = calcModalProduct
    ? Math.ceil(totalArea / calcModalProduct.coveragePerBox)
    : 0;
  const estimatedCost = calcModalProduct ? boxesNeeded * calcModalProduct.boxPrice : 0;

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfd]">
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
          <Link
            href="/products"
            onClick={() => handleSelectCategory('All')}
            className="hover:text-[#01acf1] transition-colors"
          >
            All Products
          </Link>
          {selectedCategory !== 'All' && (
            <>
              <ChevronRight size={12} className="text-gray-400" />
              <span className="font-bold text-[#193d6b]">{currentCategoryInfo.label}</span>
            </>
          )}
        </div>
      </nav>

      {/* 3. USP Bar (Hidden on Mobile) */}
      <UspBar />

      {/* 4. Page Header Banner & Category Filter Pills */}
      <section className="bg-white border-b border-gray-200 pt-5 pb-6">
        <div className="container-tt">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#193d6b] tracking-tight">
                {currentCategoryInfo.label}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 max-w-3xl mt-1.5 leading-relaxed">
                {currentCategoryInfo.description}
              </p>
            </div>
            <div className="text-xs text-gray-500 font-semibold shrink-0 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
              Showing <span className="text-[#193d6b] font-bold">{filteredProducts.length}</span> of {ALL_PRODUCTS.length} tiles
            </div>
          </div>

          {/* Category Filter Pills (Shortlist categories) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs font-semibold pt-1">
            {CATEGORIES_LIST.map((cat) => {
              const isSelected =
                selectedCategory.toLowerCase() === cat.id.toLowerCase() ||
                (cat.id === 'All' && selectedCategory === 'All');
              return (
                <button
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#193d6b] text-white border-[#193d6b] shadow-sm font-bold'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-[#01acf1] hover:text-[#01acf1]'
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Main Content: Sidebar + Products Grid */}
      <main className="container-tt py-6 flex-1">
        {/* Mobile Filter & Sort Bar */}
        <div className="md:hidden flex items-center justify-between gap-3 mb-4 bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-[#193d6b] text-white rounded-md text-xs font-bold active:scale-95 transition-transform"
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
              <option value="popular">Best Sellers</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
          {/* DESKTOP FILTER SIDEBAR */}
          <aside className="hidden md:block col-span-1 bg-white rounded-xl border border-gray-200 p-5 shadow-sm sticky top-24">
            <div className="flex items-center justify-between pb-3.5 border-b border-gray-200 mb-4">
              <div className="flex items-center gap-2 font-bold text-sm text-[#193d6b]">
                <Filter size={16} className="text-[#01acf1]" />
                <span>Filter By</span>
                {activeFilterCount > 0 && (
                  <span className="bg-[#01acf1] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
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

            {/* Category Quick Selector */}
            <div className="mb-5">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-700 mb-2.5">
                Category
              </h3>
              <div className="space-y-1.5 text-xs text-gray-600">
                {CATEGORIES_LIST.map((cat) => (
                  <label
                    key={cat.id}
                    className="flex items-center gap-2 cursor-pointer hover:text-[#01acf1] transition-colors"
                  >
                    <input
                      type="radio"
                      name="sidebar-category"
                      checked={
                        selectedCategory.toLowerCase() === cat.id.toLowerCase() ||
                        (cat.id === 'All' && selectedCategory === 'All')
                      }
                      onChange={() => handleSelectCategory(cat.id)}
                      className="rounded-full text-[#01acf1] focus:ring-[#01acf1]"
                    />
                    <span
                      className={
                        selectedCategory.toLowerCase() === cat.id.toLowerCase()
                          ? 'font-bold text-[#193d6b]'
                          : ''
                      }
                    >
                      {cat.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Colour Swatches */}
            <div className="mb-5 pt-3.5 border-t border-gray-100">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-700 mb-2.5">
                Colour
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                {[
                  { name: 'White', hex: '#ffffff', border: true },
                  { name: 'Grey', hex: '#9ca3af' },
                  { name: 'Beige', hex: '#d4b996' },
                  { name: 'Wood', hex: '#854d0e' },
                  { name: 'Charcoal', hex: '#374151' },
                  { name: 'Green', hex: '#15803d' },
                  { name: 'Rust', hex: '#b45309' },
                  { name: 'Gold', hex: '#eab308' },
                ].map((col) => (
                  <button
                    key={col.name}
                    type="button"
                    onClick={() => toggleColor(col.name)}
                    className={`flex items-center gap-2 p-1.5 rounded-lg border text-left transition-all ${
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

            {/* Finish */}
            <div className="mb-5 pt-3.5 border-t border-gray-100">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-700 mb-2.5">
                Finish
              </h3>
              <div className="space-y-1.5 text-xs text-gray-600">
                {['High Gloss', 'Gloss', 'Matt', 'Polished', 'Textured', 'Satin', 'R11 Anti-Slip'].map(
                  (fin) => (
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
                  )
                )}
              </div>
            </div>

            {/* Material */}
            <div className="mb-5 pt-3.5 border-t border-gray-100">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-700 mb-2.5">
                Material
              </h3>
              <div className="space-y-1.5 text-xs text-gray-600">
                {['Porcelain', 'Ceramic', 'Paver Porcelain'].map((mat) => (
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

            {/* Price per m² */}
            <div className="pt-3.5 border-t border-gray-100 mb-5">
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
                      name="sidebar-price"
                      checked={selectedPriceRange === pr.id}
                      onChange={() => setSelectedPriceRange(pr.id)}
                      className="rounded-full text-[#01acf1] focus:ring-[#01acf1]"
                    />
                    <span>{pr.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* In Stock Only Checkbox */}
            <div className="pt-3.5 border-t border-gray-100">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-700">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-[#01acf1] focus:ring-[#01acf1]"
                />
                <span>In Stock Only</span>
              </label>
            </div>
          </aside>

          {/* MAIN PRODUCTS CONTENT */}
          <section className="col-span-1 md:col-span-3">
            {/* Desktop Toolbar */}
            <div className="hidden md:flex items-center justify-between bg-white p-3 rounded-xl border border-gray-200 shadow-xs mb-5">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-gray-700">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded px-2.5 py-1.5 text-xs font-medium text-gray-700 bg-white hover:border-[#01acf1] outline-none"
                >
                  <option value="position">Position / Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Reviews / Rating</option>
                  <option value="popular">Best Sellers</option>
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
                  title="3 Cards Grid"
                  aria-label="3 Cards Grid"
                >
                  <Grid3X3 size={15} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === 'list'
                      ? 'bg-[#193d6b] text-white'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                  title="List View"
                  aria-label="List View"
                >
                  <List size={15} />
                </button>
              </div>
            </div>

            {/* Active Filter Chips */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 mb-4 text-xs">
                <span className="text-gray-500 font-medium">Applied Filters:</span>
                {selectedCategory !== 'All' && (
                  <span className="inline-flex items-center gap-1 bg-sky-100 text-[#193d6b] font-semibold px-2 py-0.5 rounded-full">
                    Category: {currentCategoryInfo.label}
                    <button
                      onClick={() => handleSelectCategory('All')}
                      className="hover:text-rose-600"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}
                {selectedColors.map((col) => (
                  <span
                    key={col}
                    className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full"
                  >
                    Colour: {col}
                    <button onClick={() => toggleColor(col)} className="hover:text-rose-600">
                      <X size={12} />
                    </button>
                  </span>
                ))}
                {selectedFinishes.map((fin) => (
                  <span
                    key={fin}
                    className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full"
                  >
                    {fin}
                    <button onClick={() => toggleFinish(fin)} className="hover:text-rose-600">
                      <X size={12} />
                    </button>
                  </span>
                ))}
                {selectedMaterials.map((mat) => (
                  <span
                    key={mat}
                    className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full"
                  >
                    {mat}
                    <button onClick={() => toggleMaterial(mat)} className="hover:text-rose-600">
                      <X size={12} />
                    </button>
                  </span>
                ))}
                {selectedPriceRange !== 'all' && (
                  <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                    Price: {selectedPriceRange}
                    <button
                      onClick={() => setSelectedPriceRange('all')}
                      className="hover:text-rose-600"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearAllFilters}
                  className="text-rose-600 hover:underline font-bold text-xs ml-1"
                >
                  Reset All
                </button>
              </div>
            )}

            {/* Zero State */}
            {filteredProducts.length === 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center my-6">
                <div className="w-16 h-16 rounded-full bg-sky-50 text-[#01acf1] flex items-center justify-center mx-auto mb-4">
                  <Filter size={24} />
                </div>
                <h3 className="text-lg font-bold text-[#193d6b] mb-1">
                  No tiles matched your filter criteria
                </h3>
                <p className="text-xs text-gray-500 max-w-md mx-auto mb-5">
                  Try clearing some filters or browsing all products to discover our extensive range of floor and wall tiles.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-[#01acf1] hover:bg-[#0093cf] text-white text-xs font-bold px-5 py-2.5 rounded-lg transition-colors shadow-sm"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Product Grid / List */}
            {viewMode === 'list' ? (
              /* LIST VIEW */
              <div className="space-y-4">
                {filteredProducts.map((product) => {
                  const hasSample = samples.some((s) => s.id === product.id);
                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-4 flex flex-col sm:flex-row gap-5 items-center group"
                    >
                      <div className="relative w-full sm:w-52 aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        {product.badge && (
                          <span className="absolute top-3 left-3 bg-[#193d6b] text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
                            {product.badge}
                          </span>
                        )}
                        <button
                          onClick={() => setCalcModalProduct(product)}
                          className="w-8 h-8 rounded-full bg-white text-[#193d6b] hover:text-[#01acf1] flex items-center justify-center shadow-md absolute top-3 right-3 transition-transform hover:scale-110"
                          title="Calculate room size"
                          aria-label="Calculate room size"
                        >
                          <Calculator size={15} />
                        </button>
                      </div>

                      <div className="flex-1 flex flex-col justify-between w-full">
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1.5">
                            <div className="flex items-center gap-1.5">
                              <Star size={14} className="text-amber-500 fill-amber-500" />
                              <span className="font-bold text-amber-600 text-xs sm:text-[13px]">{product.rating.toFixed(1)}</span>
                              <span className="text-gray-400 font-normal">({product.reviewCount})</span>
                            </div>
                            <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-md">
                              {product.size}
                            </span>
                          </div>

                          <h3 className="font-extrabold text-[#193d6b] text-base hover:text-[#01acf1] transition-colors line-clamp-1">
                            {product.name}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {product.finish} • {product.material} • Suitable for {product.suitability.join(', ')}
                          </p>
                        </div>

                        <div className="border-t border-gray-100 my-3" />

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-3">
                              <div className="flex items-baseline gap-1">
                                <span className="text-xs font-medium text-gray-400">from</span>
                                <span className="text-2xl font-black text-[#193d6b] tracking-tight">
                                  £{product.m2Price.toFixed(2)}
                                </span>
                                <span className="text-xs font-bold text-gray-500">/ m²</span>
                              </div>
                              <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                                <Check size={13} className="text-emerald-600 stroke-[2.5]" />
                                <span>In Stock</span>
                              </div>
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5">
                              £{product.boxPrice.toFixed(2)} per box ({product.coveragePerBox}m²)
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleAddSample(product)}
                              disabled={hasSample}
                              className={`text-xs font-bold py-2.5 px-3 rounded-lg border flex items-center gap-1.5 transition-all ${
                                hasSample
                                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700 cursor-default'
                                  : 'bg-white hover:bg-sky-50/50 border-[#01acf1] text-[#01acf1]'
                              }`}
                            >
                              {hasSample ? (
                                <>
                                  <Check size={14} className="stroke-[2.5]" />
                                  <span>Sample Added</span>
                                </>
                              ) : (
                                <>
                                  <Layers size={14} className="text-[#01acf1]" />
                                  <span>Free Sample</span>
                                </>
                              )}
                            </button>

                            <button
                              onClick={() => handleAddToCart(product, 1)}
                              className="text-xs font-bold py-2.5 px-4 rounded-lg bg-[#01acf1] hover:bg-[#0093cf] text-white flex items-center gap-1.5 transition-colors shadow-sm"
                            >
                              <ShoppingBag size={14} />
                              <span>Add Box</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* GRID VIEW: 3 Cards per row, 50% Image and 50% Details */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const hasSample = samples.some((s) => s.id === product.id);
                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group h-[520px] sm:h-[540px]"
                    >
                      {/* Top 50% Image Area */}
                      <div className="relative h-1/2 w-full bg-gray-100 overflow-hidden shrink-0">
                        {/* Primary Image */}
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                          loading="lazy"
                        />
                        {/* Hover Image */}
                        <img
                          src={product.hoverImage || product.image}
                          alt={`${product.name} lifestyle`}
                          className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                          loading="lazy"
                        />

                        {/* Top-Left Dark Navy Badge (e.g. Best Seller) */}
                        {product.badge && (
                          <div className="absolute top-3 left-3 z-10">
                            <span className="bg-[#193d6b] text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
                              {product.badge}
                            </span>
                          </div>
                        )}

                        {/* Top-Right White Circle Calculator Icon Button */}
                        <div className="absolute top-3 right-3 z-10">
                          <button
                            onClick={() => setCalcModalProduct(product)}
                            className="w-9 h-9 rounded-full bg-white text-[#193d6b] hover:text-[#01acf1] flex items-center justify-center shadow-md transition-transform hover:scale-105"
                            title="Calculate room area"
                            aria-label="Calculate room area"
                          >
                            <Calculator size={17} />
                          </button>
                        </div>
                      </div>

                      {/* Bottom 50% Details Area */}
                      <div className="h-1/2 p-4 sm:p-5 flex flex-col justify-between bg-white">
                        <div>
                          {/* Rating and Size Row */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-xs">
                              <Star size={14} className="text-amber-500 fill-amber-500" />
                              <span className="font-bold text-amber-600 text-xs sm:text-[13px]">
                                {product.rating.toFixed(1)}
                              </span>
                              <span className="text-gray-400 font-normal text-xs">
                                ({product.reviewCount})
                              </span>
                            </div>
                            <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-md tracking-tight">
                              {product.size}
                            </span>
                          </div>

                          {/* Product Title */}
                          <h3 className="font-extrabold text-[#193d6b] text-[15px] sm:text-[16px] leading-snug line-clamp-2 mt-2.5 group-hover:text-[#01acf1] transition-colors">
                            {product.name}
                          </h3>

                          {/* Subtitle / Finish */}
                          <p className="text-xs text-gray-500 font-normal mt-1 line-clamp-1">
                            {product.finish}
                          </p>
                        </div>

                        {/* Bottom Pricing & Actions Area */}
                        <div>
                          {/* Thin Subtle Divider Line */}
                          <div className="border-t border-gray-100 my-3" />

                          {/* Price & In Stock Row */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-baseline gap-1">
                              <span className="text-xs font-medium text-gray-400">from</span>
                              <span className="text-2xl font-black text-[#193d6b] tracking-tight">
                                £{product.m2Price.toFixed(2)}
                              </span>
                              <span className="text-xs font-bold text-gray-500">/ m²</span>
                            </div>

                            <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                              <Check size={13} className="text-emerald-600 stroke-[2.5]" />
                              <span>In Stock</span>
                            </div>
                          </div>

                          {/* Box Coverage Info */}
                          <div className="text-xs text-gray-500 mt-0.5 font-normal">
                            £{product.boxPrice.toFixed(2)} per box ({product.coveragePerBox}m²)
                          </div>

                          {/* Action Buttons: Free Sample & Add Box */}
                          <div className="grid grid-cols-2 gap-2.5 mt-3.5">
                            {/* Free Sample Button (Outline style) */}
                            <button
                              onClick={() => handleAddSample(product)}
                              disabled={hasSample}
                              className={`text-xs font-bold py-2.5 px-2 rounded-lg border flex items-center justify-center gap-1.5 transition-all ${
                                hasSample
                                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700 cursor-default'
                                  : 'bg-white hover:bg-sky-50/50 border-[#01acf1] text-[#01acf1]'
                              }`}
                            >
                              {hasSample ? (
                                <>
                                  <Check size={15} className="stroke-[2.5]" />
                                  <span>Sample Added</span>
                                </>
                              ) : (
                                <>
                                  <Layers size={15} className="text-[#01acf1]" />
                                  <span>Free Sample</span>
                                </>
                              )}
                            </button>

                            {/* Add Box Button (Solid cyan) */}
                            <button
                              onClick={() => handleAddToCart(product, 1)}
                              className="text-xs font-bold py-2.5 px-2 rounded-lg bg-[#01acf1] hover:bg-[#0093cf] text-white flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                            >
                              <ShoppingBag size={15} />
                              <span>Add Box</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>

        {/* SEO & BUYER GUIDE ACCORDION */}
        <section className="mt-14 bg-white rounded-xl border border-gray-200 p-6 md:p-8 shadow-xs">
          <div className="flex items-center justify-between">
            <h2 className="text-lg md:text-xl font-extrabold text-[#193d6b]">
              Why Buy Tiles from Total Tiles?
            </h2>
            <button
              onClick={() => setSeoExpanded(!seoExpanded)}
              className="text-xs font-bold text-[#01acf1] hover:text-[#193d6b] flex items-center gap-1"
            >
              <span>{seoExpanded ? 'Read Less' : 'Read Full Buying Guide'}</span>
              {seoExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

          <div
            className={`mt-4 space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed overflow-hidden transition-all duration-300 ${
              seoExpanded ? 'max-h-[1000px]' : 'max-h-24 line-clamp-3'
            }`}
          >
            <p>
              At <strong>Total Tiles</strong>, we are proud to offer one of the UK’s most extensive online collections of premium floor and wall tiles. Whether you are refurbishing a compact ensuite, tiling a high-traffic family kitchen, or installing luxury 20mm frost-proof porcelain patio pavers in your garden, our carefully curated collection guarantees you find the perfect style at unbeatable direct-to-consumer prices.
            </p>
            <p>
              <strong>Order Free Cut Samples:</strong> We understand that lighting and tactile feel matter. You can order up to 3 cut tile samples completely free with fast next-day postage straight to your door before placing your main tile order.
            </p>
            <p>
              <strong>Guaranteed Lowest UK Prices:</strong> We source directly from the world’s leading tile manufacturers in Italy, Spain, and the UK, bypassing unnecessary middleman markups so you always enjoy trade-level prices.
            </p>
          </div>
        </section>
      </main>

      {/* 6. Footer */}
      <Footer
        onOpenContact={() => setContactModalOpen(true)}
        onOpenDelivery={() => {
          const el = document.getElementById('seo-guide');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* MOBILE FILTER DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-xs bg-white h-full flex flex-col p-5 overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div className="font-bold text-base text-[#193d6b] flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-[#01acf1]" />
                <span>Filters</span>
              </div>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Category List */}
            <div className="py-4 border-b border-gray-100">
              <h4 className="text-xs font-extrabold uppercase text-gray-700 mb-2">Category</h4>
              <div className="space-y-1.5 text-xs text-gray-600">
                {CATEGORIES_LIST.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      handleSelectCategory(cat.id);
                      setMobileFilterOpen(false);
                    }}
                    className={`w-full text-left py-1.5 px-2 rounded-md transition-colors ${
                      selectedCategory.toLowerCase() === cat.id.toLowerCase()
                        ? 'bg-sky-50 font-bold text-[#01acf1]'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="mt-auto pt-4 flex gap-2">
              <button
                onClick={() => {
                  clearAllFilters();
                  setMobileFilterOpen(false);
                }}
                className="flex-1 py-2.5 border border-gray-300 rounded-lg text-xs font-bold text-gray-600"
              >
                Reset All
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2.5 bg-[#01acf1] text-white rounded-lg text-xs font-bold"
              >
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TILE CALCULATOR MODAL */}
      {calcModalProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl relative text-[#262626]">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2 text-[#193d6b] font-extrabold text-base">
                <Calculator size={18} className="text-[#01acf1]" />
                <span>Tile Room Calculator</span>
              </div>
              <button
                onClick={() => setCalcModalProduct(null)}
                className="text-gray-400 hover:text-gray-700 p-1"
              >
                ✕
              </button>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-bold text-[#193d6b] line-clamp-1">
                {calcModalProduct.name}
              </h4>
              <p className="text-xs text-gray-500 mt-0.5">
                Box coverage: {calcModalProduct.coveragePerBox} m² (£
                {calcModalProduct.boxPrice.toFixed(2)}/box)
              </p>

              {/* Dimension Inputs */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Room Length (m)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.5"
                    value={calcLength}
                    onChange={(e) => setCalcLength(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-[#01acf1]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Room Width (m)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.5"
                    value={calcWidth}
                    onChange={(e) => setCalcWidth(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-[#01acf1]"
                  />
                </div>
              </div>

              {/* 10% Wastage Checkbox */}
              <div className="mt-3 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="wastage"
                  checked={includeWastage}
                  onChange={(e) => setIncludeWastage(e.target.checked)}
                  className="rounded text-[#01acf1] focus:ring-0"
                />
                <label htmlFor="wastage" className="text-xs text-gray-700 font-medium">
                  Add 10% for cuts &amp; wastage (Recommended by tilers)
                </label>
              </div>

              {/* Calculation Summary */}
              <div className="mt-5 p-4 bg-sky-50 rounded-lg border border-sky-100 flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-500 font-medium">Required Coverage</div>
                  <div className="text-lg font-extrabold text-[#193d6b]">
                    {totalArea.toFixed(2)} m²
                  </div>
                  <div className="text-xs font-semibold text-[#01acf1]">
                    ({boxesNeeded} full boxes)
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-gray-500 font-medium">Total Estimate</div>
                  <div className="text-2xl font-black text-[#193d6b]">
                    £{estimatedCost.toFixed(2)}
                  </div>
                  <div className="text-[11px] text-gray-500">Includes VAT</div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => {
                    handleAddToCart(calcModalProduct, boxesNeeded);
                    setCalcModalProduct(null);
                  }}
                  className="flex-1 bg-[#01acf1] hover:bg-[#0093cf] text-white py-2.5 rounded-lg font-bold text-sm transition-colors shadow flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={16} />
                  Add {boxesNeeded} Boxes to Trolley
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QUICK VIEW MODAL */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-2xl relative text-[#262626] max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mt-2">
              <div className="space-y-3">
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={quickViewProduct.image}
                    alt={quickViewProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {quickViewProduct.hoverImage && (
                  <div className="aspect-[16/9] rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={quickViewProduct.hoverImage}
                      alt={`${quickViewProduct.name} installed`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div>
                <span className="text-[11px] font-bold text-[#01acf1] uppercase bg-sky-50 px-2 py-0.5 rounded">
                  {quickViewProduct.category}
                </span>
                <h3 className="text-lg font-extrabold text-[#193d6b] mt-1.5 leading-snug">
                  {quickViewProduct.name}
                </h3>

                <div className="flex items-center gap-1 text-amber-500 font-bold text-xs mt-1.5">
                  <Star size={14} fill="currentColor" />
                  <span>{quickViewProduct.rating.toFixed(1)}</span>
                  <span className="text-gray-400 font-normal">
                    ({quickViewProduct.reviewCount} verified reviews)
                  </span>
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-gray-500">from</span>
                    <span className="text-2xl font-black text-[#193d6b]">
                      £{quickViewProduct.m2Price.toFixed(2)}
                    </span>
                    <span className="text-xs font-bold text-gray-500">/ m²</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    £{quickViewProduct.boxPrice.toFixed(2)} per box ({quickViewProduct.coveragePerBox}m²)
                  </div>
                </div>

                {/* Specs Table */}
                <div className="mt-4 border-t border-b border-gray-100 py-3 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tile Size:</span>
                    <span className="font-semibold text-gray-800">{quickViewProduct.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Material:</span>
                    <span className="font-semibold text-gray-800">{quickViewProduct.material}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Finish:</span>
                    <span className="font-semibold text-gray-800">{quickViewProduct.finish}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Suitability:</span>
                    <span className="font-semibold text-gray-800">
                      {quickViewProduct.suitability.join(', ')}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-5 space-y-2">
                  <button
                    onClick={() => {
                      handleAddToCart(quickViewProduct, 1);
                      setQuickViewProduct(null);
                    }}
                    className="w-full bg-[#01acf1] hover:bg-[#0093cf] text-white py-2.5 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow"
                  >
                    <ShoppingBag size={15} />
                    <span>Add Box to Trolley (£{quickViewProduct.boxPrice.toFixed(2)})</span>
                  </button>

                  <button
                    onClick={() => {
                      handleAddSample(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                    className="w-full bg-white hover:bg-gray-50 border border-[#01acf1] text-[#01acf1] py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Layers size={15} />
                    <span>Order Free Cut Sample</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Sticky "Free Cut Samples" Button */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setSampleDrawerOpen(true)}
          className="bg-[#193d6b] hover:bg-[#102e54] text-white px-4 py-3 rounded-full shadow-2xl flex items-center gap-2.5 border-2 border-white transition-all transform hover:scale-105 group"
          aria-label="Open Free Sample Book"
        >
          <div className="relative">
            <Package
              size={20}
              className="text-[#01acf1] group-hover:rotate-12 transition-transform"
            />
            {samples.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#11c667] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {samples.length}
              </span>
            )}
          </div>
          <div className="text-left text-xs font-bold leading-tight">
            <span>Free Cut Samples</span>
            <span className="text-[10px] block text-sky-200 font-medium">
              {samples.length === 0
                ? 'Order up to 3 free'
                : `${samples.length}/3 selected • Free Postage`}
            </span>
          </div>
        </button>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#193d6b] text-white px-5 py-3 rounded-lg shadow-2xl border border-sky-400 text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Check size={16} className="text-[#11c667]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Interactive Drawers & Modals */}
      <SampleDrawer
        isOpen={sampleDrawerOpen}
        onClose={() => setSampleDrawerOpen(false)}
        samples={samples}
        onRemoveSample={handleRemoveSample}
        onClearSamples={handleClearSamples}
      />

      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        items={cart}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
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
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center text-sm font-bold text-[#193d6b]">
          Loading products...
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
