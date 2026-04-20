import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Button from './Button';
import FormInput from './FormInput';
import { newsletterService } from '../../services/newsletterService';
import { useApi } from '../../hooks/useApi';
import Container from '../layout/Container';

const NewsletterSignup = ({ 
  variant = 'inline', 
  title, 
  description, 
  buttonText,
  onSuccess
}) => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const { execute: subscribe, loading, error: apiError } = useApi(
    (email, lang) => newsletterService.subscribe(email, lang)
  );
  const [status, setStatus] = useState({ type: null, message: '' });

  const displayTitle = title || t('sidebar.newsletter.title');
  const displayDescription = description || t('sidebar.newsletter.desc');
  const displayButtonText = buttonText || t('sidebar.newsletter.btn');

  const validateEmail = (mail) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(mail);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: null, message: '' });

    if (!email) {
      setStatus({ type: 'error', message: t('newsletter.error.empty') });
      return;
    }

    if (!validateEmail(email)) {
      setStatus({ type: 'error', message: t('newsletter.error.invalid') });
      return;
    }

    try {
      const resp = await subscribe(email, i18n.language);
      if (resp.success) {
        setStatus({ type: 'success', message: t('newsletter.success') });
        setEmail('');
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      // Error is handled by useApi and exposed via apiError/catch
      setStatus({ type: 'error', message: err.message || t('common.error') });
    }
  };

  const StatusMessage = () => (
    <AnimatePresence>
      {status.message && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className={`text-sm mt-3 font-montserrat font-bold p-3 rounded-lg ${
            status.type === 'error' ? 'bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20' : 'bg-[#22C55E]/10 text-[#166534] border border-[#22C55E]/20'
          }`}
        >
          {status.type === 'error' ? '⚠️ ' : '✅ '}
          {status.message}
        </motion.div>
      )}
    </AnimatePresence>
  );

  // --- RENDER VARIANT : SECTION ---
  if (variant === 'section') {
    return (
      <section className="w-full bg-[#1B1B4D] py-16 md:py-24 text-white relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37] rounded-full filter blur-[100px] opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
        <Container className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="w-full md:w-1/2">
            <h3 className="font-playfair text-3xl md:text-4xl font-bold text-[#D4AF37] mb-4">{displayTitle}</h3>
            <p className="font-serif text-[17px] text-white/80 leading-relaxed max-w-lg">{displayDescription}</p>
          </div>
          <div className="w-full md:w-1/2 bg-white/5 p-8 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <FormInput 
                name="newsletter_email"
                type="email" 
                placeholder={t('common.emailPlaceholder')} 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="bg-white/90 focus:bg-white text-[#1B1B4D] border-transparent"
                disabled={loading}
              />
              <Button type="submit" variant="primary" loading={loading} fullWidth className="h-[50px]">
                {displayButtonText}
              </Button>
            </form>
            <StatusMessage />
          </div>
        </Container>
      </section>
    );
  }

  // --- RENDER VARIANT : POPUP ---
  if (variant === 'popup') {
    return (
      <div className="flex flex-col text-center items-center">
         <div className="w-16 h-16 bg-[#D4AF37]/20 rounded-full flex items-center justify-center text-3xl mb-4">
           💌
         </div>
         <h4 className="font-playfair text-2xl font-bold text-[#1B1B4D] mb-2">{displayTitle}</h4>
         <p className="font-serif text-sm text-[#5C5C4C] mb-6 px-4">{displayDescription}</p>
         <form onSubmit={handleSubmit} className="w-full relative px-6">
           <input 
             type="email" 
             placeholder="votre@email.com" 
             value={email} onChange={(e) => setEmail(e.target.value)}
             className="w-full border-b-2 border-gray-200 py-3 px-4 focus:outline-none focus:border-[#D4AF37] text-[#1B1B4D] font-serif text-center mb-6"
             disabled={loading}
           />
           <Button type="submit" variant="primary" loading={loading} fullWidth>
              {displayButtonText}
           </Button>
         </form>
         <div className="w-full px-6 mt-2 text-left"><StatusMessage /></div>
      </div>
    );
  }

  // --- RENDER VARIANT : INLINE ---
  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="relative flex items-center shadow-lg rounded-full overflow-hidden bg-white p-1">
        <input 
          type="email" 
          placeholder={t('common.emailPlaceholder')} 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          className="w-full py-3 px-5 focus:outline-none text-[#1B1B4D] font-serif bg-transparent text-sm"
          disabled={loading}
        />
        <Button 
          type="submit" 
          variant="primary" 
          loading={loading}
          className="rounded-full px-6 py-2 m-1 shrink-0 absolute right-0"
        >
          {loading ? '' : 'GO'}
        </Button>
      </form>
      <StatusMessage />
    </div>
  );
};

export default NewsletterSignup;
