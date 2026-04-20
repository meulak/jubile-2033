import React, { useState, useEffect } from 'react';
import Container from '../components/layout/Container';
import Badge from '../components/common/Badge';
import { commentService } from '../services/commentService';

const AdminComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const data = await commentService.getAllComments();
    setComments(data);
    setLoading(false);
  };

  const updateStatus = async (id, status) => {
    await commentService.updateStatus(id, status);
    fetchData(); // reload
  };

  const deleteComm = async (id) => {
    if(window.confirm("Supprimer ce commentaire et ses enfants ?")) {
      await commentService.deleteComment(id);
      fetchData();
    }
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen py-12">
      <Container>
         <h1 className="font-playfair text-3xl font-bold text-[#1B1B4D] mb-2">Tableau de bord de modération</h1>
         <p className="font-serif text-[#5C5C4C] mb-10">Gestion centralisée de tous les commentaires laissés par la communauté.</p>
         
         <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
           {loading ? (
             <div className="p-10 text-center text-gray-500">Chargement des données...</div>
           ) : comments.length === 0 ? (
             <div className="p-10 text-center text-gray-500">Aucun commentaire dans la base.</div>
           ) : (
             <div className="overflow-x-auto w-full">
               <table className="w-full text-left font-serif text-sm">
                 <thead className="bg-[#F5F3ED] text-[#1B1B4D] font-montserrat uppercase text-xs">
                   <tr>
                     <th className="p-4 px-6">Auteur</th>
                     <th className="p-4">Message & Article</th>
                     <th className="p-4">Statut</th>
                     <th className="p-4 text-right">Actions</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                   {comments.map(c => (
                     <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                       <td className="p-4 px-6 align-top">
                         <div className="font-bold text-[#1B1B4D]">{c.name}</div>
                         <div className="text-gray-400 text-xs mt-1">{c.email}</div>
                         <div className="text-gray-400 text-xs mt-1">{new Date(c.date).toLocaleDateString()}</div>
                       </td>
                       <td className="p-4 align-top max-w-[300px] md:max-w-[400px]">
                         <p className="text-gray-700 italic border-l-2 border-[#D4AF37] pl-3 mb-2 break-words">"{c.text}"</p>
                         <p className="font-montserrat text-[10px] uppercase text-gray-400">Sur: <span className="font-bold text-[#1B1B4D]">{c.articleTitle}</span></p>
                       </td>
                       <td className="p-4 align-top">
                         <Badge 
                           label={c.status === 'approved' ? 'Approuvé' : c.status === 'spam' ? 'Spam' : 'En Attente'} 
                           variant={c.status === 'approved' ? 'primary' : c.status === 'spam' ? 'error' : 'warning'} 
                           size="sm" 
                         />
                       </td>
                       <td className="p-4 align-top text-right space-x-2">
                         {c.status !== 'approved' && (
                           <button onClick={() => updateStatus(c.id, 'approved')} className="text-xs bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded font-montserrat uppercase font-bold">Valider</button>
                         )}
                         {c.status !== 'spam' && (
                           <button onClick={() => updateStatus(c.id, 'spam')} className="text-xs bg-orange-100 hover:bg-orange-200 text-orange-700 px-3 py-1 rounded font-montserrat uppercase font-bold">Spam</button>
                         )}
                         <button onClick={() => deleteComm(c.id)} className="text-xs bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded font-montserrat uppercase font-bold">X</button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           )}
         </div>
      </Container>
    </div>
  );
};

export default AdminComments;
