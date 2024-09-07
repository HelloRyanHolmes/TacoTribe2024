"use client"

import { useEffect } from "react";
import Swal from 'sweetalert2';
import { useAccount } from 'wagmi';
import { useGlobalContext } from "../../../context/MainContext";
import { contractAdds } from "../../../utils/contractAdds";
import guacTokenabi from "../../../utils/newAbis/guacTokenabi";

import { ethers } from "ethers";


const error = "https://d19rxn9gjbwl25.cloudfront.net/ui/error.png"

async function guacSetup(address){
    const guacAdd = contractAdds.guacToken;

    const provider = new ethers.getDefaultProvider("https://polygon-mainnet.infura.io/v3/572a699984034c5bb63ebdc9dafa15d1");;

    // const signer = provider.getSigner();
    // console.log(signer)

    try{
    const contract = new ethers.Contract( guacAdd , guacTokenabi , provider );
    return contract;
}
    catch(err){
        console.log("Error",err)

        Swal.fire({
            title: 'Error!',
            text: "Couldn\'t get Contract!",
            imageUrl: error,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: "Taco OOPS!",
            confirmButtonText: 'Retry ?',
            confirmButtonColor: "#facc14",
            customClass: {
              container: "border-8 border-black",
              popup: "bg-white rounded-2xl border-8 border-black",
              image: "-mb-5",
              confirmButton: "w-40 text-black"
            }
          }).then(async (result) => {
            if (result.isConfirmed) {
              await guacSetup(address);
            }
            // Swal.fire("Succesful!", "", "success");
          })
        
    }    
    
}

export default function GuacBalance(){

    const { address, isConnected } = useAccount()
    const { guac, setGuac, rfc } = useGlobalContext();

  
    const fetchBalance = async () => {

        try{
            const contract = await guacSetup(address);
            const balance = ethers.utils.formatEther(await contract.balanceOf(address));
            // console.log("Balance", balance)
            setGuac(Number(balance));
        }
        catch(err) {
            console.log(err)
            console.log("Error fetching balance")
            // Swal.fire({
            //     title: 'Error!',
            //     text: "Something Went Wrong",
            //     imageUrl: error,
            //     imageWidth: 200,
            //     imageHeight: 200,
            //     imageAlt: "Taco OOPS!",
            //     confirmButtonText: 'Retry ?',
            //     confirmButtonColor: "#facc14",
            //     customClass: {
            //       container: "border-8 border-black",
            //       popup: "bg-white rounded-2xl border-8 border-black",
            //       image: "-mb-5",
            //       confirmButton: "w-40 text-black"
            //     }
            //   }).then(async (result) => {
            //     if (result.isConfirmed) {
            //       window.location.reload();
            //     }
            //     // Swal.fire("Succesful!", "", "success");
            //   })
            setGuac(0);
        }
    }

    useEffect(()=>{

        if(isConnected){
            fetchBalance();
        }

    },[])


    // if(isConnected) 
    return(
        <div className={`block`}>
            <div className={`h-full bg-lime-300 px-3 py-1 rounded-full border-2 shadow-xl shadow-black/20 border-lime-800 flex items-center justify-center `}>
                {address && <div  className=" text-lime-900 ">{`${guac.toFixed(2)} GUAC`}</div>}
            </div>
        </div>
    )
}

