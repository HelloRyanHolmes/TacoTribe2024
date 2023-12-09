"use client"

import abi from "../../../../utils/newAbis/doodletacosabi"
import {contractAdds} from "../../../../utils/contractAdds"
import {ethers} from "ethers"
import { useState } from "react"

export default function DoodleMint(){

    const [amount, setAmount] = useState(0);
    const [amountBoxShow, setAmountBoxShow] = useState(false);

    async function mintSetup(){

        const add = contractAdds.doodleTacos;

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

    async function mint(){
        const contract = await mintSetup();
        console.log("inside mint",contract);
        await contract.mint(amount, {gasLimit:30000, value: ethers.utils.parseEther(String(2*amount))}).then((res)=>{console.log(res);}).catch((err)=>{console.log(err)});
    }


    const handleamountChange = async (e) => {
        
            setAmount(e.target.value); 
        
      };

    return(
        <div className="flex items-center justify-center h-full">
            <button onClick={()=>{setAmountBoxShow(true)}} className="bg-red-400">Click me pls</button>

            {amountBoxShow && <div className="bg-yellow-400 p-10">
                <input placeholder="0" type="number" onKeyDown={(e)=>{e.preventDefault()}} step={1} min={0} onChange={handleamountChange} value={amount} className="text-black p-5 text-xl block">
                </input>
                <button onClick={mint} className="bg-red-400 mt-10">Mint me pls</button>
            </div>}
        </div>
    )
}