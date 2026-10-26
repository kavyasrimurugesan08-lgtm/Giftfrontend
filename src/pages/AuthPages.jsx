import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Lock, Mail, User, ShieldCheck, Store } from 'lucide-react';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('CUSTOMER');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password, selectedRole);
    if (selectedRole === 'ADMIN') {
      navigate('/admin');
    } else if (selectedRole === 'WHOLESALE') {
      navigate('/wholesale');
    } else {
      navigate('/account');
    }
  };

  const handleQuickDemo = (role) => {
    setSelectedRole(role);
    if (role === 'ADMIN') {
      setEmail('admin@giftpocket.in');
    } else if (role === 'WHOLESALE') {
      setEmail('pooja@boutique.in');
    } else {
      setEmail('user@example.com');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8E8D5] pt-32 pb-20 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto px-4">
        
        <div className="bg-white/90 rounded-3xl p-8 border-2 border-[#D9A99A]/50 shadow-2xl space-y-6">
          
          <div className="text-center space-y-1">
            <Link to="/" className="inline-flex items-center gap-1.5 justify-center">
              <div className="w-7 h-7 rounded-xl bg-[#B96F58] flex items-center justify-center text-[#F8E8D5]">
                <Sparkles className="w-4 h-4 fill-current" />
              </div>
              <span className="font-editorial text-2xl font-bold text-[#332822]">GIFTPocket</span>
            </Link>
            <h2 className="font-editorial text-2xl text-[#332822]">Welcome Back</h2>
            <p className="text-xs text-[#6F5145]">Sign in to your GiftPocket account</p>
          </div>

          {/* Quick Demo Switcher */}
          <div className="p-3 bg-[#F8E8D5]/70 rounded-2xl border border-[#D9A99A]/40 text-xs">
            <span className="text-[10px] font-bold text-[#6F5145] uppercase tracking-wider block mb-2 text-center">
              ⚡ Quick 1-Click Demo Login
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => handleQuickDemo('CUSTOMER')}
                className={`py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                  selectedRole === 'CUSTOMER'
                    ? 'bg-[#B96F58] text-[#F8E8D5]'
                    : 'bg-white text-[#332822] hover:bg-[#F4D2BE]'
                }`}
              >
                Customer
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('WHOLESALE')}
                className={`py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                  selectedRole === 'WHOLESALE'
                    ? 'bg-[#B96F58] text-[#F8E8D5]'
                    : 'bg-white text-[#332822] hover:bg-[#F4D2BE]'
                }`}
              >
                Wholesale
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('ADMIN')}
                className={`py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                  selectedRole === 'ADMIN'
                    ? 'bg-[#332822] text-[#F8E8D5]'
                    : 'bg-white text-[#332822] hover:bg-[#F4D2BE]'
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-[#332822] uppercase tracking-wider block mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-[#6F5145]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-[#F8E8D5]/30 rounded-xl border border-[#D9A99A]/60 focus:outline-none focus:border-[#B96F58]"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-[#332822] uppercase tracking-wider block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-[#6F5145]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-[#F8E8D5]/30 rounded-xl border border-[#D9A99A]/60 focus:outline-none focus:border-[#B96F58]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#B96F58] hover:bg-[#332822] text-[#F8E8D5] rounded-2xl font-display font-semibold text-xs transition-all shadow-md mt-2"
            >
              Sign In as {selectedRole}
            </button>
          </form>

          <div className="text-center text-xs text-[#6F5145]">
            New to GiftPocket?{' '}
            <Link to="/register" className="font-bold text-[#B96F58] hover:underline">
              Create an Account
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('CUSTOMER');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    register({ name, email, phone, role });
    navigate('/account');
  };

  return (
    <div className="min-h-screen bg-[#F8E8D5] pt-32 pb-20 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="bg-white/90 rounded-3xl p-8 border-2 border-[#D9A99A]/50 shadow-2xl space-y-6">
          <div className="text-center space-y-1">
            <Link to="/" className="inline-flex items-center gap-1.5 justify-center">
              <div className="w-7 h-7 rounded-xl bg-[#B96F58] flex items-center justify-center text-[#F8E8D5]">
                <Sparkles className="w-4 h-4 fill-current" />
              </div>
              <span className="font-editorial text-2xl font-bold text-[#332822]">GIFTPocket</span>
            </Link>
            <h2 className="font-editorial text-2xl text-[#332822]">Create Account</h2>
            <p className="text-xs text-[#6F5145]">Join our little community of gift lovers</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-[#332822] uppercase tracking-wider block mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ananya Sharma"
                className="w-full px-3.5 py-2.5 bg-[#F8E8D5]/30 rounded-xl border border-[#D9A99A]/60 focus:outline-none focus:border-[#B96F58]"
              />
            </div>

            <div>
              <label className="font-bold text-[#332822] uppercase tracking-wider block mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ananya@example.com"
                className="w-full px-3.5 py-2.5 bg-[#F8E8D5]/30 rounded-xl border border-[#D9A99A]/60 focus:outline-none focus:border-[#B96F58]"
              />
            </div>

            <div>
              <label className="font-bold text-[#332822] uppercase tracking-wider block mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98656 83004"
                className="w-full px-3.5 py-2.5 bg-[#F8E8D5]/30 rounded-xl border border-[#D9A99A]/60 focus:outline-none focus:border-[#B96F58]"
              />
            </div>

            <div>
              <label className="font-bold text-[#332822] uppercase tracking-wider block mb-1">
                Account Type
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F8E8D5]/30 rounded-xl border border-[#D9A99A]/60 focus:outline-none focus:border-[#B96F58]"
              >
                <option value="CUSTOMER">Retail Customer</option>
                <option value="WHOLESALE">Wholesale / Reseller</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#B96F58] hover:bg-[#332822] text-[#F8E8D5] rounded-2xl font-display font-semibold text-xs transition-all shadow-md mt-2"
            >
              Register Account
            </button>
          </form>

          <div className="text-center text-xs text-[#6F5145]">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-[#B96F58] hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
