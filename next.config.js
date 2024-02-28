/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  images: {
    domains: ['source.unsplash.com', 'image.tmdb.org','i.therarbg.com','localhost'],
  },
  reactStrictMode: true,
}

module.exports = nextConfig
