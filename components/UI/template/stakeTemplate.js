import Image from "next/image";

import Swal from 'sweetalert2';

import { ethers } from "ethers";
import { useEffect, useState } from "react";


import { useGlobalContext } from "../../../context/MainContext";
import { contractAdds } from "../../../utils/contractAdds";
import sauceInfoabi from "../../../utils/newAbis/sauceInfoabi"
import HardStake from "../Buttons/StakingButtons/HardStake";
import SoftStake from "../Buttons/StakingButtons/SoftStake";
import sauce from "../../../assets/sauceStake.png"
import abinew from "../../../utils/newAbis/consolidationabi";
import NotStaked from "../Buttons/StakingButtons/NotStaked";
import { useAccount } from "wagmi";
import { RiLoader5Fill } from "react-icons/ri";


const guacos = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/guacos.png"
const doodle = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/doodle.png"
const gvsc = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/gvsc.png"
const pixelDoodledTaco = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/Pixel Doodled Taco.png"
const pixelTaco = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/Pixel Taco.png"
const tacoTribe = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/Taco Tribe.png"
const babyTaco = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/babies.png"

const claimUp = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/Tan+Button+UP.png"
const claimDown = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/Tan+Button+DOWN.png"

const claimNFTUp = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/Red Button UP.png"
const claimNFTDown = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/Red Button dOWN.png"

const error = "https://d19rxn9gjbwl25.cloudfront.net/ui/error.png"


