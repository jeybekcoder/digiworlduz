// 📄 Fayl: Preloader.tsx
// 📁 Joylashuvi: digiworlduz/frontend/app/components/
// 🎯 Maqsad: Websitening ochilishida ko‘rsatiladigan professional, 1:1 dizayn asosidagi preloader animatsiyasini ko‘rsatadi.
// 🧠 Bu komponent sayt yuklanayotganda foydalanuvchiga animatsion loader ko‘rsatadi. 3 ta nuqta aylanishi animatsiyasi bilan chiqib turadi va 2 soniya ichida yo‘qoladi.
// 💡 Tailwind CSS orqali to‘liq responsive, framer-motion bilan yo‘qolish animatsiyasi berilgan. Dizaynga 100% mos.

'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 2000); // 2 soniyadan keyin yo‘qoladi
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-black"
        >
          <div className="flex gap-2">
            <span className="w-4 h-4 bg-gray-900 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-4 h-4 bg-gray-900 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-4 h-4 bg-gray-900 rounded-full animate-bounce"></span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
