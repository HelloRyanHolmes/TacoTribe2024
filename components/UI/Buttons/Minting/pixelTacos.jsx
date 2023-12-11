"use client"

import Image from 'next/image'

import pixelTacosabi from "../../../../utils/newAbis/pixelTacosabi"
import {contractAdds} from "../../../../utils/contractAdds"
import {ethers} from "ethers"

const claimUp = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/Tan+Button+UP.png"
const claimDown = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/Tan+Button+DOWN.png"

export function pixelMintSetup(){

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
}

export default function PixelMint(){

    async function mint(){
        const contract = await mintSetup();
        console.log("inside mint",contract);
        await contract.mint({gasLimit: 30000}).then((res)=>{console.log(res);}).catch((err)=>{console.log(err)});
    }

    return(
        <>
            <button onClick={mint} className=" hidden xl:block absolute top-1/2 left-0 xl:-mt-5 -translate-y-1/2 opacity-0 cursor-pointer hover:animate-pulse hover:bg-white/20 rounded-3xl w-[20%] h-[80%] "></button>

            <button className=' xl:hidden group cursor-pointer absolute z-50 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
                <Image width={80} height={80} src={claimUp} alt="home" className={"w-40 group-hover:hidden"}/>
                <Image width={80} height={80} src={claimDown} alt="home" className={"w-40 hidden group-hover:block"}/>
            </button>
            <div className=' xl:hidden  w-32 h-10 shadow-2xl shadow-white bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10'></div>
        </>
    )
}