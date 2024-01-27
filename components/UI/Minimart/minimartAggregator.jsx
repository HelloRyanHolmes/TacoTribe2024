import MinimartHolding from "./minimartHolding";
import {contractAdds} from "../../../utils/contractAdds";
import minimartabi from "../../../utils/newAbis/minimartabi";
import erc721abi from "../../../utils/newAbis/erc721abi";
import {useState, useEffect} from "react";
import Swal from 'sweetalert2';
import {ethers} from "ethers";

const error = "https://d19rxn9gjbwl25.cloudfront.net/ui/error.png"

export default function MinimartAggregator(){

    const[contractAddress, setContractAddress] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState("")

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

      async function setERC721(contractAdd){
        try{

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            if(contractAdd.toUpperCase() != "0X0000000000000000000000000000000000000000"){
              const contract = new ethers.Contract(contractAdd, erc721abi, signer);
              return contract
            }
    
          }
          catch(err){
            console.log(err);
          }
    }

    async function getCollections(){
        const contract = await contractSetup();
        const arr = [];
        const data = await contract.returnApprovedContracts();
        
        for(let i=0; i<data.length; i++){
          const contract2 = await setERC721(data[i]);
          const name = await contract2.name();
          const contractAdd = data[i];
          arr.push({name, contractAdd})
        }

        setContractAddress(arr);
    }

    useEffect(()=>{getCollections()},[]);

    return (
        <div className="">
          <div className="flex justify-center gap-10">
            {contractAddress.map((item)=>(
                <button onClick={()=>{
                  setSelectedAddress(item.contractAdd)
                }} className="text-black bg-yellow-400 px-4 py-2 rounded-2xl border-2 border-black hover:bg-yellow-600 duration-200">{item.name}</button>
                ))}
          </div>
          <div className="absolute right-10 w-[35%] bg-yellow-200 border-4 h-[70vh] mt-5 border-black rounded-2xl shadow-inner shadow-black/70">
                <MinimartHolding contractAddress={selectedAddress}/>
          </div>

        </div>
    )
}