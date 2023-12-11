"use client"

import abi from "../../../../utils/newAbis/pixelDoodleabi"
import { contractAdds } from "../../../../utils/contractAdds"
import { ethers } from "ethers"

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
        const contract = await mintSetup();
        console.log("inside mint", contract);
        await contract.mint({ gasLimit: 30000 }).then((res) => { console.log(res); }).catch((err) => { console.log(err) });
    }

    return (
        <div className="flex items-center justify-center h-full">
            <button onClick={mint} className="bg-green-400">Mint me pls</button>
        </div>
    )
}