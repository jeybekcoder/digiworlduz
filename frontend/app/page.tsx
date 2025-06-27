// 📄 Fayl: page.tsx
// 📁 Joylashuvi: digiworlduz/frontend/app/
// 🎯 Maqsad: Loyihaning asosiy sahifasi (homepage) sifatida Preloaderni va asosiy contentni ko‘rsatadi

'use client';

import Preloader from './components/Preloader';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <main className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">
          <h1 className="text-4xl font-bold">DigiWorld.uz – Asosiy Sahifa</h1>
        </main>
      )}
    </>
  );
}
