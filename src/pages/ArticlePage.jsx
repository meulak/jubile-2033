import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Container from '../components/layout/Container';
import Badge from '../components/common/Badge';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import FormInput from '../components/common/FormInput';
import Textarea from '../components/common/Textarea';
import CommentsSection from '../components/common/CommentsSection';
import SEOMeta from '../components/common/SEOMeta';
import { getArticleSchema } from '../utils/schemaHelpers';
import { mockArticles } from '../data/mockArticles';

const ArticlePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [toc, setToc] = useState([]);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const { scrollYProgress } = useScroll();
  
  // Comment states
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentStatus, setCommentStatus] = useState(null);

  // Fetch article data
  useEffect(() => {
    const found = mockArticles.find(a => a.slug === slug);
    if (!found) {
      // Basic 404 handling -> simply redirect to home for now, or you could create a 404 page
      navigate('/');
      return;
    }
    
    // Simulate API Load delay for animation
    window.scrollTo(0, 0);
    setArticle(null); // trigger reload animation
    setTimeout(() => {
      setArticle(found);
      
      // Update basic Meta Title
      document.title = `${found.title} - Jubilé 2033`;

      // Find related articles (same category, not the current one)
      const related = mockArticles
        .filter(a => a.category === found.category && a.id !== found.id)
        .slice(0, 3);
      
      // Fallback if not enough related in category
      if (related.length < 3) {
        const others = mockArticles.filter(a => a.id !== found.id && !related.includes(a)).slice(0, 3 - related.length);
        setRelatedArticles([...related, ...others]);
      } else {
        setRelatedArticles(related);
      }
    }, 100);

  }, [slug, navigate]);

  // Generate Table Of Contents dynamically after render
  useEffect(() => {
    if (article) {
      setTimeout(() => {
        const headings = document.querySelectorAll('.article-content h2');
        const tocArray = Array.from(headings).map((h, i) => {
          h.id = `heading-${i}`;
          return { id: h.id, text: h.textContent };
        });
        setToc(tocArray);
      }, 300); // small delay to let HTML inject
    }
  }, [article]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  };

  const shareLink = (platform) => {
    alert(t('article.shareAlert', { platform }));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if(commentName && commentText) {
      setCommentStatus(t('article.commentSuccess'));
      setCommentName('');
      setCommentText('');
      setTimeout(() => setCommentStatus(null), 5000);
    }
  };

  if (!article) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#F5F3ED]">
         <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Find previous and next articles for pagination
  const currentIndex = mockArticles.findIndex(a => a.id === article.id);
  const prevArticle = currentIndex > 0 ? mockArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < mockArticles.length - 1 ? mockArticles[currentIndex + 1] : null;

  return (
    <div className="w-full bg-white pb-20 fade-in-section">
      <SEOMeta 
        title={article.title}
        description={article.excerpt || article.title}
        image={article.image}
        url={`https://impronte-africane.com/articles/${article.slug}`}
        type="article"
        author={article.author.name}
        publishedDate={new Date().toISOString()}
        schema={getArticleSchema(article)}
      />
      {/* 2. HERO SECTION */}
      <header className="relative w-full h-[300px] md:h-[450px] overflow-hidden flex flex-col justify-end pb-12 z-0">
        <img 
          src={article.image} 
          alt={article.title} 
          className="absolute inset-0 w-full h-full object-cover z-0 scale-105" 
        />
        {/* Dark/Blue Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B4D] via-[#1B1B4D]/60 to-[#1B1B4D]/10 z-10"></div>
        
        <Container className="relative z-20">
           <div className="mb-4 text-[#D4AF37] font-montserrat text-xs font-bold tracking-widest uppercase flex items-center">
             <Link to="/" className="hover:underline opacity-80 hover:opacity-100">{t('navigation.home')}</Link> 
             <span className="mx-2">&gt;</span> 
             <Link to="/ressources" className="hover:underline opacity-80 hover:opacity-100">{t('navigation.resources')}</Link> 
             <span className="mx-2">&gt;</span> 
             <span className="opacity-60">{article.category}</span>
           </div>
           
           <motion.h1 
             initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}
             className="text-3xl md:text-5xl lg:text-[54px] leading-tight font-playfair font-bold text-white max-w-4xl mb-6 drop-shadow-lg"
           >
             {article.title}
           </motion.h1>
           
           {/* 3. ARTICLE META INFO */}
           <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
             className="flex flex-wrap items-center gap-6 font-montserrat text-sm text-[#F5F3ED]"
           >
             <div className="flex items-center gap-3">
                <img src={article.author.avatar} alt={article.author.name} className="w-10 h-10 rounded-full border-2 border-[#D4AF37] object-cover" />
                <span className="font-bold">{article.author.name}</span>
             </div>
             <span className="opacity-50">|</span>
             <span>{article.date}</span>
             <span className="opacity-50">|</span>
             <span className="flex items-center"><svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> {article.readTime}</span>
             <Badge label={article.category} variant="primary" className="ml-auto" />
           </motion.div>
        </Container>
      </header>

      <Container className="pt-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Main Article Content */}
          <main className="w-full lg:w-[65%] flex-shrink-0">
            
            {/* Share buttons Mobile */}
            <div className="lg:hidden flex gap-3 mb-8 pb-8 border-b border-gray-200">
               <span className="font-montserrat text-xs font-bold uppercase text-gray-400 self-center mr-2">{t('sidebar.share')}</span>
               <button onClick={()=>shareLink('Facebook')} className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">f</button>
               <button onClick={()=>shareLink('Twitter')} className="w-8 h-8 rounded-full bg-blue-50 text-sky-500 flex items-center justify-center font-bold">X</button>
               <button onClick={()=>shareLink('Email')} className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-bold">@</button>
            </div>

            {/* TL;DR / Excerpt */}
            <p className="font-serif text-xl md:text-2xl text-[#1B1B4D] leading-relaxed mb-12 italic border-l-[4px] border-[#D4AF37] pl-6 py-2 bg-[#1B1B4D]/5 rounded-r-xl">
              {article.excerpt}
            </p>

            {/* 5. ARTICLE BODY (Rich HTML) */}
            {/* 
               We use advanced nested Tailwind selectors to safely style the raw HTML 
               coming from the mock database without needing additional CSS files.
            */}
            <div 
              className="
                article-content w-full font-serif text-[17px] leading-[1.9] text-[#4A4A4A]
                [&>h2]:font-playfair [&>h2]:text-[28px] md:[&>h2]:text-[32px] [&>h2]:font-bold [&>h2]:text-[#1B1B4D] [&>h2]:mt-14 [&>h2]:mb-8 [&>h2]:border-b [&>h2]:border-gray-100 [&>h2]:pb-4
                [&>p]:mb-8 [&>p]:text-justify
                [&>blockquote]:border-l-[4px] [&>blockquote]:border-[#D4AF37] [&>blockquote]:pl-6 [&>blockquote]:py-2 [&>blockquote]:my-10 [&>blockquote]:italic [&>blockquote]:text-[#B85D3E] [&>blockquote]:font-playfair [&>blockquote]:text-2xl [&>blockquote]:leading-relaxed [&>blockquote]:bg-[#F5F3ED]/50 [&>blockquote]:rounded-r-lg
                [&>ul]:list-disc [&>ul]:pl-8 [&>ul]:mb-8 [&>ul>li]:mb-3 [&>ul>li]:pl-2
                [&>.callout]:bg-[#F5F3ED] [&>.callout]:border-l-[4px] [&>.callout]:border-[#D4AF37] [&>.callout]:p-6 [&>.callout]:my-10 [&>.callout]:rounded-r-xl [&>.callout]:shadow-sm
                [&>img]:w-full [&>img]:!max-w-[100%] [&>img]:rounded-2xl [&>img]:shadow-[0_8px_30px_rgba(0,0,0,0.12)] [&>img]:my-12 [&>img]:object-cover
                [&>strong]:text-[#1B1B4D]
              "
              dangerouslySetInnerHTML={{ __html: article.content }} 
            />

            {/* Article Tags */}
            <div className="flex flex-wrap gap-3 mt-16 pt-8 border-t border-gray-200">
               <span className="font-montserrat font-bold text-sm text-[#1B1B4D] uppercase tracking-widest mt-1 mr-2">Tags :</span>
               {article.tags.map((tag, i) => (
                 <Badge key={i} label={tag} variant="default" className="bg-gray-100 hover:bg-[#D4AF37]/20 transition-colors cursor-pointer" />
               ))}
            </div>

            {/* 8. COMMENTS SECTION INTEGRATION */}
            <CommentsSection articleId={article.id} articleTitle={article.title} />

          </main>

          {/* 6. SIDEBAR SECONDARY (Desktop) */}
          <aside className="w-full lg:w-[35%] lg:sticky lg:top-24 self-start flex flex-col gap-10">
            
            {/* Share & TOC Combo Box */}
            <div className="bg-[#F5F3ED] rounded-2xl p-8 border border-[#D4AF37]/20 shadow-sm hidden lg:block">
               {/* 4. TABLE OF CONTENTS */}
               {toc.length > 0 && (
                 <>
                   <h4 className="font-montserrat font-bold text-[#1B1B4D] uppercase text-xs tracking-widest mb-6">{t('article.tocTitle')}</h4>
                   <nav className="mb-10">
                     <ul className="space-y-4">
                       {toc.map(item => (
                         <li key={item.id}>
                           <button 
                             onClick={() => scrollToSection(item.id)}
                             className="text-left font-serif text-[15px] text-[#5C5C4C] hover:text-[#D4AF37] hover:font-bold transition-all focus:outline-none"
                           >
                              {item.text}
                           </button>
                         </li>
                       ))}
                     </ul>
                   </nav>
                 </>
               )}

               {/* Share Buttons */}
               <h4 className="font-montserrat font-bold text-[#1B1B4D] uppercase text-xs tracking-widest mb-4 border-t border-gray-200 pt-6">{t('sidebar.share')}</h4>
               <div className="flex gap-3">
                 <button onClick={()=>shareLink('Facebook')} className="flex-1 py-2 rounded-lg bg-white border border-gray-200 text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center shadow-sm">
                   <strong className="font-serif">Facebook</strong>
                 </button>
                 <button onClick={()=>shareLink('Twitter')} className="flex-1 py-2 rounded-lg bg-white border border-gray-200 text-sky-500 hover:bg-sky-50 transition-colors flex items-center justify-center shadow-sm">
                   <strong className="font-serif">X</strong>
                 </button>
               </div>
            </div>

            {/* Author Bio Box */}
            <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col items-center text-center">
              <img src={article.author.avatar} alt="Author" className="w-24 h-24 rounded-full shadow-md border-4 border-[#F5F3ED] mb-4" />
              <h4 className="font-playfair text-xl font-bold text-[#1B1B4D] mb-1">{article.author.name}</h4>
              <p className="font-montserrat text-xs text-[#D4AF37] font-bold uppercase tracking-widest mb-4">{t('article.authorRole')}</p>
              <p className="font-serif text-[#5C5C4C] text-sm leading-relaxed">{article.author.bio}</p>
            </div>

            {/* Newsletter Box */}
            <div className="bg-[#1B1B4D] text-white rounded-2xl p-8 shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37] rounded-full filter blur-[60px] opacity-40"></div>
               <h4 className="font-playfair text-2xl font-bold text-[#D4AF37] mb-3 relative z-10">{t('sidebar.newsletter.title')}</h4>
               <p className="font-serif text-sm opacity-90 mb-6 relative z-10">{t('sidebar.newsletter.desc')}</p>
               <input type="email" placeholder={t('common.email')} className="w-full py-2 px-4 rounded text-black font-serif text-sm mb-3 outline-none" />
               <Button variant="secondary" fullWidth className="text-white border-white hover:bg-white hover:text-[#1B1B4D]">{t('sidebar.newsletter.btn')}</Button>
            </div>

          </aside>

        </div>
      </Container>


      {/* 7. FOOTER ARTICLE / PAGINATION & RELATED */}
      <section className="mt-24 pt-20 border-t border-gray-200 bg-white">
        <Container>
          
          {/* 9. PAGINATION */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-24 max-w-4xl mx-auto">
            {prevArticle ? (
              <Link to={`/articles/${prevArticle.slug}`} className="group flex flex-row items-center gap-4 w-full md:w-1/2 p-4 rounded-xl hover:bg-[#F5F3ED] transition-colors border border-transparent hover:border-[#D4AF37]/20">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0 group-hover:bg-[#1B1B4D] text-[#1B1B4D] group-hover:text-white transition-colors">&larr;</div>
                <div>
                  <p className="font-montserrat text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{t('article.prev')}</p>
                  <h4 className="font-playfair font-bold text-[#1B1B4D] line-clamp-1 group-hover:text-[#D4AF37]">{prevArticle.title}</h4>
                </div>
              </Link>
            ) : <div className="w-full md:w-1/2" />}

            {nextArticle ? (
              <Link to={`/articles/${nextArticle.slug}`} className="group flex flex-row-reverse items-center justify-end text-right gap-4 w-full md:w-1/2 p-4 rounded-xl hover:bg-[#F5F3ED] transition-colors border border-transparent hover:border-[#D4AF37]/20">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0 group-hover:bg-[#1B1B4D] text-[#1B1B4D] group-hover:text-white transition-colors">&rarr;</div>
                <div>
                  <p className="font-montserrat text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{t('article.next')}</p>
                  <h4 className="font-playfair font-bold text-[#1B1B4D] line-clamp-1 group-hover:text-[#D4AF37]">{nextArticle.title}</h4>
                </div>
              </Link>
            ) : <div className="w-full md:w-1/2" />}
          </div>

          {/* RELATED ARTICLES */}
          <h3 className="font-playfair text-3xl font-bold text-[#1B1B4D] text-center mb-12">{t('article.relatedTitle')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map(rel => (
              <Card 
                key={rel.id}
                title={rel.title}
                description={rel.excerpt}
                category={rel.category}
                image={rel.image}
                imageHeight={180}
                link={`/articles/${rel.slug}`}
                hoverable
              />
            ))}
          </div>

        </Container>
      </section>

    </div>
  );
};

export default ArticlePage;
