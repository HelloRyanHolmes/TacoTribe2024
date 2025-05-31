import Image from "next/image";
import { useEffect, useState } from 'react';

import { ethers } from "ethers";
import Swal from 'sweetalert2';
import { useGlobalContext } from "../../../../context/MainContext";
import { contractAdds } from '../../../../utils/contractAdds';
import stakingabi from '../../../../utils/newAbis/stakingabi';

import { useAccount } from "wagmi";

const claimAllUp = "https://d19rxn9gjbwl25.cloudfront.net/claimAllUp.png"
const claimAllDown = "https://d19rxn9gjbwl25.cloudfront.net/claimAllDown.png"

const claimUp = "https://d19rxn9gjbwl25.cloudfront.net/claimUp.png"
const claimDown = "https://d19rxn9gjbwl25.cloudfront.net/claimDown.png"


const error = "https://d19rxn9gjbwl25.cloudfront.net/ui/error.png"

import setApprovalForAll from './setApproval';

const SoftStake = ({ holding, tacoType }) => {
  const { address, isConnected } = useAccount();
  const [displayNFT, setDisplayNFT] = useState([]);

  const add = contractAdds.staking;
  const { setLoader, refreshGuac } = useGlobalContext();

  async function stakingSetup() {
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

  async function claim(tokenId) {
    setLoader(true);
    try {
      const contract = await stakingSetup();
      const res = await contract?.claim(tacoType, tokenId);
      await res.wait();

      setLoader(false);
      Swal.fire({
        title: 'GUAC Claimed!',
        text: 'GUAC was claimed!',
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
        text: 'GUAC was claimed!',
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


  // async function hardStake(tokenId) {
  //   try {
     
  //       await setApprovalForAll(tacoType, address);
  //       const contract = await stakingSetup();
  //       const res = await contract?.stake(tacoType, tokenId);
  //       await res.wait();

  //     setLoader(false);
  //     Swal.fire({
  //       title: 'Hard Staked!',
  //       text: 'NFT was Hard Staked!',
  //       icon: 'success',
  //       imageAlt: "Taco!",
  //       confirmButtonText: 'LFG!',
  //       confirmButtonColor: "#facc14",
  //       customClass: {
  //         container: "border-8 border-black",
  //         popup: "bg-white rounded-2xl border-8 border-black",
  //         image: "-mb-5",
  //         confirmButton: "w-40 text-black"
  //       }
  //     }).then((res)=>{window.location.reload()});

  //   }
  //   catch (err) {
  //     console.log(err);
  //       }
      
    
  // }

  // async function hardStakeAll() {
  //   try {
      
  //     await setApprovalForAll(tacoType, address);
  //       const contract = await stakingSetup();
  //       const tokenIds = []
  //       displayNFT.map((item) => {
  //         const tokenId = item.tokenId;
  //         tokenIds.push(tokenId);
  //       })
  //       const res = await contract?.stakeAll(tacoType, tokenIds);

  //       await res.wait();

  //     setLoader(false);
  //     Swal.fire({
  //       title: 'Hard Stakedd!',
  //       text: 'NFT was Hard Staked!',
  //       icon: 'success',
  //       imageAlt: "Taco!",
  //       confirmButtonText: 'LFG!',
  //       confirmButtonColor: "#facc14",
  //       customClass: {
  //         container: "border-8 border-black",
  //         popup: "bg-white rounded-2xl border-8 border-black",
  //         image: "-mb-5",
  //         confirmButton: "w-40 text-black"
  //       }
  //     }).then((res)=>{window.location.reload()});

  //   }
  //   catch (err) {
  //     console.log(err);
  //   }
  // }

  async function fetchNFTs() {
    setDisplayNFT([])
    const dispArr = [];
    console.log(holding, tacoType);
    switch (tacoType) {
      case 0:
        for (let i = 0; i < holding.length; i++) {
          const stakeType = holding[i].stakeType;

          if (stakeType == 1) {

            const name = "Taco #" + holding[i].tokenId;
            const img = "https://gateway.lighthouse.storage/ipfs/bafybeicevvfu6rlnbelaraoq2aqatqv3ckvbn7voyct3kpzwvh6vk2uuna/" + holding[i].tokenId + ".png";
            // console.log(img);
            const tokenId = holding[i].tokenId;
            // console.log(tokenId);
            const unclaimedAmount = holding[i].guac;
            dispArr.push({ name, tokenId, img, unclaimedAmount, tacoType })
          }
        }
        setDisplayNFT(dispArr);
        break;

      case 1:
        for (let i = 0; i < holding.length; i++) {
          const stakeType = holding[i].stakeType;

          if (stakeType == 1) {
            const name = "Doodled Tacos #" + holding[i].tokenId;
            const img = "https://gateway.lighthouse.storage/ipfs/bafybeiff7usz2tof4jja6z4relcrqvnz3kp4sfs44nwkj3qxzfy4ci5cou/" + holding[i].tokenId + ".png";
            const tokenId = holding[i].tokenId;
            const unclaimedAmount = holding[i].guac;
            dispArr.push({ name, tokenId, img, unclaimedAmount, tacoType })
          }
        }
        setDisplayNFT(dispArr);
        break;

      case 3:
        for (let i = 0; i < holding.length; i++) {
          const stakeType = holding[i].stakeType;

          if (stakeType == 1) {
            const name = "Pixel Taco #" + holding[i].tokenId;
            const img = "https://gateway.lighthouse.storage/ipfs/bafybeib2rme47vsbkaroqwuqidhswujjztevjhrc3ac6tg5ywwshhmfiya/" + holding[i].tokenId + ".png";
            const tokenId = holding[i].tokenId;
            const unclaimedAmount = holding[i].guac;
            dispArr.push({ name, tokenId, img, unclaimedAmount, tacoType })
          }
        }
        setDisplayNFT(dispArr);
        break;

      case 5:
        for (let i = 0; i < holding.length; i++) {
          const stakeType = holding[i].stakeType;

          if (stakeType == 1) {

            const name = "Baby Taco #" + holding[i].tokenId;
            const img = "https://gateway.lighthouse.storage/ipfs/bafybeifwjny44u7xizu7xkuuqfhbchlj427nctrvhrzgmwkvicyg34czym/" + holding[i].tokenId + ".png";
            const tokenId = holding[i].tokenId;
            const unclaimedAmount = holding[i].guac;
            dispArr.push({ name, tokenId, img, unclaimedAmount, tacoType })
          }
        }
        setDisplayNFT(dispArr);
        break;

      case 4:
        for (let i = 0; i < holding.length; i++) {
          const stakeType = holding[i].stakeType;

          if (stakeType == 1) {

            const name = "Pixel Doodle Tacos #" + holding[i].tokenId;
            const img = "https://gateway.lighthouse.storage/ipfs/bafybeih7qjqxglnrzg6yyhkitpzvulahi3ia7jpzo3ecfoesslgngexpcy/" + holding[i].tokenId + ".png";
            const tokenId = holding[i].tokenId;
            const unclaimedAmount = holding[i].guac;
            dispArr.push({ name, tokenId, img, unclaimedAmount, tacoType })
          }
        }
        setDisplayNFT(dispArr);
        break;

      case 6:
        for (let i = 0; i < holding.length; i++) {
          const stakeType = holding[i].stakeType;

          if (stakeType == 1) {

            const name = "Guaco Tribe #" + holding[i].tokenId;
            const img = "https://gateway.lighthouse.storage/ipfs/bafybeihbcsohuhng2wk6l6ur3wcucl4437b5osssgl43ittlwwpje4mire/" + holding[i].tokenId + ".png";
            const tokenId = holding[i].tokenId;
            const unclaimedAmount = holding[i].guac;
            dispArr.push({ name, tokenId, img, unclaimedAmount, tacoType })
          }
        }
        setDisplayNFT(dispArr);
        break;

      case 7:
        for (let i = 0; i < holding.length; i++) {
          const stakeType = holding[i].stakeType;

          if (stakeType == 1) {

            const name = "GUAC vs SOUR CREAM #" + holding[i].tokenId;
            const img = "https://gateway.lighthouse.storage/ipfs/bafybeiabezqfvn3tpfilcpcfogpnmee27zchafallgdgx2gvbw3dtzagfy/" + holding[i].tokenId + ".png";
            const tokenId = holding[i].tokenId;
            const unclaimedAmount = holding[i].guac;
            dispArr.push({ name, tokenId, img, unclaimedAmount, tacoType })
          }
        }
        setDisplayNFT(dispArr);
        break;

        case 8:
        for (let i = 0; i < holding.length; i++) {
          const stakeType = holding[i].stakeType;

          if (stakeType == 1) {

            const name = "Taco Sauce #" + holding[i].tokenId;
            const img = "https://gateway.lighthouse.storage/ipfs/bafybeieqanzbnawjkis6ehnhlwbsrkntgtcfkx257gfbmyt7mjrwiilqz4/" + holding[i].tokenId + ".png";
            const tokenId = holding[i].tokenId;
            const unclaimedAmount = holding[i].guac;
            dispArr.push({ name, tokenId, img, unclaimedAmount, tacoType })
          }
        }
        setDisplayNFT(dispArr);
        break;

      default:
        console.log("Not found");
        break;

    }


  }

  useEffect(() => {
    setDisplayNFT([])
    fetchNFTs();

  }, [holding, tacoType])


  useEffect(()=>{
    if(!setLoader)
    fetchNFTs();
  },[setLoader])
  // useEffect(()=>{
  //   setDisplayNFT([]);
  // },[tacoType])




  return (
    <div className="flex flex-col items-center justify-center w-full gap-10">
      <div>
        {displayNFT.length == 0 &&<div>
           <h1 className="text-black text-[1.8rem]">Feels so empty in here!</h1>
           <h1 className="text-black text-[1.5rem]">Soft Stake a Taco to start earning <span className="text-lime-600">$GUAC</span></h1>
           </div>}
        {displayNFT.length > 0 && 
          <button onClick={claimAll} className='group cursor-pointer'>
            <Image width={800} height={800} src={claimAllUp} alt="home" className={"w-40 group-hover:hidden"} />
            <Image width={800} height={800} src={claimAllDown} alt="home" className={"w-40 hidden group-hover:block"} />
          </button>
        }
        {/* {displayNFT.length > 0 && <button onClick={hardStakeAll} className="py-2 mx-2 px-4 border-2 border-black text-black mt-4 bg-white rounded-full">Hard Stake All</button>} */}
      </div>
      <div className="flex flex-row flex-wrap justify-center w-full gap-10">
        {
          displayNFT.map((item) => (
            <div className='bg-yellow-400 border-4 rounded-2xl border-black p-4'>
              <Image alt='taco' width={1080} height={1080} className='w-60 mx-auto rounded-2xl border-2 border-black' src={item.img} />
              <h2 className='text-black text-[1.7rem] mt-4'>{item.name}</h2>
              <h2 className='text-black text-lg'>{item.unclaimedAmount} $GUAC</h2>
              <button onClick={()=>{claim(item?.tokenId)}} className=' group cursor-pointer '>
                <Image width={800} height={800} src={claimUp} alt="home" className={"w-40 group-hover:hidden"} />
                <Image width={800} height={800} src={claimDown} alt="home" className={"w-40 hidden group-hover:block"} />
              </button>
              {/* <button onClick={() => { hardStake(item.tokenId) }} className="py-2 mx-2 px-4 border-2 border-black text-black mt-4 bg-white rounded-full">
                Hard Stake
              </button> */}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default SoftStake