'use client';

import { useState } from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Product } from './ProductShowcase';

export interface CartItem {
  product: Product;
  quantityBoxes: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.boxPrice * item.quantityBoxes,
    0
  );

  const totalCoverage = items.reduce(
    (sum, item) => sum + item.product.coveragePerBox * item.quantityBoxes,
    0
  );

  const deliveryCost = subtotal > 350 ? 0 : subtotal > 0 ? 35 : 0;
  const grandTotal = subtotal + deliveryCost;

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    setTimeout(() => {
      onClearCart();
      setCheckoutSuccess(false);
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto">
        {/* Header */}
        <div className="p-4 bg-[#193d6b] text-white flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-[#01acf1]" />
            <div>
              <h3 className="font-extrabold text-base leading-tight">Your Trolley</h3>
              <p className="text-[11px] text-gray-300">
                {items.length} {items.length === 1 ? 'item' : 'items'} • Fast UK Pallet Delivery
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-full transition-colors text-white"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex-1">
          {checkoutSuccess ? (
            <div className="py-16 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <CheckCircle2 size={36} />
              </div>
              <h4 className="text-xl font-extrabold text-[#193d6b]">
                Thank you for your order!
              </h4>
              <p className="text-xs text-gray-600 mt-2 max-w-xs leading-relaxed">
                Order confirmation #TT-{Math.floor(100000 + Math.random() * 900000)} has been generated. Our dispatch team will contact you to confirm pallet delivery date.
              </p>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mb-3">
                <ShoppingBag size={28} />
              </div>
              <h4 className="font-extrabold text-base text-[#193d6b]">
                Your trolley is empty
              </h4>
              <p className="text-xs text-gray-500 mt-1 max-w-xs">
                Browse our wall and floor tile ranges to add boxes or free cut samples.
              </p>
              <button
                onClick={onClose}
                className="mt-5 px-5 py-2 rounded bg-[#01acf1] text-white font-bold text-xs shadow hover:bg-[#0093cf] transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Items List */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-3 border rounded-lg flex items-center gap-3 bg-white shadow-sm"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-14 h-14 rounded object-cover border shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-bold text-xs text-[#193d6b] truncate">
                        {item.product.name}
                      </h5>
                      <div className="text-[11px] text-gray-500 mt-0.5">
                        £{item.product.m2Price.toFixed(2)}/m² • £{item.product.boxPrice.toFixed(2)}/box
                      </div>

                      {/* Qty Controls */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border rounded">
                          <button
                            onClick={() => onUpdateQty(item.product.id, -1)}
                            className="p-1 hover:bg-gray-100 text-gray-600"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-[#193d6b]">
                            {item.quantityBoxes} {item.quantityBoxes === 1 ? 'box' : 'boxes'}
                          </span>
                          <button
                            onClick={() => onUpdateQty(item.product.id, 1)}
                            className="p-1 hover:bg-gray-100 text-gray-600"
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <div className="text-xs font-extrabold text-[#193d6b]">
                          £{(item.product.boxPrice * item.quantityBoxes).toFixed(2)}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-gray-400 hover:text-rose-500 p-1 self-start"
                      title="Remove item"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Free Delivery Banner */}
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800">
                {subtotal >= 350 ? (
                  <span className="font-bold">✓ Congratulations! You qualify for FREE Delivery</span>
                ) : (
                  <span>
                    Add <strong>£{(350 - subtotal).toFixed(2)}</strong> more to qualify for <strong>FREE Delivery</strong>
                  </span>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="pt-3 border-t border-gray-200 space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalCoverage.toFixed(2)} m²)</span>
                  <span className="font-bold text-[#193d6b]">£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Estimated Delivery</span>
                  <span>{deliveryCost === 0 ? <strong className="text-emerald-600">FREE</strong> : `£${deliveryCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-[11px]">
                  <span>VAT (included at 20%)</span>
                  <span>£{(grandTotal * 0.2).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-[#193d6b] pt-2 border-t">
                  <span>Total Due</span>
                  <span>£{grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="pt-2">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block text-center mb-1.5 font-bold">
                  Guaranteed Safe &amp; Secure Checkout
                </span>
                <div className="flex justify-center gap-2">
                  <img src="https://totaltiles.co.uk/static/version1792583249/frontend/Smartwave/porto_child/en_GB/Iweb_PaymentIcons/images/payment-icons/mastercard.svg" alt="Mastercard" className="h-5" />
                  <img src="https://totaltiles.co.uk/static/version1792583249/frontend/Smartwave/porto_child/en_GB/Iweb_PaymentIcons/images/payment-icons/visa.svg" alt="Visa" className="h-5" />
                  <img src="https://totaltiles.co.uk/static/version1792583249/frontend/Smartwave/porto_child/en_GB/Iweb_PaymentIcons/images/payment-icons/paypal.svg" alt="PayPal" className="h-5" />
                  <img src="https://totaltiles.co.uk/static/version1792583249/frontend/Smartwave/porto_child/en_GB/Iweb_PaymentIcons/images/payment-icons/applepay.svg" alt="Apple Pay" className="h-5" />
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-[#01acf1] hover:bg-[#0093cf] text-white py-3 rounded-lg font-extrabold text-sm shadow-md transition-colors flex items-center justify-center gap-2 uppercase tracking-wider mt-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
