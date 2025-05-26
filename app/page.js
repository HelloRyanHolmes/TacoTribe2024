"use client"
import Image from "next/image";

const bg = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/taco_collection/taco-truck-night.png";
const bgConnected = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/taco_collection/tacoOpen.png";
const bgMobile = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/taco_collection/taco-truck-night-mobile.png";
const bgMobileConnected = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/taco_collection/tacoOpenMobile.png";

import TacoMint from "../components/UI/Buttons/Minting/tacos"
import { useEffect, useState } from "react";
import { useAccount } from 'wagmi'
import { SiOpensea } from "react-icons/si";

export default function Home() {

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
          {!isConnected && isClient && <Image width={1920} height={1080} src={bg} className="object-cover max-sm:hidden w-full h-full" />}
          {isConnected && isClient && <Image width={1920} height={1080} src={bgConnected} className="object-cover max-sm:hidden w-full h-full scale-110" />}
          {!isConnected && isClient && <Image width={1920} height={1080} src={bgMobile} className="object-cover sm:hidden h-full" />}
          {isConnected && isClient && <Image width={1920} height={1080} src={bgMobileConnected} className="object-cover sm:hidden h-full" />}
        </div>

      </div>

      <a href="https://opensea.io/collection/tacotribenfts" target="_blank" className="text-white text-2xl z-[2000] absolute bottom-4 left-4">
        <SiOpensea className="text-white text-3xl hover:scale-[1.10] duration-200 " />
      </a>
    
        <TacoMint/>


    </>
  );
}
