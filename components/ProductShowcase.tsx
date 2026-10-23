'use client';

import { useState } from 'react';
import {
  Star,
  Check,
  Plus,
  ShoppingBag,
  Calculator,
  Layers,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  category: string;
  size: string;
  finish: string;
  m2Price: number;
  boxPrice: number;
  coveragePerBox: number;
  image: string;
  rating: number;
  reviewCount: number;
  badge?: string;
  popular?: boolean;
}

const products: Product[] = [
  {
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
    badge: 'Best Seller',
    popular: true,
  },
  {
    id: 'tt-2',
    name: 'Devonshire Natural Oak Wood Effect Porcelain Plank',
    category: 'Wood Effect',
    size: '200x1200mm',
    finish: 'Matt Textured Timber',
    m2Price: 18.90,
    boxPrice: 27.22,
    coveragePerBox: 1.44,
    image: 'https://totaltiles.co.uk/media/wysiwyg/Wood-Effect-Floor-Tiles.jpg',
    rating: 4.9,
    reviewCount: 54,
    badge: 'Trending Style',
    popular: true,
  },
  {
    id: 'tt-3',
    name: 'Modena Anthracite 20mm Outdoor Porcelain Paver',
    category: 'Outdoor 20mm',
    size: '600x900mm',
    finish: 'R11 Anti-Slip Structured',
    m2Price: 26.95,
    boxPrice: 29.11,
    coveragePerBox: 1.08,
    image: 'https://totaltiles.co.uk/media/wysiwyg/totaltiles/hpcat/outdoor_tiles_banner.png',
    rating: 5.0,
    reviewCount: 29,
    badge: '20mm Extra Thick',
    popular: true,
  },
  {
    id: 'tt-4',
    name: 'Metro White Bevelled Edge Ceramic Wall Tile',
    category: 'Wall',
    size: '100x200mm',
    finish: 'Gloss Glazed Finish',
    m2Price: 10.95,
    boxPrice: 10.95,
    coveragePerBox: 1.0,
    image: 'https://totaltiles.co.uk/media/wysiwyg/white-bathroom-tiles-resized.jpg',
    rating: 4.9,
    reviewCount: 89,
    badge: 'Under £11/m²',
    popular: true,
  },
  {
    id: 'tt-5',
    name: 'Kendal Grey Slate Effect Porcelain Tile',
    category: 'Floor',
    size: '300x600mm',
    finish: 'Matt R10 Slip Resistant',
    m2Price: 14.95,
    boxPrice: 21.53,
    coveragePerBox: 1.44,
    image: 'https://totaltiles.co.uk/media/wysiwyg/porcelain-bathroom-tiles-resized.jpg',
    rating: 4.8,
    reviewCount: 31,
    badge: 'Popular',
    popular: false,
  },
  {
    id: 'tt-6',
    name: 'Venero Statuario Bianco Matt Porcelain',
    category: 'Bathroom',
    size: '600x1200mm',
    finish: 'Honed Smooth Matt',
    m2Price: 22.50,
    boxPrice: 32.40,
    coveragePerBox: 1.44,
    image: 'https://totaltiles.co.uk/media/wysiwyg/gloss-bathroom-tiles-resized.jpg',
    rating: 5.0,
    reviewCount: 19,
    badge: 'New Range',
    popular: true,
  },
  {
    id: 'tt-7',
    name: 'Sherwood Forest Smoked Walnut Wood Effect Tile',
    category: 'Wood Effect',
    size: '150x900mm',
    finish: 'Natural Wood Grain Texture',
    m2Price: 16.95,
    boxPrice: 22.88,
    coveragePerBox: 1.35,
    image: 'https://totaltiles.co.uk/media/wysiwyg/totaltiles/hpcat/wood_effect_tiles_banner.png',
    rating: 4.9,
    reviewCount: 42,
    badge: 'Sale Price',
    popular: false,
  },
  {
    id: 'tt-8',
    name: 'Urban Stone Ivory Matt Large Format Porcelain',
    category: 'Floor',
    size: '600x600mm',
    finish: 'Smooth Matt Surface',
    m2Price: 15.50,
    boxPrice: 22.32,
    coveragePerBox: 1.44,
    image: 'https://totaltiles.co.uk/media/wysiwyg/matt-bathroom-tiles-resized.jpg',
    rating: 4.9,
    reviewCount: 27,
    badge: 'Value Pack',
    popular: false,
  },
];

interface ProductShowcaseProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onAddSample: (product: Product) => void;
  onAddToCart: (product: Product, quantityBoxes: number) => void;
  sampleIds: string[];
}

export default function ProductShowcase({
  selectedCategory,
  onSelectCategory,
  onAddSample,
  onAddToCart,
  sampleIds,
}: ProductShowcaseProps) {
  const [calcModalProduct, setCalcModalProduct] = useState<Product | null>(null);
  const [calcLength, setCalcLength] = useState<string>('4');
  const [calcWidth, setCalcWidth] = useState<string>('3');
  const [includeWastage, setIncludeWastage] = useState<boolean>(true);

  const categories = [
    'All',
    'Marble Effect',
    'Wood Effect',
    'Bathroom',
    'Floor',
    'Outdoor 20mm',
    'Wall',
  ];

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter(
          (p) =>
            p.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
            selectedCategory.toLowerCase().includes(p.category.toLowerCase())
        );

  // Calculation for modal
  const lengthNum = parseFloat(calcLength) || 0;
  const widthNum = parseFloat(calcWidth) || 0;
  const rawArea = lengthNum * widthNum;
  const totalArea = includeWastage ? rawArea * 1.1 : rawArea;
  const boxesNeeded = calcModalProduct
    ? Math.ceil(totalArea / calcModalProduct.coveragePerBox)
    : 0;
  const estimatedCost = calcModalProduct ? boxesNeeded * calcModalProduct.boxPrice : 0;

  return (
    <section className="py-8 md:py-14 bg-[#f8fafc] border-y border-gray-200" id="products">
      <div className="container-tt">
        {/* Section Heading & Category Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-gray-200 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#193d6b] tracking-tight">
              Trending &amp; Best Selling Tiles
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Guaranteed lowest UK prices with next-day express delivery &amp; free samples.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#193d6b] text-white shadow-sm'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const hasSample = sampleIds.includes(product.id);
            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                {/* Image Area with Badge & Top-Right Calculator Button */}
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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

                {/* Details Body */}
                <div className="p-4 sm:p-4.5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Rating & Size Row */}
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

                    {/* Product Name */}
                    <h3 className="font-extrabold text-[#193d6b] text-[15px] sm:text-[15.5px] leading-snug line-clamp-2 mt-2.5 group-hover:text-[#01acf1] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 font-normal mt-1 line-clamp-1">
                      {product.finish}
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
                    <div className="text-xs text-gray-500 mt-1 font-normal">
                      £{product.boxPrice.toFixed(2)} per box ({product.coveragePerBox}m²)
                    </div>

                    {/* Action Buttons: Free Sample & Add Box */}
                    <div className="grid grid-cols-2 gap-2.5 mt-4">
                      {/* Free Sample Button (Outline style) */}
                      <button
                        onClick={() => onAddSample(product)}
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

                      {/* Add to Trolley Button (Solid cyan) */}
                      <button
                        onClick={() => onAddToCart(product, 1)}
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
      </div>

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
                Box coverage: {calcModalProduct.coveragePerBox} m² (£{calcModalProduct.boxPrice.toFixed(2)}/box)
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
                    onAddToCart(calcModalProduct, boxesNeeded);
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
    </section>
  );
}
