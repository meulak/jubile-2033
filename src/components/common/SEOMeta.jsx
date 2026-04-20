import React from 'react';
import { Helmet } from 'react-helmet-async';
import { seoConfig } from '../../constants/seoConfig';

const SEOMeta = ({ 
  title, 
  description, 
  image, 
  url, 
  type = 'website', 
  author, 
  publishedDate, 
  modifiedDate, 
  keywords,
  schema
}) => {
  
  const siteTitle = title ? `${title} | ${seoConfig.SITE_NAME}` : seoConfig.SITE_NAME;
  const metaDescription = description || seoConfig.SITE_DESCRIPTION;
  const metaImage = image ? (image.startsWith('http') ? image : `${seoConfig.SITE_URL}${image}`) : `${seoConfig.SITE_URL}${seoConfig.DEFAULT_IMAGE}`;
  const metaUrl = url || seoConfig.SITE_URL;
  const metaKeywords = keywords ? keywords : seoConfig.KEYWORDS.join(', ');

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      {author && <meta name="author" content={author} />}

      {/* Open Graph Tags (Facebook, LinkedIn) */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={seoConfig.SITE_NAME} />

      {/* Twitter Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      
      {/* Article Specific Defaults */}
      {publishedDate && <meta property="article:published_time" content={publishedDate} />}
      {modifiedDate && <meta property="article:modified_time" content={modifiedDate} />}

      <link rel="canonical" href={metaUrl} />

      {/* JSON-LD Schema.org Injection (Si fourni) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOMeta;
