"use client"

import Image from 'next/image'

import pixelTacosabi from "../../../../utils/newAbis/pixelTacosabi"
import { contractAdds } from "../../../../utils/contractAdds"
import { ethers } from "ethers"

import { useAccount } from 'wagmi'

const claimUp = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/Tan+Button+UP.png"
const claimDown = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/Tan+Button+DOWN.png"

export async function pixelMintSetup() {

    const pixelAdd = contractAdds.pixelTacos;
    console.log("Address", pixelAdd);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    try {
        const contract = new ethers.Contract(pixelAdd, pixelTacosabi, signer);

        return contract;
    }
    catch (err) {
        console.log("Error", err)
    }
}

export default function PixelMint() {

    const { isConnected, address } = useAccount()

    async function mint() {
        if (isConnected) {
            const contract = await pixelMintSetup();
            console.log("inside mint", contract);
            await contract.mint({ gasLimit: 30000 }).then((res) => { console.log(res); }).catch((err) => { console.log(err) });
        }
        else{
            console.log("Not Connected")
        }
    }

    return (
        <>
            <button onClick={mint} className=" hidden xl:block absolute cursor-pointer w-full h-full "></button>

            <button onClick={mint} className=' md:hidden group cursor-pointer absolute z-10 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
                <Image width={80} height={80} src={claimUp} alt="home" className={"w-40 group-hover:hidden"} />
                <Image width={80} height={80} src={claimDown} alt="home" className={"w-40 hidden group-hover:block"} />
            </button>
        </>
    )
}