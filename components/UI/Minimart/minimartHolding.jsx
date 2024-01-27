import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { contractAdds } from "../../../utils/contractAdds";
import erc721abi from "../../../utils/newAbis/erc721abi";
import minimartabi from "../../../utils/newAbis/minimartabi";
import Moralis from "moralis"
import {EvmChain} from "@moralisweb3/common-evm-utils"
import Image from "next/image"

export default function MinimartHolding({contractAddress}){

  const chain = EvmChain.POLYGON;
    const {isConnected, address} = useAccount();

    const[displayNFT, setDisplayNFT] = useState([])

    async function erc721Setup(){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        try {
          const contract = new ethers.Contract(contractAddress.contractAddress, erc721abi, signer);
            console.log(contract);
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

    async function minimartContractSetup(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    try {
        const contract = new ethers.Contract(contractAdds.minimart, minimartabi, signer);
        console.log(contract);
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

    async function approval(tokenId){

      try {
      const contract = await setERC721Contract();
      const approval = await contract?.approve(contractAddress, tokenId);

      approval.wait();

      await setRaffle(number);


      }
      catch (err) {
      console.log("Error", err)
      //   Swal.fire({
      //     title: 'Error!',
      //     text: 'Couldn\'t get fetching contract',
      //     imageUrl: error,
      //     imageWidth: 200,
      //     imageHeight: 200,
      //     imageAlt: "Taco OOPS!",
      //     confirmButtonText: 'Bruh 😭',
      //     confirmButtonColor: "#facc14",
      //     customClass: {
      //       container: "border-8 border-black",
      //       popup: "bg-white rounded-2xl border-8 border-black",
      //       image: "-mb-5",
      //       confirmButton: "w-40 text-black"
      //     }
      //   })
      }

  }

    async function setMinimartItem(tokenId, price){
      try{
        const contract = await minimartContractSetup();

        const txn = await contract.setMinimartItem(contractAddress, tokenId, price);
        txn.wait();
      }
      catch(err){
        console.log(err);
      }
    }

    async function moralisSetup(){
      await Moralis.start({
        apiKey: process.env.NEXT_PUBLIC_API_KEY
      });
    }

    async function holdingNFTs(){

        const response = await Moralis.EvmApi.nft.getWalletNFTs({
          address,
          chain,
        });

        const arr = [];

        for(let i = 0; i<response.toJSON().result.length; i++){

          if(response.toJSON().result[i].token_address.toLowerCase() == contractAddress.toLowerCase()){
            const tokenId = response.toJSON().result[i].token_id
            const metadata = JSON.parse(response.toJSON().result[i].metadata);

            const name = metadata["name"];
            const img = metadata["image"];
            const image = "https://ipfs.io/ipfs/"+img.substr(7);
            console.log(name, image, contractAddress, tokenId);

            arr.push({name, image});
          }
        }
        setDisplayNFT(arr);

        // console.log(response.toJSON().result, contractAddress.toLowerCase());
    }

    async function fetchListedNfts(){
        
        
    }

    useEffect(()=>{
      moralisSetup();
    },[])

    useEffect(()=>{
        holdingNFTs();
},[contractAddress])

    return(
        <div className="flex gap-5 flex-wrap justify-center text-black p-4">
          {displayNFT.map((item)=>(
            <div className="bg-red-300 border-4 w-[45%] border-black rounded-2xl py-3 px-2 shadow-xl shadow-black/60">
              <h1>{item.name}</h1>
              <div className="w-[90%] mx-auto">
                <Image src={item.image} width={1920} height={1080} className="w-[100%] rounded-2xl border-2 border-black mx-auto"/>
              </div>
              <button className="bg-blue-400 border-2 border-black text-white rounded-2xl px-3 py-2 mt-3 text-lg">Set</button>
              </div>
          ))}
        </div>
    )
}