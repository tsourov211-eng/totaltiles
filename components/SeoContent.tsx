'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function SeoContent() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="hidden md:block py-10 bg-white" id="seo-guide">
      <div className="container-tt max-w-5xl">
        <div className="text-xs sm:text-sm text-gray-600 leading-relaxed space-y-4">
          <p>
            At <strong>Total Tiles</strong>, we understand that the tiles you choose are a vital finishing touch for any home improvement project. That’s why our selection of tiles are carefully curated to combine luxury, complimentary style with affordability and durability for busy households. Realise your dream home with everything you should need from water resistant <a href="#categories" className="text-[#01acf1] font-semibold hover:underline">bathroom tiles</a> to <a href="#products" className="text-[#01acf1] font-semibold hover:underline">coordinating wall and floor tiles</a> to on-trend <a href="#products" className="text-[#01acf1] font-semibold hover:underline">concrete &amp; marble effect tiles</a>. Complete the final effect with your choice of colours in tile grout, standard or rapid tile adhesive, or add a touch of luxury with <a href="#seo-guide" className="text-[#01acf1] font-semibold hover:underline">underfloor heating</a>. Total Tiles offers our customers a free next day postage and packaging tile sample service to give you total confidence in quality and design!
          </p>

          {expanded && (
            <div className="space-y-4 pt-2 border-t border-gray-100 animate-in fade-in duration-300">
              <div>
                <h3 className="text-base font-bold text-[#193d6b] mb-1">Floor Tiles</h3>
                <p>
                  Shop floor tiles with Total Tiles and you’re offered the finest designer patterns and highest quality tiles in a selection of materials, textures and colours. Choose from porcelain floor tiles, ceramic floor tiles and even wood-effect floor tiles to perfectly compliment your unique style. To make your shopping experience as seamless as possible, you can shop floor tiles on price per meter squared to keep to that all important budget, or filter by colour palette to match your room or make a bold statement! Whether you’re looking for kitchen floor tiles, bathroom floor tiles, or hallway floor tiles, our range includes the latest trends like Victorian patterned tiles and slate effect tiles at truly affordable prices.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#193d6b] mb-1">Wall Tiles</h3>
                <p>
                  From clean, simple white wall tiles to modern, sleek grey wall tiles, you’ll find the perfect match to your design with Total Tiles’ all-encompassing range. Total Tiles is pleased to offer you choices like white metro tiles from as little as £10 per square meter alongside other favourite picks such as textured, relief wall tiles and matching mosaic wall &amp; floor tiles for an expression of luxury that doesn’t blow the budget.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#193d6b] mb-1">Bathroom Tiles</h3>
                <p>
                  When choosing bathroom tiles, it’s common to match your wall tiles and floor tiles, not only to give a luxurious, spa-like feel but to blur the dimensions of the room and make it look larger. We have curated our range of matching bathroom tiles for wall and floor to make your selection seamless. Your style could be relaxing using soft beige stone effect bathroom tiles or simple but luxurious by choosing marble effect bathroom tiles.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#193d6b] mb-1">Underfloor Heating</h3>
                <p>
                  Underfloor heating is the ultimate luxury that you should consider when you’re retiling a room as it’s the perfect time to add underfloor heating quickly and easily with little fuss. Whether you’re upgrading your kitchen floor, bathroom floor or even your conservatory floor, underfloor heating lets you choose the perfect temperature, so you don’t need to walk across cold tiles! Total Tiles offers 150W and 200W underfloor heating mats for rooms with standard dimensions, loose cables, and smart touchscreen thermostats with lifetime manufacturer guarantees.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#193d6b] mb-1">Tile Adhesive &amp; Tile Grout</h3>
                <p>
                  Total Tiles is proud to offer the full range of adhesives, grouting and preparation products you’ll need to fix your new tiles with confidence. If you’re tackling a DIY project or supplying products for your tradesperson, Total Tiles offers only the best in professional Larsen tile adhesive and flexible grout.
                </p>
              </div>
            </div>
          )}

          {/* Read More Trigger */}
          <div className="pt-2 text-right">
            <button
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 border-2 border-[#01acf1] text-[#01acf1] hover:bg-[#01acf1] hover:text-white rounded-md font-bold text-xs transition-colors"
            >
              <span>{expanded ? 'Read less' : 'Read more'}</span>
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
