import MinimartCollection from "./minimartCollection";
import {contractAdds} from "../../../utils/contractAdds";
import minimartabi from "../../../utils/newAbis/minimartabi";
import {useState, useEffect} from "react";
import Swal from 'sweetalert2';
import {ethers} from "ethers";

const error = "https://d19rxn9gjbwl25.cloudfront.net/ui/error.png"

export default function MinimartAggregator(){

    const[contractAddress, setContractAddress] = useState([]);

    async function contractSetup(){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        try {
          const contract = new ethers.Contract(contractAdds.minimart, minimartabi, signer);
            console.log(contract);
          return contract;
        }
        catch (err) {
    
    
          console.log("Error", err)
          Swal.fire({
            title: 'Error!',
            text: 'Couldn\'t get fetching contract',
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

    async function getCollections(){
        const contract = await contractSetup();
        const data = await contract.returnApprovedContracts();
        setContractAddress(data);
    }

    useEffect(()=>{getCollections()},[]);

    return (
        <div>
            {contractAddress.map((item)=>(
                <MinimartCollection contractAddress={item}/>
            ))}
            <h1>Minimart</h1>
        </div>
    )
}