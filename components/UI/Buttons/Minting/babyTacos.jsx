import { ethers } from "ethers";
import { contractAdds } from "../../../../utils/contractAdds";
import abi from "../../../../utils/newAbis/babyTacosabi";

import Swal from 'sweetalert2'

export async function babyTacosSetup(address) {
    
    const add = contractAdds.babyTacos;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    try {
        const contract = new ethers.Contract(add, abi, signer);

        return contract;
    }
    catch (err) {
        console.log("Error", err)
        Swal.fire({
            title: 'Error!',
            text: 'Couldn\'t get Contract!',
            icon: 'error',
            confirmButtonText: 'Cool!'
        })
    }

}