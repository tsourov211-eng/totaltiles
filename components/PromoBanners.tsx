'use client';

interface PromoBannersProps {
  onOpenSamples: () => void;
  onOpenTrade: () => void;
}

export default function PromoBanners({
  onOpenSamples,
  onOpenTrade,
}: PromoBannersProps) {
  return (
    <section className="hidden md:block py-6 bg-white" id="samples">
      <div className="container-tt">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Free Samples Banner */}
          <div
            onClick={onOpenSamples}
            className="cursor-pointer group relative overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 bg-[#f7f6f2]"
          >
            <img
              src="https://totaltiles.co.uk/media/wysiwyg/totaltiles/banners/free_cut_samples_banner.png"
              alt="Free cut SUPER samples - Order up to 3 cut samples delivered with free postage"
              width={535}
              height={188}
              className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>

          {/* Trade Banner */}
          <div
            onClick={onOpenTrade}
            className="cursor-pointer group relative overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 bg-[#eef3f6]"
          >
            <img
              src="https://totaltiles.co.uk/media/wysiwyg/totaltiles/banners/in_the_trade_banner_new.png"
              alt="Are you in the trade? Get in touch for exclusive discounts and trade accounts"
              width={525}
              height={188}
              className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
