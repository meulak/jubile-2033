import { seoConfig } from '../constants/seoConfig';

export const getOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": seoConfig.SITE_NAME,
    "description": seoConfig.SITE_DESCRIPTION,
    "url": seoConfig.SITE_URL,
    "logo": `${seoConfig.SITE_URL}/logo.png`,
    "sameAs": Object.values(seoConfig.SOCIAL_ACCOUNTS),
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "email": "contact@impronte-africane.com"
    }
  };
};

export const getArticleSchema = (article) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt || article.title,
    "image": article.image ? `${seoConfig.SITE_URL}${article.image}` : `${seoConfig.SITE_URL}${seoConfig.DEFAULT_IMAGE}`,
    "datePublished": article.datePublished || new Date().toISOString(),
    "dateModified": article.dateModified || new Date().toISOString(),
    "author": {
      "@type": "Person",
      "name": article.author || "Auteur Inconnu"
    },
    "publisher": {
      "@type": "Organization",
      "name": seoConfig.SITE_NAME,
      "logo": {
        "@type": "ImageObject",
        "url": `${seoConfig.SITE_URL}/logo.png`
      }
    }
  };
};

export const getEventSchema = (event) => {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.title,
    "startDate": event.startDate,
    "endDate": event.endDate,
    "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "VirtualLocation",
      "url": event.url || seoConfig.SITE_URL
    },
    "description": event.description || seoConfig.SITE_DESCRIPTION,
    "organizer": getOrganizationSchema()
  };
};

export const getPersonSchema = (person) => {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": person.name,
    "description": person.description,
    "image": person.image ? `${seoConfig.SITE_URL}${person.image}` : undefined,
    "url": person.url ? `${seoConfig.SITE_URL}${person.url}` : undefined,
    "jobTitle": person.role || "Contributeur"
  };
};
