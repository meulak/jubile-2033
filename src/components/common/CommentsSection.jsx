import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import FormInput from './FormInput';
import Textarea from './Textarea';
import { commentService } from '../../services/commentService';
import { useApi } from '../../hooks/useApi';

// Composant formulaire réutilisable (pour root ou nested reply)
const CommentForm = ({ articleId, articleTitle, parentId = null, onSubmitted, onCancel }) => {
  const [formData, setFormData] = useState({ name: '', email: '', text: '' });
  const { execute: submitComment, loading, error: apiError } = useApi(
    (data) => commentService.postComment(articleId, data)
  );
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.text) return;
    
    try {
      const newComment = await submitComment({
        ...formData,
        parentCommentId: parentId,
        articleTitle
      });
      setMessage("Commentaire publié avec succès.");
      setFormData({ name: '', email: '', text: '' });
      setTimeout(() => {
        setMessage('');
        onSubmitted(newComment);
      }, 1000);
    } catch(err) {
      setMessage("Erreur lors de la publication.");
    }
  };

  return (
    <motion.form 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      onSubmit={handleSubmit} 
      className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-4 w-full"
    >
       {parentId && <h5 className="font-montserrat font-bold text-xs text-gray-500 uppercase">Répondre au commentaire</h5>}
       
       <div className="flex flex-col md:flex-row gap-4">
         <FormInput label="Nom ou Pseudo" name="name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="flex-1" />
         <FormInput label="Email public (notifications)" type="email" name="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required className="flex-1" />
       </div>
       <Textarea label="Votre message" name="text" value={formData.text} onChange={e => setFormData({...formData, text: e.target.value})} rows={3} maxLength={500} showCounter required />
       
       {message && <p className="font-serif text-sm text-[#22C55E] my-1">{message}</p>}
       
       <div className="flex items-center gap-3 pt-2">
         <Button type="submit" variant="primary" size="sm" loading={loading}>
            {parentId ? 'Envoyer la réponse' : 'Publier le commentaire'}
         </Button>
         {parentId && (
           <button type="button" onClick={onCancel} className="font-montserrat text-xs text-gray-400 hover:text-red-500">Annuler</button>
         )}
       </div>
    </motion.form>
  )
};


// Main Component
const CommentsSection = ({ articleId, articleTitle }) => {
  const [comments, setComments] = useState([]);
  const { execute: fetchComments, loading, error: apiError } = useApi(
    (id) => commentService.getComments(id)
  );
  const [replyingTo, setReplyingTo] = useState(null);

  useEffect(() => {
    loadComments();
  }, [articleId]);

  const loadComments = async () => {
    try {
      const data = await fetchComments(articleId);
      setComments(data.comments);
    } catch (err) {
      console.error("Failed to load comments:", err);
    }
  };

  const handleNewComment = (newComment) => {
    setComments(prev => [...prev, newComment]);
    setReplyingTo(null);
  };

  const handleDelete = async (commentId) => {
    if(window.confirm("Supprimer ce commentaire ?")) {
       await commentService.deleteComment(commentId);
       setComments(prev => prev.filter(c => c.id !== commentId && c.parentId !== commentId));
    }
  };

  const formatDate = (isoString) => {
    const d = new Date(isoString);
    return `${d.toLocaleDateString('fr-FR')} à ${d.toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'})}`;
  };

  // Build Hierarchy (Roots vs Children)
  const roots = comments.filter(c => !c.parentId);
  const getChildren = (parentId) => comments.filter(c => c.parentId === parentId);

  // Render recursion for nesting
  const CommentItem = ({ comment, depth = 0 }) => {
    const children = getChildren(comment.id);
    const isReplying = replyingTo === comment.id;
    
    return (
      <div className={`flex flex-col mt-6 ${depth > 0 ? 'ml-6 md:ml-12 border-l-2 border-gray-100 pl-4 md:pl-6' : ''}`}>
         <div className="flex gap-4">
           {/* Avatar */}
           <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex shrink-0 items-center justify-center font-playfair font-bold text-[#1B1B4D] border border-[#D4AF37]/50">
             {comment.name.charAt(0).toUpperCase()}
           </div>
           
           <div className="flex-1 bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
             <div className="flex flex-wrap flex-row sm:items-center justify-between gap-y-2 mb-3">
                <span className="font-bold text-[#1B1B4D] font-montserrat text-sm">{comment.name}</span>
                <span className="text-xs font-serif text-gray-400" aria-label="Date de publication">{formatDate(comment.date)}</span>
             </div>
             
             {comment.status === 'pending' ? (
               <p className="font-serif text-sm text-gray-400 italic mb-4">Ce commentaire est en attente de modération et n'est pas encore public.</p>
             ) : (
               <p className="font-serif text-[#5C5C4C] text-[15px] leading-relaxed mb-4">{comment.text}</p>
             )}
             
             {/* Actions */}
             <div className="flex items-center gap-4 text-xs font-montserrat uppercase font-bold tracking-widest text-[#D4AF37]">
                <button onClick={() => setReplyingTo(isReplying ? null : comment.id)} className="hover:text-[#1B1B4D] py-1">Répondre</button>
                <button onClick={() => handleDelete(comment.id)} className="hover:text-red-500 py-1 text-gray-300">Supprimer</button>
             </div>
           </div>
         </div>

         {/* Inline Reply Form */}
         <AnimatePresence>
           {isReplying && (
             <div className="ml-14 mt-4">
               <CommentForm 
                 articleId={articleId} articleTitle={articleTitle} parentId={comment.id} 
                 onSubmitted={handleNewComment} onCancel={() => setReplyingTo(null)} 
               />
             </div>
           )}
         </AnimatePresence>

         {/* Render children recursively */}
         {children.map(child => <CommentItem key={child.id} comment={child} depth={depth + 1} />)}
      </div>
    );
  };

  return (
    <section className="mt-20 bg-[#F5F3ED] p-6 md:p-12 rounded-3xl" aria-label="Section des commentaires">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-playfair text-2xl font-bold text-[#1B1B4D]">Commentaires de la communauté</h3>
        <span className="bg-[#1B1B4D] text-white font-montserrat text-xs font-bold px-3 py-1 rounded-full">{comments.length}</span>
      </div>

      {loading ? (
        <div className="w-full text-center py-10"><span className="animate-spin inline-block w-8 h-8 border-4 border-[#D4AF37]/40 border-t-[#D4AF37] rounded-full"></span></div>
      ) : (
        <div className="flex flex-col gap-2">
          {/* Main article comment form */}
          <div className="mb-8">
            <CommentForm articleId={articleId} articleTitle={articleTitle} onSubmitted={handleNewComment} />
          </div>

          <div className="flex flex-col" role="list">
             {roots.length === 0 ? (
               <p className="font-serif text-[#5C5C4C] text-center italic mt-4">Soyez le premier à partager vos réflexions sur cet article.</p>
             ) : (
               roots.map(root => <CommentItem key={root.id} comment={root} />)
             )}
          </div>
        </div>
      )}
    </section>
  );
};

export default CommentsSection;
