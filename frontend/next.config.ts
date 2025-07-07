// 📄 Fayl: next.config.ts
// 🎯 Maqsad: Unsplash (va boshqa manbalardan) rasm yuklash uchun Next.js `next/image` konfiguratsiyasi

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
