// 📄 Fayl: app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "DigiWorld Admin",
  description: "Admin Panel for DigiWorldUZ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
