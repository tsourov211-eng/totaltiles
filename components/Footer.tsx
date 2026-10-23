'use client';

import {
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  PinIcon as Pinterest,
} from 'lucide-react';

interface FooterProps {
  onOpenContact: () => void;
  onOpenDelivery: () => void;
}

export default function Footer({ onOpenContact, onOpenDelivery }: FooterProps) {
  return (
    <footer className="bg-[#193d6b] text-white">
      {/* Footer Top Ribbon */}
      <div className="bg-[#122e50] border-b border-[#2b5387] py-3 text-center">
        <span className="text-xs uppercase font-extrabold tracking-widest text-[#01acf1]">
          Boutique Tiles, Online Prices
        </span>
      </div>

      {/* Main Footer Links */}
      <div className="container-tt py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Contact Information */}
          <div>
            <h4 className="text-sm font-extrabold tracking-wider uppercase text-white pb-2 border-b border-[#2e5485] mb-4">
              Contact Information
            </h4>
            <ul className="space-y-3 text-xs text-[#b8cadd]">
              <li className="flex items-start gap-2.5">
                <Phone size={16} className="text-[#01acf1] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-white">Call Sales &amp; Support:</span>
                  <a href="tel:0000000000" className="text-base font-extrabold text-white hover:text-[#01acf1] transition-colors">
                    00000 000000
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={16} className="text-[#01acf1] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-white">Email Enquiries:</span>
                  <a href="mailto:support@example.com" className="hover:text-white transition-colors">
                    support@example.com
                  </a>
                </div>
              </li>
              <li className="pt-2">
                <p className="text-[11px] text-gray-300 leading-relaxed">
                  Total Tiles UK – Leading online supplier of luxury bathroom tiles, porcelain floor tiles, metro wall tiles and outdoor paving slabs.
                </p>
              </li>
            </ul>
          </div>

          {/* Column 2: Phone Hours & Payments */}
          <div>
            <h4 className="text-sm font-extrabold tracking-wider uppercase text-white pb-2 border-b border-[#2e5485] mb-4">
              Phone Hours
            </h4>
            <div className="text-xs text-[#b8cadd] space-y-1.5 mb-5">
              <div className="flex justify-between py-1 border-b border-[#244773]">
                <span className="font-semibold text-white">Monday – Friday:</span>
                <span>8:00 AM – 5:00 PM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#244773]">
                <span className="font-semibold text-white">Saturday &amp; Sunday:</span>
                <span className="text-gray-400">Closed</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-semibold text-white">Bank Holidays:</span>
                <span className="text-gray-400">Closed</span>
              </div>
            </div>

            <h5 className="text-xs font-extrabold tracking-wider uppercase text-white mb-2.5">
              Shop With Confidence:
            </h5>
            <div className="flex items-center gap-2 bg-[#122e50] p-2.5 rounded border border-[#2b5387]">
              <img
                src="https://totaltiles.co.uk/static/version1792583249/frontend/Smartwave/porto_child/en_GB/Iweb_PaymentIcons/images/payment-icons/mastercard.svg"
                alt="Mastercard"
                className="h-5 w-auto"
              />
              <img
                src="https://totaltiles.co.uk/static/version1792583249/frontend/Smartwave/porto_child/en_GB/Iweb_PaymentIcons/images/payment-icons/visa.svg"
                alt="Visa"
                className="h-5 w-auto"
              />
              <img
                src="https://totaltiles.co.uk/static/version1792583249/frontend/Smartwave/porto_child/en_GB/Iweb_PaymentIcons/images/payment-icons/paypal.svg"
                alt="PayPal"
                className="h-5 w-auto"
              />
              <img
                src="https://totaltiles.co.uk/static/version1792583249/frontend/Smartwave/porto_child/en_GB/Iweb_PaymentIcons/images/payment-icons/applepay.svg"
                alt="Apple Pay"
                className="h-5 w-auto"
              />
              <img
                src="https://totaltiles.co.uk/static/version1792583249/frontend/Smartwave/porto_child/en_GB/Iweb_PaymentIcons/images/payment-icons/googlepay.svg"
                alt="Google Pay"
                className="h-5 w-auto"
              />
            </div>
          </div>

          {/* Column 3: Customer Service */}
          <div>
            <h4 className="text-sm font-extrabold tracking-wider uppercase text-white pb-2 border-b border-[#2e5485] mb-4">
              Customer Service
            </h4>
            <ul className="space-y-2 text-xs text-[#b8cadd]">
              <li>
                <button onClick={onOpenContact} className="hover:text-white transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <a href="#seo-guide" className="hover:text-white transition-colors">
                  30-Day Money Back Guarantee
                </a>
              </li>
              <li>
                <a href="#seo-guide" className="hover:text-white transition-colors">
                  Price Promise
                </a>
              </li>
              <li>
                <a href="#samples" className="hover:text-white transition-colors">
                  Sample Service
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Customer Reviews
                </a>
              </li>
              <li>
                <button onClick={onOpenDelivery} className="hover:text-white transition-colors">
                  Damages &amp; Delivery Help
                </button>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-white transition-colors">
                  Cancellations
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Information */}
          <div>
            <h4 className="text-sm font-extrabold tracking-wider uppercase text-white pb-2 border-b border-[#2e5485] mb-4">
              Information
            </h4>
            <ul className="space-y-2 text-xs text-[#b8cadd]">
              <li>
                <a href="#seo-guide" className="hover:text-white transition-colors">
                  About Total Tiles
                </a>
              </li>
              <li>
                <button onClick={onOpenDelivery} className="hover:text-white transition-colors">
                  Delivery Information
                </button>
              </li>
              <li>
                <a href="#seo-guide" className="hover:text-white transition-colors">
                  Tiling Guides &amp; Instructions
                </a>
              </li>
              <li>
                <a href="#seo-guide" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#seo-guide" className="hover:text-white transition-colors">
                  Terms &amp; Conditions
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Service Status
                </a>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="mt-5 pt-4 border-t border-[#2e5485]">
              <span className="block text-[11px] font-bold text-gray-300 mb-2 uppercase tracking-wider">
                Follow Total Tiles
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="https://facebook.com/totaltiles"
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 rounded bg-[#2b5387] hover:bg-[#01acf1] flex items-center justify-center text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={14} />
                </a>
                <a
                  href="https://instagram.com/total_tiles"
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 rounded bg-[#2b5387] hover:bg-[#01acf1] flex items-center justify-center text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={14} />
                </a>
                <a
                  href="https://linkedin.com/company/total-tiles"
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 rounded bg-[#2b5387] hover:bg-[#01acf1] flex items-center justify-center text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={14} />
                </a>
                <a
                  href="https://twitter.com/totaltiles"
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 rounded bg-[#2b5387] hover:bg-[#01acf1] flex items-center justify-center text-white transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={14} />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 rounded bg-[#2b5387] hover:bg-[#01acf1] flex items-center justify-center text-white transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="bg-[#122e50] border-t border-[#244773] py-4 text-xs text-[#aebfd2]">
        <div className="container-tt flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <span>© TotalTiles.co.uk 2026. All Rights Reserved.</span>
          <div className="flex items-center gap-4 text-[11px]">
            <span>VAT No: GB 000 0000 00</span>
            <span>•</span>
            <span>Company Reg: 00000000</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
