import './globals.css'

//Fonts
import { Inter } from 'next/font/google'
import candybeans from "next/font/local"
const inter = Inter({ subsets: ['latin'] })
const font = candybeans({src:"../assets/fonts/candy-beans.otf"})


//Utils
import Providers from '../utils/Providers'

//Components
// const Navbar = dynamic(() => import("../components/Navbar"), { ssr: false });
import Navbar from "../components/Navbar"

const bg = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/pixel_doodle/taco-truck-night.jpeg";

export const metadata = {
  title: 'Taco Tribe Shop',
  description: 'Taco taco moreee tacooo',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
      <Providers>
        <Navbar/>
        {children}
      </Providers>
      </body>
    </html>
  )
}
