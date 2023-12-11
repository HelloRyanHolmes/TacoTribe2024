import Image from "next/image"

import { doodledPixelTacoMintSetup } from "../Buttons/Minting/doodlepixelTacos"
import { doodledTacoMintSetup } from "../Buttons/Minting/doodleTacos"
import { pixelMintSetup } from "../Buttons/Minting/pixelTacos"
import { useEffect, useState } from "react"

import { useAccount } from 'wagmi'

const guacos = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/guacos.png"
const doodle = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/doodle.png"


export default function StakeTemplate({ name }) {
  const [img, setImg] = useState("")
  // const [contract, setContract] = useState()
  const [balance, setBalance] = useState(0)

  const { address } = useAccount()

  const getContractDetails = async () => {
    switch (name) {
      case "Taco Tribe":
        return "Taco Tribe"
      case "Pixel Taco":
        return await pixelMintSetup()
        // break
      case "Doodled Taco":
        setImg(doodle)
        return await doodledTacoMintSetup()
        break
      case "Guaco Tribe":
        setImg(guacos)
        return "Guaco Tribe"
      case "Guac VS Sour Cream":
        return "Guac VS Sour Cream"
      case "Pixel Doodled Taco":
        return await doodledPixelTacoMintSetup()
        break
      default:
        return "Taco Tribe"
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getContractDetails()
      console.log(data)
      // setContract(data)
      setBalance(await data?.balanceOf(address))
    }
    fetchData()
  }, [name])

  return (
    <div className="w-[60%] bg-yellow-400 grid grid-cols-2 gap-5 p-5 py-10 rounded-[32px]">
      <Image width={500} height={500} src={img} className=" w-full pl-10" />
      <div className="flex flex-col gap-2 h-fit w-[80%] mx-auto my-auto">
        <div className="bg-white rounded-full w-full px-4 py-2 shadow shadow-black/20 text-black text-xl"><h2 >{name}</h2></div>
        <div className="bg-white rounded-full w-full px-4 py-2 shadow shadow-black/20 text-black text-xl"><h2 >Available Tacos: {Number(balance)}</h2></div>
        <div className="w-fit py-1 text-[#73851C] text-3xl"><h2 >Stake your Tacos and earn $GUAC</h2></div>
        <div className="bg-white rounded-full w-fit px-4 py-1 shadow shadow-black/20 text-black cursor-pointer hover:bg-white/80"><h2 >Learn More</h2></div>
      </div>
    </div>
  )
}