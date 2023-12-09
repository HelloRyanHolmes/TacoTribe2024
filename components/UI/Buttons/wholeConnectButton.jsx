"use client"
import { useEffect, useState } from "react";
import { contractAdds } from "../../../utils/contractAdds"
import guacTokenabi from "../../../utils/newAbis/guacTokenabi";
import { useAccount } from 'wagmi'

import {ethers} from "ethers"

export default function WholeConnectButton(){

    const { address, isConnecting, isDisconnected } = useAccount()
    const [guac, setGuac] = useState(0);

    async function guacSetup(){

        const guacAdd = contractAdds.guacToken;

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

        try{
        const contract = new ethers.Contract( guacAdd , guacTokenabi , signer );

        return contract;
    }
        catch(err){
            console.log("Error",err)
        }    
        
    }


    async function fetchBalance(){

        const contract = await guacSetup();
        const balance = ethers.utils.formatEther(await contract.balanceOf(address));
       console.log(balance)
        setGuac(balance);
    }



    useEffect(()=>{
        fetchBalance();
    },[])


    return(
        <div className=" bg-lime-300 px-3 py-1 rounded-full border-4 border-lime-800">
            <h1 className=" text-lime-900 ">$GUAC: {guac}</h1>
        </div>
    )
}

