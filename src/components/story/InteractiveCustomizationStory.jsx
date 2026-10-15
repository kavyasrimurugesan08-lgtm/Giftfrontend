import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Palette, Layers, Type, Paintbrush } from 'lucide-react';

export const InteractiveCustomizationStory = () => {
  const steps = [
    {
      step: "01",
      title: "Pick Your Cord & Palette",
      desc: "Select from aesthetic lookbook blends: Sandstone, Olive Sage, Ochre Honey, or Terracotta.",
      icon: Palette,
      badge: "Step 01",
      iconBg: "#DFD7CB",
      iconColor: "#1A1816"
    },
    {
      step: "02",
      title: "Add Bead Palettes",
      desc: "We thread iridescent seed pearls, glass crystal spheres, and handcrafted spacer beads.",
      icon: Layers,
      badge: "Step 02",
      iconBg: "#717C6D",
      iconColor: "#FFFFFF"
    },
    {
      step: "03",
      title: "Add Name & Keepsake Photo",
      desc: "Personalize with custom letters and attach your favourite photo or artwork token.",
      icon: Paintbrush,
      badge: "Step 03",
      iconBg: "#C97D67",
      iconColor: "#FFFFFF"
    }
  ];

  return (
    <section className="py-24 bg-[#EDE8E1] relative overflow-hidden border-y border-[#D4C9BA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-black tracking-[0.25em] text-[#C97D67] uppercase">
            <span className="w-6 h-[1.5px] bg-[#C97D67]" />
            <span>The Customization Story</span>
            <span className="w-6 h-[1.5px] bg-[#C97D67]" />
          </div>
          <h2 className="font-editorial text-4xl sm:text-6xl text-[#121110] font-black tracking-tight">
            Make it yours.
          </h2>
          <p className="text-base text-[#544E48] font-hand text-2xl font-bold">
            "Because the best gifts feel like they were made just for them." ♡
          </p>
        </div>

        {/* 3-Step Clean Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((s) => {
            const IconComponent = s.icon;
            return (
              <div
                key={s.step}
                className="bg-[#FAF8F5] rounded-3xl p-8 border border-[#D4C9BA] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs"
                      style={{ backgroundColor: s.iconBg, color: s.iconColor }}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-display font-black text-[#1A1816] bg-[#EDE8E1] px-3.5 py-1 rounded-full border border-[#D4C9BA] uppercase tracking-wider">
                      {s.badge}
                    </span>
                  </div>

                  <h3 className="font-editorial text-2xl font-bold text-[#121110]">
                    {s.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#544E48] font-medium leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#D4C9BA]/60 flex items-center justify-between">
                  <span className="text-xs font-hand text-[#C97D67] font-bold text-base">
                    Handmade just for you ♡
                  </span>
                  <span className="text-[10px] font-black tracking-widest text-[#717C6D] uppercase">
                    0{s.step.slice(-1)} / 03
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Centered CTA Action */}
        <div className="text-center pt-4">
          <Link
            to="/customized"
            className="inline-flex items-center gap-2.5 px-9 py-4 bg-[#1A1816] hover:bg-[#C97D67] text-white rounded-full font-display font-bold text-xs tracking-widest uppercase transition-all shadow-xl hover:scale-102 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#D69E4A]" />
            <span>LAUNCH CUSTOM ATELIER</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
