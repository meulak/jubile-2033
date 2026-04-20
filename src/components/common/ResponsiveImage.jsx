import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cloudinaryUrl, getPlaceholderLQIP } from '../../utils/imageOptimization';

const ResponsiveImage = ({ 
  src, // cloudinary public_id OR standard absolute URL
  alt = 'Image', 
  priority = false, // Set to true for LCP (Largest Contentful Paint) hero images
  objectFit = 'cover',
  className = '',
  // Optional explicit overrides
  width,
  height
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [lqipLoaded, setLqipLoaded] = useState(false);
  
  // Auto-detect if it's a Cloudinary ID (not a standard url)
  const isCloudinary = src && !src.startsWith('http') && !src.startsWith(import.meta.env.BASE_URL) && !src.startsWith('/');
  
  let imageSrc = src;
  let srcSet = undefined;
  let lqipSrc = null;
  
  if (isCloudinary) {
    imageSrc = cloudinaryUrl(src, { width: 1200 }); // Main fallback
    lqipSrc = getPlaceholderLQIP(src); // Blur placeholder
    srcSet = `
      ${cloudinaryUrl(src, { width: 320 })} 320w,
      ${cloudinaryUrl(src, { width: 640 })} 640w,
      ${cloudinaryUrl(src, { width: 1024 })} 1024w,
      ${cloudinaryUrl(src, { width: 1920 })} 1920w
    `;
  }
  
  return (
    <div className={`relative overflow-hidden bg-gray-100 ${className}`} style={{ width, height }}>
      
      {/* Background LQIP Placeholder */}
      {isCloudinary && !isLoaded && !error && (
         <img 
           src={lqipSrc} 
           alt="" 
           aria-hidden="true"
           className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-70"
         />
      )}

      {/* Main Image */}
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        src={imageSrc}
        srcSet={srcSet}
        sizes={isCloudinary ? "(max-width: 640px) 320px, (max-width: 1024px) 640px, (max-width: 1920px) 1024px, 1920px" : undefined}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'} // Eager pour Hero images, Lazy par défaut (SEO)
        onLoad={() => setIsLoaded(true)}
        onError={() => { setError(true); setIsLoaded(true); }}
        className="w-full h-full relative z-10"
        style={{
          objectFit,
          display: error ? 'none' : 'block',
        }}
      />

      {/* Error Fallback UI */}
      {error && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-gray-400 bg-gray-100">
          <svg className="w-8 h-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-[10px] font-montserrat uppercase px-2 text-center truncate w-full">{alt.substring(0,25)}</span>
        </div>
      )}
    </div>
  );
};

export default ResponsiveImage;
