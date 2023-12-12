import Image from "next/image"

import { doodledPixelTacoMintSetup } from "../Buttons/Minting/doodlepixelTacos"
import { doodledTacoMintSetup } from "../Buttons/Minting/doodleTacos"
import { pixelMintSetup } from "../Buttons/Minting/pixelTacos"
import {tacoMintSetup} from '../Buttons/Minting/tacos'
import { useEffect, useState } from "react"
import { useAccount } from 'wagmi'
import {ethers} from "ethers";
import abi from "../../../utils/newAbis/stakingabi"
import { contractAdds } from "../../../utils/contractAdds"

const guacos = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/guacos.png"
const doodle = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/doodle.png"
const gvsc = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/gvsc.png"
const pixelDoodledTaco = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/Pixel Doodled Taco.png"
const pixelTaco = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/Pixel Taco.png"
const tacoTribe = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/Taco Tribe.png"


export default function StakeTemplate({ name }) {
  const [img, setImg] = useState("")
  const [balance, setBalance] = useState(0);
  const [userNFTs, setUserNFTs] = useState([]);

  const { address } = useAccount();
  

  //check which collection is to be displayed and call the handleContract function accordingly
  const getContractDetails = async () => {
    switch (name) {
      case "Taco Tribe":
        setImg(tacoTribe)
        //handleContract has a number parameter which denotes the collection for accesing the staking contract
        handleContract(await tacoMintSetup(), 0);
        //return statement not being used currently but better to keep at number than name
        return 0;
      case "Pixel Taco":
        setImg(pixelTaco)
        handleContract(await pixelMintSetup(), 3);
        return 3;
      case "Doodled Taco":
        setImg(doodle)
        handleContract(await doodledTacoMintSetup(), 1);
        return 1;
      case "Guaco Tribe":
        setImg(guacos)
        return 6;
      case "Guac VS Sour Cream":
        setImg(gvsc)
        return 7;
      case "Pixel Doodled Taco":
        setImg(pixelDoodledTaco)
        handleContract(await doodledPixelTacoMintSetup(), 4);
        return 4;
      default:
        return 0;
    }
  }

  //function to fetch details of each NFT (name, image, unclaimed $GUAC balance) of each collection. 
  const handleContract = async (data, collection) => {


    var displayArr = [];
    
    if(name.toUpperCase() == "PIXEL TACO"){
        try{


            setUserNFTs([]);
            setBalance(0);
         
            var bal;
            
            typeof(data) !== 'string' ? bal = setBalance(await data?.balanceOf(address)) : setBalance(11);
          
              const tokenIDs = typeof(data) !== 'string' ? ((await data?.tokensOfOwner(address))) : null;
        
        
                for(let i = 0; i<tokenIDs.length; i++){
    
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

                    displayArr.push({name, img, tokenId, collection, unclaimedAmount});
                }
    
            console.log(displayArr);
            setUserNFTs(displayArr);

        }
        catch(err){
            console.log(err);
        }

      }


      else{
        try{
    
            setBalance(0);
            setUserNFTs([]);
            
    
            var bal;
            
            typeof(data) !== 'string' ? bal = await data?.balanceOf(address) : setBalance(11);
            setBalance(Number(bal));
            for(let i=0; i<Number(bal); i++){
    
                const BtokenId = typeof(data) !== 'string' ? (await data?.tokenOfOwnerByIndex(address, i)) : null;
                const tokenId = Number(BtokenId);
                const uri = await data?.tokenURI(tokenId);
                const meta = `https://ipfs.io/ipfs/${uri.substr(7)}`;
                const metadata = await fetch(meta);
                const json = await metadata.json();
    
                const name = json["name"];
                const fetchedImg = json["image"];
    
                const img = `https://ipfs.io/ipfs/${fetchedImg.substr(7)}`
                const unclaimedAmount = await unclaimed(tokenId, collection)
                displayArr.push({name, img, tokenId, collection, unclaimedAmount});
            }
            console.log(displayArr);
            setUserNFTs(displayArr);
        }
        catch(err){
            console.log(err);
        }
        
      }

  }

  //setup staking contract
  async function stakingSetup(){
    const add = contractAdds.staking;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    try{
    const contract = new ethers.Contract( add , abi , signer );

    return contract;
}
    catch(err){
        console.log("Error",err)
    }    
  }

  //check unclaimed amount of $GUAC for each collection and tokenId. Has been called in handleContract()
  async function unclaimed(tokenId, collection){
    const contract = await stakingSetup();

    var unclaimedAmount = await contract?.unclaimedRewards(tokenId, collection);
    unclaimedAmount = ethers.utils.formatEther(unclaimedAmount)

    return unclaimedAmount;
  }

  //function to claim $GUAC of NFT user chosen to claim
  async function claim(tokenID, collection){
    const contract = await stakingSetup();

      try{
        await contract.claim(tokenID, collection, {gasLimit: 30000})
      }
      catch(err){
        console.log(err);
      }
  }

  useEffect(() => {
   getContractDetails();
  }, [name])



  return (
    <div>
        <div className="w-[95%] md:w-[700px] bg-yellow-400 overflow-hidden items-center justify-center grid grid-cols-2 max-md:grid-cols-1 gap-5 p-5 rounded-[32px]">
        <div className="h-80 my-auto flex items-center justify-center"><Image width={500} height={500} src={img} className=" object-cover object-center w-full pl-10" /></div>
        <div className="flex flex-col max-md:text-center max-md:items-center gap-2 h-fit w-[80%] mx-auto my-auto">
            <div className="bg-white rounded-full w-full px-4 py-2 shadow shadow-black/20 text-black text-xl"><h2 >{name?.length === 0 ? 'Select A Taco' : name}</h2></div>
            <div className="bg-white rounded-full w-full px-4 py-2 shadow shadow-black/20 text-black text-xl"><h2 >Available Tacos: {Number(balance)}</h2></div>
            <div className="w-fit py-1 text-[#73851C] text-3xl"><h2 >Stake your Tacos and earn $GUAC</h2></div>
            <div className="bg-white rounded-full w-fit px-4 py-1 shadow shadow-black/20 text-black cursor-pointer hover:bg-white/80"><h2 >Learn More</h2></div>
        </div>
        </div>

        <div className="bg-green-400 flex gap-10 items-center justify-center text-center">
            {userNFTs?.map((item)=>(
                <div>
                    <h1>{item.name}</h1>
                    <Image src={item.img} className="mx-auto" width={200} height={200} alt={"HEjhdsvcw"}/>
                    <h1 className="">$GUAC: {item.unclaimedAmount}</h1>
                    <button onClick={()=>{claim(item.tokenId, item.collection)}} className="bg-yellow-400">Claim</button>
                    </div>
            ))}
        </div>
    </div>
  )
}