"use client"

import pixelTacosabi from "../../../../utils/newAbis/pixelTacosabi"
import {contractAdds} from "../../../../utils/contractAdds"
import {ethers} from "ethers"

export default function PixelMint(){

    async function mintSetup(){

        const pixelAdd = contractAdds.pixelTacos;


        console.log("Address", pixelAdd);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
    
        try{
        const contract = new ethers.Contract( pixelAdd , pixelTacosabi , signer );

        return contract;
    }
        catch(err){
            console.log("Error",err)
        }    
        
    }

    async function mint(){
        const contract = await mintSetup();
        console.log("inside mint",contract);
        await contract.mint({gasLimit: 30000}).then((res)=>{console.log(res);}).catch((err)=>{console.log(err)});
    }

    return(
        <div className="flex items-center justify-center h-full">
            <button onClick={mint} className="bg-blue-400">Mint me pls</button>
        </div>
    )
}