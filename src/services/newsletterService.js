// src/services/newsletterService.js

const DB_KEY = 'jubile_newsletter_subs';

// Helper pour lire/écrire le faux backend LocalStorage
const getDb = () => {
  try {
    return JSON.parse(localStorage.getItem(DB_KEY) || '[]');
  } catch(e) {
    return [];
  }
};

const saveDb = (data) => localStorage.setItem(DB_KEY, JSON.stringify(data));

// Simulation de délai réseau
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const newsletterService = {
  
  // POST /api/newsletter/subscribe
  subscribe: async (email, language = 'FR') => {
    await delay(1000); // 1s loading
    const db = getDb();
    
    // Validation Already Subscribed
    if (db.find(s => s.email === email)) {
       throw new Error('Cette adresse email est déjà inscrite à notre newsletter.');
    }
    
    // Add to mock DB
    db.push({
      email,
      language,
      confirmedAt: null, // Pending double opt-in
      preferences: {
        frequency: 'weekly',
        categories: ['Tous les contenus']
      },
      createdAt: new Date().toISOString()
    });
    saveDb(db);
    
    // Mock Send Email
    console.log(`[MAIL SERVER MOCK] MOCK EMAIL SENT TO ${email} : Veuillez confirmer votre inscription au Jubilé 2033.`);
    
    return { 
      success: true, 
      message: 'Inscription réussie. Merci !', 
      confirmationSent: true 
    };
  },

  // POST /api/newsletter/confirm/{token}
  confirmSubscription: async (token) => {
    await delay(600);
    // Dans ce mock, on fait semblant que le token correspond à n'importe quel mail non confirmé
    // En réalité, vérifier le token en base de données.
    return { success: true, message: 'Abonnement confirmé avec succès.' };
  },

  // POST /api/newsletter/unsubscribe
  unsubscribe: async (email) => {
    await delay(1000);
    const db = getDb();
    const exists = db.find(s => s.email === email);
    if (!exists) {
      throw new Error("Impossible de se désinscrire : Email non trouvé.");
    }
    
    const filterDb = db.filter(s => s.email !== email);
    saveDb(filterDb);
    
    // Mock Send Email
    console.log(`[MAIL SERVER MOCK] MOCK EMAIL SENT TO ${email} : Désinscription confirmée avec succès.`);
    
    return { success: true };
  },

  // POST /api/newsletter/preferences
  updatePreferences: async (email, updateData) => {
    await delay(1000);
    const db = getDb();
    const index = db.findIndex(s => s.email === email);
    
    if (index === -1) {
      throw new Error("Abonné non trouvé.");
    }

    db[index] = {
      ...db[index],
      language: updateData.language || db[index].language,
      preferences: {
        frequency: updateData.frequency || db[index].preferences.frequency,
        categories: updateData.categories || db[index].preferences.categories
      }
    };
    saveDb(db);
    
    return { success: true, message: "Vos préférences ont bien été mises à jour." };
  },

  // GET /api/newsletter/status/{email}
  getSubscriptionStatus: async (email) => {
    await delay(600);
    const db = getDb();
    const sub = db.find(s => s.email === email);
    
    if (!sub) return { isSubscribed: false };
    
    return {
      isSubscribed: true,
      email: sub.email,
      language: sub.language,
      preferences: sub.preferences,
      confirmedAt: sub.confirmedAt
    };
  }
};
