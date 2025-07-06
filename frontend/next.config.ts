// 📄 Fayl: next.config.ts
// 🎯 Maqsad: next/image uchun Pixabay kabi tashqi rasm domenlariga ruxsat berish (yangi usul)

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
