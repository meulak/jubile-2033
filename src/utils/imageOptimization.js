/**
 * Utilitaires d'optimisation d'images via Cloudinary (Delivery Network)
 * Utilise l'API de transformation à la volée de Cloudinary.
 */

export const cloudinaryUrl = (publicId, options = {}) => {
  if (!publicId) return '';
  // Bypass if it's already a full absolute URL or local path from mock data
  if (publicId.startsWith('http') || publicId.startsWith('/')) {
    return publicId;
  }

  // Cloudinary standard options mapping
  const defaultOptions = {
    c: options.crop || 'scale', // crop style
    w: options.width || 'auto', // width
    h: options.height || null,  // height
    q: options.quality || 'auto', // quality (auto applies smart compression)
    f: options.format || 'auto', // format converts to webp automatically if browser supports
  };
  
  // Filter out null options and build transformation string
  const paramsStr = Object.entries(defaultOptions)
    .filter(([_, value]) => value !== null)
    .map(([key, value]) => `${key}_${value}`)
    .join(',');
  
  // Note: Vite exige VITE_ comme préfixe pour exposer au côté client
  const cloudId = import.meta.env.VITE_CLOUDINARY_CLOUD_ID || 'demo'; // 'demo' fallback if missing
  
  return `https://res.cloudinary.com/${cloudId}/image/upload/${paramsStr}/v1/${publicId}`;
};

export const getResponsiveImage = (publicId) => ({
  mobile: cloudinaryUrl(publicId, { width: 400 }),
  tablet: cloudinaryUrl(publicId, { width: 800 }),
  desktop: cloudinaryUrl(publicId, { width: 1200 }),
});

export const getPlaceholderLQIP = (publicId) => {
  // Low-Quality Image Placeholder (LQIP)
  return cloudinaryUrl(publicId, { 
    quality: 20, 
    width: 100,
    blur: 1000 // Heavy blur
  });
};

/**
 * Upload directement une image vers Cloudinary depuis le navigateur (pour les formulaires)
 */
export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const cloudId = import.meta.env.VITE_CLOUDINARY_CLOUD_ID;

  if (!uploadPreset || !cloudId) {
    throw new Error("Variables d'environnement Cloudinary manquantes (.env)");
  }

  formData.append('upload_preset', uploadPreset);
  
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudId}/image/upload`,
    { 
      method: 'POST', 
      body: formData 
    }
  );
  
  if (!response.ok) {
    throw new Error('Échec de téléchargement Cloudinary');
  }
  
  return response.json(); 
  // returns: { secure_url, public_id, format, width, height, bytes... }
};
