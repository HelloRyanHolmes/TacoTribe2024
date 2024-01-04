import { ethers } from "ethers"
import Image from "next/image"
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { useGlobalContext } from "../../../../context/MainContext"
import { contractAdds } from '../../../../utils/contractAdds'
import consolidationabi from '../../../../utils/newAbis/consolidationabi'
import stakingabi from '../../../../utils/newAbis/stakingabi'

import Swal from 'sweetalert2'
const error = "https://d19rxn9gjbwl25.cloudfront.net/ui/error.png"


const HardStake = ({ tacoType }) => {

  const { setLoader } = useGlobalContext();

  const [displayNFT, setDisplayNFT] = useState([])

  const add = contractAdds.staking;
  const consolidationAdd = contractAdds.consolidation;

  const { address } = useAccount();

  async function stakingSetup() {
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

  async function claim(tokenId) {
    setLoader(true);
    try {
      const contract = await stakingSetup();
      const res = await contract?.claim(tacoType, tokenId);

      await res.wait();

      setLoader(false);
      Swal.fire({
        title: 'GUAC Claimed!',
        text: 'GUAC was Claimed!',
        icon: 'success',
        imageAlt: "Taco!",
        confirmButtonText: 'LFG!',
        confirmButtonColor: "#facc14",
        customClass: {
          container: "border-8 border-black",
          popup: "bg-white rounded-2xl border-8 border-black",
          image: "-mb-5",
          confirmButton: "w-40 text-black"
        }
      }).then((res)=>{window.location.reload()});
    }
    catch (err) {
      setLoader(false);
      console.log(err);
    }

  }

  async function claimAll() {
    setLoader(true);
    try {
      const contract = await stakingSetup();
      const tokenIds = []

      displayNFT.map((item) => {
        const tokenId = item.tokenId;
        tokenIds.push(tokenId);
      })

      const res = await contract?.claimAll(tacoType, tokenIds);
      await res.wait();

      setLoader(false);
      Swal.fire({
        title: 'GUAC Claimed!',
        text: 'GUAC was Claimed!',
        icon: 'success',
        imageAlt: "Taco!",
        confirmButtonText: 'LFG!',
        confirmButtonColor: "#facc14",
        customClass: {
          container: "border-8 border-black",
          popup: "bg-white rounded-2xl border-8 border-black",
          image: "-mb-5",
          confirmButton: "w-40 text-black"
        }
      }).then((res)=>{window.location.reload()});
    }
    catch (err) {
      setLoader(false);
      console.log(err);
    }

  }

  async function unStake(tokenId) {
    setLoader(true);
    try {
      const contract = await stakingSetup();
      const res = await contract?.unstake(tacoType, tokenId);
      await res.wait();

      setLoader(false);
      Swal.fire({
        title: 'NFT Unstaked!',
        text: 'NFT was unstaked',
        icon: 'success',
        imageAlt: "Taco!",
        confirmButtonText: 'LFG!',
        confirmButtonColor: "#facc14",
        customClass: {
          container: "border-8 border-black",
          popup: "bg-white rounded-2xl border-8 border-black",
          image: "-mb-5",
          confirmButton: "w-40 text-black"
        }
      }).then((res)=>{window.location.reload()});
    }
    catch (err) {
      console.log(err);
      setLoader(false);
    }

  }

  async function unstakeAll() {
    setLoader(true);
    try {
      const contract = await stakingSetup();
      const tokenIds = []

      displayNFT.map((item) => {
        const tokenId = item.tokenId;
        tokenIds.push(tokenId);
      })

      const res = await contract?.unstakeAll(tacoType, tokenIds);
      await res.wait();

      setLoader(false);
      Swal.fire({
        title: 'NFTs Unstaked!',
        text: 'All NFTs were unstaked',
        icon: 'success',
        imageAlt: "Taco!",
        confirmButtonText: 'LFG!',
        confirmButtonColor: "#facc14",
        customClass: {
          container: "border-8 border-black",
          popup: "bg-white rounded-2xl border-8 border-black",
          image: "-mb-5",
          confirmButton: "w-40 text-black"
        }
      }).then((res)=>{window.location.reload()});
    }
    catch (err) {
      setLoader(false);

      console.log(err);
    }
    setLoader(false);

  }

  async function consolidationContractSetup() {
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

  async function getAllNFTs() {
    setDisplayNFT([]);
    const consolidationContract = await consolidationContractSetup();
    const stakingContract = await stakingSetup();
    const dispArr = []
    const consolidationDataArray = [consolidationContract.balanceTaco(), consolidationContract.balanceDoodle(), "", consolidationContract.balancePT(), consolidationContract.balanceDP(), consolidationContract.balanceBT(), consolidationContract.balanceGT(), consolidationContract.balanceGS()]


    switch(tacoType){
      case 0:
        const result0 = await consolidationDataArray[tacoType];

        await Promise.all(result0.map( async (item) => {
          // console.log("Lalala", dispArr)
          const tokenId = Number(item.tokenId);
          const owner = await stakingContract.tokenOwnerOf(tacoType, tokenId);
          const isOwner = owner.toLowerCase() === address.toLowerCase();
          console.log(isOwner)
    
          if (isOwner) {
            const name = "Taco #" + tokenId;
            const img = "https://ipfs.io/ipfs/bafybeicrkpi7ejh2dabsndjnlrm2xgg65dj2qa4e3jh5bdbvfarmaqdkv4/" + tokenId + ".png";
            const unclaimedAmount = Number(ethers.utils.formatEther(String(await stakingContract.hardStakingRewards(tacoType, tokenId))));

            dispArr.push({ tokenId, img, name, unclaimedAmount })
          }
        }))
    
        setDisplayNFT(dispArr);
        break;

      case 3:
        const result3 = await consolidationDataArray[tacoType];

      await Promise.all(result3.map( async (item) => {
        // console.log("Lalala", dispArr)
        const tokenId = Number(item.tokenId);
        const owner = await stakingContract.tokenOwnerOf(tacoType, tokenId);
        const isOwner = owner.toLowerCase() === address.toLowerCase();
        console.log(isOwner)

        if (isOwner) {
          const name = "Pixel Taco #" + tokenId;
          const img = "https://ipfs.io/ipfs/bafybeib2rme47vsbkaroqwuqidhswujjztevjhrc3ac6tg5ywwshhmfiya/" + tokenId + ".png";
          const unclaimedAmount = Number(ethers.utils.formatEther(String(await stakingContract.hardStakingRewards(tacoType, tokenId))));

          dispArr.push({ tokenId, img, name, unclaimedAmount })
        }
      }))

      setDisplayNFT(dispArr);
      break;

      case 1:
        const result1 = await consolidationDataArray[tacoType];

      await Promise.all(result1.map( async (item) => {
        // console.log("Lalala", dispArr)
        const tokenId = Number(item.tokenId);
        const owner = await stakingContract.tokenOwnerOf(tacoType, tokenId);
        const isOwner = owner.toLowerCase() === address.toLowerCase();
        console.log(isOwner)

        if (isOwner) {
          const name = "Doodled Tacos #" + tokenId;
          const img = "https://ipfs.io/ipfs/bafybeife2zu3n76ktqtn7myxpm2pfd3uhsxpxbg2gkaen2bssdh3rr47ly/" + tokenId + ".png";
          const unclaimedAmount = Number(ethers.utils.formatEther(String(await stakingContract.hardStakingRewards(tacoType, tokenId))));

          dispArr.push({ tokenId, img, name, unclaimedAmount })
        }
      }))

      setDisplayNFT(dispArr);
      break;

      case 4:
        const result4 = await consolidationDataArray[tacoType];

      await Promise.all(result4.map( async (item) => {
        // console.log("Lalala", dispArr)
        const tokenId = Number(item.tokenId);
        const owner = await stakingContract.tokenOwnerOf(tacoType, tokenId);
        const isOwner = owner.toLowerCase() === address.toLowerCase();
        console.log(isOwner)

        if (isOwner) {
          const name = "Pixel Doodle Tacos #" + tokenId;
          const img = "https://ipfs.io/ipfs/bafybeifgtr33q3k6t5b45gyp3hxloselihxqqj3qo4pamhyzpen54qizni/" + tokenId + ".png";
          const unclaimedAmount = Number(ethers.utils.formatEther(String(await stakingContract.hardStakingRewards(tacoType, tokenId))));

          dispArr.push({ tokenId, img, name, unclaimedAmount })
        }
      }))

      setDisplayNFT(dispArr);
      break;

      case 5:
        const result5 = await consolidationDataArray[tacoType];

      await Promise.all(result5.map( async (item) => {
        // console.log("Lalala", dispArr)
        const tokenId = Number(item.tokenId);
        const owner = await stakingContract.tokenOwnerOf(tacoType, tokenId);
        const isOwner = owner.toLowerCase() === address.toLowerCase();
        console.log(isOwner)

        if (isOwner) {
          const name = "Baby Taco #" + tokenId;
          const img = "https://ipfs.io/ipfs/bafybeiangojvxwyo7rcxtofmcetd2rj2jlchyscbyaqcciiwcazc5qrlwm/" + tokenId + ".png";
          const unclaimedAmount = Number(ethers.utils.formatEther(String(await stakingContract.hardStakingRewards(tacoType, tokenId))));

          dispArr.push({ tokenId, img, name, unclaimedAmount })
        }
      }))

      setDisplayNFT(dispArr);
      break;

      case 6:
        const result6 = await consolidationDataArray[tacoType];

      await Promise.all(result6.map( async (item) => {
        // console.log("Lalala", dispArr)
        const tokenId = Number(item.tokenId);
        const owner = await stakingContract.tokenOwnerOf(tacoType, tokenId);
        const isOwner = owner.toLowerCase() === address.toLowerCase();
        console.log(isOwner)

        if (isOwner) {
          const name = "Guaco Tribe #" + tokenId;
          const img = "https://ipfs.io/ipfs/bafybeig5rzdjulqlq3j2ei2cg6edm5jrs36blz6hxyqr6ugfhz7x2yv4ve/" + tokenId + ".png";
          const unclaimedAmount = Number(ethers.utils.formatEther(String(await stakingContract.hardStakingRewards(tacoType, tokenId))));

          dispArr.push({ tokenId, img, name, unclaimedAmount })
        }
      }))

      setDisplayNFT(dispArr);
      break;

      case 7:
        const result7 = await consolidationDataArray[tacoType];

      await Promise.all(result7.map( async (item) => {
        // console.log("Lalala", dispArr)
        const tokenId = Number(item.tokenId);
        const owner = await stakingContract.tokenOwnerOf(tacoType, tokenId);
        const isOwner = owner.toLowerCase() === address.toLowerCase();
        console.log(isOwner)

        if (isOwner) {
          const name = "GUAC VS SOUR CREAM #" + tokenId;
          const img = "https://ipfs.io/ipfs/bafybeiaglnj726cekyeqp3lf3rkj5pltcymo2irlcgvpa7p75lqg5zxhe4/" + tokenId + ".png";
          const unclaimedAmount = Number(ethers.utils.formatEther(String(await stakingContract.hardStakingRewards(tacoType, tokenId))));

          dispArr.push({ tokenId, img, name, unclaimedAmount })
        }
      }));
      setDisplayNFT(dispArr);
      break;

      default:
        console.log("Not here");
        break;
      }
    
  }

  useEffect(() => {
    // setDisplayNFT([]);
    getAllNFTs();
  }, [tacoType])

  return (
    <div className="flex flex-col items-center justify-center w-full gap-10">
      <div>
      {displayNFT.length == 0 &&<div>
           <h1 className="text-black text-[1.8rem]">Feels so empty in here!</h1>
           <h1 className="text-black text-[1.5rem]">Hard Stake a Taco to start earning <span className="text-lime-600">$GUAC</span></h1>
           </div>}
        {displayNFT?.length > 0 && <button onClick={unstakeAll} className="py-2 mx-2 px-4 border-2 border-black text-black mt-4 bg-white rounded-full">Unstake All</button>}
        {displayNFT?.length > 0 && <button onClick={claimAll} className="py-2 mx-2 px-4 border-2 border-black text-black mt-4 bg-white rounded-full">Claim All</button>}
      </div>
      {/* {console.log("Sayak Gay", displayNFT)} */}
      <div className="flex flex-row gap-5 flex-wrap justify-center w-full gap-10">
        {
          displayNFT?.map((item) => (
            <div className='bg-green-400 border-4 rounded-2xl border-black p-4'>
              <Image alt='taco' width={1080} height={1080} className='w-60 mx-auto rounded-2xl' src={item.img} />
              <h2 className='text-black text-[1.7rem] mt-4'>{item.name}</h2>
              <h2 className='text-black text-lg'>{item.unclaimedAmount} $GUAC</h2>
              <button onClick={() => { claim(item.tokenId) }} className="py-2 mx-2 px-4 border-2 border-black text-black mt-4 bg-white rounded-full">
                Claim
              </button>
              <button onClick={() => { unStake(item.tokenId) }} className="py-2 mx-2 px-4 border-2 border-black text-black mt-4 bg-white rounded-full">
                Unstake
              </button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default HardStake