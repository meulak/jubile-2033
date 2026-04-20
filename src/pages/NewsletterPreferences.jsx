import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../components/layout/Container';
import FormInput from '../components/common/FormInput';
import Select from '../components/common/Select';
import Checkbox from '../components/common/Checkbox';
import Button from '../components/common/Button';
import { newsletterService } from '../services/newsletterService';

const NewsletterPreferences = () => {
  const [searchParams] = useSearchParams();
  const urlEmail = searchParams.get('email') || '';

  // Step Tracker: 1 = Email Entry/Check, 2 = Preferences Form
  const [step, setStep] = useState(1);
  
  // Data States
  const [email, setEmail] = useState(urlEmail);
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  // Loading & Messages
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });

  // Preferences Form Data
  const [prefs, setPrefs] = useState({
    language: 'FR',
    frequency: 'weekly',
    categories: ['Tous les contenus'],
  });
  const [unsubscribeToggle, setUnsubscribeToggle] = useState(false);

  // Lists for Form
  const categoriesList = [
    "Tous les contenus",
    "Articles bibliques",
    "Héritage historique",
    "Ressources pédagogiques",
    "Actualités événements",
    "Appels participation"
  ];

  // Look up user status on load if URL email exists
  useEffect(() => {
    if (urlEmail) verifyEmail(urlEmail);
  }, [urlEmail]);

  const verifyEmail = async (mailToVerify) => {
    if (!mailToVerify || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(mailToVerify)) {
      setStatus({ type: 'error', message: 'Veuillez saisir un email valide.' });
      return;
    }
    setLoading(true);
    setStatus({ type: null, message: '' });
    try {
      const result = await newsletterService.getSubscriptionStatus(mailToVerify);
      if (result.isSubscribed) {
        setIsSubscribed(true);
        if (result.preferences) {
          setPrefs({
            language: result.language || 'FR',
            frequency: result.preferences.frequency || 'weekly',
            categories: result.preferences.categories || ['Tous les contenus']
          });
        }
        setStep(2); // Go to preferences form
      } else {
        setStatus({ type: 'error', message: "Aucun abonnement trouvé pour cette adresse." });
      }
    } catch (error) {
      setStatus({ type: 'error', message: error.message || "Erreur serveur." });
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setPrefs(prev => {
      let newCats = [...prev.categories];
      if (category === "Tous les contenus") {
        newCats = ["Tous les contenus"]; // Selecting 'All' clears specifics
      } else {
        // Remove "All" if selecting a specific
        newCats = newCats.filter(c => c !== "Tous les contenus");
        
        if (newCats.includes(category)) {
          newCats = newCats.filter(c => c !== category);
        } else {
          newCats.push(category);
        }
        
        // If empty, auto-select "Tous les contenus"
        if (newCats.length === 0) newCats = ["Tous les contenus"];
      }
      return { ...prev, categories: newCats };
    });
  };

  const handleSubmitPreferences = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      if (unsubscribeToggle) {
        // Handle full unsubscription
        await newsletterService.unsubscribe(email);
        setIsSubscribed(false);
        setStep(1);
        setStatus({ type: 'success', message: 'Désinscription confirmée. Vous ne recevrez plus nos emails.' });
      } else {
        // Handle update
        await newsletterService.updatePreferences(email, prefs);
        setStatus({ type: 'success', message: 'Vos préférences ont bien été enregistrées !' });
      }
    } catch (error) {
       setStatus({ type: 'error', message: error.message || "Impossible de mettre à jour." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#F5F3ED] min-h-[calc(100vh-100px)] py-20">
      <Container className="max-w-2xl">
        <div className="bg-white rounded-3xl shadow-xl border border-[#D4AF37]/20 p-8 md:p-12">
          
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-[#1B1B4D]/10 text-[#1B1B4D] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-[#1B1B4D] mb-4">Gestion de l'abonnement</h1>
            <p className="font-serif text-[#5C5C4C]">Gérez vos préférences de réception concernant la newsletter Jubilé 2033.</p>
          </div>

          <AnimatePresence mode="wait">
            {/* ALERT MESSAGES SYSTEM */}
            {status.message && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className={`mb-8 p-4 rounded-xl border font-montserrat text-sm font-bold flex items-start gap-4 ${status.type === 'success' ? 'bg-[#22C55E]/10 border-[#22C55E]/20 text-[#166534]' : 'bg-[#EF4444]/10 border-[#EF4444]/20 text-[#991B1B]'}`}
              >
                <span>{status.type === 'success' ? '✅' : '⚠️'}</span>
                <div>{status.message}</div>
              </motion.div>
            )}

            {/* STEP 1: Verify Email */}
            {step === 1 && (
              <motion.form 
                key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onSubmit={(e) => { e.preventDefault(); verifyEmail(email); }}
                className="flex flex-col gap-6"
              >
                <div className="p-6 bg-[#1B1B4D]/5 border-l-4 border-[#1B1B4D] rounded-r-xl mb-4">
                  <p className="font-serif text-sm text-[#1B1B4D]">Veuillez indiquer l'adresse email associée à votre abonnement pour accéder à vos préférences.</p>
                </div>
                <FormInput 
                  name="email" type="email" label="Adresse Email" 
                  value={email} onChange={(e) => setEmail(e.target.value)} required 
                />
                <Button type="submit" variant="primary" size="lg" loading={loading} className="mt-2">Accéder aux préférences</Button>
              </motion.form>
            )}

            {/* STEP 2: Preferences Form */}
            {step === 2 && (
              <motion.form 
                key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onSubmit={handleSubmitPreferences}
                className="flex flex-col gap-10"
              >
                {/* Identité */}
                <div className="bg-[#F5F3ED] p-4 rounded-xl flex items-center justify-between border border-[#D4AF37]/20">
                   <div>
                     <span className="block font-montserrat text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Abonné</span>
                     <strong className="font-serif text-[#1B1B4D]">{email}</strong>
                   </div>
                   <button type="button" onClick={() => setStep(1)} className="text-[#D4AF37] font-montserrat text-xs font-bold uppercase hover:underline">Changer d'email</button>
                </div>

                {/* Paramètres de réception */}
                <div className="space-y-6">
                  <h3 className="font-playfair text-xl font-bold text-[#1B1B4D] border-b border-gray-100 pb-2">Paramètres de Réception</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Select 
                      label="Langue de réception" 
                      name="language"
                      value={prefs.language} 
                      onChange={(e) => setPrefs({...prefs, language: e.target.value})}
                      options={[ {label:"Français", value:"FR"}, {label:"English", value:"EN"}, {label:"Italiano", value:"IT"} ]}
                      disabled={unsubscribeToggle}
                    />
                    <Select 
                      label="Fréquence" 
                      name="frequency"
                      value={prefs.frequency} 
                      onChange={(e) => setPrefs({...prefs, frequency: e.target.value})}
                      options={[ {label:"Quotidienne (Actualités en direct)", value:"daily"}, {label:"Hebdomadaire (Résumé)", value:"weekly"}, {label:"Mensuelle (Le Grand Format)", value:"monthly"} ]}
                      disabled={unsubscribeToggle}
                    />
                  </div>
                </div>

                {/* Centres d'intérêt */}
                <div className="space-y-4">
                  <h3 className="font-playfair text-xl font-bold text-[#1B1B4D] border-b border-gray-100 pb-2">Centres d'intérêt</h3>
                  <p className="font-serif text-sm text-[#5C5C4C] mb-4">Sélectionnez les sujets qui vous intéressent. Nous personnaliserons le contenu en conséquence.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    {categoriesList.map(cat => (
                       <Checkbox 
                         key={cat} name={cat} label={cat} 
                         checked={prefs.categories.includes(cat)} 
                         onChange={() => handleCategoryChange(cat)}
                         disabled={unsubscribeToggle}
                       />
                    ))}
                  </div>
                </div>

                {/* Unsubscribe Danger Zone */}
                <div className="mt-8 pt-8 border-t-[3px] border-red-50">
                  <Checkbox 
                    name="unsubscribe" 
                    label="Je souhaite me désinscrire définitivement de toutes les communications de Jubilé 2033." 
                    checked={unsubscribeToggle} 
                    onChange={(e) => setUnsubscribeToggle(e.target.checked)}
                    className="text-red-600 font-bold"
                  />
                  {unsubscribeToggle && (
                    <p className="font-serif text-xs text-red-500 mt-2 pl-8">Attention, cette action est immédiate et irréversible. Vous ne recevrez plus aucun contenu.</p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button type="submit" variant={unsubscribeToggle ? 'danger' : 'primary'} size="lg" loading={loading} className="w-full sm:w-auto">
                    {unsubscribeToggle ? "Confirmer la désinscription" : "Enregistrer les préférences"}
                  </Button>
                  <Button type="button" variant="tertiary" onClick={() => window.history.back()} disabled={loading} className="w-full sm:w-auto">
                    Retour au site
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

        </div>
      </Container>
    </div>
  );
};

export default NewsletterPreferences;
