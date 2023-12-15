import Image from "next/image"

import Swal from 'sweetalert2'

import { babyTacosSetup } from "../Buttons/Minting/babyTacos"
import { doodledTacoMintSetup } from "../Buttons/Minting/doodleTacos"
import { doodledPixelTacoMintSetup } from "../Buttons/Minting/doodlepixelTacos"
import { guacTribeSetup } from "../Buttons/Minting/guacTribe"
import { guacSourSetup } from "../Buttons/Minting/guacvSour"
import { pixelMintSetup } from "../Buttons/Minting/pixelTacos"
import { tacoMintSetup } from '../Buttons/Minting/tacos'


import { ethers } from "ethers"
import { useEffect, useState } from "react"
import { useAccount } from 'wagmi'

import abi from "../../../utils/newAbis/stakingabi"

import { contractAdds } from "../../../utils/contractAdds"
import { useGlobalContext } from "../../../context/MainContext"
import { get } from "https"

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

const error = "https://tacotribe.s3.ap-south-1.amazonaws.com/assets/ui/error.png"


export default function StakeTemplate({ name }) {
  const [img, setImg] = useState("")
  const [balance, setBalance] = useState(0);
  const [userNFTs, setUserNFTs] = useState([]);
  const [feeData, setFeeData] = useState(null)
  const [currentContractId, setCurrentContractId] = useState(null);

  const { address } = useAccount();
  const { setLoader } = useGlobalContext();


  //check which collection is to be displayed and call the handleContract function accordingly
  const getContractDetails = async () => {
    switch (name) {
      case "Taco Tribe":
        setImg(tacoTribe)
        //handleContract has a number parameter which denotes the collection for accesing the staking contract
        handleContract(await tacoMintSetup(address), 0);
        setCurrentContractId(0);
        //return statement not being used currently but better to keep at number than name
        return 0;
      case "Pixel Taco":
        setImg(pixelTaco)
        handleContract(await pixelMintSetup(address), 3);
        setCurrentContractId(3)
        return 3;
      case "Baby Taco":
        setImg(babyTaco)
        handleContract(await babyTacosSetup(address), 5);
        setCurrentContractId(5)
        return 5;
      case "Doodled Taco":
        setImg(doodle)
        handleContract(await doodledTacoMintSetup(address), 1);
        setCurrentContractId(1)
        return 1;
      case "Guaco Tribe":
        setImg(guacos);
        handleContract(await guacTribeSetup(address), 6);
        setCurrentContractId(6)
        return 6;
      case "Guac VS Sour Cream":
        setImg(gvsc)
        handleContract(await guacSourSetup(address), 7);
        setCurrentContractId(7)
        return 7;
      case "Pixel Doodled Taco":
        setImg(pixelDoodledTaco)
        handleContract(await doodledPixelTacoMintSetup(address), 4);
        setCurrentContractId(4)
        return 4;
      default:
        return 0;

    }
  }

  //function to fetch details of each NFT (name, image, unclaimed $GUAC balance) of each collection. 
  const handleContract = async (data, collection) => {

    setLoader(true);
    var displayArr = [];

    if (name.toUpperCase() == "PIXEL TACO") {
      try {
        setUserNFTs([]);
        setBalance(0);

        var bal = setBalance(await data?.balanceOf(address));

        const tokenIDs = await data?.tokensOfOwner(address);


        for (let i = 0; i < tokenIDs.length; i++) {

          // console.log(Number(i));
          const tokenId = Number(tokenIDs[i]);
          const uri = await data?.tokenURI(tokenId);

          const meta = `https://ipfs.io/ipfs/${uri.substr(7)}`;
          const metadata = await fetch(meta);
          const json = await metadata.json();

          const name = json["name"];
          const fetchedImg = json["image"];

          const img = `https://ipfs.io/ipfs/${fetchedImg.substr(7)}`

          const unclaimedAmount = await unclaimed(tokenId, collection);

          displayArr.push({ name, img, tokenId, collection, unclaimedAmount });
        }

        console.log(displayArr);
        setUserNFTs(displayArr);

      }
      catch (err) {
        console.log(err);
        let timerInterval;
        Swal.fire({
          title: 'Error!',
          text: "Pixel Tacos couldn't be Fetched",
          html: "I will try again in <b></b> seconds.",
          imageUrl: error,
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: "Taco OOPS!",
          // confirmButtonText: 'Retry ?',
          // confirmButtonColor: "#facc14",
          timer: 10000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
          customClass: {
            container: "border-8 border-black",
            popup: "bg-white rounded-2xl border-8 border-black",
            image: "-mb-5",
            // confirmButton: "w-40 text-black"
          }
        }).then(async (result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
            await getContractDetails();
          }
        });
      }

    }

    else if (name.toUpperCase() == "TACO TRIBE" || name.toUpperCase() == "DOODLED TACO") {
      try {

        setBalance(0);
        setUserNFTs([]);


        var bal = await data?.balanceOf(address) ;
        setBalance(Number(bal));
        for (let i = 0; i < Number(bal); i++) {

          const BtokenId = await data?.tokenOfOwnerByIndex(address, i);
          const tokenId = Number(BtokenId);
          const uri = await data?.tokenURI(tokenId);
          const meta = `https://ipfs.io/ipfs/${uri.substr(7)}`;
          const metadata = await fetch(meta);
          const json = await metadata.json();

          const name = json["name"];
          const fetchedImg = json["image"];

          const img = `https://ipfs.io/ipfs/${fetchedImg.substr(7)}`
          const unclaimedAmount = await unclaimed(tokenId, collection)
          displayArr.push({ name, img, tokenId, collection, unclaimedAmount });
        }
        console.log(displayArr);
        setUserNFTs(displayArr);
      }
      catch (err) {
        console.log(err);
        let timerInterval;
        Swal.fire({
          title: 'Error!',
          text: `${name} couldn't be Fetched`,
          html: "I will try again in <b></b> seconds.",
          imageUrl: error,
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: "Taco OOPS!",
          // confirmButtonText: 'Retry ?',
          // confirmButtonColor: "#facc14",
          timer: 10000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
          customClass: {
            container: "border-8 border-black",
            popup: "bg-white rounded-2xl border-8 border-black",
            image: "-mb-5",
            // confirmButton: "w-40 text-black"
          }
        }).then(async (result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
            await getContractDetails();
          }
        });
      }

    }

    else {
      try {

        setBalance(0);
        setUserNFTs([]);

        var bal = await data?.balanceOf(address);
        setBalance(Number(bal));

        const total = data?.totalSupply();

        for (let i = 0; i < Number(total); i++) {

          // const BtokenId = typeof (data) !== 'string' ? (await data?.tokenOfOwnerByIndex(address, i)) : null;

          const owner = await data?.ownerOf(i);

          if (owner.toUpperCase() === address.toUpperCase()) {
            const uri = await data?.tokenURI(i);
            const meta = `https://ipfs.io/ipfs/${uri.substr(7)}`;
            const metadata = await fetch(meta);
            const json = await metadata.json();

            const name = json["name"];
            const fetchedImg = json["image"];

            const img = `https://ipfs.io/ipfs/${fetchedImg.substr(7)}`
            const unclaimedAmount = await unclaimed(tokenId, collection)
            displayArr.push({ name, img, tokenId, collection, unclaimedAmount });
          }

        }
        console.log(displayArr);
        setUserNFTs(displayArr);
      }
      catch (err) {
        console.log(err);
        let timerInterval;
        Swal.fire({
          title: 'Error!',
          text: `${name} couldn't be Fetched`,
          html: "I will try again in <b></b> seconds.",
          imageUrl: error,
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: "Taco OOPS!",
          // confirmButtonText: 'Retry ?',
          // confirmButtonColor: "#facc14",
          timer: 10000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
          customClass: {
            container: "border-8 border-black",
            popup: "bg-white rounded-2xl border-8 border-black",
            image: "-mb-5",
            // confirmButton: "w-40 text-black"
          }
        }).then(async (result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
            await getContractDetails();
          }
        });
      }
    }

    setLoader(false);
  }

  //setup staking contract
  async function stakingSetup() {

    setLoader(true);
    const add = contractAdds.staking;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setFeeData(await provider.getFeeData());
    const signer = provider.getSigner();

    try {
      const contract = new ethers.Contract(add, abi, signer);

      return contract;
    }
    catch (err) {
      console.log("Error", err)
      Swal.fire({
        title: 'Error!',
        text: 'Couldn\'t Get Contract',
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
    setLoader(false);
  }

  //check unclaimed amount of $GUAC for each collection and tokenId. Has been called in handleContract()
  async function unclaimed(tokenId, collection) {
    setLoader(true);
    const contract = await stakingSetup(address);

    var unclaimedAmount = await contract?.unclaimedRewards(tokenId, collection);
    unclaimedAmount = ethers.utils.formatEther(unclaimedAmount)

    setLoader(false);
    return unclaimedAmount;
  }

  //function to claim $GUAC of NFT user chosen to claim
  async function claim(tokenID, collection) {
    setLoader(true);
    const contract = await stakingSetup();
    // console.log(contract);
    try {
      const transaction = await contract.claim(tokenID, collection)
      await transaction.wait();
      Swal.fire({
        title: 'Success!',
        text: '$GUAC Claimed',
        icon: 'success',
        confirmButtonText: 'LFG! 🌮'
      })
    }
    catch(err) {
      console.log(err);
      Swal.fire({
        title: 'Error!',
        text: 'Couldn\'t Claim NFT',
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

    setLoader(false);
  }

  const claimAll = async () => {
    setLoader(true)
    const contract = await stakingSetup();
    // const estimation = await contract.estimateGas.transfer(address, 100);
    try {
      console.log(currentContractId);
      console.log(contract);
      const trans = await contract.claimAll(currentContractId);
      await trans.wait();
    }
    catch (err) {
      console.log(err);
      Swal.fire({
        title: 'Error!',
        text: 'Couldn\'t Claim All',
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

    setLoader(false)
  }

  useEffect(() => {
    getContractDetails();
  }, [name])



  return (
    <div>
      <div className="w-[95%] md:w-[700px] mx-auto bg-yellow-400 mb-10 overflow-hidden items-center justify-center grid grid-cols-2 max-md:grid-flow-row max-md:grid-cols-1 gap-x-5 p-5 rounded-[32px]">
        <div className="h-80 my-auto flex items-center justify-center"><Image width={500} height={500} src={img} className=" object-cover object-center w-[90%] sm:pl-10" /></div>
        <div className="flex flex-col max-md:text-center max-md:items-center gap-2 h-fit w-[80%] mx-auto my-auto">
          <div className="bg-white rounded-full w-full px-4 py-2 shadow shadow-black/20 text-black text-xl"><h2 >{name?.length === 0 ? 'Select A Taco' : name}</h2></div>
          <div className="bg-white rounded-full w-full px-4 py-2 shadow shadow-black/20 text-black text-xl"><h2 >Available Tacos: {Number(balance)}</h2></div>
          <div className="w-fit py-1 text-[#73851C] text-3xl"><h2 >Stake your Tacos and earn $GUAC</h2></div>
          <div className="bg-white rounded-full w-fit px-4 py-1 shadow shadow-black/20 text-black cursor-pointer hover:bg-white/80"><h2 >Learn More</h2></div>
        </div>
        {balance > 0 && <button onClick={claimAll} className='group cursor-pointer mx-auto max-md:mt-5 md:col-span-2'>
          <Image width={80} height={80} src={claimUp} alt="home" className={"w-40 group-hover:hidden"} />
          <Image width={80} height={80} src={claimDown} alt="home" className={"w-40 hidden group-hover:block"} />
        </button>}
      </div>

      <div className="border-2 border-white bg-white mx-auto w-screen py-5 flex gap-5 px-5 items-center justify-center text-center">
        <div className="flex flex-wrap gap-4 items-center justify-center">
          {userNFTs?.map((item) => (<>
            <div className="border-2 bg-yellow-400 border-black rounded-xl overflow-hidden p-2 w-[240px]">
              <h1 className="text-black text-[1.5rem]">{item.name}</h1>
              <Image src={item.img} className="mx-auto rounded-lg border-2 border-black" width={200} height={200} alt={"HEjhdsvcw"} />
              <h1 className="text-black text-[1.2rem]">$GUAC: {item.unclaimedAmount}</h1>

              <button onClick={() => { claim(item.tokenId, item.collection) }} className="group relative mt-4">
                <Image width={200} height={80} src={claimNFTUp} alt="home" className={"w-40 group-hover:hidden"} />
                <Image width={200} height={80} src={claimNFTDown} alt="home" className={"w-40 hidden group-hover:block"} />
              </button>

              {/* <button onClick={() => { claim(item.tokenId, item.collection) }} className="group min-[641px]:hidden relative mt-4">
                <Image width={200} height={80} src={claimNFTUp} alt="home" className={"w-20 group-hover:hidden"} />
                <Image width={200} height={80} src={claimNFTDown} alt="home" className={"w-20 hidden group-hover:block"} />
              </button> */}

            </div>
          </>
          ))}
        </div>
      </div>
    </div>
  )
}