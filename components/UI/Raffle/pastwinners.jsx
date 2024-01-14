import raffleabi from "../../../utils/newAbis/raffleabi"
import erc721abi from "../../../utils/newAbis/erc721abi"
import { contractAdds } from "../../../utils/contractAdds"
import {useState, useEffect} from "react"
import Image from "next/image"

import {ethers} from "ethers";

export default function PastWinners({number}){

    const [winnerAddress, setWinnerAddress] = useState("");
    const [nftName, setNftName] = useState("");
    const [nftImage, setNftImage] = useState("");

    async function setRaffle(){
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const signer = provider.getSigner();

        try {
        const contract = new ethers.Contract(contractAdds.raffle, raffleabi, signer);
        // console.log("raffle", raffleAdd);
        return contract;
        }
        catch(err){
            console.log(err);
        }
    }

    async function setERC721(contractAdd){
        try{

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
    
            const contract1 = new ethers.Contract(contractAdds.raffle, raffleabi, signer);
            const add = await contract1?.raffleContract(number);
            console.log(add);
            if(add.toUpperCase() == "0X0000000000000000000000000000000000000000"){
              const contract = new ethers.Contract(contractAdd, erc721abi, signer);
              return contract
            }
    
            else{
              const contract = new ethers.Contract(add, erc721abi, signer)
              return contract;
    
            }
          }
          catch(err){
            console.log(err);
          }
    }

    async function fetchPastWinners(){
        const contract = await setRaffle();

        const lastwinner = await contract?.lastWinners(number);

        if(lastwinner.toUpperCase() == "0X0000000000000000000000000000000000000000"){

            setWinnerAddress(lastwinner);
    
    
            
            const lastWonAddress = await contract?.lastNftWonContract(number);
            const erc721contract = await setERC721(lastWonAddress);
    
            const tokenURI = await erc721contract?.tokenURI(Number(await contract?.lastNftWonTokenId(number)));
            const metadata = `https://ipfs.io/ipfs/${tokenURI.substr(7)}`;
            const meta = await fetch(metadata);
            const json = await meta.json();
            const name = json["name"];
            const image = json["image"];
            const newimage = `https://ipfs.io/ipfs/${image.substr(7)}`
    
            setNftName(name);
            setNftImage(newimage)
        }
    }

    useEffect(()=>{
        fetchPastWinners()
    },[])

    return(
        <>
       <div className="bg-green-400 p-3 text-center rounded-2xl">
            {nftImage != "" && <Image width={1920} height={1080} className="mx-auto rounded-2xl border-2 border-black" src={nftImage}/>}
            <h2 className="text-2xl">{nftName}</h2>
            <h2 className="text-sm">{winnerAddress}</h2>
        </div>
        </>
    )
}