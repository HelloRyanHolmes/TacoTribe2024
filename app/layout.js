import './globals.css'

//Fonts
import { Inter } from 'next/font/google'
import candybeans from "next/font/local"
const inter = Inter({ subsets: ['latin'] })
const font = candybeans({src:"../assets/fonts/candy-beans.otf"})

//Utils
import Providers from '@/utils/Providers'

//Components
import Navbar from "@/components/Navbar";

export const metadata = {
  title: 'Taco-Tribe',
  description: 'Taco taco moreee tacooo',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Providers>
      <body className={font.className}>
        <Navbar />
        {children}
      </body>
      </Providers>
    </html>
  )
}
