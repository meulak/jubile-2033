const DB_KEY = 'jubile_comments_db';

const getDb = () => {
  try {
    return JSON.parse(localStorage.getItem(DB_KEY) || '[]');
  } catch (e) {
    return [];
  }
};

const saveDb = (db) => localStorage.setItem(DB_KEY, JSON.stringify(db));
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// INITIALISER LA MOCK DB SI VIDE
if (getDb().length === 0) {
  saveDb([
    { 
      id: 'c1', articleId: '1', articleTitle: "Abraham en Afrique : Des Patriarches aux premières églises du Nil", 
      parentId: null, name: 'Marie-Claire', email: 'marie@example.com', 
      text: "Cet article est une mine d'or pour notre groupe de recherche biblique. Merci pour ces éclaircissements théologiques profonds !", 
      date: new Date(Date.now() - 86400000*3).toISOString(), status: 'approved' 
    },
    { 
      id: 'c2', articleId: '1', articleTitle: "Abraham en Afrique : Des Patriarches aux premières églises du Nil", 
      parentId: 'c1', name: 'Père Sylvestre (Auteur)', email: 'sylvestre@example.com', 
      text: "Merci beaucoup Marie-Claire. C'est l'essence même du Jubilé que de reconnecter nos communautés à leurs racines.", 
      date: new Date(Date.now() - 86400000*2).toISOString(), status: 'approved' 
    },
    { 
      id: 'c3', articleId: '2', articleTitle: "La Sagesse Partagée", 
      parentId: null, name: 'Jean-Luc M.', email: 'jeanluc@example.com', 
      text: "Très intéressant. Savez-vous s'il y aura une publication papier de ces recherches en 2033 ?", 
      date: new Date().toISOString(), status: 'pending' // pending demo
    }
  ]);
}

export const commentService = {
  getComments: async (articleId, page = 1) => {
    await delay(600); // Simulate network load
    const db = getDb();
    
    // Pour l'affichage public, on ne renvoie que les APPROVED (et on triche pour montrer les pending fraîchement postés par l'utilisateur via une logique front s'ils sont dans le state)
    let comments = db.filter(c => c.articleId === String(articleId) && (c.status === 'approved' || c.status === 'pending'));
    
    // Sort oldest first usually for hierarchical trees so roots are read top-down
    comments.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    return { comments, total: comments.length, page, hasMore: false };
  },

  postComment: async (articleId, formData) => {
    await delay(1000);
    const db = getDb();
    
    // Simulation Auto-approve pour la fluide UX (bien que défini comme "pending" par défaut dans un vrai app)
    const newComment = {
      id: Date.now().toString(),
      articleId: String(articleId),
      articleTitle: formData.articleTitle || 'Article Inconnu',
      parentId: formData.parentCommentId || null,
      name: formData.name,
      email: formData.email,
      text: formData.text,
      date: new Date().toISOString(),
      status: 'approved' // Pour le "Mock Implementation: auto-approved for demo" specifié par l'utilisateur
    };
    
    db.push(newComment);
    saveDb(db);
    
    return newComment;
  },

  deleteComment: async (commentId) => {
    await delay(400);
    let db = getDb();
    // Supprime le commentaire ET ses enfants potentiels
    db = db.filter(c => c.id !== commentId && c.parentId !== commentId);
    saveDb(db);
    return { success: true };
  },

  // ---- APPELS ADMIN ----
  getAllComments: async () => {
    await delay(500);
    // Retourne les plus récents d'abord pour le dashboard
    const db = getDb().sort((a, b) => new Date(b.date) - new Date(a.date));
    return db;
  },

  updateStatus: async (commentId, status) => {
    await delay(400);
    const db = getDb();
    const comment = db.find(c => c.id === commentId);
    if (comment) {
      comment.status = status;
      saveDb(db);
    }
    return { success: true };
  }
};
