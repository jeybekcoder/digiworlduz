// 📄 Fayl: frontend/src/app/page.tsx
// 🎯 Maqsad: DigiWorldUZ sahifasining silliqlashtirilgan (responsive, padding, rang) asosiy sahifasi
// 🧱 Tailwind CSS bilan moslashtirilgan, dark mode bilan uyg‘un

export default function HomePage() {
  return (
    <main className="min-h-screen w-full bg-white text-black dark:bg-[#111] dark:text-white transition-colors duration-300">
      <section className="max-w-[1440px] mx-auto px-4 pt-12">
        <h1 className="text-[20px] sm:text-[24px] font-semibold tracking-tight">
          DigiWorldUZ boshlang‘ich sahifa
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          Bu yerda asosiy komponentlar bosqichma-bosqich joylashtiriladi.
        </p>
      </section>
    </main>
  )
}

// 💡 Izoh:
// - `transition-colors` + `duration-300` → dark/light modelararo silliq o‘tish
// - `tracking-tight`, `pt-12` → professional spacing va tipografiya
// - `max-w-[1440px]` → DW dizayniga mos kenglik