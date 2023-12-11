import Image from "next/image"

import { doodledPixelTacoMintSetup } from "../Buttons/Minting/doodlepixelTacos"
import { doodledTacoMintSetup } from "../Buttons/Minting/doodleTacos"
import { pixelMintSetup } from "../Buttons/Minting/pixelTacos"
import { useEffect, useState } from "react"

import { useAccount } from 'wagmi'

const guacos = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/guacos.png"
const doodle = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/doodle.png"
const gvsc = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/gvsc.png"
const pixelDoodledTaco = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/Pixel Doodled Taco.png"
const pixelTaco = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/Pixel Taco.png"
const tacoTribe = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/Taco Tribe.png"


export default function StakeTemplate({ name }) {
  const [img, setImg] = useState("")
  // const [contract, setContract] = useState()
  const [balance, setBalance] = useState(0)

  const { address } = useAccount()

  const getContractDetails = async () => {
    switch (name) {
      case "Taco Tribe":
        setImg(tacoTribe)
        return "Taco Tribe"
      case "Pixel Taco":
        setImg(pixelTaco)
        return await pixelMintSetup()
      case "Doodled Taco":
        setImg(doodle)
        return await doodledTacoMintSetup()
      case "Guaco Tribe":
        setImg(guacos)
        return "Guaco Tribe"
      case "Guac VS Sour Cream":
        setImg(gvsc)
        return "Guac VS Sour Cream"
      case "Pixel Doodled Taco":
        setImg(pixelDoodledTaco)
        return await doodledPixelTacoMintSetup()
      case "":
        setImg("")
        return "No Taco Selected"
      default:
        return "Taco Tribe"
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getContractDetails()
      console.log(data)
      // setContract(data)
      if(data === "No Taco Selected"){
        setBalance("N/A")
      }
      else{
        typeof(data) !== 'string' ? setBalance(await data?.balanceOf(address)) : setBalance(10)
      }
    }
    fetchData()
  }, [name])

  return (
    <div className="w-[95%] md:w-[700px] bg-yellow-400 overflow-hidden items-center justify-center grid grid-cols-2 max-md:grid-cols-1 gap-5 p-5 rounded-[32px]">
      <div className="h-80 my-auto flex items-center justify-center"><Image width={500} height={500} src={img} className=" object-cover object-center w-full pl-10" /></div>
      <div className="flex flex-col max-md:text-center max-md:items-center gap-2 h-fit w-[80%] mx-auto my-auto">
        <div className="bg-white rounded-full w-full px-4 py-2 shadow shadow-black/20 text-black text-xl"><h2 >{name?.length === 0 ? 'Select A Taco' : name}</h2></div>
        <div className="bg-white rounded-full w-full px-4 py-2 shadow shadow-black/20 text-black text-xl"><h2 >Available Tacos: {Number(balance)}</h2></div>
        <div className="w-fit py-1 text-[#73851C] text-3xl"><h2 >Stake your Tacos and earn $GUAC</h2></div>
        <div className="bg-white rounded-full w-fit px-4 py-1 shadow shadow-black/20 text-black cursor-pointer hover:bg-white/80"><h2 >Learn More</h2></div>
      </div>
    </div>
  )
}