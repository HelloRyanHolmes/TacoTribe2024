import { ethers } from "ethers";
import { contractAdds } from "../../../../utils/contractAdds";
import abi from "../../../../utils/newAbis/babyTacosabi";

import Swal from 'sweetalert2';

const error = "https://d19rxn9gjbwl25.cloudfront.net/ui/error.png"

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
            text: 'Couldn\'t Get Contract',
            imageUrl: error,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: "Taco OOPS!",
            confirmButtonText: 'Bruh 😭',
            confirmButtonColor: "#facc14", 
            customClass: {
                container: "border-8 border-black",
                popup: "bg-white rounded-2xl border-8 border-black",
                image: "-mb-5",
                confirmButton: "w-40 text-black"
            }
        })
    }

}