import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MesaProvider } from "./context/MesaContext"; // ✅ importa provider

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Goose Adega",
  description: "Gerenciamento de mesas do restaurante",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <MesaProvider>
          {children}
        </MesaProvider>
      </body>
    </html>
  );
}
