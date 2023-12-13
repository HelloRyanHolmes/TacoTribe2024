"use client"

import { ethers } from "ethers"
import Image from 'next/image'
import { contractAdds } from "../../../../utils/contractAdds"
import abi from "../../../../utils/newAbis/pixelDoodleabi"

const claimUp = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/Tan+Button+UP.png"
const claimDown = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/Tan+Button+DOWN.png"

import { useAccount } from 'wagmi'

export async function doodledPixelTacoMintSetup(address) {

    const add = contractAdds.pixelDoodle;

    const provider = new ethers.providers.JsonRpcProvider("https://polygon.llamarpc.com/");
    const signer = provider.getSigner(address);

    try {
        const contract = new ethers.Contract(add, abi, signer);

        return contract;
    }
    catch (err) {
        console.log("Error", err)
    }

}

export default function DoodlePixelMint() {

    const { address, isConnected } = useAccount()

    async function mint() {
        if (isConnected) {
            const contract = await doodledPixelTacoMintSetup(address);
            console.log("inside mint", contract);
            await contract.mint({ gasLimit: 30000 }).then((res) => { console.log(res); }).catch((err) => { console.log(err) });
        }
        else {
            console.log("Not Connected")
        }
    }

    return (
        <>
            <button onClick={mint} className="hidden md:block absolute cursor-pointer rounded-3xl w-full h-full"></button>

            <button onClick={mint} className='md:hidden group cursor-pointer absolute z-10 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
                <Image width={80} height={80} src={claimUp} alt="home" className={"w-40 group-hover:hidden"} />
                <Image width={80} height={80} src={claimDown} alt="home" className={"w-40 hidden group-hover:block"} />
            </button>
        </>
    )
}