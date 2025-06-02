'use client'

import Image from "next/image";

import { useAccount } from 'wagmi'
import { useEffect, useState } from "react";
import RaffleFetcher from "../../components/UI/Raffle/raffleFetcher"
import PastWinners from "../../components/UI/Raffle/pastwinners"
import { contractAdds } from "../../utils/contractAdds";
import { ethers } from "ethers";
import noraffle from "../../assets/raffle_comingsoon.png"


import raffleabi from "../../utils/newAbis/raffleabi";

const contruction = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/contructiontaco.png"

const bg = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/taco-raffles/raffleBg.png";
const bgConnected = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/taco-raffles/raffleLive.png";
const bgMobile = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/taco-raffles/raffleBgMobile.png";

const banner = "https://d19rxn9gjbwl25.cloudfront.net/ui/taco_raffle_banner.png";
const guacLogo = "https://d19rxn9gjbwl25.cloudfront.net/ui/guac_coin.png";

export default function Raffle() {
  const { isConnected, address } = useAccount()
  const [isClient, setIsClient] = useState(false)

  const [raffles, setRaffles] = useState([])
  const [endedRaffles, setEndedRaffles] = useState([])



  useEffect(() => {
    setIsClient(true)
  }, [isConnected])

  async function raffleContract(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    try {
    const contract = new ethers.Contract(contractAdds.raffle, raffleabi, signer);
    // console.log("raffle", raffleAdd);
    return contract;
    }
    catch(err){
      console.log(err);
    }
  }

  async function fetchRaffles(){
    try{
      setRaffles([])
      const contract = await raffleContract();
      const response = await contract.fetchActiveRaffles();

      console.log(response);

      response.forEach((item, i) => {
        const shit = item[0].toLowerCase()+item[1];
        console.log(shit);
        const image = "https://tacotribe.s3.ap-south-1.amazonaws.com/raffles/"+shit;

        console.log(image);
        
        setRaffles((prev) => [...prev, [...item, image]]);
      });

      
    }
    catch(err){
      console.log(err);
    }
  }

  async function fetchEndedRaffles(){
    try{
      setEndedRaffles([])
      const contract = await raffleContract();
      const response = await contract.fetchEndedRaffles();

      response.forEach((item) => {
        const shit = item[0].toLowerCase()+item[1];
        const image = "https://tacotribe.s3.ap-south-1.amazonaws.com/raffles/"+shit;
        console.log(image);

        if(item[0] != "0x0000000000000000000000000000000000000000")
          setEndedRaffles((prev) => [...prev, [...item, image]]);
      });
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    fetchRaffles();
    fetchEndedRaffles()
  },[address])

  return (
    <>
      {/* Background */}
      <div className="fixed top-0 left-0 w-screen h-full z-0 bg-[#d1ffc3] md:block overflow-x-hidden">
        <div className="relative h-full">
          {!isConnected && isClient && <Image width={1920} height={1080} src={bg} className="object-cover max-sm:hidden h-full" />}
          {isConnected && isClient && <Image width={1920} height={1080} src={bgConnected} className="object-cover max-sm:hidden h-full" />}
          {!isConnected && isClient && <Image width={1920} height={1080} src={bgMobile} className="object-cover sm:hidden h-full" />}
          {/* {isConnected && isClient && <Image width={1920} height={1080} src={bgMobileConnected} className="object-cover sm:hidden " />} */}
        </div>
      </div>

      {isConnected && isClient && <main className="flex flex-col items-center overflow-hidden gap-10 w-screen max-[1240px]:bg-[#d1ffc3] max-[1240px]:h-fit relative">
        <div className="relative w-[50%] max-md:w-[90%] pt-16 mt-10 ">
          <Image width={1920} height={1080} src={banner} className="h-full" />
        </div>
        <div className="text-black text-center">
          <h1 className="text-4xl max-sm:px-10 max-sm:text-3xl">Purchase Tickets Using<span className=" inline-block ml-2 "><Image className="w-10" width={100} height={100} src={guacLogo}></Image></span> $Guac!</h1>

          <div className="flex flex-wrap gap-4 item-center justify-center mt-10">
            { raffles.map((item, i)=>(
              <RaffleFetcher data={item} number={i} />
            ))}
            {raffles.length == 0 && <div className="bg-gradient-to-b from-purple-500 to-lime-400 shadow-xl shadow-black/40 h-fit w-fit rounded-2xl border-2 border-black p-5 mx-auto flex items-center justify-center">
                <Image width={1920} height={1080} src={noraffle} className="w-96 border-2 border-black bg-white rounded-lg "/>
                </div>}
          </div>

        </div>
        <div className=" text-black translate-y-5 text-center">
          <h1 className="text-5xl">PREVIOUS WINNERS:</h1>
          
          <div className="flex flex-wrap gap-4 items-center justify-center relative h-full mx-auto mt-10">
            {endedRaffles.slice(endedRaffles.length-4, endedRaffles.length-1).map((item, i)=>(
              <PastWinners data={item}/>
            ))}
            {endedRaffles.length == 0 && <h2>NOTHING TO LOOK AT</h2>}
          </div>
        </div>
        

      </main>}

{/* <div className="relative z-10 text-center top-[10rem]">
        <Image width={1920} height={1080} src={contruction} className="w-[20rem] mx-auto"/>
        <h1 className="text-black text-[2rem]">Under Construction!</h1>
      </div> */}

    </>
  );
}
