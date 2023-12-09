"use client"

import { useEffect, useState } from "react";
import { contractAdds } from "../../../utils/contractAdds"
import guacTokenabi from "../../../utils/newAbis/guacTokenabi";
import { useAccount } from 'wagmi'

import {ethers} from "ethers"

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

export default function GuacBalance(){

    const { address , isDisconnected, isConnected, isConnecting } = useAccount()
    const [guac, setGuac] = useState(0);

    const fetchBalance = async () => {

        try{
            const contract = await guacSetup();
            const balance = ethers.utils.formatEther(await contract.balanceOf(address));
        //    console.log(balance)
            setGuac(balance);
        }
        catch {
            console.log("Error fetching balance")
            setGuac(0);
        }
    }

    useEffect(()=>{
        console.log("connection: ", isConnected);
        if(isConnected){
            fetchBalance();
        }
    },[isConnected])



    // if(isConnected) 
    return(
        <div className={`block`}>
            <div className={`h-full bg-lime-300 px-3 py-1 rounded-full border-2 shadow-xl shadow-black/20 border-lime-800 flex items-center justify-center `}>
                <div  className=" text-lime-900 ">{`${guac} GUAC`}</div>
            </div>
        </div>
    )
}

