import { ethers } from "ethers";
import Image from "next/image";
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useGlobalContext } from "../../../../context/MainContext";
import { contractAdds } from '../../../../utils/contractAdds';
import stakingabi from '../../../../utils/newAbis/stakingabi';

import { useAccount } from "wagmi";
import setApprovalForAll from "../StakingButtons/setApproval";


const error = "https://d19rxn9gjbwl25.cloudfront.net/ui/error.png"


const NotStaked = ({ holding, tacoType }) => {
  const { address, isConnected } = useAccount();

  const { setLoader, refreshGuac } = useGlobalContext();


  const [displayNFT, setDisplayNFT] = useState([]);

  const add = contractAdds.staking;

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

  async function softStake(tokenId) {
    try {
      const contract = await stakingSetup();
      await contract?.softStake(tacoType, tokenId);
    }
    catch (err) {
      console.log(err);
    }
  }


  async function hardStake(tokenId) {
    try {
      await setApprovalForAll(tacoType, address);
      const contract = await stakingSetup();
      await contract?.stake(tacoType, tokenId);
    }
    catch (err) {
      console.log(err);
      Swal.fire({
        title: 'Error!',
        text: 'User rejected Transaction',
        imageUrl: error,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: "Taco OOPS!",
        confirmButtonText: 'Try again!',
        confirmButtonColor: "#facc14",
        customClass: {
          container: "border-8 border-black",
          popup: "bg-white rounded-2xl border-8 border-black",
          image: "-mb-5",
          confirmButton: "w-40 text-black"
        }
      });
    }
  }

  async function softStakeAll() {
    try {
      const contract = await stakingSetup();
      const tokenIds = []
      displayNFT.map((item) => {
        const tokenId = item.tokenId;
        tokenIds.push(tokenId);
      })
      await contract?.softStakeAll(tacoType, tokenIds);
    }
    catch (err) {
      console.log(err);
    }
  }

  async function hardStakeAll() {
    try {
      await setApprovalForAll(tacoType, address);
      const contract = await stakingSetup();
      const tokenIds = []
      displayNFT.map((item) => {
        const tokenId = item.tokenId;
        tokenIds.push(tokenId);
      })
      await contract?.stakeAll(tacoType, tokenIds);
    }
    catch (err) {
      console.log(err);
      Swal.fire({
        title: 'Error!',
        text: 'User Rejected Transaction',
        imageUrl: error,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: "Taco OOPS!",
        confirmButtonText: 'Try Again!',
        confirmButtonColor: "#facc14",
        customClass: {
          container: "border-8 border-black",
          popup: "bg-white rounded-2xl border-8 border-black",
          image: "-mb-5",
          confirmButton: "w-40 text-black"
        }
      });
    }
  }



  async function fetchNFTs() {
    const dispArr = [];
    console.log(holding, tacoType);
    switch (tacoType) {
      case 0:
        for (let i = 0; i < holding.length; i++) {
          const stakeType = holding[i].stakeType;

          if (stakeType == 0) {

            const name = "Taco #" + holding[i].tokenId;
            const img = "https://ipfs.io/ipfs/bafybeicrkpi7ejh2dabsndjnlrm2xgg65dj2qa4e3jh5bdbvfarmaqdkv4/" + holding[i].tokenId + ".png";
            const tokenId = holding[i].tokenId;
            dispArr.push({ name, tokenId, img, tacoType })
          }
        }
        setDisplayNFT(dispArr);
        break;

      case 1:
        for (let i = 0; i < holding.length; i++) {
          const stakeType = holding[i].stakeType;

          if (stakeType == 0) {
            const name = "Doodled Tacos #" + holding[i].tokenId;
            const img = "https://ipfs.io/ipfs/bafybeife2zu3n76ktqtn7myxpm2pfd3uhsxpxbg2gkaen2bssdh3rr47ly/" + holding[i].tokenId + ".png";
            const tokenId = holding[i].tokenId.tokenId;
            dispArr.push({ name, tokenId, img, tacoType })
          }
        }
        setDisplayNFT(dispArr);
        break;

      case 3:
        for (let i = 0; i < holding.length; i++) {
          const stakeType = holding[i].stakeType;

          if (stakeType == 0) {
            const name = "Pixel Taco #" + holding[i].tokenId;
            const img = "https://ipfs.io/ipfs/bafybeib2rme47vsbkaroqwuqidhswujjztevjhrc3ac6tg5ywwshhmfiya/" + holding[i].tokenId + ".png";
            const tokenId = holding[i].tokenId;
            dispArr.push({ name, tokenId, img, tacoType })
          }
        }
        setDisplayNFT(dispArr);
        break;

      case 5:
        for (let i = 0; i < holding.length; i++) {
          const stakeType = holding[i].stakeType;

          if (stakeType == 0) {

            const name = "Baby Taco #" + holding[i].tokenId;
            const img = "https://ipfs.io/ipfs/bafybeiangojvxwyo7rcxtofmcetd2rj2jlchyscbyaqcciiwcazc5qrlwm/" + holding[i].tokenId + ".png";
            const tokenId = holding[i].tokenId;
            dispArr.push({ name, tokenId, img, tacoType })
          }
        }
        setDisplayNFT(dispArr);
        break;

      case 4:
        for (let i = 0; i < holding.length; i++) {
          const stakeType = holding[i].stakeType;

          if (stakeType == 0) {

            const name = "Pixel Doodle Tacos #" + holding[i].tokenId;
            const img = "https://ipfs.io/ipfs/bafybeifgtr33q3k6t5b45gyp3hxloselihxqqj3qo4pamhyzpen54qizni/" + holding[i].tokenId + ".png";
            const tokenId = holding[i].tokenId;
            dispArr.push({ name, tokenId, img, tacoType })
          }
        }
        setDisplayNFT(dispArr);
        break;

      case 6:
        for (let i = 0; i < holding.length; i++) {
          const stakeType = holding[i].stakeType;

          if (stakeType == 0) {

            const name = "Guaco Tribe #" + holding[i].tokenId;
            const img = "https://ipfs.io/ipfs/bafybeig5rzdjulqlq3j2ei2cg6edm5jrs36blz6hxyqr6ugfhz7x2yv4ve/" + holding[i].tokenId + ".png";
            const tokenId = holding[i].tokenId;
            dispArr.push({ name, tokenId, img, tacoType })
          }
        }
        setDisplayNFT(dispArr);
        break;

      case 7:
        for (let i = 0; i < holding.length; i++) {
          const stakeType = holding[i].stakeType;

          if (stakeType == 0) {

            const name = "GUAC vs SOUR CREAM #" + holding[i].tokenId;
            const img = "https://ipfs.io/ipfs/bafybeiaglnj726cekyeqp3lf3rkj5pltcymo2irlcgvpa7p75lqg5zxhe4/" + holding[i].tokenId + ".png";
            const tokenId = holding[i].tokenId;

            dispArr.push({ name, tokenId, img, tacoType })
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
    fetchNFTs();
  }, [holding, tacoType])

  return (
    <div className="flex flex-col items-center justify-center w-full gap-10">
      <div>
        {displayNFT.length > 0 && <button onClick={hardStakeAll} className="py-2 mx-2 px-4 border-2 border-black text-black mt-4 bg-white rounded-full" >Hard Stake All</button>}
        {displayNFT.length > 0 && <button onClick={softStakeAll} className="py-2 mx-2 px-4 border-2 border-black text-black mt-4 bg-white rounded-full" >Soft Stake All</button>}
      </div>
      <div>
        {
          displayNFT.map((item) => (
            <div className='bg-red-500 border-4 rounded-2xl border-black p-4'>
              <Image alt='taco' width={1080} height={1080} className='w-60 mx-auto rounded-2xl' src={item.img} />
              <h2 className='text-black text-[1.7rem] mt-4'>{item.name}</h2>
              <button onClick={() => { softStake(item.tokenId) }} className="py-2 mx-2 px-4 border-2 border-black text-black mt-4 bg-white rounded-full">
                Soft Stake
              </button>
              <button onClick={() => { hardStake(item.tokenId) }} className="py-2 mx-2 px-4 border-2 border-black text-black mt-4 bg-white rounded-full">
                Hard Stake
              </button>
            </div>
          ))
        }
      </div>



    </div>
  )
}

export default NotStaked