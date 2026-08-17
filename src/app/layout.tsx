import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "../contexts/LanguageContext";

export const metadata: Metadata = {
  title: "Muh Alif Al Gibran Arif | Flutter Engineer",
  description: "Personal portfolio of Muh Alif Al Gibran Arif - Flutter Engineer with almost 5 years of experience. Building cross-platform apps with passion.",
  keywords: ["Flutter", "Engineer", "Portfolio", "Mobile Developer", "Muh Alif Al Gibran Arif"],
  authors: [{ name: "Muh Alif Al Gibran Arif" }],
  openGraph: {
    title: "Muh Alif Al Gibran Arif | Flutter Engineer",
    description: "Personal portfolio of Muh Alif Al Gibran Arif - Flutter Engineer with almost 5 years of experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-paper">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
