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

// import ogImage from './opengraph-image.png'

export const metadata = {
  title: 'Taco Tribe Shop',
  description: 'Taco taco moreee tacooo',
  openGraph: {
    title: 'Taco Tribe Dapp',
    description: 'Taco taco moreee tacooo',
    url: 'https://tacotribe.vercel.app',
    siteName: 'Taco Tribe Shop',
    images: [
      {
        url: 'https://d19rxn9gjbwl25.cloudfront.net/projectImages/home/background-image.png',
        width: 800,
        height: 600,
      },
      {
        url: 'https://d19rxn9gjbwl25.cloudfront.net/projectImages/home/background-image.png',
        width: 1800,
        height: 1600,
        alt: 'Taco Tribe Shop',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
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
