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


export default function StakeTemplate({ tacoType }) {
  const [img, setImg] = useState("")
  const [balance, setBalance] = useState(0);
  const [userNFTs, setUserNFTs] = useState([]);



  //address & abi of new contract
  //switch case starts at 350
  const addnew = "0x92d0ad1dEF8960080d0C05353845b3D1912C06b6";
  const abinew = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "balanceBT",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "unclaimed",
              "type": "uint256"
            }
          ],
          "internalType": "struct TacoStaking.data[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "balanceDoodle",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "unclaimed",
              "type": "uint256"
            }
          ],
          "internalType": "struct TacoStaking.data[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "balanceDP",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "unclaimed",
              "type": "uint256"
            }
          ],
          "internalType": "struct TacoStaking.data[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "balanceGS",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "unclaimed",
              "type": "uint256"
            }
          ],
          "internalType": "struct TacoStaking.data[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "balanceGT",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "unclaimed",
              "type": "uint256"
            }
          ],
          "internalType": "struct TacoStaking.data[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "balancePT",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "unclaimed",
              "type": "uint256"
            }
          ],
          "internalType": "struct TacoStaking.data[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "balanceTaco",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "unclaimed",
              "type": "uint256"
            }
          ],
          "internalType": "struct TacoStaking.data[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "bt",
      "outputs": [
        {
          "internalType": "contract IBabyTaco",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "doodle",
      "outputs": [
        {
          "internalType": "contract IDoodle",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "dp",
      "outputs": [
        {
          "internalType": "contract IDPTaco",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "gs",
      "outputs": [
        {
          "internalType": "contract IGuacSour",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "gt",
      "outputs": [
        {
          "internalType": "contract IGuaco",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "pt",
      "outputs": [
        {
          "internalType": "contract IPixelTaco",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "staking",
      "outputs": [
        {
          "internalType": "contract IStaking",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "taco",
      "outputs": [
        {
          "internalType": "contract ITaco",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  const { address } = useAccount();
  const { setLoader } = useGlobalContext();

  // const dataArr = [tacoMintSetup(address), doodledTacoMintSetup(address), "", pixelMintSetup(address), doodledPixelTacoMintSetup(address), babyTacosSetup(address), guacTribeSetup(address), guacSourSetup(address)];
  const imgArr = [tacoTribe, doodle, "", pixelTaco, pixelDoodledTaco, babyTaco, guacos, gvsc];
  const nameArr = ["Taco Tribe", "Doodle Tacos", "", "Pixel Tacos", "Pixel Doodle Tacos", "Baby Tacos", "Guaco Tribe", "Guac vs Sour Cream"]

  async function contractSetup(){
    setLoader(true);

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    try {
      const contract = new ethers.Contract(addnew, abinew, signer);
      setLoader(false);

      return contract;
    }
    catch (err) {
    setLoader(false);

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
    var dispArr = [];
    setImg(imgArr[tacoType]);

    const contract = await contractSetup();

   switch(tacoType){
    case 0:
      const data0 = await contract?.balanceTaco();
      setBalance(data0.length);

      data0?.map((item)=>{
        const tokenId = Number(item[0]);
        const unclaimedAmount = ethers.utils.formatEther(String(item[1]));
        const name = "Taco #"+tokenId;
        const img = "https://ipfs.io/ipfs/bafybeifi336lirgb6x2aebf7ltvad2gtihe2tszp3urhk3x6j6lyktqma4/"+tokenId+".png";

        dispArr.push({name, tokenId, img, unclaimedAmount, tacoType})
      })

      setUserNFTs(dispArr);
      break;
      //Taco Tribe
      //use method balanceTaco()
      // balanceTaco returns an array of Tuples(2).
      // tuple[0] = tokenId
      // tuple[1] = unclaimedAmount in wei (use ethers.utils.formatEther(String(unclaimedAmount)) to convert to ethers)
      //name = "Taco #"+tokenId
      //image = "ipfs://bafybeifi336lirgb6x2aebf7ltvad2gtihe2tszp3urhk3x6j6lyktqma4/"+tokenId+".png"
      //push element {name, tokenId, image, tacoType, unclaimedAmount}
    case 1:
      // Doodle Taco
      // use method balanceDoodle()
      //same process just verify name and image ipfs url from opensea
      // click on any item of the collection, scroll down and click details>tokenID
      //get the ipfs of image from image:"..."
      break;
    case 3:
      const data3 = await contract?.balancePT();
      setBalance(data3.length);

      data3?.map((item)=>{
        const tokenId = Number(item[0]);
        const unclaimedAmount = ethers.utils.formatEther(String(item[1]));
        const name = "Pixel Taco #"+tokenId;
        const img = "https://ipfs.io/ipfs/bafybeib2rme47vsbkaroqwuqidhswujjztevjhrc3ac6tg5ywwshhmfiya/"+tokenId+".png";

        dispArr.push({name, tokenId, img, unclaimedAmount, tacoType})
      })

      setUserNFTs(dispArr);
      break;
    case 4:
      //Pixel Doodle
      //use method balanceDP()
            
    case 5:
      //Baby Taco
      //use method balanceBT()

    case 6:
      //Guaco Tribe
      //use method balanceGT()

    case 7:
      //Guac vs Sour Cream
      //use method balanceGS()
    default:
      console.log("IDK");

   }

   setUserNFTs(dispArr)
    
  }

  //setup staking contract
  async function stakingSetup() {

    setLoader(true);
    const add = contractAdds.staking;

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    try {
      const contract = new ethers.Contract(add, abi, signer);
      setLoader(false);

      return contract;
    }
    catch (err) {
    setLoader(false);

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

  }


  //function to claim $GUAC of NFT user chosen to claim
  async function claim(tokenID, tacoType) {

    const contract = await stakingSetup();

    try {
      const transaction = await contract.claim(tokenID, tacoType)
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


  }

  const claimAll = async () => {

    const contract = await stakingSetup();
    // const estimation = await contract.estimateGas.transfer(address, 100);
    try {

      const trans = await contract.claimAll(tacoType);
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


  }

  useEffect(() => {
    handleContract(tacoType)
  }, [tacoType])



  return (
    <div>
      <div className="w-[95%] md:w-[700px] mx-auto bg-yellow-400 mb-10 overflow-hidden items-center justify-center grid grid-cols-2 max-md:grid-flow-row max-md:grid-cols-1 gap-x-5 p-5 rounded-[32px]">
        <div className="h-80 my-auto flex items-center justify-center"><Image width={500} height={500} src={img} className=" object-cover object-center w-[90%] sm:pl-10" /></div>
        <div className="flex flex-col max-md:text-center max-md:items-center gap-2 h-fit w-[80%] mx-auto my-auto">
          <div className="bg-white rounded-full w-full px-4 py-2 shadow shadow-black/20 text-black text-xl"><h2 >{nameArr[tacoType]}</h2></div>
          <div className="bg-white rounded-full w-full px-4 py-2 shadow shadow-black/20 text-black text-xl"><h2 >Available Tacos: {Number(balance)}</h2></div>
          <div className="w-fit py-1 text-[#73851C] text-3xl"><h2 >Stake your Tacos and earn $GUAC</h2></div>
          <div className="bg-white rounded-full w-fit px-4 py-1 shadow shadow-black/20 text-black cursor-pointer hover:bg-white/80"><h2 >Learn More</h2></div>
        </div>
        {balance > 0 && tacoType == 1 || tacoType == 0 && <button onClick={claimAll} className='group cursor-pointer mx-auto max-md:mt-5 md:col-span-2'>
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

              <button onClick={() => { claim(item.tokenId, item.tacoType) }} className="group relative mt-4">
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