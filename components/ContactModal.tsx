'use client';

import { useState, FormEvent } from 'react';
import { X, Phone, Mail, Clock, CheckCircle2, MessageSquare } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Tile Advice & Area Calculation',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
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
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-xl font-extrabold text-[#193d6b]">
              Message Received!
            </h3>
            <p className="text-xs text-gray-600 mt-1 max-w-xs">
              A Total Tiles customer specialist will respond to {formData.email} shortly.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare size={22} className="text-[#01acf1]" />
              <h3 className="text-xl font-black text-[#193d6b]">
                Contact Total Tiles
              </h3>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Need tile advice, quantity calculations or sample queries? We’re here to help.
            </p>

            {/* Quick Contact Bar */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <a
                href="tel:0000000000"
                className="p-3 bg-sky-50 hover:bg-sky-100 rounded-lg border border-sky-100 transition-colors flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-full bg-[#01acf1] text-white flex items-center justify-center shrink-0">
                  <Phone size={15} />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold text-gray-500 block">
                    Phone Support
                  </span>
                  <strong className="text-xs text-[#193d6b] truncate block">
                    00000 000000
                  </strong>
                </div>
              </a>

              <a
                href="mailto:support@example.com"
                className="p-3 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-100 transition-colors flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-full bg-[#11c667] text-white flex items-center justify-center shrink-0">
                  <Mail size={15} />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold text-gray-500 block">
                    Email Team
                  </span>
                  <strong className="text-xs text-[#193d6b] truncate block">
                    support@example.com
                  </strong>
                </div>
              </a>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Your Name*
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs border rounded-md outline-none focus:border-[#01acf1]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs border rounded-md outline-none focus:border-[#01acf1]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Topic*
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-md outline-none focus:border-[#01acf1] bg-white"
                >
                  <option>Tile Advice &amp; Area Calculation</option>
                  <option>Free Cut Sample Queries</option>
                  <option>Pallet Delivery Schedule &amp; Access</option>
                  <option>Trade Account &amp; Bulk Pricing</option>
                  <option>Other Enquiries</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Message*
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can our tile experts help you today?"
                  className="w-full px-3 py-2 text-xs border rounded-md outline-none focus:border-[#01acf1]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#193d6b] hover:bg-[#102e54] text-white py-2.5 rounded-md font-bold text-xs uppercase tracking-wider shadow transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
