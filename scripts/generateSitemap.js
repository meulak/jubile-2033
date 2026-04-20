import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// Using generic parse as we are in Node land to easily pull slugs
// mockArticles inside src/data/mockArticles.js

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, '../public');

const SITE_URL = 'https://impronte-africane.com';

const staticPages = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/bible', priority: 0.8, changefreq: 'monthly' },
  { path: '/heritage', priority: 0.8, changefreq: 'monthly' },
  { path: '/ressources', priority: 0.8, changefreq: 'monthly' },
  { path: '/communaute', priority: 0.8, changefreq: 'monthly' },
  { path: '/search', priority: 0.5, changefreq: 'monthly' },
  { path: '/preferences/newsletter', priority: 0.3, changefreq: 'monthly' },
];

/**
 * A basic script extracting slugs from the mock data file for the sitemap generator.
 * In a real-world scenario, this would ping a CMS or Database API.
 */
function extractDynamicRoutes() {
  const content = fs.readFileSync(path.join(__dirname, '../src/data/mockArticles.js'), 'utf-8');
  const slugs = [];
  const regex = /slug:\s*['"]([^'"]+)['"]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    slugs.push(match[1]);
  }
  return slugs.map(slug => ({
    path: `/articles/${slug}`,
    priority: 0.7,
    changefreq: 'weekly'
  }));
}

function generateSitemap() {
  try {
    const dynamicRoutes = extractDynamicRoutes();
    const allRoutes = [...staticPages, ...dynamicRoutes];

    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

    // Write to public folder so it's copied to /dist/ upon vite build
    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), xml, 'utf8');
    console.log('✅ sitemap.xml successfully generated in /public/');
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();
