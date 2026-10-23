'use client';

import { useState } from 'react';
import AnnouncementBanner from '@/components/AnnouncementBanner';
import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import UspBar from '@/components/UspBar';
import PromoBanners from '@/components/PromoBanners';
import CategoryGrid from '@/components/CategoryGrid';
import ProductShowcase, { Product } from '@/components/ProductShowcase';
import InspirationGallery from '@/components/InspirationGallery';
import FeatureBanners from '@/components/FeatureBanners';
import ReviewsSection from '@/components/ReviewsSection';
import SeoContent from '@/components/SeoContent';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import SampleDrawer from '@/components/SampleDrawer';
import CartDrawer, { CartItem } from '@/components/CartDrawer';
import TradeModal from '@/components/TradeModal';
import AuthModal from '@/components/AuthModal';
import ContactModal from '@/components/ContactModal';
import { Package, Check, ShoppingBag } from 'lucide-react';

export default function Home() {
  // Cart state
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: {
        id: 'tt-1',
        name: 'Calacatta Gold Polished Porcelain Floor & Wall Tile',
        category: 'Marble Effect',
        size: '600x600mm',
        finish: 'High Gloss Polished',
        m2Price: 16.95,
        boxPrice: 24.41,
        coveragePerBox: 1.44,
        image: 'https://totaltiles.co.uk/media/wysiwyg/marble-bathroom-tiles-resized_2_.jpg',
        rating: 5.0,
        reviewCount: 38,
      },
      quantityBoxes: 2,
    },
  ]);

  // Sample book state (up to 3 free cut samples)
  const [samples, setSamples] = useState<Product[]>([]);

  // Modals & Drawers state
  const [sampleDrawerOpen, setSampleDrawerOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [tradeModalOpen, setTradeModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'register'>('signin');
  const [contactModalOpen, setContactModalOpen] = useState(false);

  // Category filter state
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Floating notification toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantityBoxes: number = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantityBoxes: item.quantityBoxes + quantityBoxes }
            : item
        );
      }
      return [...prevCart, { product, quantityBoxes }];
    });
    showToast(`Added ${quantityBoxes} box(es) of ${product.name} to Trolley`);
  };

  const handleUpdateCartQty = (productId: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
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

  // Sample book operations
  const handleAddSample = (product: Product) => {
    if (samples.some((s) => s.id === product.id)) {
      showToast('Tile already in your sample book');
      return;
    }
    if (samples.length >= 3) {
      showToast('Sample book is full (3 maximum). Open sample book to review.');
      setSampleDrawerOpen(true);
      return;
    }
    setSamples((prev) => [...prev, product]);
    showToast(`Free sample added: ${product.name} (${samples.length + 1}/3)`);
  };

  const handleRemoveSample = (productId: string) => {
    setSamples((prev) => prev.filter((s) => s.id !== productId));
  };

  const handleClearSamples = () => {
    setSamples([]);
  };

  // Computations
  const cartCount = cart.reduce((sum, item) => sum + item.quantityBoxes, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.boxPrice * item.quantityBoxes,
    0
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 1. Mint announcement banner */}
      <AnnouncementBanner />

      {/* 2. Official Header */}
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

      {/* 3. Hero Carousel Banner */}
      <HeroSlider />

      {/* 4. USP Selling Bar */}
      <UspBar />

      {/* 5. Dual Promo Banners */}
      <PromoBanners
        onOpenSamples={() => setSampleDrawerOpen(true)}
        onOpenTrade={() => setTradeModalOpen(true)}
      />

      {/* 6. Steve Category Grid */}
      <CategoryGrid
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('products');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 7. Product Showcase & Tile Calculator */}
      <ProductShowcase
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onAddSample={handleAddSample}
        onAddToCart={handleAddToCart}
        sampleIds={samples.map((s) => s.id)}
      />

      {/* 8. Inspiration from Real Homes */}
      <InspirationGallery />

      {/* 9. Feature 2-Column Banners */}
      <FeatureBanners
        onOpenHelp={() => setContactModalOpen(true)}
        onOpenDelivery={() => {
          const el = document.getElementById('seo-guide');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 10. Reviews.co.uk 4.87 Rating Carousel */}
      <ReviewsSection />

      {/* 11. Collapsible SEO Knowledge Guide */}
      <SeoContent />

      {/* 12. Newsletter Signup Bar */}
      <Newsletter />

      {/* 13. Official Footer */}
      <Footer
        onOpenContact={() => setContactModalOpen(true)}
        onOpenDelivery={() => {
          const el = document.getElementById('seo-guide');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Floating Sticky "Free Cut Samples" Button */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setSampleDrawerOpen(true)}
          className="bg-[#193d6b] hover:bg-[#102e54] text-white px-4 py-3 rounded-full shadow-2xl flex items-center gap-2.5 border-2 border-white transition-all transform hover:scale-105 group"
          aria-label="Open Free Sample Book"
        >
          <div className="relative">
            <Package size={20} className="text-[#01acf1] group-hover:rotate-12 transition-transform" />
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

      <TradeModal
        isOpen={tradeModalOpen}
        onClose={() => setTradeModalOpen(false)}
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
