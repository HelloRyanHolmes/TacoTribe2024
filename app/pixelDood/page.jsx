'use client'

import Image from "next/image";
import DoodlePixelMint from "../../components/UI/Buttons/Minting/doodlepixelTacos";

import { useAccount } from 'wagmi'
import { useEffect, useState } from "react";
import { SiOpensea } from "react-icons/si";

const bg = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/pixel_doodle/taco-truck-night.jpeg";
const bgConnected = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/pixel_doodle/taco-truck-day-inside.png";
const bgMobile = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/pixel_doodle/taco-truck-night-mobile.png";
const bgMobileConnected = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/pixel_doodle/taco-truck-day-inside-mobile.png";

export default function pixelDood() {
  const { isConnected, address } = useAccount()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [isConnected])

  return (
    <>
      {/* Background */}
      <div className="absolute top-0 left-0 w-screen h-screen z-0 md:block max-h-screen overflow-hidden">
        <div className="relative h-full">
          {!isConnected && isClient && <Image width={1920} height={1080} src={bg} className="object-cover max-sm:hidden h-full" />}
          {isConnected && isClient && <Image width={1920} height={1080} src={bgConnected} className="object-cover max-sm:hidden h-full scale-110" />}
          {!isConnected && isClient && <Image width={1920} height={1080} src={bgMobile} className="object-cover sm:hidden h-full" />}
          {isConnected && isClient && <Image width={1920} height={1080} src={bgMobileConnected} className="object-cover sm:hidden h-full" />}
        </div>
      </div>

      <a href="https://opensea.io/collection/pixeldoodledtacos" target="_blank" className="text-2xl z-[2000] absolute bottom-4 left-4 md:hidden rounded-full bg-white p-[1px]">
        <SiOpensea className="text-blue-500 text-3xl hover:scale-[1.10] duration-200 " />
      </a>

      <DoodlePixelMint />


    </>
  );
}