export default function StakeTemplate({ tacoType }) {
  const [img, setImg] = useState("")
  const [balance, setBalance] = useState(0);
  const [reward, setReward] = useState(0)
  const[holdingValue, setHoldingValue] = useState([]);


  const addnew = contractAdds.consolidation;
  const sauceInfoAdd = contractAdds.sauceInfo;

  const { setLoader, refreshGuac } = useGlobalContext();

  const imgArr = [tacoTribe, doodle, "", pixelTaco, pixelDoodledTaco, babyTaco, guacos, gvsc, sauce];
  const nameArr = ["Taco Tribe", "Doodle Tacos", "", "Pixel Tacos", "Pixel Doodle Tacos", "Baby Tacos", "Guaco Tribe", "Guac vs Sour Cream", "Taco Sauce"]
  const rewardAmount = [10, 10, 0, 3, 3, 5, 5, 5, 3];

  const [loading, setLoading] = useState(false);

  const{address} = useAccount()

  async function contractSetup(){

    setReward(rewardAmount[tacoType]);
    const provider = new ethers.getDefaultProvider("https://polygon-mainnet.infura.io/v3/572a699984034c5bb63ebdc9dafa15d1");

    try {
      if(tacoType < 8){
        const contract = new ethers.Contract(addnew, abinew, provider);
        setLoader(false);
        console.log("I am contract", contract)
        return contract;
      }
      else{
        const contract = new ethers.Contract(sauceInfoAdd, sauceInfoabi, provider);
        setLoader(false);
        return contract;
      }
    }
    catch (err) {

      console.log("Error", err)
      Swal.fire({
        title: 'Error!',
        text: 'Couldn\'t get fetching contract',
        imageUrl: error,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: "Taco OOPS!",
        confirmButtonText: 'Bruh 😭',
        confirmButtonColor: "#facc14",
        customClass: {
          container: "border-8 border-black",
          popup: "bg-white rounded-2xl border-8 border-black",
          image: "-mb-5",
          confirmButton: "w-40 text-black"
        }
      })
    }
  }
  
  const handleContract = async (tacoType) => {
    setLoading(true);
    try{
      setImg(imgArr[tacoType]);
      const contract = await contractSetup();
      const arr = [];
      
      if(tacoType < 8){
        const dataArr = [contract?.balanceTaco(address), contract?.balanceDoodle(address), "", contract?.balancePT(address), contract?.balanceDP(address), contract?.balanceBT(address), contract?.balanceGT(address), contract?.balanceGS(address)]

        const data = await dataArr[tacoType];
        await data.map((item)=>{
          const tokenId = Number(item.tokenId);
          const stakeType = Number(item.stakeType);
          const guac = Number(ethers.utils.formatEther(String(item.unclaimed)));
          arr.push({tokenId, stakeType, guac});
        })
      }
      else{
        const data = await contract?.tokenOfOwner(address);
        await data.map((item)=>{
          const tokenId = Number(item.tokenId);
          const stakeType = Number(item.stakeType);
          const guac = Number(ethers.utils.formatEther(String(item.unclaimed)));
          arr.push({tokenId, stakeType, guac});
        })
      }
      
      setBalance(arr.length)
      setHoldingValue(arr);
    }
    catch(err){
      console.log(err);
    }
    finally{
      setLoading(false);
    };
  }

  useEffect(() => {
    setBalance(0);
    setHoldingValue([]);
    handleContract(tacoType)
  }, [tacoType])

  const [nftType, setNftType] = useState(1);


  return (
    <div>
      <div className="w-[95%] md:w-[700px] mx-auto bg-yellow-400 mb-10 overflow-hidden items-center justify-center grid grid-cols-2 max-md:grid-flow-row max-md:grid-cols-1 gap-x-5 p-5 rounded-[32px]">
        <div className="h-64 my-auto flex flex-col items-center justify-center">
          <Image alt="taco" width={500} height={500} src={img} className={`object-cover object-center ${tacoType !== 0 && tacoType !== 3 && tacoType !== 4 ? "w-[70%]": "w-[90%]"}`} />

        </div>
        <div className="flex flex-col max-md:text-center max-md:items-center gap-2 h-fit w-[80%] mx-auto my-auto">
          <div className="bg-white rounded-full w-full px-4 py-2 shadow shadow-black/20 text-black text-xl"><h2 >{nameArr[tacoType]}</h2></div>
          <div className="bg-white rounded-full w-full px-4 py-2 shadow shadow-black/20 text-black text-xl"><h2 >Available Tacos: {Number(balance)}</h2></div>
          <div className="w-fit py-1 text-[#73851C] text-3xl"><h2 >Stake your Tacos and earn {reward} $GUAC per Taco</h2></div>
          <div className="bg-white rounded-full w-fit px-4 py-1 shadow shadow-black/20 text-black cursor-pointer hover:bg-white/80"><a href="https://www.nft.tacotribe.shop/perks/#section2" >Learn More</a></div>
        </div>
        
      </div>

      {/* <div className="text-black text-center text-lg">
        <ol>
          <li>Not Staked: This section shows</li>
        </ol>
      </div> */}

      <div className="grid grid-cols-2 gap-5 max-md:gap-5 max-md:text-sm w-fit mx-auto text-lg bg-yellow-200 rounded-full">
        <button onClick={()=>{setNftType(0)}} className={`rounded-full py-2 ${nftType == 0 && "bg-yellow-400 border-2 border-black"} px-10 text-black hover:scale-105 transition-all duration-300 ease-out`}>Not Staked</button>
        <button onClick={()=>{setNftType(1)}} className={`rounded-full py-2 ${nftType == 1 && "bg-yellow-400 border-2 border-black"} px-10 text-black hover:scale-105 transition-all duration-300 ease-out`}>Soft Staked</button>
        {/* <button onClick={()=>{setNftType(2)}} className={`rounded-full py-2 ${nftType == 2 && "bg-yellow-400 border-2 border-black"} px-10 text-black hover:scale-105 transition-all duration-300 ease-out`}>Hard Staked</button> */}
      </div>

      <div className="border-2 border-white bg-white mx-auto w-screen py-5 flex gap-5 px-5 items-center justify-center text-center">
        <div className="flex flex-row flex-wrap gap-4 items-center justify-center">

            {!loading ? <>
              {(nftType==0) &&<NotStaked holding = {holdingValue} tacoType = {tacoType}/>}
              {(nftType==1) && <SoftStake holding = {holdingValue} tacoType = {tacoType}/>}
              {/* {(nftType==2)&& <HardStake tacoType = {tacoType}/>} */}
            </> : 
            <RiLoader5Fill className="animate-spin text-5xl text-black"/>
            }

        </div>
      </div>
    </div>
  )
}