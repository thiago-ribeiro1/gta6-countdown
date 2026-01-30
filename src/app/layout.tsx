import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GTA VI Countdown (Brazil Time)",
  description: "Countdown para o lançamento do GTA VI Hora de Brasília (BRT)",

  keywords: [
    "GTA VI",
    "GTA 6",
    "GTA VI countdown",
    "GTA VI lançamento",
    "GTA VI release date",
    "GTA VI Brasil",
    "GTA VI BRT",
    "Grand Theft Auto VI",
    "Rockstar Games",
    "Gamer",
    "Playstation 5"
  ],
  icons: {
    icon: "/icon.png"
  },

  openGraph: {
    title: "GTA VI Countdown (Brazil Time)",
    description: "Acompanhe a contagem regressiva oficial para o lançamento do GTA VI",
    url: "https://gtavicountdown.vercel.app",
    siteName: "GTA VI Countdown",
    images: [
      {
        url: "https://gtavicountdown.vercel.app/slide-3.jpg",
        width: 1200,
        height: 630,
        alt: "GTA VI Countdown"
      }
    ],
    locale: "pt_BR",
    type: "website"
  },

  twitter: {
    card: "summary_large_image",
    title: "GTA VI Countdown (Brazil Time)",
    description: "Contagem regressiva para o lançamento do GTA VI",
    images: ["https://gtavicountdown.vercel.app/slide-3.jpg"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <a className="skipLink" href="#conteudo">
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
