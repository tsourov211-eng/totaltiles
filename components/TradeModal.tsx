'use client';

import { useState, FormEvent } from 'react';
import { X, CheckCircle2, ShieldCheck, Briefcase } from 'lucide-react';

interface TradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TradeModal({ isOpen, onClose }: TradeModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    tradeType: 'Tiler / Fitting Specialist',
    contactName: '',
    email: '',
    phone: '',
    vatNumber: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl relative text-[#262626]">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-700 p-1"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="py-10 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-xl font-extrabold text-[#193d6b]">
              Trade Application Submitted!
            </h3>
            <p className="text-xs text-gray-600 mt-2 max-w-sm leading-relaxed">
              Thank you, <strong>{formData.contactName}</strong>. Our dedicated B2B trade account team will verify your business details and contact you within 24 business hours with your exclusive trade discount rates.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Briefcase size={22} className="text-[#01acf1]" />
              <h3 className="text-xl font-extrabold text-[#193d6b]">
                Total Tiles Trade Account
              </h3>
            </div>
            <p className="text-xs text-gray-500 mb-5">
              Unlock tiered volume discounts, dedicated account managers, and priority pallet dispatch.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Business / Company Name*
                </label>
                <input
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="e.g. Premier Tiling Solutions Ltd"
                  className="w-full px-3 py-2 text-xs border rounded-md outline-none focus:border-[#01acf1]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Trade Profession*
                  </label>
                  <select
                    value={formData.tradeType}
                    onChange={(e) => setFormData({ ...formData, tradeType: e.target.value })}
                    className="w-full px-3 py-2 text-xs border rounded-md outline-none focus:border-[#01acf1] bg-white"
                  >
                    <option>Tiler / Fitting Specialist</option>
                    <option>Builder / Contractor</option>
                    <option>Architect / Interior Designer</option>
                    <option>Property Developer</option>
                    <option>Bathroom Installer</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Contact Name*
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full px-3 py-2 text-xs border rounded-md outline-none focus:border-[#01acf1]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Business Email*
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs border rounded-md outline-none focus:border-[#01acf1]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs border rounded-md outline-none focus:border-[#01acf1]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  VAT Registration / Companies House No. (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. GB 123 4567 89"
                  value={formData.vatNumber}
                  onChange={(e) => setFormData({ ...formData, vatNumber: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-md outline-none focus:border-[#01acf1]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#193d6b] hover:bg-[#102e54] text-white py-2.5 rounded-md font-bold text-xs uppercase tracking-wider shadow transition-colors mt-2"
              >
                Submit Trade Application
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
