import MinimartHolding from "./minimartHolding";

import {contractAdds} from "../../../utils/contractAdds";
import minimartabi from "../../../utils/newAbis/minimartabi";
import erc721abi from "../../../utils/newAbis/erc721abi";
import {useState, useEffect} from "react";
import Swal from 'sweetalert2';
import {ethers} from "ethers";
import Image from "next/image";

import {useAccount} from "wagmi"

const error = "https://d19rxn9gjbwl25.cloudfront.net/ui/error.png"

export default function MinimartAggregator(){

  const{address} = useAccount();

    const[contractAddress, setContractAddress] = useState([]);
    const[selectedAddress, setSelectedAddress] = useState("")

    const[listedIds, setListedIds] = useState([])

    const [displayNFT, setDisplayNFT] = useState([]);

    async function contractSetup(){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        try {
          const contract = new ethers.Contract(contractAdds.minimart, minimartabi, signer);
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

    async function setERC721Contract(){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      try {
        const contract = new ethers.Contract(selectedAddress, erc721abi, signer);
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

  async function minimartContractSetup(){
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  try {
      const contract = new ethers.Contract(contractAdds.minimart, minimartabi, signer);
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

  async function displayListedNFTs(){

    const contract = await setERC721Contract();
    const arr = [];

    const minimartContract = await minimartContractSetup();

    const data = await minimartContract.fetchData();

    console.log(data);
    setDisplayNFT(arr);
    
  }

  async function fetchListedNfts(){
      const contract = await minimartContractSetup();


      const data = await contract.fetchData();
      const arr = [];
            
        for(let i=0; i<data.length; i++){
          const contractAdd = data[i][0];
          


            const tokenId = Number(data[i][1]);
            console.log("hello",tokenId);
            arr[i] = tokenId;


        }
        setListedIds(arr);

  }

  useEffect(()=>{
    displayListedNFTs();
  },[listedIds])

  useEffect(()=>{
      fetchListedNfts();
  },[selectedAddress])

    async function getCollections(){
      try{
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
      catch(err){
        console.log(err);
      }
       
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

          <div className="grid grid-flow-col grid-cols-3">

            <div className=" col-span-2 w-[80%] mx-auto flex flex-wrap gap-10 shadow-inner shadow-black/80 h-[70vh] bg-lime-300 p-4 overflow-y-scroll my-4 border-4 border-black rounded-2xl">
                  {displayNFT.map((item)=>(
                    <div className="bg-green-400 shadow-lg h-fit shadow-black/70 relative border-4 border-black text-black p-6 rounded-2xl">
                      <Image width={1920} height={1080} src={item.img} className="w-40 rounded-2xl border-2 border-black"/>
                      <h1>{item.name}</h1>
                      <h1 className="bg-yellow-400 border-2 py-2 rounded-2xl border-black">{item.price} $GUAC</h1>
                      {address.toLowerCase() === item.owner.toLowerCase() ? <button className="bg-red-500 py-2 px-5 my-3 rounded-2xl border-2 border-black hover:bg-red-600">Unlist</button> : <button>Buy</button>}
                      </div>
                  ))}
            </div>

            <div className="absolute right-10 w-[35%] bg-yellow-200 border-4 h-[70vh] mt-5 overflow-y-scroll border-black rounded-2xl shadow-inner shadow-black/70">
                  <MinimartHolding contractAddress={selectedAddress} listed={listedIds}/>
            </div>

          </div>


        </div>
    )
}