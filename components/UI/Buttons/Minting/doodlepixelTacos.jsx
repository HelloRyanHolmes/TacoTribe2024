"use client"

import abi from "../../../../utils/newAbis/pixelDoodleabi"
import { contractAdds } from "../../../../utils/contractAdds"
import { ethers } from "ethers"
import Image from 'next/image'

const claimUp = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/Tan+Button+UP.png"
const claimDown = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/Tan+Button+DOWN.png"

export async function doodledPixelTacoMintSetup() {

    const add = contractAdds.pixelDoodle;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    try {
        const contract = new ethers.Contract(add, abi, signer);

        return contract;
    }
    catch (err) {
        console.log("Error", err)
    }

}

export default function DoodlePixelMint() {

    async function mint() {
        const contract = await doodledPixelTacoMintSetup();
        console.log("inside mint", contract);
        await contract.mint({ gasLimit: 30000 }).then((res) => { console.log(res); }).catch((err) => { console.log(err) });
    }

    return (
        <>
            <button onClick={mint} className=" max-[950px]:hidden block absolute bottom-12 left-52 max-[1190px]:left-20 max-[1000px]:left-0 max-[1250px]:left-28 lg:w-40 xl:-mt-5 opacity-0 cursor-pointer hover:animate-pulse hover:bg-white/20 rounded-3xl w-[20%] h-[60%] "></button>

            <button onClick={mint} className=' hidden max-[950px]:block group cursor-pointer absolute z-10 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
                <Image width={80} height={80} src={claimUp} alt="home" className={"w-40 group-hover:hidden"}/>
                <Image width={80} height={80} src={claimDown} alt="home" className={"w-40 hidden group-hover:block"}/>
            </button>
        </>
    )
}