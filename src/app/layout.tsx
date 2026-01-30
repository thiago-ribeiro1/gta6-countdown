import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GTA VI Countdown (Brazil Time)",
  description: "Countdown para o lançamento do GTA VI Hora de Brasília (BRT)",
  icons: {
    icon: "/icon.png"
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
