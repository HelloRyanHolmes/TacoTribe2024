import React, { useEffect, useState } from 'react'
import { contractAdds } from '../../../../utils/contractAdds'
import stakingabi from '../../../../utils/newAbis/stakingabi'
import consolidationabi from '../../../../utils/newAbis/consolidationabi'
import { ethers } from "ethers"
import { useGlobalContext } from "../../../../context/MainContext"
import Image from "next/image"
import { useAccount } from 'wagmi'

import Swal from 'sweetalert2';
const error = "https://tacotribe.s3.ap-south-1.amazonaws.com/assets/ui/error.png"


const HardStake = ({tacoType}) => {

  const { setLoader } = useGlobalContext();

  const [displayNFT, setDisplayNFT] = useState([])

  const add = contractAdds.staking;
  const consolidationAdd = contractAdds.consolidation;

  const { address } = useAccount();

  async function stakingContractSetup(){
    setLoader(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    try {
      const contract = new ethers.Contract(add, stakingabi, signer);
      setLoader(false);
      return contract;
    }
    catch (err) {
      console.log("Error", err)
      Swal.fire({
        title: 'Error!',
        text: 'Couldn\'t get contract',
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

  async function consolidationContractSetup(){
    setLoader(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner("0x3Dc1642f53EE8546D2908ecD0D6A31e961f71E3D");
    try {
      const contract = new ethers.Contract(consolidationAdd, consolidationabi, signer);
      setLoader(false);
      return contract;
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

  async function getAllNFTs(){
    const consolidationContract = await consolidationContractSetup();
    const stakingContract = await stakingContractSetup();
    const dispArr = []
    const consolidationDataArray = [consolidationContract.balanceTaco(), consolidationContract.balanceDoodle(), "", consolidationContract.balancePT(), consolidationContract.balanceDP(), consolidationContract.balanceBT(), consolidationContract.balanceGT(), consolidationContract.balanceGS()]

        const result = await consolidationDataArray[tacoType];
        console.log(result);

        await result.map(async (item)=>{
          const tokenId = Number(item.tokenId);
          const owner = await stakingContract.tokenOwnerOf(tacoType, tokenId);
          const isOwner = owner.toLowerCase() === address.toLowerCase();
          console.log(isOwner)
          
          if(isOwner){
            const name = "Taco #"+ tokenId;
            const img = "https://ipfs.io/ipfs/bafybeicrkpi7ejh2dabsndjnlrm2xgg65dj2qa4e3jh5bdbvfarmaqdkv4/" + tokenId + ".png";
            const unclaimedAmount = Number(ethers.utils.formatEther(String(await stakingContract.hardStakingRewards(tacoType, tokenId))));
            console.log("HELLO BROOO", name, img, unclaimedAmount);
            dispArr.push({tokenId, img, name, unclaimedAmount});
          }
        })
     setDisplayNFT(dispArr);
  }

  useEffect(()=>{
    getAllNFTs();
  },[tacoType])

  return (
    
    <>
    {
      displayNFT?.map((item)=>(
        <div className='bg-green-400 border-4 rounded-2xl border-black p-4'>
        <Image alt='taco' width={1080} height={1080} className='w-60 mx-auto rounded-2xl' src={item.img} />
          <h2 className='text-black text-[1.7rem] mt-4'>{item.name}</h2>
          <h2 className='text-black text-lg'>{item.unclaimedAmount} $GUAC</h2>
          <button onClick={() => { claim(item.tokenId, item.tacoType) }} className="py-2 mx-2 px-4 border-2 border-black text-black mt-4 bg-white rounded-full">
              Claim
          </button>
          <button onClick={() => { claim(item.tokenId, item.tacoType) }} className="py-2 mx-2 px-4 border-2 border-black text-black mt-4 bg-white rounded-full">
              Unstake
          </button>
        </div>
      ))
    }
    </>
  )
}

export default HardStake