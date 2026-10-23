'use client';

import { useState, FormEvent } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="bg-[#f0f1f2] py-8 border-t border-gray-200">
      <div className="container-tt">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Text Left */}
          <div className="text-center lg:text-left max-w-xl">
            <h3 className="text-lg font-extrabold text-[#193d6b] flex items-center justify-center lg:justify-start gap-2">
              <Mail size={20} className="text-[#01acf1]" />
              <span>Newsletter Sign Up</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Be the first to know about exclusive discounts, clearance pallet deals, new range arrivals, and interior design inspiration.
            </p>
          </div>

          {/* Form Right */}
          <div className="w-full lg:max-w-md">
            {submitted ? (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-md text-xs font-semibold justify-center">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span>Thank you! You are now subscribed to Total Tiles offers.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="flex-1 px-4 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-md outline-none focus:border-[#01acf1] bg-white shadow-inner"
                />
                <button
                  type="submit"
                  className="bg-[#01acf1] hover:bg-[#193d6b] text-white px-5 py-2.5 rounded-md font-bold text-xs sm:text-sm transition-colors shrink-0 shadow"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
