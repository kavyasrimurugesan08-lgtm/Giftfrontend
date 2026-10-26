import React, { useState } from 'react';
import { Sparkles, Mail, Phone, MapPin, Clock, Send, ShieldCheck, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#F8E8D5] pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center space-y-3">
          <span className="text-xs font-black tracking-widest text-[#AC5B44] uppercase">
            Our Story & Heart
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl text-[#18110D]">
            Little Things. Big Smiles.
          </h1>
          <p className="font-hand text-2xl sm:text-3xl text-[#47342C] font-semibold">
            "Making gifting more personal, creative and memorable." ♡
          </p>
        </div>

        <div className="p-8 sm:p-12 bg-white rounded-3xl border border-[#D9A99A]/60 shadow-md space-y-6 text-sm text-[#18110D] leading-relaxed font-medium">
          <p>
            Welcome to <strong>GIFTPocket</strong> — an organic boutique born out of the belief that meaningful connections don't require grand gestures, but thoughtful little keepsakes that carry warmth.
          </p>
          <p>
            From custom beaded phone charms spelled out with your bestie's nickname, to magnetic couple bracelets that snap together with a gentle click, every creation in our catalogue is designed to trigger a genuine smile.
          </p>
          <p>
            We proudly empower hundreds of young artisans, small businesses, Instagram resellers, and college campus entrepreneurs across India through our retail boutique and low-MOQ wholesale program.
          </p>
        </div>

      </div>
    </div>
  );
};

export const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F8E8D5] pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-black tracking-widest text-[#AC5B44] uppercase">
            Get in Touch
          </span>
          <h1 className="font-editorial text-3xl sm:text-5xl text-[#18110D]">
            We'd Love to Hear From You
          </h1>
          <p className="text-xs sm:text-sm text-[#47342C] font-medium font-sans">
            Have a question about custom designs, bulk party orders or wholesale accounts?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Info Card */}
          <div className="md:col-span-5 bg-[#18110D] text-white p-8 rounded-3xl space-y-6 shadow-xl border border-[#AC5B44]/40">
            <h3 className="font-editorial text-2xl text-[#E8D49A]">GiftPocket Desk</h3>
            <div className="space-y-4 text-xs text-[#F4D2BE]">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#AC5B44] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Customer Care & Orders</p>
                  <p className="text-[#F5E8DC]">hello@giftpocket.in</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#AC5B44] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">WhatsApp & Phone</p>
                  <p className="text-[#F5E8DC]">+91 98656 83004 (Mon-Sat, 10am-7pm)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#AC5B44] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Studio Location</p>
                  <p className="text-[#F5E8DC]">Indiranagar Artisan Quarter, Bengaluru, KA 560038</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-7 bg-white p-8 rounded-3xl border border-[#D9A99A]/60 shadow-md">
            {submitted ? (
              <div className="p-8 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
                <h4 className="font-editorial text-xl text-[#18110D]">Message Sent!</h4>
                <p className="text-xs text-[#47342C] font-semibold">We will get back to you within 24 hours ♡</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-[#18110D] uppercase tracking-wider block mb-1">Your Name</label>
                  <input type="text" required placeholder="e.g. Priya Sharma" className="w-full px-3.5 py-2.5 bg-[#FAF5EE] text-[#18110D] rounded-xl border border-[#D9A99A] focus:border-[#AC5B44] focus:outline-none" />
                </div>
                <div>
                  <label className="font-bold text-[#18110D] uppercase tracking-wider block mb-1">Email</label>
                  <input type="email" required placeholder="hello@example.com" className="w-full px-3.5 py-2.5 bg-[#FAF5EE] text-[#18110D] rounded-xl border border-[#D9A99A] focus:border-[#AC5B44] focus:outline-none" />
                </div>
                <div>
                  <label className="font-bold text-[#18110D] uppercase tracking-wider block mb-1">Subject</label>
                  <input type="text" required placeholder="Custom design inquiry" className="w-full px-3.5 py-2.5 bg-[#FAF5EE] text-[#18110D] rounded-xl border border-[#D9A99A] focus:border-[#AC5B44] focus:outline-none" />
                </div>
                <div>
                  <label className="font-bold text-[#18110D] uppercase tracking-wider block mb-1">Message</label>
                  <textarea rows={3} required placeholder="How can we help make your gift special?" className="w-full px-3.5 py-2.5 bg-[#FAF5EE] text-[#18110D] rounded-xl border border-[#D9A99A] focus:border-[#AC5B44] focus:outline-none" />
                </div>
                <button type="submit" className="w-full py-3.5 bg-[#AC5B44] hover:bg-[#18110D] text-white rounded-2xl font-display font-bold text-xs transition-colors shadow-md cursor-pointer">
                  Send Message
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export const FAQPage = () => {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    { q: "How do I customize a phone charm or keychain?", a: "Simply head over to our 'Customized' studio or select any customizable product. You can pick your pastel cord colors, type in your custom letters or name (up to 8 characters), and select charm attachments like gummy bears or puffy hearts." },
    { q: "What is your shipping policy and delivery timeline across India?", a: "Orders are dispatched within 24-48 business hours via insured express couriers (BlueDart / Delhivery). Free shipping applies on all orders above ₹499. Otherwise a flat fee of ₹49 is charged." },
    { q: "How does the wholesale program work?", a: "We offer wholesale pricing starting from minimum order quantities of just 20 pieces. You can apply on our Wholesale page to unlock tiered partner discounts up to 60% off retail." },
    { q: "Can I return or exchange customized items?", a: "Since customized name products are handcrafted specifically with your requested letters and charm combinations, they cannot be returned unless received damaged or incorrect." }
  ];

  return (
    <div className="min-h-screen bg-[#F8E8D5] pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-black tracking-widest text-[#AC5B44] uppercase">Help Center</span>
          <h1 className="font-editorial text-3xl sm:text-5xl text-[#18110D]">Frequently Asked Questions</h1>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#D9A99A]/60 overflow-hidden shadow-2xs">
              <button
                onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
                className="w-full p-5 text-left font-display font-bold text-sm text-[#18110D] flex justify-between items-center cursor-pointer hover:bg-[#FAF5EE]/60 transition-colors"
              >
                <span>{faq.q}</span>
                {openIdx === i ? <ChevronUp className="w-4 h-4 text-[#AC5B44]" /> : <ChevronDown className="w-4 h-4 text-[#47342C]" />}
              </button>
              {openIdx === i && (
                <div className="px-5 pb-5 text-xs text-[#47342C] font-medium leading-relaxed border-t border-[#D9A99A]/30 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
