const fs = require('fs');
const path = require('path');
const { getAllNews } = require('../services/dataManager');

async function generateSitemap() {
  try {
    const baseUrl = 'https://stirix.site';
    
    const staticPages = [
      '',
      '/stiri',
      '/contact',
      '/despre-noi',
      '/politica-de-confidentialitate'
    ];

    // Obține toate știrile din baza de date
    const allNews = await getAllNews();

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
    xml += 'xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"\n';
    xml += 'xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

    // Adaugă paginile statice
    staticPages.forEach(page => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}${page}</loc>\n`;
      xml += `    <changefreq>daily</changefreq>\n`;
      xml += `    <priority>${page === '' ? '1.0' : '0.8'}</priority>\n`;
      xml += `  </url>\n`;
    });

    // Adaugă paginile de știri
    allNews.forEach(news => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/news/${news.id}</loc>\n`;
      xml += `    <lastmod>${new Date(news.updatedAt || news.timestamp).toISOString()}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.6</priority>\n`;
      
      // Adaugă news tag pentru Google News
      xml += `    <news:news>\n`;
      xml += `      <news:publication>\n`;
      xml += `        <news:name>Știri România</news:name>\n`;
      xml += `        <news:language>ro</news:language>\n`;
      xml += `      </news:publication>\n`;
      xml += `      <news:publication_date>${new Date(news.timestamp).toISOString()}</news:publication_date>\n`;
      xml += `      <news:title>${news.title}</news:title>\n`;
      xml += `    </news:news>\n`;
      xml += `  </url>\n`;
    });

    xml += '</urlset>';

    // Salvează sitemap-ul în directorul public
    fs.writeFileSync(
      path.join(__dirname, '../../public/sitemap.xml'),
      xml,
      'utf8'
    );

    console.log('Sitemap generated successfully!');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

// Rulează funcția dacă este apelat direct
if (require.main === module) {
  generateSitemap();
}

module.exports = generateSitemap;