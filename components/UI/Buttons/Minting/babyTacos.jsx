import abi from "../../../../utils/newAbis/babyTacosabi"
import { contractAdds } from "../../../../utils/contractAdds"
import { ethers } from "ethers"


export async function babyTacosSetup() {

    const add = contractAdds.babyTacos;

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