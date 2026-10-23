'use client';

import { useState, FormEvent } from 'react';
import { X, CheckCircle2, User, Lock, Mail } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  mode: 'signin' | 'register';
  onClose: () => void;
  onSwitchMode: (mode: 'signin' | 'register') => void;
}

export default function AuthModal({
  isOpen,
  mode,
  onClose,
  onSwitchMode,
}: AuthModalProps) {
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-2xl relative text-[#262626]">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-700 p-1"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {success ? (
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-lg font-extrabold text-[#193d6b]">
              {mode === 'signin' ? 'Welcome back!' : 'Account Created!'}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              You are now logged in as <strong>{email}</strong>
            </p>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-black text-[#193d6b]">
              {mode === 'signin' ? 'Sign In to Total Tiles' : 'Create an Account'}
            </h3>
            <p className="text-xs text-gray-500 mt-1 mb-5">
              {mode === 'signin'
                ? 'Access your orders, saved sample books and delivery updates.'
                : 'Save delivery addresses, track sample orders & enjoy faster checkout.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {mode === 'register' && (
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-3 py-2 text-xs border rounded-md outline-none focus:border-[#01acf1]"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Email Address*
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-3 py-2 text-xs border rounded-md outline-none focus:border-[#01acf1]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Password*
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 text-xs border rounded-md outline-none focus:border-[#01acf1]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#01acf1] hover:bg-[#0093cf] text-white py-2.5 rounded-md font-bold text-xs uppercase tracking-wider shadow transition-colors mt-2"
              >
                {mode === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-gray-100 text-center text-xs text-gray-600">
              {mode === 'signin' ? (
                <span>
                  Don&apos;t have an account?{' '}
                  <button
                    onClick={() => onSwitchMode('register')}
                    className="font-bold text-[#01acf1] hover:underline"
                  >
                    Create an Account
                  </button>
                </span>
              ) : (
                <span>
                  Already registered?{' '}
                  <button
                    onClick={() => onSwitchMode('signin')}
                    className="font-bold text-[#01acf1] hover:underline"
                  >
                    Sign In
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
