import React from 'react';

export const BlobShape = ({
  className = "",
  variant = 1,
  color = "#F4D2BE",
  opacity = 0.6,
  animate = true,
  children
}) => {
  const getBlobPath = () => {
    switch (variant) {
      case 1:
        return "M42.8,-71.4C55.4,-66.1,65.6,-54.7,73.1,-41.6C80.6,-28.5,85.4,-14.2,84.6,-0.5C83.7,13.3,77.3,26.5,69,38.1C60.7,49.7,50.5,59.7,38.4,66.4C26.3,73.1,13.2,76.5,-0.6,77.5C-14.3,78.5,-28.7,77.2,-41.4,70.9C-54.1,64.6,-65.2,53.4,-73.2,40.1C-81.2,26.8,-86.1,13.4,-84.9,0.7C-83.7,-12,-76.3,-24,-68,-35.1C-59.7,-46.2,-50.5,-56.4,-39.1,-62.4C-27.7,-68.4,-13.8,-70.2,0.8,-71.6C15.5,-73,30.3,-76.7,42.8,-71.4Z";
      case 2:
        return "M39.6,-66.7C50.9,-61.8,59.3,-50.3,66.9,-38C74.5,-25.7,81.3,-12.9,80.8,-0.3C80.3,12.3,72.4,24.5,64.2,35.8C56,47.1,47.5,57.5,36.5,64.1C25.5,70.7,12.8,73.5,-0.6,74.5C-14,75.6,-27.9,74.9,-39.8,68.9C-51.6,63,-61.4,51.8,-69.1,39C-76.7,26.2,-82.3,13.1,-80.9,0.8C-79.6,-11.5,-71.4,-23,-62.7,-33.8C-53.9,-44.6,-44.7,-54.7,-33.8,-59.8C-22.9,-65,-11.5,-65.2,0.6,-66.2C12.7,-67.2,28.3,-71.6,39.6,-66.7Z";
      case 3:
        return "M45.5,-75.4C58.4,-70.5,68,-57.3,74.4,-43.1C80.8,-28.9,84,-14.5,82.8,-0.7C81.6,13.1,76,26.1,68.8,38.1C61.5,50.1,52.6,60.9,41,67.6C29.4,74.3,15.1,76.9,-0.1,77.1C-15.3,77.3,-30.6,75.1,-43.3,68.1C-56,61.1,-66.1,49.3,-73.4,35.9C-80.7,22.5,-85.2,7.5,-84.6,-7.4C-84,-22.3,-78.3,-37.1,-68.8,-48.9C-59.3,-60.7,-46.1,-69.5,-32.4,-73.9C-18.7,-78.4,-4.5,-78.5,9.6,-77.3C23.7,-76.1,32.6,-80.3,45.5,-75.4Z";
      default:
        return "M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,88.4,-0.9C86.9,14.4,81.1,28.8,72.9,41.4C64.6,54,53.8,64.8,40.8,71.2C27.7,77.7,12.5,79.8,-2.6,84.3C-17.7,88.8,-32.7,95.7,-45.8,90.9C-58.9,86.1,-70.1,69.6,-77.5,53C-84.9,36.4,-88.4,19.7,-88.1,3.4C-87.7,-12.9,-83.4,-28.8,-74.6,-41.8C-65.7,-54.7,-52.3,-64.7,-38,-71.8C-23.7,-78.9,-8.5,-83.1,4.9,-77.8C18.3,-72.6,30.6,-83.6,44.7,-76.4Z";
    }
  };

  return (
    <div className={`relative ${animate ? 'animate-float' : ''} ${className}`}>
      <svg
        viewBox="-100 -100 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-sm"
        style={{ color }}
      >
        <path
          d={getBlobPath()}
          fill="currentColor"
          fillOpacity={opacity}
        />
      </svg>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};

export const DoodleSparkle = ({ className = "w-6 h-6 text-[#B96F58]" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
  </svg>
);

export const DoodleHeart = ({ className = "w-6 h-6 text-[#D9A99A]" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export const DoodleArrow = ({ className = "w-16 h-8 text-[#B96F58]" }) => (
  <svg viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className={className}>
    <path d="M10 25 C 35 10, 65 35, 88 15" strokeDasharray="3 3" />
    <path d="M78 12 L 90 15 L 85 26" />
  </svg>
);

export const DoodleStar = ({ className = "w-6 h-6 text-[#E8D49A]" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 1.5l3.09 6.26L22 8.77l-5 4.87 1.18 6.88L12 17.27l-6.18 3.25L7 13.64 2 8.77l6.91-1.01L12 1.5z" />
  </svg>
);

export const WavyDivider = ({ color = "#F4D2BE", height = 40, className = "" }) => (
  <div className={`w-full overflow-hidden leading-none ${className}`}>
    <svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      className="relative block w-full"
      style={{ height: `${height}px` }}
    >
      <path
        d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,50 L1200,120 L0,120 Z"
        fill={color}
      />
    </svg>
  </div>
);
