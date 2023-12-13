import { ethers } from "ethers";
import { contractAdds } from "../../../../utils/contractAdds";
import abi from "../../../../utils/newAbis/babyTacosabi";

import { useAccount } from 'wagmi'


export async function babyTacosSetup() {
    const { address } = useAccount()

    const add = contractAdds.babyTacos;

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