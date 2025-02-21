// app/sitemap.js

export default async function sitemap() {
  const baseUrl = 'https://www.evokecreators.in/'; // Change to your actual domain

  // Define static pages
  const pages = [
    { path: '/', lastModified: new Date().toISOString() },
    { path: '/about', lastModified: new Date().toISOString() },
    { path: '/blogs', lastModified: new Date().toISOString() },
    { path: '/blogs/Understanding%20Node.js:%20A%20Comprehensive%20Guide', lastModified: new Date().toISOString() },
  ];

  // Generate sitemap entries
  const sitemap = pages.map(({ path, lastModified }) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    alternates: {
      languages: {
        en: `${baseUrl}${path}`,
        es: `${baseUrl}/es${path}`,
        de: `${baseUrl}/de${path}`,
      },
    },
  }));

  return sitemap;
}
