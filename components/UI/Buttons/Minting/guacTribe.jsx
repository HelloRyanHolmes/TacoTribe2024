import abi from "../../../../utils/newAbis/guacotribeabi"
import { contractAdds } from "../../../../utils/contractAdds"
import { ethers } from "ethers"


export async function guacTribeSetup() {

    const add = contractAdds.guacoTribe;

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