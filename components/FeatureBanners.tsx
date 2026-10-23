'use client';

interface FeatureBannersProps {
  onOpenHelp: () => void;
  onOpenDelivery: () => void;
}

export default function FeatureBanners({
  onOpenHelp,
  onOpenDelivery,
}: FeatureBannersProps) {
  return (
    <section className="py-8 bg-white" id="features">
      <div className="container-tt">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Help Centre */}
          <div
            onClick={onOpenHelp}
            className="cursor-pointer group relative overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 bg-[#193d6b]"
          >
            <img
              src="https://totaltiles.co.uk/media/wysiwyg/totaltiles/banners/help_centre_banner_2.png"
              alt="Help Centre - Customer Support, FAQs & Project Planning"
              width={525}
              height={218}
              className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
              loading="lazy"
            />
          </div>

          {/* Fast Delivery */}
          <div
            onClick={onOpenDelivery}
            className="cursor-pointer group relative overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 bg-[#01acf1]"
          >
            <img
              src="https://totaltiles.co.uk/media/wysiwyg/totaltiles/banners/fast_delivery_banner_2pm.png"
              alt="Fast Delivery - Order before 2pm for Express Next Day Delivery"
              width={525}
              height={218}
              className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
