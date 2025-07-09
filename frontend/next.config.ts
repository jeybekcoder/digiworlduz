// 📄 Fayl: next.config.ts
// 🎯 Maqsad: Unsplash, Pixabay va Source.unsplash.com kabi tashqi manbalardan rasm yuklashni ruxsat berish.

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
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com', // ✅ Vaqtinchalik test uchun qo‘shildi
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;