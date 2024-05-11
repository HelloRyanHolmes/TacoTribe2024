"use client"
import Image from "next/image";
// import {bgConnected} from "../../assets/taco_sauce_bg.png"

const bg = "https://media.discordapp.net/attachments/1225423312906354788/1238568066707620000/MINTING_DAPP_BG_LOGGED_OUT.png?ex=663fc1e6&is=663e7066&hm=08d68b6f994270c4d8d756d83c0e00b289ad09f988ac4f35546857f9507fdac1&=&format=webp&quality=lossless&width=2078&height=1168";
const bgConnected = "https://media.discordapp.net/attachments/1225423312906354788/1238568066279805058/MINTING_DAPP_BG_LOGGED_IN.png?ex=663fc1e6&is=663e7066&hm=67b989a0dc29acc05bf587825d55b9607025675eaf86591d620be3e31d8e3ec5&=&format=webp&quality=lossless&width=2078&height=1168";
const bgMobile = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/taco_collection/taco-truck-night-mobile.png";
const bgMobileConnected = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/taco_collection/tacoOpenMobile.png";

import SauceMint from "../../components/UI/Buttons/Minting/tacoSauce"
import { useEffect, useState } from "react";
import { useAccount } from 'wagmi'

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

      <main className=" w-screen h-screen relative">
        <SauceMint/>
      </main>

    </>
  );
}
