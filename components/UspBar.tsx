'use client';

import { Award, Headset, BadgePercent, Truck, PackageCheck } from 'lucide-react';

const usps = [
  {
    icon: Award,
    title: 'Price Promise',
    subtitle: 'Guaranteed to be cheapest',
    href: '#seo-guide',
  },
  {
    icon: Headset,
    title: 'Expert Advice',
    subtitle: 'Call 00000 000000',
    href: 'tel:0000000000',
  },
  {
    icon: BadgePercent,
    title: 'Affordable Style',
    subtitle: 'All prices include VAT',
    href: '#products',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    subtitle: 'Order before 2PM for Next Day',
    href: '#features',
  },
  {
    icon: PackageCheck,
    title: 'Free Cut Samples',
    subtitle: 'Including Free Postage',
    href: '#samples',
  },
];

export default function UspBar() {
  return (
    <section className="hidden md:block bg-[#f4f5f7] border-b border-[#e2e7ec] py-3.5 shadow-inner">
      <div className="container-tt">
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-4 divide-x divide-gray-200">
          {usps.map((usp, index) => {
            const Icon = usp.icon;
            return (
              <a
                key={index}
                href={usp.href}
                className="flex items-center gap-3 py-1.5 sm:px-3 hover:translate-x-0.5 transition-transform group"
              >
                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#01acf1] group-hover:bg-[#01acf1] group-hover:text-white transition-colors shadow-sm shrink-0">
                  <Icon size={19} />
                </div>
                <div className="leading-tight">
                  <h4 className="text-xs font-extrabold text-[#193d6b] group-hover:text-[#01acf1] transition-colors">
                    {usp.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 font-medium">
                    {usp.subtitle}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
