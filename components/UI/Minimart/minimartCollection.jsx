import { ethers } from "ethers";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { contractAdds } from "../../../utils/contractAdds";
import erc721abi from "../../../utils/newAbis/erc721abi";
import minimartabi from "../../../utils/newAbis/minimartabi";

export default function MinimartCollection(contractAddress){

    const {isConnected, address} = useAccount();

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

    async function holdingNFTs(){
        const contract = await erc721Setup();
        const total = Number(await contract.totalSupply());

        for(let i = 1; i<=total; i++){
            const owner = String(await contract.ownerOf(i));

            if(owner.toLowerCase() === address.toLowerCase()){
            console.log(owner);}
        }
    }

    async function fetchListedNfts(){
        const contract = await minimartContractSetup();

    }

    useEffect(()=>{
        holdingNFTs();
},[])

    return(
        <div>

        </div>
    )
}