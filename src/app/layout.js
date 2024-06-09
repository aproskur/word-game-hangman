import { Inter } from "next/font/google";
import localFont from 'next/font/local'
import "./globals.css";
import StyledComponentsRegistry from './lib/registry'

const inter = Inter({ subsets: ["latin"] });

const wordGameFont = localFont({
  src: './assets/fonts/MouseMemoirs-Regular.ttf',
  display: 'swap',
  variable: '--font-wordGameFont'
})

export const metadata = {
  title: 'Hangman Word Game',
  description: 'Annawebdev game inspired by FrontendMentor',
}
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${wordGameFont.variable}`}>
      <body className={inter.className}><StyledComponentsRegistry>{children}</StyledComponentsRegistry></body>
    </html>
  );
}
