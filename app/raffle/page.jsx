'use client'

import Image from "next/image";

import { useAccount } from 'wagmi'
import { useEffect, useState } from "react";

const bg = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/taco-raffles/raffleBg.png";
const bgConnected = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/taco-raffles/raffleLive.png";
const bgMobile = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/taco-raffles/raffleBgMobile.png";
const bgMobileConnected = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/taco-raffles/raffleLiveMobile.png";

const banner = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/taco-raffles/raffleHeader.png";
const guacLogo = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/Guac logo small.png";

import RaffleCard from "../../components/UI/Raffle/raffleCard"

export default function Raffle() {
  const { isConnected, address } = useAccount()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [isConnected])

  return (
    <>
      {/* Background */}
      <div className="absolute top-0 left-0 w-screen h-screen z-0 bg-white md:block">
        <div className="relative h-full">
          {!isConnected && isClient && <Image width={1920} height={1080} src={bg} className="object-cover max-sm:hidden h-full" />}
          {isConnected && isClient && <Image width={1920} height={1080} src={bgConnected} className="object-cover max-sm:hidden h-full" />}
          {!isConnected && isClient && <Image width={1920} height={1080} src={bgMobile} className="object-cover sm:hidden h-full" />}
          {isConnected && isClient && <Image width={1920} height={1080} src={bgMobileConnected} className="object-cover sm:hidden h-full" />}
        </div>
      </div>

      <main className="flex flex-col items-center gap-20 w-screen h-screen relative">
        <div className="relative lg:w-full mx-auto pt-20 mt-10">
          <Image width={1920} height={1080} src={banner} className="object-cover w-[110vw]" />
        </div>
        <div className=" text-black">
          <h1 className="text-3xl">Purchase Tickets Using<span className=" inline-block ml-2 -mb-1"><Image width={25} height={25} src={guacLogo}></Image></span> $Guac!</h1>
        </div>
        <div className=" text-black translate-y-5">
          <h1 className="text-5xl">PREVIOUS WINNERS:</h1>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-10 overflow-y-scroll pt-5">
          <RaffleCard />
          <RaffleCard />
          <RaffleCard />
          <RaffleCard />
          <RaffleCard />
          <RaffleCard />
          <RaffleCard />
        </div>
      </main>

    </>
  );
}
