// app/sitemap.js
export default async function sitemap() {
  const baseUrl = 'http://localhost:3000';  // Remove trailing slash

  // Define static pages with proper URL encoding
  const pages = [
    { path: '/', lastModified: new Date().toISOString() },
    { path: '/about', lastModified: new Date().toISOString() },
    { path: '/blogs', lastModified: new Date().toISOString() },
    { path: '/blogs/' + encodeURIComponent('Understanding Node.js: A Comprehensive Guide'), 
      lastModified: new Date().toISOString() 
    },
  ];

  // Generate sitemap entries
  const sitemap = pages.map(({ path, lastModified }) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency: 'daily',  // Add changeFrequency
    priority: 1.0,             // Add priority
  }));

  return sitemap;
}