'use client';

import { useState, FormEvent } from 'react';
import { X, Trash2, CheckCircle, Package, ArrowRight, ShieldCheck } from 'lucide-react';
import { Product } from './ProductShowcase';

interface SampleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  samples: Product[];
  onRemoveSample: (id: string) => void;
  onClearSamples: () => void;
}

export default function SampleDrawer({
  isOpen,
  onClose,
  samples,
  onRemoveSample,
  onClearSamples,
}: SampleDrawerProps) {
  const [ordered, setOrdered] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    postcode: '',
  });

  const slots = [0, 1, 2];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (samples.length === 0) return;
    setOrdered(true);
    setTimeout(() => {
      onClearSamples();
      setOrdered(false);
      onClose();
    }, 3500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto">
        {/* Header */}
        <div className="p-5 bg-[#193d6b] text-white flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <Package size={20} className="text-[#01acf1]" />
            <div>
              <h3 className="font-extrabold text-base leading-tight">Your Sample Book</h3>
              <p className="text-[11px] text-gray-300">
                Up to 3 free cut samples delivered with free postage
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
          {ordered ? (
            <div className="py-12 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 animate-bounce">
                <CheckCircle size={36} />
              </div>
              <h4 className="text-xl font-extrabold text-[#193d6b]">
                Sample Order Confirmed!
              </h4>
              <p className="text-xs text-gray-600 mt-2 max-w-xs leading-relaxed">
                Thank you, <strong>{formData.firstName}</strong>. Your free cut samples have been scheduled for next-day dispatch to <strong>{formData.postcode}</strong>.
              </p>
              <div className="mt-6 p-3 bg-gray-50 border rounded-lg text-xs text-gray-500">
                Tracking confirmation has been sent to {formData.email}
              </div>
            </div>
          ) : (
            <div>
              {/* 3 Sample Slots */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-bold text-gray-700 mb-2.5">
                  <span>Selected Samples ({samples.length}/3)</span>
                  <span className="text-emerald-600">Free 1st Class Postage</span>
                </div>

                <div className="space-y-3">
                  {slots.map((index) => {
                    const sample = samples[index];
                    return (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border-2 flex items-center gap-3 transition-all ${
                          sample
                            ? 'border-sky-300 bg-sky-50/40'
                            : 'border-dashed border-gray-200 bg-gray-50/60'
                        }`}
                      >
                        {sample ? (
                          <>
                            <img
                              src={sample.image}
                              alt={sample.name}
                              className="w-12 h-12 rounded object-cover border border-gray-200"
                            />
                            <div className="flex-1 min-w-0">
                              <h5 className="font-bold text-xs text-[#193d6b] truncate">
                                {sample.name}
                              </h5>
                              <p className="text-[11px] text-gray-500">
                                Cut Sample • 100x100mm approx
                              </p>
                            </div>
                            <button
                              onClick={() => onRemoveSample(sample.id)}
                              className="text-gray-400 hover:text-rose-500 p-1"
                              title="Remove sample"
                            >
                              <Trash2 size={16} />
                            </button>
                          </>
                        ) : (
                          <div className="flex items-center justify-center w-full py-2 text-xs text-gray-400 font-medium">
                            + Slot {index + 1} Empty (Browse tiles to add)
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Free Checkout Form */}
              {samples.length > 0 && (
                <form onSubmit={handleSubmit} className="space-y-3 pt-4 border-t border-gray-200">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#193d6b]">
                    Delivery Address (Free Postage)
                  </h4>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-gray-600 block mb-0.5">
                        First Name*
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs border rounded outline-none focus:border-[#01acf1]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-gray-600 block mb-0.5">
                        Last Name*
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs border rounded outline-none focus:border-[#01acf1]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-gray-600 block mb-0.5">
                      Email Address*
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs border rounded outline-none focus:border-[#01acf1]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-gray-600 block mb-0.5">
                      Phone Number*
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs border rounded outline-none focus:border-[#01acf1]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-gray-600 block mb-0.5">
                      Street Address*
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs border rounded outline-none focus:border-[#01acf1]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-gray-600 block mb-0.5">
                      Postcode (UK)*
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. SW1A 1AA"
                      value={formData.postcode}
                      onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs border rounded outline-none focus:border-[#01acf1]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 bg-[#11c667] hover:bg-[#0ea856] text-white py-2.5 rounded font-extrabold text-xs shadow-md transition-colors flex items-center justify-center gap-2 uppercase tracking-wider"
                  >
                    <span>Order Your Free Cut Samples</span>
                    <ArrowRight size={15} />
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
