/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['uploads.mangadex.org', 'mangadex.org']
  }
};

module.exports = nextConfig;
