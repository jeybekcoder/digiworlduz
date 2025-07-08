// 📄 Fayl: src/pages/_document.tsx
// 🎯 Maqsad: Custom `Document` fayli — Google Fonts (yoki boshqa fontlar)ni butun ilova bo‘yicha global yuklash uchun kerak
// ✅ Next.js 15 bilan mos, font @import lar head ichida joylashtirilgan, SEO va performance uchun optimallashtirilgan

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="uz">
      <Head>
        {/* ✅ Google Fonts — Rubik & Inter */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}